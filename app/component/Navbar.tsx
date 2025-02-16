"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Home, ShoppingBag, LogIn, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b">
      <div className="container py-2 flex items-center justify-between">
        <Link href="https://github.com/SkulZOnTheYT" className="flex items-center gap-3 ml-4">
          <Image src="/skulz.jpg" alt="Your Logo" width={50} height={50} className="rounded-full" />
          <span className="font-semibold text-xl tracking-tight italic">SkulZ</span>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden mr-6">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>
                <VisuallyHidden>Navigation Menu</VisuallyHidden>
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-full py-6 pl-6">
              <button
                onClick={() => handleNavigation("/")}
                className="flex items-center space-x-8 mb-8 text-foreground hover:text-primary transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNavigation("/store")}
                className="flex items-center space-x-8 mb-8 text-foreground hover:text-primary transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Store</span>
              </button>
              <button
                onClick={() => handleNavigation("/login")}
                className="flex items-center space-x-8 text-foreground hover:text-primary transition-colors"
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </button>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/store">Store</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar