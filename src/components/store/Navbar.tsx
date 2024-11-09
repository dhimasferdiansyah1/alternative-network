// components/StoreNavbar.jsx
"use client";
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LoginModal from "./LoginModal";
import CartModal from "./CartModal";
import UsernameContext from "@/context/Username";
import { CartContext } from "@/context/Cart";
import { usePathname } from "next/navigation";

export interface StoreItem {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface CartItem extends StoreItem {
  quantity: number;
}

interface StoreNavbarProps {
  onOpenCart?: () => void;
  onOpenLogin?: () => void;
}

const Navbar: React.FC<StoreNavbarProps> = ({ onOpenLogin }) => {
  const pathname = usePathname();
  const isPrivacyPolicyPage = pathname === "/store/privacy-policy";
  const isPaymentStatusPage = pathname.startsWith("/store/payment-status");
  const isHowToBuyPage = pathname.startsWith("/store/how-to-buy");
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { username, setUsername } = useContext(UsernameContext);
  const [showCartModal, setShowCartModal] = useState(false);
  const { cartItems } = useContext(CartContext);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem("username");

    // Hapus status is cracked
    localStorage.removeItem("isCracked");
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showStoreLink =
    isPrivacyPolicyPage || isPaymentStatusPage || isHowToBuyPage;
  const showOtherLinks =
    !isPrivacyPolicyPage && !isPaymentStatusPage && !isHowToBuyPage;

  return (
    <>
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

          <div className="hidden md:flex items-center space-x-6">
            {showStoreLink && (
              <Link
                href="/store"
                className="flex items-center bg-amber-400 hover:brightness-105 duration-150 px-4 py-2 rounded text-neutral-900"
              >
                <ShoppingCart className="mr-2" size={18} />
                Store
              </Link>
            )}
            {showOtherLinks && (
              <>
                {username ? (
                  <>
                    <span className="text-white mr-4">Welcome, {username}</span>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 flex gap-2 items-center text-white px-4 py-2 rounded-md hover:brightness-105 transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onOpenLogin}
                    className="bg-neutral-700 text-white px-4 py-2 rounded-md hover:brightness-105 transition-colors duration-200"
                  >
                    Login
                  </button>
                )}
                {cartItems && (
                  <button
                    onClick={() => setShowCartModal(true)}
                    className="bg-gradient-to-b from-yellow-300 to-yellow-400 text-neutral-800 flex items-center gap-2 rounded-md px-4 py-2 hover:brightness-105 transition-colors duration-200"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" /> Cart (
                    {cartItems.length})
                  </button>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>
        </div>{" "}
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
                {isPrivacyPolicyPage && (
                  <Link
                    onClick={() => {
                      closeMenu();
                    }}
                    href="/store"
                    className="flex items-center bg-amber-400 hover:brightness-105 duration-150 px-4 py-2 rounded text-neutral-900"
                  >
                    <ShoppingCart className="mr-2" size={18} />
                    Store
                  </Link>
                )}
                {!isPrivacyPolicyPage && (
                  <>
                    {username ? (
                      <>
                        <span className="text-white mr-4">
                          Welcome, {username}
                        </span>
                        <button
                          onClick={handleLogout}
                          className="bg-red-500 flex gap-2 items-center text-white px-4 py-2 rounded-md hover:brightness-105 transition-colors duration-200"
                        >
                          <LogOut className="w-5 h-5 mr-2" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          if (onOpenLogin) {
                            onOpenLogin();
                          }
                          closeMenu();
                        }}
                        className="bg-neutral-700 text-white px-4 py-2 rounded-md hover:brightness-105 transition-colors duration-200"
                      >
                        Login
                      </button>
                    )}
                    {cartItems && (
                      <button
                        onClick={() => {
                          setShowCartModal(true);
                          closeMenu();
                        }}
                        className="bg-gradient-to-b from-amber-300 to-amber-400 text-neutral-800 flex items-center gap-2 rounded-md px-4 py-2 hover:brightness-105 transition-colors duration-200"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" /> Cart (
                        {cartItems.length})
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        items={cartItems}
        updateCartItems={() => {}}
      />
    </>
  );
};

export default Navbar;
