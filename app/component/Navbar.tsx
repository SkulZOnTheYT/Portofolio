'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Home, ShoppingBag, LogIn } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        setIsClicked(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isClicked]);
  return (
  <DrawerRoot size="xs">
    <DrawerBackdrop />
    <nav className="sticky top-0 z-50 bg-white shadow-md border-gray-200 px-2 sm:px-4 rounded dark:bg-gray-900">
      <div className="container py-2 flex flex-wrap justify-between items-center mx-auto px-4">
        <Link href="https://github.com/SkulZOnTheYT" className="flex items-center gap-3">
          <Image
            src="https://avatars.githubusercontent.com/u/92020118?v=4"
            alt="Your Logo"
            width={50}
            height={50}
           />
          <span className="font-semibold text-xl tracking-tight italic">SkulZ</span>
        </Link>
        <DrawerTrigger asChild>
        <button className="relative group md:hidden">
          <div className={`relative flex overflow-hidden items-center justify-center rounded-lg w-10 h-10 transform transition-all bg-transparent border-2 border-gray-300 ${isClicked ? 'border-[4px]' : 'hover:border-[4px]'} border-opacity-30 duration-200 shadow-sm cursor-pointer`} onClick={() => setIsClicked(true)}>
            <div className="flex flex-col justify-between w-3 h-3 transform transition-all duration-300 origin-center overflow-hidden">
              <div className={`bg-slate-700 h-[1px] w-3 transform transition-all duration-300 origin-left ${isClicked ? 'translate-x-1.5' : ''}`}></div>
              <div className={`bg-slate-700 h-[1px] w-3 rounded transform transition-all duration-300 ${isClicked ? 'translate-x-1.5' : ''} delay-75`}></div>
              <div className={`bg-slate-700 h-[1px] w-3 transform transition-all duration-300 origin-left ${isClicked ? 'translate-x-1.5' : ''} delay-150`}></div>

              <div className={`absolute items-center justify-between transform transition-all duration-500 top-0.75 ${isClicked ? 'translate-x-0 w-3.5' : '-translate-x-1.5 w-0'} flex`}>
                <div className={`absolute bg-slate-700 h-[1px] w-2 transform transition-all duration-500 ${isClicked ? 'rotate-45' : 'rotate-0'} delay-300`}></div>
                <div className={`absolute bg-slate-700 h-[1px] w-2 transform transition-all duration-500 ${isClicked ? '-rotate-45' : 'rotate-0'} delay-300`}></div>
              </div>
            </div>
          </div>
        </button>
        </DrawerTrigger>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/" className="block py-2 mt-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</Link>
            </li>
            <li>
              <Link href="/store" className="block py-2 mt-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Store</Link>
            </li>
            <li>
              <Link href="/login" className="block py-2 bg-transparent border border-black hover:bg-sky-500 hover:border-sky-500 hover:text-white text-gray-700 px-4 rounded-full">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <DrawerContent offset={4} rounded="md">
      <DrawerCloseTrigger />
      <DrawerHeader>
        <DrawerTitle>Menu</DrawerTitle>
      </DrawerHeader>
      <DrawerBody className="p-4 pb-0">
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex items-center ml-6 space-x-2 text-gray-700 hover:text-blue-700 transition-colors">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link href="/store" className="flex items-center ml-6 space-x-2 text-gray-700 hover:text-blue-700 transition-colors">
            <ShoppingBag size={20} />
            <span>Store</span>
          </Link>
          <Link href="/login" className="flex items-center ml-6 space-x-2 text-gray-700 hover:text-blue-700 transition-colors">
            <LogIn size={20} />
            <span>Login</span>
          </Link>
        </div>
      </DrawerBody>
      <DrawerFooter className="p-4 text-center text-sm text-gray-500 border-t border-gray-200">
        © 2024 SkulZ. All rights reserved.
      </DrawerFooter>
  </DrawerContent>
    </DrawerRoot>
  );
};

export default Navbar;