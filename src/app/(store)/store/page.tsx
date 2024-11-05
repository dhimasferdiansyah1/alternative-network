// pages/store/Store.jsx  (or wherever your store page is located)
"use client";
import { useState, useEffect, useCallback, SetStateAction } from "react";
import Navbar, { StoreItem } from "@/components/store/Navbar";
import Image from "next/image";
import CartModal from "@/components/store/CartModal";
import UsernameContext from "@/context/Username";
import LoginModal from "@/components/store/LoginModal";
import { motion } from "framer-motion";
import { CartContext, CartItems } from "@/context/Cart";
import Link from "next/link";
import { HelpCircle, Sparkles } from "lucide-react";

export default function Store() {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("IDR");
  const [username, setUsername] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const storedCartItems = localStorage.getItem("cartItems");

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        const parsedItems = JSON.parse(storedCartItems);
        setCartItems(Array.isArray(parsedItems) ? parsedItems : []);
      } catch (error) {
        console.error("Error parsing stored cart items:", error);
        setCartItems([]);
      }
    }
  }, []);

  const handleAddToCart = (item: StoreItem) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    setShowCartModal(true);
  };

  const updateCartItemQuantity = useCallback(
    (itemId: number, newQuantity: number) => {
      setCartItems((prevItems) => {
        if (!Array.isArray(prevItems)) {
          console.error("cartItems is not an array:", prevItems);
          return [];
        }
        const updatedItems = prevItems.map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item
        );
        return updatedItems.filter((item) => item.quantity > 0);
      });
    },
    []
  );

  const handleUpdateCartItemQuantity = (
    updatedItems: SetStateAction<CartItems[]>
  ) => {
    setCartItems(updatedItems);
  };

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(value);
  };

  const currencies = [
    "USD",
    "EUR",
    "IDR",
    "GBP",
    "JPY",
    "CAD",
    "AUD",
    "CHF",
    "CNY",
  ];

  const exchangeRates: Record<string, number> = {
    IDR: 1,
    USD: 1 / 15682,
    EUR: 1 / 17045,
    GBP: 1 / 19602,
    JPY: 1 / 108,
    CAD: 1 / 11616,
    AUD: 1 / 10249,
    CHF: 1 / 17819,
    CNY: 1 / 2163,
  };

  const convertAndFormatCurrency = (value: number, currency: string) => {
    if (currency === "IDR") {
      return formatCurrency(value, currency);
    }
    const convertedValue = value * exchangeRates[currency];
    return formatCurrency(convertedValue, currency);
  };

  const contextValue = {
    cartItems,
    addToCart: handleAddToCart,
    updateCartItemQuantity,
    selectedCurrency,
    convertAndFormatCurrency,
  };

  useEffect(() => {
    console.log("Current cartItems:", cartItems);
  }, [cartItems]);

  const altCoins: StoreItem[] = [
    {
      id: 1,
      name: "150 Alt Coin",
      image: "/alt-coin.png",
      price: 15000,
    },
    {
      id: 2,
      name: "1000 Alt Coin",
      image: "/alt-coin.png",
      price: 75000,
    },
    {
      id: 3,
      name: "2000 Alt Coin",
      image: "/alt-coin.png",
      price: 150000,
    },
    {
      id: 4,
      name: "5000 Alt Coin",
      image: "/alt-coin.png",
      price: 350000,
    },
    {
      id: 5,
      name: "11000 Alt Coin",
      image: "/alt-coin.png",
      price: 700000,
    },
  ];

  const rubyAlts: StoreItem[] = [
    {
      id: 6,
      name: "200 Ruby",
      image: "/alt-ruby.png",
      price: 19900,
    },
    {
      id: 7,
      name: "400 Ruby",
      image: "/alt-ruby.png",
      price: 39900,
    },
    {
      id: 8,
      name: "700 Ruby",
      image: "/alt-ruby.png",
      price: 69900,
    },
    {
      id: 9,
      name: "1200 Ruby",
      image: "/alt-ruby.png",
      price: 119900,
    },
    {
      id: 10,
      name: "1700 Ruby",
      image: "/alt-ruby.png",
      price: 169900,
    },
    {
      id: 11,
      name: "2000 Ruby",
      image: "/alt-ruby.png",
      price: 199900,
    },
    {
      id: 12,
      name: "4000 Ruby",
      image: "/alt-ruby.png",
      price: 399900,
    },
    {
      id: 13,
      name: "6000 Ruby",
      image: "/alt-ruby.png",
      price: 600000,
    },
  ];

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      <CartContext.Provider value={contextValue}>
        <div className="bg-neutral-900 min-h-screen py-24 flex flex-col justify-center items-center">
          <Navbar
            onOpenCart={() => setShowCartModal(true)}
            onOpenLogin={() => setShowLoginModal(true)}
          />
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          />
          <CartModal
            isOpen={showCartModal}
            onClose={() => setShowCartModal(false)}
            items={cartItems}
            updateCartItems={handleUpdateCartItemQuantity}
          />

          {/* Badge beta version app */}
          <div className="brightness-125 flex text-sm items-center gap-2 bg-gradient-to-l from-purple-500 via-fuchsia-600 to-pink-700 rounded-full text-white px-4 py-1.5 mb-4">
            Tahap Uji Coba
            <Sparkles size={24} />
          </div>

          <div className="mb-4 flex justify-between items-center px-4 sm:px-10 w-full">
            <h1 className="text-3xl font-bold text-white text-center w-full">
              Alternative World Store
            </h1>
          </div>

          {/* Currency Selection */}
          <div className="mb-4 flex flex-wrap gap-4 px-4 justify-center items-center py-4">
            <p className="text-xl font-medium text-neutral-400">
              Translate prices to :
            </p>
            {currencies.map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency)}
                className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm text-white ${
                  selectedCurrency === currency
                    ? "bg-gradient-to-r from-yellow-600 to-yellow-400 text-neutral-800"
                    : "bg-gradient-to-r from-neutral-800 to-neutral-700 hover:bg-neutral-700"
                }`}
              >
                {currency}
                <Image
                  src={`/flags/${currency.toLowerCase()}.png`}
                  alt={currency}
                  width={24}
                  height={24}
                />
              </button>
            ))}
          </div>

          {/* How To Buy Section */}
          <Link
            href="/store/how-to-buy"
            className="flex items-center gap-2 text-white bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-md"
          >
            Baca tahapan cara membeli <HelpCircle size={24} />
          </Link>

          {/* Alt Coins Group */}
          <div className="w-full px-4 sm:px-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              Alt Coins
              <Image
                src="/alt-coin.png"
                alt="Alt Coin"
                width={50}
                height={50}
              />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {altCoins.map((item) => (
                <StoreItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                  selectedCurrency={selectedCurrency}
                  convertAndFormatCurrency={convertAndFormatCurrency}
                />
              ))}
            </div>
          </div>

          {/* Ruby Alts Group */}
          <div className="w-full px-4 sm:px-10 mt-12">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              Ruby Alts
              <Image src="/alt-ruby.png" alt="Ruby" width={50} height={50} />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {rubyAlts.map((item) => (
                <StoreItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                  selectedCurrency={selectedCurrency}
                  convertAndFormatCurrency={convertAndFormatCurrency}
                />
              ))}
            </div>
          </div>
        </div>
      </CartContext.Provider>
    </UsernameContext.Provider>
  );
}

const StoreItemCard = ({
  item,
  onAddToCart,
  selectedCurrency,
  convertAndFormatCurrency,
}: {
  item: StoreItem;
  onAddToCart: (item: StoreItem) => void;
  selectedCurrency: string;
  convertAndFormatCurrency: (value: number, currency: string) => string;
}) => {
  return (
    <div onClick={() => onAddToCart(item)}>
      <motion.div
        key={item.id}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        {...{
          className:
            "rounded-lg p-4 bg-gradient-to-t from-neutral-700/60 to-neutral-800/60 hover:cursor-pointer",
        }}
      >
        <div className="flex justify-center items-center">
          <Image
            src={item.image}
            alt={item.name}
            width={200}
            height={200}
            className="rounded-md object-cover"
          />
        </div>
        <h3 className="text-lg font-medium text-white mt-4">{item.name}</h3>

        <p className="text-yellow-500 mt-2">
          {convertAndFormatCurrency(item.price, selectedCurrency)}
        </p>
      </motion.div>
    </div>
  );
};
