"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
const CartCount = () => {
  const { cartCount } = useAuth();
  if (cartCount === 0 || !cartCount) return null;
  return (
    cartCount > 0 && (
      <span
        className=" text-[10px] w-3 flex items-center justify-center h-3 rounded-full bg-main text-white
                     absolute top-0 -right-1  "
      >
        {cartCount}
      </span>
    )
  );
};

export default CartCount;
