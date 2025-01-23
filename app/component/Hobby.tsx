"use client"

import React, { useState } from "react"
import { Button, Modal, Tooltip } from "flowbite-react"
import { CodeXml, Music, Gamepad2, Palette } from "lucide-react"
import { motion } from "framer-motion"

export default function HobbyModals() {
  const [openModal, setOpenModal] = useState<string | undefined>()

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  }

  const hobbies = [
    {
      name: "Coding",
      icon: CodeXml,
      description:
        "Saya suka coding, saya suka menulis kode dan membuat aplikasi yang bermanfaat bagi orang lain.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Musik",
      icon: Music,
      description: "Saya suka mendengarkan musik, musik adalah teman terbaik saya ketika sedang bekerja.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Gaming",
      icon: Gamepad2,
      description: "Hobi saya bermain game, khususnya game Mobile Legends dan Free Fire.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      name: "Design",
      icon: Palette,
      description:
        "Salah satu hobi saya adalah design, saya suka membuat desain grafis dan eksplorasi warna dan bentuk.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="space-y-6 p-6 py-20">
      <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Hobby Saya</motion.h2>

      <div className="flex space-x-4 justify-center">
        {hobbies.map((hobby, index) => (
          <Tooltip key={hobby.name} content={hobby.name}>
            <motion.div
              variants={iconVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Button onClick={() => setOpenModal(hobby.name)} className="p-2">
                <hobby.icon className="h-6 w-6" />
              </Button>
            </motion.div>
          </Tooltip>
        ))}
      </div>

      {hobbies.map((hobby) => (
        <Modal key={hobby.name} show={openModal === hobby.name} onClose={() => setOpenModal(undefined)}>
          <Modal.Header>{hobby.name}</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">{hobby.description}</p>
              <img
                src={hobby.image || "/placeholder.svg"}
                alt={`${hobby.name} hobby`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(undefined)}>Close</Button>
          </Modal.Footer>
        </Modal>
      ))}
    </div>
  )
}