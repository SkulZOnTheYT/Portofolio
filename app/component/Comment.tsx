"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore"
import { db } from "../firebase"
import { Button, TextInput, Card } from "flowbite-react"
import { ArrowRightIcon } from "lucide-react"

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
  const commentsContainerRef = useRef<null | HTMLDivElement>(null)
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
  }, []) // Removed generateAnonymousUsername from dependencies

  useEffect(() => {
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

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const chatContainer = commentsContainerRef.current

    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [comments])

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent the default form submission
    if (newComment.trim() === "") return

    try {
      await addDoc(collection(db, "comments"), {
        text: newComment,
        timestamp: Timestamp.now(),
        username: username,
      })

      setNewComment("") // Reset the input field
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

  return (
    <div className="max-w-2xl mx-auto p-4 w-full" data-chat-component="true">
      <Card className="p-4 mb-4 h-[500px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold font-poppins">Anonymous Chat</h2>
            <p className="text-sm text-gray-500 font-poppins">Your username: {username}</p>
          </div>
        </div>

        <div ref={commentsContainerRef} className="grow overflow-y-auto overflow-x-hidden pr-2">
          <ul className="flex flex-col-reverse gap-2">
            {comments.map((comment) => (
              <li key={comment.id} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                <p className="font-poppins whitespace-pre-wrap">{formatLongText(comment.text)}</p>
                <p className="text-sm text-gray-500 font-poppins mt-1">
                  {comment.username} - {comment.timestamp.toDate().toLocaleString()}
                </p>
              </li>
            ))}
            <div ref={commentsEndRef} />
          </ul>
        </div>

        <form onSubmit={handleSubmitComment} className="flex gap-2 mt-4">
          <TextInput
            type="text"
            placeholder="Message..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="grow font-poppins"
          />
          <Button type="submit" color="light" title="Send Your Message...">
            <ArrowRightIcon className="h-5 w-5" />
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Comment