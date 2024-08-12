import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React from "react";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";

const AddToWishlist = ({ className }: { className: string }) => {
  return (
    <div className={`flex items-center flex-col gap-2 ${className || ""}`}>
      <Button variant={"link"} className="flex items-center gap-1">
        <Heart /> ADD TO WISHLIST
      </Button>
      <div className="flex items-center gap-1 text-sm">
        <p>SHARE PRODUCT :</p>
        <FiCopy /> <FaFacebook /> <FaXTwitter /> <FaPinterest />
      </div>
    </div>
  );
};

export default AddToWishlist;
