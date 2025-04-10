"use client";
import React, { useState } from "react";
import Image from "next/image";
import SwiperCards from "./SwiperCards";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import MotionItem from "./MotionItem";

interface ImageData {
  file: string;
  med?: string;
}

interface ImageGridProps {
  images: ImageData[];
  id?: string;
  className?: string;
  imageclasses?: string;
}

const ImageGrid = ({ images, id, className, imageclasses }: ImageGridProps) => {
  // Tracks whether modal is open and which slide should show first
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleImageClick = (index: number) => {
    setActiveSlide(index);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Image grid */}
      <MotionItem
        key={id}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        nohover
        className={className || "grid grid-cols-4 grid-rows-2 duration-100 gap-y-2 mt-8 gap-x-2"}
      >
        {images.map((src, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className={
              imageclasses ||
              "relative  reveal   first:row-span-2  first:col-span-4 first:lg:col-span-2 cursor-pointer hover:opacity-80 duration-100 w-full col-span-4 lg:col-span-1 row-span-1"
            }
          >
            <Image src={src.file} alt="image" width={500} height={250} className="object-cover w-full h-full" />
          </div>
        ))}
      </MotionItem>

      {/* Modal with the swiper cards */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="flex justify-center items-center !border-none bg-transparent max-w-[90%] w-full max-h-[90vh] p-4"
          closePink
        >
          <SwiperCards
            btns
            btnClass="absolute z-50 -bottom-10 left-1/2 -translate-x-1/2 w-full h-fit"
            activeSlide={activeSlide}
            slidesPerView={1}
            md={1}
            mobile={1}
            items={images.map((img) => ({
              card: (
                <div className=" w-full h-full max-h-[90vh] relative">
                  <img loading="lazy" src={img.file} alt="product image" className="object-contain w-full h-full" />
                </div>
              ),
            }))}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGrid;
//       })}
