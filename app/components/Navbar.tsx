'use client';

import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, Drawer, Sidebar } from "flowbite-react";
import { HiOutlineCollection, HiOutlineExternalLink } from "react-icons/hi";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  
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
            src="https://avatars.githubusercontent.com/u/92020118?v=4"
            alt="Your Logo"
            width={50}
            height={50}
           />
          <span className="font-semibold text-xl tracking-tight italic">SkulZ</span>
        </Link>
        <Button onClick={handleOpen} className="md:hidden bg-transparent inline-flex items-center text-xs text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </Button>
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
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Collapse icon={HiOutlineCollection} label="Minecraft">
                      <Sidebar.Item>
                        <button
                          onClick={() => handleNavigation('/list')}
                          className="flex w-full items-center justify-center rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100"
                        >
                          List
                        </button>
                      </Sidebar.Item>
                      <Sidebar.Item>
                        <button
                          onClick={() => handleNavigation('/knz')}
                          className="flex w-full items-center justify-center rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100"
                        >
                          KNZ UI
                        </button>
                      </Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Item icon={HiOutlineExternalLink}>
                      <button
                        onClick={() => handleNavigation('/link')}
                        className="flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-700 hover:bg-gray-100"
                      >
                        LinkTree
                      </button>
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default Navbar;