"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore"
import { signInAnonymously, onAuthStateChanged } from "firebase/auth"
import { db, auth } from "../firebase"
import { ArrowRightIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Comment {
  id?: string
  text: string
  timestamp: Timestamp
  username: string
}

const Comment: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const commentsEndRef = useRef<null | HTMLDivElement>(null)

  const generateAnonymousUsername = () => {
    const adjectives = ["Mysterious", "Silent", "Wandering", "Curious", "Shadowy"]
    const nouns = ["Stranger", "Traveler", "Whisper", "Ghost", "Shadow"]
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
    return `${randomAdjective} ${randomNoun}`
  }

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

    return () => unsubscribe()
  }, []) //Fixed: Removed generateAnonymousUsername from dependencies

  const initializeFirestoreListeners = () => {
    const commentsRef = collection(db, "comments")
    const q = query(commentsRef, orderBy("timestamp", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Comment,
      )

      setComments(fetchedComments)
    })

    return unsubscribe
  }

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [commentsEndRef]) //Fixed: Removed comments from dependencies

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newComment.trim() === "" || !isAuthenticated) return

    try {
      await addDoc(collection(db, "comments"), {
        text: newComment,
        timestamp: Timestamp.now(),
        username: username,
      })

      setNewComment("")
    } catch (error) {
      console.error("Error adding comment: ", error)
    }
  }

  const formatLongText = (text: string, maxLineLength = 15) => {
    const words = text.split(" ")
    let formattedText = ""
    let currentLine = ""

    words.forEach((word) => {
      if ((currentLine + word).length > maxLineLength) {
        formattedText += currentLine.trim() + "\n"
        currentLine = word + " "
      } else {
        currentLine += word + " "
      }
    })

    formattedText += currentLine.trim()
    return formattedText
  }

  if (!isAuthenticated) {
    return <div>Authenticating...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-4 w-full" data-chat-component="true">
      <Card className="h-[500px] flex flex-col">
        <CardHeader>
          <CardTitle>Anonymous Chat</CardTitle>
          <p className="text-sm text-muted-foreground">Your username: {username}</p>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <ScrollArea className="flex-grow">
            <ul className="flex flex-col-reverse gap-2">
              {comments.map((comment) => (
                <li key={comment.id} className="rounded-lg border p-3">
                  <p className="whitespace-pre-wrap">{formatLongText(comment.text)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {comment.username} - {comment.timestamp.toDate().toLocaleString()}
                  </p>
                </li>
              ))}
              <div ref={commentsEndRef} />
            </ul>
          </ScrollArea>
          <form onSubmit={handleSubmitComment} className="flex gap-2 mt-4">
            <Input
              type="text"
              placeholder="Message..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="icon" title="Send Your Message...">
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Comment