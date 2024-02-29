"use client";

import React, { createContext, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export const cartProductPrice = (cartProduct) => {
  let price = cartProduct?.basePrice;
  if(cartProduct?.size){
    price += cartProduct?.size?.price || 0;
  }
  if(cartProduct?.extras?.length > 0){
    price += cartProduct?.extras?.reduce((acc,curr) => acc+(curr?.price || 0), 0);
  }
  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function saveCartProductToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductToLocalStorage(newProducts);
      return newProducts;
    });
    toast.success("Added to cart!");
  }

  function removeCartProducts(indexToRemove) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts?.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success("Product removed")
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductToLocalStorage([]);
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProducts,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
