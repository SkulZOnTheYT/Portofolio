"use client"

import { useState } from "react"
import { CodeXml, Music, Gamepad2, Palette } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

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
      description: "Saya suka coding, saya suka menulis kode dan membuat aplikasi yang bermanfaat bagi orang lain.",
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
        className="text-4xl font-bold text-foreground mb-12 text-center"
      >
        Hobby Saya
      </motion.h2>

      <div className="flex space-x-6 justify-center flex-wrap">
      {hobbies.map((hobby, index) => (
        <TooltipProvider key={hobby.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                variants={iconVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setOpenModal(hobby.name)}
                  className="px-6 py-3 flex items-center space-x-2"
                >
                  <hobby.icon className="h-6 w-6" />
                  <span>{hobby.name}</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to learn more about {hobby.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>

      {hobbies.map((hobby) => (
        <Dialog key={hobby.name} open={openModal === hobby.name} onOpenChange={() => setOpenModal(undefined)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{hobby.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{hobby.description}</p>
              <Image
                src={hobby.image || "/placeholder.svg"}
                alt={`${hobby.name} hobby`}
                width={400}
                height={300}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <DialogFooter>
              <Button onClick={() => setOpenModal(undefined)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}