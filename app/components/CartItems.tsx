"use client";
import React, { useState } from "react";
import CartItem from "./CartItem";
import Container from "./Container";
import Head1 from "./Head1";

const CartItems = ({ cart }: { cart: any }) => {
  const [cartItems, setCart] = useState<any[]>([]);
  const remove = (id: number) => {
    setCart(cartItems.filter((item: any) => item.id !== id));
  };
  const handleAdd = (id: any) => {
    console.log(cart.find((i: any) => i.id === id));
    setCart((items) =>
      items.findIndex((i) => i.id === id) === -1 && items.length > 0
        ? [items, cart.find((i: any) => i.id === id)]
        : [cart.find((i: any) => i.id === id)]
    );
  };
  console.log(cartItems);
  return (
    <section className=" flex flex-col gap-5">
      {cart.length > 0 && (
        <Container className=" py-8 flex flex-col gap-5">
          {cart.map((item: any) => (
            <CartItem
              handleAdd={handleAdd}
              key={item.id}
              img={item.image?.[0]?.sizes.large}
              price={item.price_before_discount}
              discount={item.price_before_discount !== item.price_after_discount ? item.price_after_discount : null}
              text={item.title}
              quantity={item.quantity}
              id={item.slug}
              productId={item.product_slug}
            />
          ))}
        </Container>
      )}
      {cartItems.length > 0 && (
        <section>
          <Head1 className=" my-2" text="RECYCLE BIN" />
          <Container className=" py-8 flex flex-col gap-5">
            {cartItems.map((item: any) => (
              <CartItem
                remove={remove}
                nocheck
                retrive
                key={item.id}
                img={item.image?.[0]?.sizes.large}
                price={item.price_after_discount}
                discount={item.price_before_discount}
                text={item.title}
                quantity={item.quantity}
                id={item.id}
                productId={item.product_slug}
              />
            ))}
          </Container>
        </section>
      )}
    </section>
  );
};

export default CartItems;
