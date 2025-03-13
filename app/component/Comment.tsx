"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore"
import { signInAnonymously, onAuthStateChanged } from "firebase/auth"
import { db, auth } from "@/app/firebase"
import { ArrowRightIcon, CornerDownRightIcon, XIcon, AlertTriangleIcon, Trash2Icon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Comment {
  id?: string
  text: string
  timestamp: Timestamp
  username: string
  parentId?: string | null
  replies?: Comment[]
}

const Comment = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState<string>("")
  const [indexError, setIndexError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<{ id: string; isReply: boolean; parentId?: string | null }>()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const unsubscribeRef = useRef<() => void>(() => {})
  const repliesListenersRef = useRef<Map<string, () => void>>(new Map())

  const generateAnonymousUsername = () => {
    const adjectives = ["Mysterious", "Silent", "Wandering", "Curious", "Shadowy", "Clever", "Witty", "Gentle", "Bold"]
    const nouns = ["Stranger", "Traveler", "Whisper", "Ghost", "Shadow", "Explorer", "Voyager", "Dreamer"]
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
    return `${randomAdjective} ${randomNoun}`
  }

  // Clean up all listeners
  const cleanupListeners = useCallback(() => {
    // Unsubscribe from main comments listener
    if (unsubscribeRef.current) {
      unsubscribeRef.current()
    }

    // Unsubscribe from all reply listeners
    repliesListenersRef.current.forEach((unsubscribe) => {
      unsubscribe()
    })
    repliesListenersRef.current.clear()
  }, [])

  useEffect(() => {
    const storedUsername = localStorage.getItem("anonymousUsername")
    if (!storedUsername) {
      const newAnonymousUsername = generateAnonymousUsername()
      setUsername(newAnonymousUsername)
      localStorage.setItem("anonymousUsername", newAnonymousUsername)
    } else {
      setUsername(storedUsername)
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        initializeFirestoreListeners()
      } else {
        setIsAuthenticated(false)
        signInAnonymously(auth).catch((error) => {
          console.error("Error signing in anonymously:", error)
        })
      }
    })

    return () => {
      unsubscribe()
      cleanupListeners()
    }
  }, [cleanupListeners])

  // Set up a real-time listener for replies to a specific comment
  const listenToReplies = useCallback((commentId: string, commentIndex: number) => {
    // Clean up previous listener for this comment if it exists
    if (repliesListenersRef.current.has(commentId)) {
      repliesListenersRef.current.get(commentId)?.()
      repliesListenersRef.current.delete(commentId)
    }

    try {
      // Set up real-time listener for replies
      const repliesQuery = query(
        collection(db, "comments"),
        where("parentId", "==", commentId),
        orderBy("timestamp", "asc"),
      )

      const unsubscribe = onSnapshot(
        repliesQuery,
        (snapshot) => {
          const replies = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              }) as Comment,
          )

          // Update the replies for this specific comment
          setComments((prevComments) => {
            const updatedComments = [...prevComments]
            if (updatedComments[commentIndex]) {
              updatedComments[commentIndex].replies = replies
            }
            return updatedComments
          })
        },
        (error) => {
          console.error(`Error in replies listener for comment ${commentId}:`, error)

          // If index error, try without ordering
          if (error.code === "failed-precondition" && error.message.includes("requires an index")) {
            setIndexError(error.message)

            // Set up simpler listener without ordering
            const simpleRepliesQuery = query(collection(db, "comments"), where("parentId", "==", commentId))

            const fallbackUnsubscribe = onSnapshot(simpleRepliesQuery, (snapshot) => {
              const replies = snapshot.docs.map(
                (doc) =>
                  ({
                    id: doc.id,
                    ...doc.data(),
                  }) as Comment,
              )

              // Sort manually
              replies.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis())

              // Update the replies for this specific comment
              setComments((prevComments) => {
                const updatedComments = [...prevComments]
                if (updatedComments[commentIndex]) {
                  updatedComments[commentIndex].replies = replies
                }
                return updatedComments
              })
            })

            // Store the fallback unsubscribe function
            repliesListenersRef.current.set(commentId, fallbackUnsubscribe)
          }
        },
      )

      // Store the unsubscribe function
      repliesListenersRef.current.set(commentId, unsubscribe)
    } catch (error) {
      console.error(`Error setting up replies listener for comment ${commentId}:`, error)
    }
  }, [])

  const initializeFirestoreListeners = useCallback(() => {
    // Clean up existing listeners
    cleanupListeners()

    try {
      // Get only parent comments (those without parentId)
      const commentsRef = collection(db, "comments")
      const q = query(commentsRef, where("parentId", "==", null), orderBy("timestamp", "desc"))

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          try {
            const fetchedComments = snapshot.docs.map(
              (doc) =>
                ({
                  id: doc.id,
                  text: doc.data().text,
                  timestamp: doc.data().timestamp,
                  username: doc.data().username,
                  parentId: doc.data().parentId,
                  replies: [],
                }) as Comment,
            )

            setComments(fetchedComments)

            // Set up individual listeners for replies to each comment
            fetchedComments.forEach((comment, index) => {
              if (comment.id) {
                listenToReplies(comment.id, index)
              }
            })
          } catch (error: any) {
            console.error("Error processing comments:", error)
            if (error.code === "failed-precondition" && error.message.includes("requires an index")) {
              setIndexError(error.message)
            }
          }
        },
        (error) => {
          console.error("Error in snapshot listener:", error)
          if (error.code === "failed-precondition" && error.message.includes("requires an index")) {
            setIndexError(error.message)
          }
        },
      )

      // Store the unsubscribe function
      unsubscribeRef.current = unsubscribe
    } catch (error) {
      console.error("Error setting up Firestore listeners:", error)
    }
  }, [cleanupListeners, listenToReplies])

  useEffect(() => {
    // Scroll to bottom when comments change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [comments])

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newComment.trim() === "" || !isAuthenticated || isSubmitting) return

    setIsSubmitting(true)
    try {
      const commentData = {
        text: newComment,
        timestamp: Timestamp.now(),
        username: username,
        parentId: null,
      }

      console.log("Adding new comment:", commentData)

      await addDoc(collection(db, "comments"), commentData)
      setNewComment("")
      toast("Comment added", {
        description: "Your comment has been posted successfully.",
      })
    } catch (error) {
      console.error("Error adding comment: ", error)
      toast("Error", {
        description: "Failed to post your comment. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (replyText.trim() === "" || !isAuthenticated || !replyingTo || isSubmitting) return

    setIsSubmitting(true)
    try {
      // Verify the parent comment exists
      const parentCommentRef = doc(db, "comments", replyingTo)
      const parentCommentSnap = await getDoc(parentCommentRef)

      if (!parentCommentSnap.exists()) {
        throw new Error("Parent comment does not exist")
      }

      const replyData = {
        text: replyText,
        timestamp: Timestamp.now(),
        username: username,
        parentId: replyingTo,
      }

      console.log("Adding reply:", replyData)

      await addDoc(collection(db, "comments"), replyData)

      setReplyText("")
      setReplyingTo(null)

      toast("Reply added", {
        description: "Your reply has been posted successfully.",
      })
    } catch (error) {
      console.error("Error adding reply: ", error)
      toast("Error", {
        description: "Failed to post your comment. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteComment = async () => {
    if (!commentToDelete || !commentToDelete.id || isDeleting) return

    setIsDeleting(true)
    try {
      const commentRef = doc(db, "comments", commentToDelete.id)

      // If it's a parent comment, we need to delete all replies first
      if (!commentToDelete.isReply) {
        const repliesQuery = query(collection(db, "comments"), where("parentId", "==", commentToDelete.id))

        const repliesSnapshot = await getDocs(repliesQuery)

        // Delete all replies in a batch
        const deletePromises = repliesSnapshot.docs.map((replyDoc) => deleteDoc(doc(db, "comments", replyDoc.id)))

        if (deletePromises.length > 0) {
          await Promise.all(deletePromises)
        }
      }

      // Delete the comment itself
      await deleteDoc(commentRef)

      toast("Comment deleted", {
        description: commentToDelete.isReply
          ? "Your reply has been deleted successfully."
          : "Your comment and all its replies have been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting comment: ", error)
      toast("Error", {
        description: "Failed to post your comment. Please try again.",
      })
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
      setCommentToDelete(undefined)
    }
  }

  const openDeleteDialog = (id: string, isReply: boolean, parentId?: string | null) => {
    setCommentToDelete({ id, isReply, parentId })
    setShowDeleteDialog(true)
  }

  const handleReply = (commentId: string | undefined) => {
    if (commentId) {
      setReplyingTo(commentId)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  const cancelReply = () => {
    setReplyingTo(null)
    setReplyText("")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Extract index URL from error message
  const getIndexUrl = (errorMessage: string) => {
    const urlMatch = errorMessage.match(/https:\/\/console\.firebase\.google\.com[^\s]+/)
    return urlMatch ? urlMatch[0] : null
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 w-full" data-chat-component="true">
      <Card className="h-[600px] flex flex-col shadow-lg border-muted overflow-hidden">
        <CardHeader className="border-b pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Komentar Komunitas</CardTitle>
            <Badge variant="outline" className="px-3 py-1">
              <span className="text-xs font-normal">Login sebagai </span>
              <span className="font-medium ml-1">{username}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-0 overflow-hidden relative">
          {indexError && (
            <Alert variant="destructive" className="m-4 mb-0">
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertTitle>Firestore Index Required</AlertTitle>
              <AlertDescription className="text-xs">
                A Firestore index is needed for optimal comment sorting.
                {getIndexUrl(indexError) ? (
                  <a
                    href={getIndexUrl(indexError) || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-1 text-primary underline"
                  >
                    Click here to create the required index
                  </a>
                ) : (
                  <span>Check the console for the index creation link.</span>
                )}
              </AlertDescription>
            </Alert>
          )}

        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <ScrollArea className="flex-grow p-4 h-full" ref={scrollAreaRef}>
            {comments.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>Belum ada komen nih, gass komen</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="rounded-lg bg-muted/40 p-4 transition-colors hover:bg-muted/60">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 border">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {getInitials(comment.username)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{comment.username}</p>
                            <p className="text-xs text-muted-foreground">
                              {comment.timestamp.toDate().toLocaleString()}
                            </p>
                          </div>
                          <p className="mt-2 whitespace-pre-wrap text-sm break-words w-full">{comment.text}</p>
                          <div className="flex items-center mt-2 gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-muted-foreground hover:text-foreground"
                              onClick={() => handleReply(comment.id)}
                            >
                              <CornerDownRightIcon className="mr-1 h-3 w-3" />
                              Balas
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                              onClick={() => openDeleteDialog(comment.id!, false)}
                            >
                              <Trash2Icon className="mr-1 h-3 w-3" />
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-8 pl-4 border-l space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="rounded-lg bg-background p-3 border">
                            <div className="flex items-start gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-secondary/50 text-secondary-foreground text-xs">
                                  {getInitials(reply.username)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-xs font-medium">{reply.username}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {reply.timestamp.toDate().toLocaleString()}
                                  </p>
                                </div>
                                <p className="mt-1 whitespace-pre-wrap text-xs break-words w-full">{reply.text}</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="mt-1 h-6 text-xs text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                                  onClick={() => openDeleteDialog(reply.id!, true, reply.parentId)}
                                >
                                  <Trash2Icon className="mr-1 h-3 w-3" />
                                  Hapus
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        <div className="p-4 border-t mt-auto">
            {replyingTo ? (
              <div className="mb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                  <CornerDownRightIcon className="h-3 w-3" />
                  <span>Balas Komentar</span>
                  <Button variant="ghost" size="icon" className="h-5 w-5 ml-auto" onClick={cancelReply}>
                    <XIcon className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : null}

            <form onSubmit={replyingTo ? handleSubmitReply : handleSubmitComment} className="flex gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder={replyingTo ? "Tulis Balasanmu..." : "Tulis Komentar...."}
                value={replyingTo ? replyText : newComment}
                onChange={(e) => (replyingTo ? setReplyText(e.target.value) : setNewComment(e.target.value))}
                className="flex-grow"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                size="icon"
                title={replyingTo ? "Send Reply" : "Send Comment"}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
                ) : (
                  <ArrowRightIcon className="h-5 w-5" />
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah kamu ingin menghapus pesan ini?</AlertDialogTitle>
            <AlertDialogDescription>
              {commentToDelete?.isReply
                ? "ini akan menghapus komentarmu"
                : "ini akan menghapus komentarmu dan semua balasan yang ada"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteComment}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full mr-2" />
                  Menghapus...
                </>
              ) : (
                "Hapus"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Comment