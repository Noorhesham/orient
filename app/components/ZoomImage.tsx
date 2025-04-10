"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { ReactNode } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const ZoomImage = ({
  btn,
  src,
  content,
  className,
}: {
  btn: ReactNode;
  src?: string;
  content?: ReactNode;
  className?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger className=" z-[30] relative" asChild>
        {btn}
      </DialogTrigger>
      <DialogContent
        className={`flex justify-center items-center bg-transparent  max-w-[90%] w-full  max-h-[90vh] bg-none
           border-none rounded-lg shadow-lg p-4 ${!content && " h-fit"} ${className || " w-full lg:w-fit h-full "}`}
        closePink
      >
        {content ? (
          content
        ) : (
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={3}
            centerOnInit
            wheel={{ step: 0.1 }}
            doubleClick={{ disabled: false }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <div className=" w-full h-full max-h-[90vh] relative">
                {/* Uncomment if you want to show zoom controls */}
                {/* <div className="controls flex gap-2 mb-4">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={zoomIn}>
                    Zoom In
                  </button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={zoomOut}>
                    Zoom Out
                  </button>
                  <button className="bg-gray-500 text-white px-2 py-1 rounded" onClick={resetTransform}>
                    Reset
                  </button>
                </div> */}
                <TransformComponent>
                  <img
                    loading="lazy"
                    src={src}
                    alt="product image"
                    className="h-full z-[-1]  object-center md:object-top object-contain w-full"
                  />
                </TransformComponent>
              </div>
            )}
          </TransformWrapper>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ZoomImage;
