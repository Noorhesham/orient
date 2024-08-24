import Image from "next/image";
import ZoomImage from "./ZoomImage";

const ImageGrid = ({ images }: { images: string[]; reverse?: boolean; separate?: boolean }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 hover:opacity-90 duration-100 gap-y-2 mt-8 gap-x-2">
      {images.map((src, index) => (
        <ZoomImage
          key={index}
          src={src}
          btn={
            <div className="relative    first:row-span-2  first:col-span-4 first:lg:col-span-2 cursor-pointer hover:opacity-90 duration-100 w-full col-span-4 lg:col-span-1 row-span-1">
              <Image src={src} alt="image" width={500} height={250} className="object-cover w-full h-full" />
            </div>
          }
        />
      ))}
    </div>
  );
};

export default ImageGrid;
