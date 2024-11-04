import { createContext } from "react";

export interface CartItems {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItems[];
  addToCart: (item: CartItems) => void;
  updateCartItemQuantity: (itemId: number, newQuantity: number) => void;
  selectedCurrency: string;
  convertAndFormatCurrency: (value: number, currency: string) => string;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  updateCartItemQuantity: () => {},
  selectedCurrency: "IDR",
  convertAndFormatCurrency: () => "",
});
