"use client"

import React, { useState } from 'react'

interface Note {
  id: number
  title: string
  content: string
}

export default function SimpleNoteApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const addNote = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      const newNote: Note = {
        id: Date.now(),
        title: title,
        content: content
      }
      setNotes([...notes, newNote])
      setTitle('')
      setContent('')
    }
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Aplikasi Catatan</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded-sm"
        />
        <textarea
          placeholder="Isi catatan"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-2 border rounded-sm"
        />
        <button 
          onClick={addNote}
          className="bg-black text-white px-4 py-2 rounded-sm hover:bg-blue-600"
        >
          Tambah Catatan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="border p-4 rounded-sm shadow-sm">
            <h2 className="text-xl font-bold mb-2">{note.title}</h2>
            <p className="mb-4">{note.content}</p>
            <button 
              onClick={() => deleteNote(note.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

