import React from "react";
import { useAuth } from "../context/AuthContext";
import { useGetEntity } from "@/lib/queries";

const CartCount = () => {
  const { user2Settings, loading } = useAuth();

  // Only enable the query if the user does not exist and loading is done
  const { data, isLoading } = useGetEntity("getActiveCart", "cartCount", "count", {
    enabled: !user2Settings?.cart_count && !loading,
  });
  const cartCount = data?.cart;
  if (loading) null;
  console.log(user2Settings?.cart_count, data);
  return (
    <div>
      {user2Settings?.cart_count > 0 ||
        (cartCount > 0 && (
          <span
            className=" text-[10px] w-3 flex items-center justify-center h-3 rounded-full bg-main text-white
                     absolute top-0 -right-1  "
          >
            {<span>{user2Settings?.cart_count || cartCount}</span>}
          </span>
        ))}
    </div>
  );
};

export default CartCount;
