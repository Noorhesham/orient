"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";
import ModalCustom from "./ModalCustom";
import Link from "next/link";
import { useCreateEntity } from "@/lib/queries";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const AddToWishlist = ({
  className,
  id,
  wishlistStatus,
  noshare,
}: {
  className?: string;
  id: any;
  wishlistStatus: boolean;
  noshare?: boolean;
}) => {
  const { userSettings } = useAuth();
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const { mutate, isPending } = useCreateEntity("addWishlist", "wishlist", id);
  // Set the current URL only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleShare = () => {
    if (currentUrl) {
      if (global?.navigator.share) {
        global?.navigator
          .share({
            title: "Check out this product!",
            url: currentUrl,
          })
          .catch((error) => console.error("Error sharing", error));
      } else {
        // Fallback for desktop or browsers that don't support the Web Share API
        global?.navigator.clipboard.writeText(currentUrl);
        alert("Link copied to clipboard!");
      }
    }
  };

  if (!currentUrl) {
    return null; // Return nothing while waiting for the client-side URL
  }

  return (
    <div className={`flex items-center flex-col gap-2 ${className || ""}`}>
      {userSettings ? (
        <Button
          disabled={isPending}
          onClick={() => {
            wishlistStatus ? mutate({ action: "remove" }) : mutate({ action: "add" });
            router.refresh();
          }}
          variant={"link"}
          className="flex items-center gap-1"
        >
          {!wishlistStatus ? <Heart /> : <Heart className="fill-red-500" />}
          {!wishlistStatus ? "ADD TO WISHLIST" : "Remove from wishlist"}
        </Button>
      ) : (
        <ModalCustom
          btn={
            <Button variant={"link"} className="flex items-center gap-1">
              <Heart /> ADD TO WISHLIST
            </Button>
          }
          content={
            <Link
              href={"/login"}
              className=" text-2xl hover:underline duration-150 py-10 text-main uppercase font-semibold text-center "
            >
              Login First to add product to wishlist .... !
            </Link>
          }
        />
      )}
      {!noshare && (
        <div className="flex items-center gap-1 text-sm">
          <p>SHARE PRODUCT :</p>
          <FiCopy onClick={handleShare} className="cursor-pointer hover:text-blue-500" />
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="hover:text-blue-600" />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${currentUrl}`} target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="hover:text-blue-400" />
          </a>
          <a
            href={`https://pinterest.com/pin/create/button/?url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPinterest className="hover:text-red-500" />
          </a>
        </div>
      )}
    </div>
  );
};

export default AddToWishlist;
