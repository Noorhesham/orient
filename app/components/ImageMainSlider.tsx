"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ResponsiveCover from "./Responsive";

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
      <ResponsiveCover covers={covers} currentImage={currentImage} index={currentImage} />
  
    </div>
  );
};

export default ImageSlider;
