import React from "react"
import Image from "next/image"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth"
import { redirect } from "next/navigation"
import { Metadata } from "next"

export const metadata : Metadata = {
  title: 'Dashboard',
}

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/login")

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <Image
            src={session.user.image || "/default-profile.png"}
            alt="Foto Profil"
            width={200}
            height={200}
            className="rounded-full border-4 border-white shadow-lg mx-auto"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4">
          {session.user.name}
        </h1>
        <p className="text-2xl"
        >
          {session.user.email}
        </p>
      </div>
    </section>
  )
}

export default DashboardPage