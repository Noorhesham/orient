"use client";
import SwiperCards from "@/app/components/SwiperCards";
import React from "react";
import styles from "./CUSTOM.module.css";

const IsMobSlide = ({ items }: { items: any }) => {
  const [IsMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  });
  return (
    <div>
      <div className="h-52 block">
        <SwiperCards
          btns={IsMobile || items.length > 5}
          logo={true}
          spaceBetween={50}
          contain
          mobile={2}
          slidesPerView={5}
          className={` w-full h-32 ${styles.swiperWrapper}`}
          items={items.map((item: any, index: number) => {
            return { src: item.file };
          })}
        />
      </div>
    </div>
  );
};

export default IsMobSlide;
