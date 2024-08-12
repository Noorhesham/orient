import CartItem from "@/app/components/CartItem";
import Head1 from "@/app/components/Head1";
import React from "react";

const page = () => {
  return (
    <div>
      <Head1 text="MY WISHLIST" className=" text-4xl font-bold" />
      <p className=" max-w-2xl mt-5 font-medium text-xs text-black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, molestiae officia et numquam amet odit nemo
        in sunt quisquam molestias eos pariatur aut magnam atque cum magni fugiat vitae architecto.
      </p>
      <div className="flex flex-col gap-8 mt-10">
        <CartItem wishlist img="/Product (1).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
        <CartItem wishlist img="/Product (2).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
        <CartItem wishlist img="/Product (3).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
        <CartItem wishlist img="/Product (1).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
        <CartItem wishlist img="/Product (1).jpg" price="443" discount="324" text="putty (acrylic 1000) 233" />
      </div>
    </div>
  );
};

export default page;
