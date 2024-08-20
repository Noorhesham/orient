"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React from "react";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";

const AddToWishlist = ({ className }: { className: string }) => {
  const handleShare = () => {
    if (global?.navigator.share) {
      global?.navigator
        .share({
          title: "Check out this product!",
          url: global?.window?.location.href,
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
      // Fallback for desktop or browsers that don't support the Web Share API
      global?.navigator.clipboard.writeText(global?.window?.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className={`flex items-center flex-col gap-2 ${className || ""}`}>
      <Button variant={"link"} className="flex items-center gap-1">
        <Heart /> ADD TO WISHLIST
      </Button>
      <div className="flex items-center gap-1 text-sm">
        <p>SHARE PRODUCT :</p>
        <FiCopy onClick={handleShare} className="cursor-pointer hover:text-blue-500" />
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${global?.window?.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="hover:text-blue-600" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${global?.window?.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter className="hover:text-blue-400" />
        </a>
        <a
          href={`https://pinterest.com/pin/create/button/?url=${global?.window?.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaPinterest className="hover:text-red-500" />
        </a>
      </div>
    </div>
  );
};

export default AddToWishlist;
