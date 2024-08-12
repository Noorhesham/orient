"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div className=" flex items-center gap-2">
      <Button variant={"outline"} className=" rounded-full p-2 h-8 w-8" onClick={() => setCount((c) => (c >= 0 ? c - 1 : c))}>
        -
      </Button>
      <p className=" text-sm text-muted-foreground">{count < 8 ? `0${count}` : count}</p>
      <Button variant={"outline"} className=" rounded-full p-2 h-8 w-8" onClick={() => setCount(count + 1)}>
        +
      </Button>
    </div>
  );
};

export default Counter;
