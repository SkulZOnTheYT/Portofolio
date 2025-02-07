'use client'

import React from 'react'
import Image from 'next/image'
import Hobby from './component/Hobby'
import Comment from './component/Comment'
import { motion } from 'framer-motion'
import { Timeline } from "flowbite-react";
import { Calendar } from 'lucide-react';

const skills = [
  { name: 'JavaScript', level: 79.41 },
  { name: 'Python', level: 7.52 },
  { name: 'PHP', level: 5.89 },
  { name: 'TypeScript', level: 5.18 },
  { name: 'Java', level: 1.22 },
  { name: 'C#', level: 0.38 },
  { name: 'CSS', level: 0.27 },
  { name: 'ShaderLab', level: 0.12 },
]

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  showButton?: boolean;
  delay: number;
}

function TimelineItem({ date, title, description, delay }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Timeline.Item>
        <Timeline.Point icon={() => <Calendar />} />
        <Timeline.Content>
          <Timeline.Time>{date}</Timeline.Time>
          <Timeline.Title>{title}</Timeline.Title>
          <Timeline.Body>
            {description}
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
    </motion.div>
  );
}

export default function page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Image
            src="/skulz.jpg"
            alt="Foto Profil"
            width={200}
            height={200}
            className="rounded-full border-4 border-white shadow-lg mx-auto"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-bold mb-4"
        >
          SkulZeet
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-2xl"
        >
          Pengembang Web & Desainer UI/UX
        </motion.p>
      </div>
    </section>

    <section className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Tentang Saya
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl max-w-3xl mx-auto text-center"
        >
          Saya adalah seorang pengembang web dan desainer UI/UX yang bersemangat. 
          Dengan pengalaman lebih dari 1 tahun di industri ini, saya telah mengerjakan 
          berbagai proyek yang menantang dan menarik. Saya selalu berusaha untuk 
          menciptakan solusi yang inovatif dan user-friendly.
        </motion.p>
      </div>
    </section>

    <section className="py-20 bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Keterampilan
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          {skills.map((skill, index) => (
            <div key={skill.name} className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-lg font-semibold">{skill.name}</span>
                <span className="text-lg font-semibold">{skill.level}%</span>
              </div>
              <motion.div
                className="h-4 bg-gray-300 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <motion.div
                  className="h-full bg-indigo-600 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Karena terlalu panjang jadi saya pisah */}
    <Hobby />

    <section className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          My Journey
        </motion.h2>
        <div className="max-w-4xl mx-auto">
          <Timeline>
            <TimelineItem
              date="Februari 2023"
              title="saya mulai berkenakalan dengan dunia pemrograman, yaitu PHP" 
              description="Tujuan saya terjun kedunia pemrograman adalah tertarik dengan cara kerja plugin minecraft yang saya gunakan"
              showButton
              delay={0.2}
            />
            <TimelineItem
              date="Agustus 2024"
              title="Memulai terjun kedunia pemrograman Web & React"
              description="Setelah saya menghabiskan waktu 1 Tahun denggan PHP, saya memutuskan untuk belajar Web & React"
              delay={0.4}
            />
            <TimelineItem
              date="Oktober 2024"
              title="Mulai belajar TypeScript & Frontend Framework"
              description="sebelumnya hanya tertarik, pada masa ini saya mulai menekuni belajar frontend framework"
              delay={0.6}
            />
            <TimelineItem
              date="Desember 2024"
              title="memulai terjun kebackend untuk menjadi fullstack developer"
              description="Setelah saya merasa cukup dengan frontend, saya memutuskan untuk belajar backend"
              delay={0.8}
            />
          </Timeline>
        </div>
        <section className="py-20 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Comments
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <Comment />
          </div>
        </div>
      </section>
      </div>
    </section>
    </main>
  )
}