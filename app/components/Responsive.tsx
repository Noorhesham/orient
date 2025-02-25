import { useEffect, useState } from "react";
import Link from "next/link";

const ResponsiveCover = ({ covers, currentImage, index }) => {
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const updateBackground = () => {
      const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
      setBgImage(covers[currentImage]?.[isMobile ? "image_mobile" : "image"]?.[0]?.file || "");
    };

    updateBackground(); // Initial call
    window.addEventListener("resize", updateBackground);

    return () => window.removeEventListener("resize", updateBackground);
  }, [covers, currentImage]);

  return (
    <Link
      href={covers[currentImage].link || "/"}
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundPosition: "center",
        zIndex: 1,
      }}
      key={index}
      className="reveal_animation bg-no-repeat bg-cover absolute inset-0"
    />
  );
};

export default ResponsiveCover;
