"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const images = ["/img1.png", "/img2.png", "/img3.png"];
const SLIDERTIMER = 3000;
const ImageSlider = ({ covers }: { covers: any[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % covers.length);
    }, SLIDERTIMER);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="">
      {covers.map((src, index) => (
        <Link
          href={covers[currentImage].link}
          style={{
            backgroundImage: `url('${covers[currentImage].image[0].file}')`,
            backgroundPosition: "center",
            // backgroundAttachment: "fixed",
            zIndex: 1,
          }}
          key={index}
          className={`reveal_animation bg-no-repeat bg-cover absolute inset-0 `}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
