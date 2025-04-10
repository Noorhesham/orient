"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import SwiperCards from "./SwiperCards";

const FooterWrapper = ({ images }: { images: string[] }) => {
  const pathname = usePathname();

  return (
    <div className={`justify-center mt-4 lg:hidden ${pathname.includes("product") &&" pb-20"} flex items-center`}>
      <SwiperCards
        autoplay={true}
        logo={true}
        spaceBetween={15}
        slidesPerView={2.5}
        samePhone
        contain
        className="w-full h-32"
        items={images.map((img) => {
          return { src: img };
        })}
      />
    </div>
  );
};

export default FooterWrapper;
