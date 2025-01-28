"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      {...{ className: "fixed top-0 left-0 right-0 z-50 py-4 w-full" }}
      initial={{ backgroundColor: "rgba(23, 23, 23, 0)" }}
      animate={{
        backgroundColor: hasScrolled
          ? "rgba(23, 23, 23, 1)"
          : "rgba(23, 23, 23, 0)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center px-4 sm:px-10">
        <div className="flex items-center">
          <Link
            href="/"
            className="font-semibold text-white flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="Alt World Logo"
              width={40}
              height={40}
            />
            Alternative World
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="#what-is-alternative-world"
            className="text-white hover:text-gray-300"
          >
            What is Alternative World
          </Link>
          <Link href="#how-to-join" className="text-white hover:text-gray-300">
            How to join
          </Link>
          <Link href="#discord" className="text-white hover:text-gray-300">
            Discord
          </Link>
          <Link href="#faq" className="text-white hover:text-gray-300">
            FAQ
          </Link>
          <Link href="#rules" className="text-white hover:text-gray-300">
            Rules
          </Link>
          <Link
            href="/store"
            className="flex items-center bg-amber-400 hover:brightness-105 duration-150 px-4 py-2 rounded text-neutral-900"
          >
            <ShoppingCart className="mr-2" size={18} />
            Store
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            {...{ className: "md:hidden bg-neutral-900 rounded-md" }}
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link
                onClick={closeMenu}
                href="#what-is-alternative-world"
                className="text-white hover:text-gray-300"
              >
                What is Alternative World
              </Link>
              <Link
                onClick={closeMenu}
                href="#how-to-join"
                className="text-white hover:text-gray-300"
              >
                How to join
              </Link>
              <Link
                onClick={closeMenu}
                href="#discord"
                className="text-white hover:text-gray-300"
              >
                Discord
              </Link>
              <Link
                onClick={closeMenu}
                href="#faq"
                className="text-white hover:text-gray-300"
              >
                FAQ
              </Link>
              <Link
                onClick={closeMenu}
                href="#rules"
                className="text-white hover:text-gray-300"
              >
                Rules
              </Link>
              <Link
                href="/store"
                className="flex items-center bg-amber-400 hover:brightness-105 px-4 py-2 rounded text-neutral-900"
              >
                <ShoppingCart className="mr-2" size={18} />
                Store
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
