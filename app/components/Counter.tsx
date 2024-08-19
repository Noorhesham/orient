"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const Counter = () => {
  const [count, setCount] = React.useState(1);
  return (
    <div className=" flex items-center gap-2">
      <Button
        variant={"outline"}
        className=" rounded-full p-2 h-7  border-main2 text-main2 w-7"
        onClick={() => setCount((c) => (c > 1 ? c - 1 : c))}
      >
        -
      </Button>
      <p className=" text-sm text-black">{count < 10 ? `0${count}` : count}</p>
      <Button
        variant={"outline"}
        className=" rounded-full p-2 h-7  border-main2 text-main2 w-7"
        onClick={() => setCount(count + 1)}
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
