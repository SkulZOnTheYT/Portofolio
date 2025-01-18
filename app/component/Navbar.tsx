'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Drawer, Sidebar } from "flowbite-react";
import { Home, ShoppingBag, LogIn } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const router = useRouter();

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        setIsClicked(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  const handleNavigation = (path: string) => {
    router.push(path);
    handleClose();
  };

  return (
  <>
    <nav className="sticky top-0 z-50 bg-white shadow-md border-gray-200 px-2 sm:px-4 rounded dark:bg-gray-900">
      <div className="container py-2 flex flex-wrap justify-between items-center mx-auto px-4">
        <Link href="https://github.com/SkulZOnTheYT" className="flex items-center gap-3">
          <Image
            src="/skulz.jpg"
            alt="Your Logo"
            width={50}
            height={50}
           />
          <span className="font-semibold text-xl tracking-tight italic">SkulZ</span>
        </Link>
        <button onClick={handleOpen} className="relative group md:hidden">
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
    <Drawer open={isOpen} onClose={handleClose} className="mt-14 w-72">
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-6 ml-6">
                <Sidebar.Items>
                  <button onClick={() => handleNavigation('/')} className="flex items-center space-x-4 mb-8 text-gray-700 text-lg hover:text-blue-700 transition-colors">
                    <Home size={24} />
                    <span>Home</span>
                  </button>
                  <button onClick={() => handleNavigation('/store')} className="flex items-center space-x-4 mb-8 text-gray-700 text-lg hover:text-blue-700 transition-colors">
                    <ShoppingBag size={24} />
                    <span>Store</span>
                  </button>
                  <button onClick={() => handleNavigation('/login')} className="flex items-center space-x-4 text-gray-700 text-lg hover:text-blue-700 transition-colors">
                    <LogIn size={24} />
                    <span>Login</span>
                  </button>
                </Sidebar.Items>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default Navbar;