"use client"

import { SessionProvider } from "next-auth/react"
import type React from "react"

export function Provider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}