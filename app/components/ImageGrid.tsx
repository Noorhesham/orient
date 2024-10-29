import Image from "next/image";
import ZoomImage from "./ZoomImage";
import SwiperCards from "./SwiperCards";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const ImageGrid = ({ images }: { images: any[]; reverse?: boolean; separate?: boolean }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 hover:opacity-90 duration-100 gap-y-2 mt-8 gap-x-2">
      {images?.map((src, index) => (
        <ZoomImage
          key={index}
          src={src.file}
          btn={
            <div className="relative  reveal   first:row-span-2  first:col-span-4 first:lg:col-span-2 cursor-pointer hover:opacity-90 duration-100 w-full col-span-4 lg:col-span-1 row-span-1">
              <Image src={src.med} alt="image" width={500} height={250} className="object-cover w-full h-full" />
            </div>
          }
          content={
            <SwiperCards
              btns
              btnClass=" absolute z-50  -bottom-10 left-1/2 -translate-x-1/2 w-full h-fit"
              activeSlide={index}
              slidesPerView={1}
              md={1}
              mobile={1}
              items={images.map((img) => {
                return {
                  card: (
                    <TransformWrapper
                      initialScale={1}
                      minScale={0.5}
                      maxScale={3}
                      centerOnInit
                      wheel={{ step: 0.1 }}
                      doubleClick={{ disabled: false }}
                    >
                      {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                          <TransformComponent>
                            <img
                              loading="lazy"
                              src={img.file}
                              alt="product image"
                              className="h-full z-[-1]  object-center md:object-top object-contain w-full"
                            />
                          </TransformComponent>
                        </>
                      )}
                    </TransformWrapper>
                  ),
                };
              })}
            />
          }
        />
      ))}
    </div>
  );
};

export default ImageGrid;
{
  /* <div className="mt-14 mb-3">
<Button variant="outline" size={"sm"} className="mr-2" onClick={() => zoomIn()}>
  <ZoomInIcon />
</Button>
<Button variant="outline" size={"sm"} onClick={() => zoomOut()}>
  <ZoomOutIcon />
</Button>
</div> */
}
