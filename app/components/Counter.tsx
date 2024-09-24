"use client";
import { Button } from "@/components/ui/button";
import { useCreateEntity } from "@/lib/queries";
import React from "react";
import debounce from "lodash.debounce";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Counter = ({
  value,
  max,
  defaultcount,
  handleAdd,
}: {
  value: number;
  max?: number;
  defaultcount?: number;
  handleAdd?: any;
}) => {
  const router = useRouter();
  const [count, setCount] = React.useState(defaultcount || 1);
  const { mutate, isPending, data } = useCreateEntity("addToCartQuantity", "cart");
  console.log(data);
  const debouncedMutate = React.useCallback(
    debounce((newCount) => {
      mutate({ item_id: value, qty: newCount });
      if (newCount === 0) {
        router.refresh();
      }
      if (newCount === 0) {
        handleAdd && handleAdd(value);
      }
    }, 300),
    [mutate, value]
  );

  const handleCountChange = (newCount: number) => {
    setCount(newCount);
    debouncedMutate(newCount);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={"outline"}
        className="rounded-full p-2 h-7 border-main2 text-main2 w-7"
        onClick={() => handleCountChange(count - 1)}
      >
        -
      </Button>
      <p className="text-sm text-black">{count < 10 ? `0${count}` : count}</p>
      <Button
        variant={"outline"}
        className="rounded-full p-2 h-7 border-main2 text-main2 w-7"
        onClick={() => handleCountChange(count + 1)}
        disabled={count >= (max ?? Infinity) || isPending}
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
