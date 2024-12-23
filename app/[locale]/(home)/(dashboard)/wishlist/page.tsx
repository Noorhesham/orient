import CartItem from "@/app/components/CartItem";
import Head1 from "@/app/components/Head1";
import NotFound from "@/app/components/NotFound";
import { Server } from "@/app/main/Server";
import { getTranslations } from "next-intl/server";
import React from "react";

const page = async () => {
  const { data } = await Server({ resourceName: "wishlist" });
  console.log(data[0]);
  const t = await getTranslations();
  return (
    <div>
      <Head1 text={t("wishlist")} className=" text-4xl font-bold" />
      {/* <p className=" max-w-2xl mt-5 font-medium text-xs text-black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, molestiae officia et numquam amet odit nemo
        in sunt quisquam molestias eos pariatur aut magnam atque cum magni fugiat vitae architecto.
      </p> */}
      <div className="flex flex-col gap-8 mt-10">
        {data.length === 0 && <NotFound message={t("wishlistContent.empty")} />}
        {data.map((item: any) => (
          <CartItem
            productId={item.slug}
            wishlist
            nocheck={true}
            id={item.id}
            key={item.id}
            img={item?.main_cover[0]?.sizes.medium}
            price={item.price_before_discount}
            discount={item.price_after_discount !== item.price_before_discount ? item.price_after_discount : null}
            text={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
