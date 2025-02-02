// @a/components/store/CartModal
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Trash } from "lucide-react";
import { useContext, useState } from "react";
import UsernameContext from "@/context/Username";
import { CartContext, CartItems } from "@/context/Cart";

interface CartModalProps {
  isOpen: boolean;

  onClose: () => void;

  items: CartItems[];

  updateCartItems: (updatedItems: CartItems[]) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const {
    cartItems = [],
    updateCartItemQuantity,
    selectedCurrency,
    convertAndFormatCurrency,
  } = useContext(CartContext);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameValid, setUsernameValid] = useState<boolean | null>(null);
  const { username } = useContext(UsernameContext);

  // const exchangeRates: Record<string, number> = {
  //   USD: 1,
  //   EUR: 0.92,
  //   IDR: 15000,
  //   GBP: 0.8,
  //   JPY: 145,
  //   CAD: 1.35,
  //   AUD: 1.53,
  //   CHF: 0.88,
  //   CNY: 7.25,
  // };

  // const convertCurrency = (value: number, currency: string) => {
  //   return value * exchangeRates[currency];
  // };

  // const calculateCartCheckoutTotal = () => {
  //   return cartItems.reduce((total, item) => {
  //     const convertedPrice = convertCurrency(item.price, selectedCurrency);
  //     return total + convertedPrice * item.quantity;
  //   }, 0);
  // };

  const calculateCartModalTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleUpdateCartItemQuantity = (
    itemId: number,
    newQuantity: number
  ) => {
    updateCartItemQuantity(itemId, newQuantity);
  };

  const handleCheckout = async () => {
    if (!username) {
      setCheckoutError("Please set a username first.");
      return;
    }

    // Periksa status Cracked dari localStorage
    const isCracked = localStorage.getItem("isCracked") === "true";

    // Jika bukan akun Cracked, lakukan pengecekan username
    if (!isCracked) {
      setIsCheckingUsername(true);
      setUsernameValid(null);
      setCheckoutError(null);

      try {
        // Validasi username Minecraft
        const validationResponse = await fetch(
          `/api/check-minecraft-username?username=${encodeURIComponent(
            username
          )}`
        );

        if (!validationResponse.ok) {
          const errorData = await validationResponse.json();
          throw new Error(errorData.error || "Invalid username.");
        }

        const validationData = await validationResponse.json();
        if (validationData && !validationData.error) {
          setUsernameValid(true);
          await processCheckout();
        }
      } catch (error) {
        console.error("Checkout error:", error);
        if (error instanceof Error) {
          setUsernameValid(false);
          setCheckoutError(
            error.message || "An error occurred during checkout."
          );
        } else {
          setCheckoutError("An unknown error occurred during checkout");
        }
      } finally {
        setIsCheckingUsername(false);
      }
    } else {
      // Jika akun Cracked, langsung proses checkout
      await processCheckout();
    }
  };

  // Ekstrak logika checkout ke fungsi terpisah
  const processCheckout = async () => {
    setIsProcessingPayment(true);
    setCheckoutError(null);

    try {
      const orderId = "ORDER-" + Date.now();

      // Simpan item yang dipilih ke localStorage
      localStorage.setItem(
        "selectedItems",
        JSON.stringify(
          cartItems.map((item) => ({
            ...item,
            quantity: item.quantity,
          }))
        )
      );
      localStorage.setItem("orderId", orderId);

      const response = await fetch("/api/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          username,
          items: cartItems.map((item) => ({
            id: item.id,
            price: item.price,
            quantity: item.quantity,
            name: item.name,
          })),
        }),
      });

      const paymentData = await response.json();

      if (!response.ok) {
        throw new Error(paymentData.error || "Failed to create payment");
      }

      if (paymentData.redirect_url) {
        window.location.href = paymentData.redirect_url;
      } else {
        throw new Error("Failed to get payment URL");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      if (error instanceof Error) {
        setCheckoutError(error.message || "An error occurred during checkout.");
      } else {
        setCheckoutError("An unknown error occurred during checkout");
      }
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            if ((e.target as HTMLElement).classList.contains("fixed")) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            {...{
              className:
                "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center",
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              {...{
                className:
                  "bg-neutral-800 rounded-lg p-8 w-full max-w-md overflow-y-auto max-h-[80vh] relative",
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Your Cart</h2>

              {/* Cart Total */}
              {Array.isArray(cartItems) && cartItems.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mt-4 border-t border-neutral-700 py-4">
                    <span className="text-white font-medium">Total:</span>
                    <span className="text-yellow-500 text-lg">
                      {convertAndFormatCurrency(
                        calculateCartModalTotal(),
                        selectedCurrency
                      )}
                    </span>
                  </div>
                  <ul>
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between mb-2"
                      >
                        {/* ... item rendering */}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-white">Your cart is empty.</p>
              )}
              <ul>
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between mb-2"
                  >
                    <div>
                      <p className="text-white">{item.name}</p>
                      <p className="text-gray-400 text-sm">
                        {convertAndFormatCurrency(item.price, selectedCurrency)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleUpdateCartItemQuantity(item.id, 0)} // Pass 0 to remove
                        className="text-red-100 hover:bg-opacity-90 bg-red-500 p-2 rounded-md mr-4"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateCartItemQuantity(
                            item.id,
                            item.quantity - 1
                          );
                        }}
                        className="bg-neutral-600 hover:bg-neutral-500 text-white rounded-md px-2 py-1 text-sm w-8 h-8 flex items-center justify-center"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2 text-white w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateCartItemQuantity(
                            item.id,
                            item.quantity + 1
                          );
                        }}
                        className="bg-neutral-600 hover:bg-neutral-500 text-white rounded-md px-2 py-1 text-sm w-8 h-8 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between">
                <button
                  onClick={onClose}
                  className="mt-4 bg-neutral-700 text-neutral-100 rounded-md px-4 py-2 hover:brightness-105 transition-colors duration-200"
                >
                  Close Cart
                </button>
                {cartItems && cartItems.length > 0 && (
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingUsername || isProcessingPayment}
                    className="mt-4 bg-gradient-to-b from-amber-300 to-amber-400 text-neutral-800 rounded-md px-4 py-2 hover:brightness-105 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isCheckingUsername
                      ? "Checking Username..."
                      : isProcessingPayment
                      ? "Processing Payment..."
                      : "Checkout with QRIS"}
                  </button>
                )}
              </div>

              {checkoutError && (
                <p className="text-red-500 text-sm mt-2">{checkoutError}</p>
              )}

              {usernameValid === true && (
                <p className="text-green-500 text-sm mt-2">
                  Your username is valid!
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
