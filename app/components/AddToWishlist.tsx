"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";
import ModalCustom from "./ModalCustom";
import Link from "next/link";
import { useCreateEntity } from "@/lib/queries";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl"; // Import useTranslations
import { Server } from "../main/Server";
import { toast } from "react-toastify";

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
  const [isPending, startTransition] = useTransition();
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const t = useTranslations("wishlistContent");
  const mutateWishlist = (action: string) => {
    try {
      startTransition(async () => {
        const res = await Server({
          resourceName: "addWishlist",
          body: {
            action,
          },
          id,
        });
        if (res.status) {
          toast.success(res.message);
          router.refresh();
        } else toast.error(res.message);
      });
    } catch (error: any) {
      toast.error(error);
    }
  };
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
            title: t("checkOut"), // Use translation here
            url: currentUrl,
          })
          .catch((error) => console.error("Error sharing", error));
      } else {
        global?.navigator.clipboard.writeText(currentUrl);
        alert("Link copied to clipboard!");
      }
    }
  };

  if (!currentUrl) {
    return null;
  }

  return (
    <div className={`flex items-center flex-col gap-2 ${className || ""}`}>
      {userSettings ? (
        <Button
          disabled={isPending}
          onClick={() => {
            wishlistStatus ? mutateWishlist("remove") : mutateWishlist("add");
          }}
          variant={"link"}
          className="flex items-center gap-1"
        >
          {!wishlistStatus ? <Heart /> : <Heart className="fill-red-500" />}
          {!wishlistStatus ? t("add") : t("remove")} {/* Use translation */}
        </Button>
      ) : (
        <ModalCustom
          btn={
            <Button variant={"link"} className="flex items-center gap-1">
              <Heart /> {t("add")} {/* Use translation */}
            </Button>
          }
          content={
            <Link
              href={"/login"}
              className="text-2xl hover:underline duration-150 py-10 text-main uppercase font-semibold text-center"
            >
              {t("loginPrompt")} {/* Use translation */}
            </Link>
          }
        />
      )}
      {!noshare && (
        <div className="flex items-center gap-1 text-sm">
          <p>{t("share")}</p> {/* Use translation */}
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
