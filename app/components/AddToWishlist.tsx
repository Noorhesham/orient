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
import Share from "./Share";

const AddToWishlist = ({
  className,
  id,
  wishlistStatus,
  noshare,
  title,
}: {
  className?: string;
  id: any;
  wishlistStatus: boolean;
  noshare?: boolean;
  title: string;
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
            title: title || t("checkOut"),
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
              className="text-2xl hover:underline m-auto duration-150 py-10 text-main uppercase font-semibold text-center"
            >
              {t("loginPrompt")} {/* Use translation */}
            </Link>
          }
        />
      )}
      {!noshare && <Share title={title} currentUrl={currentUrl} handleShare={handleShare} imageUrl={currentUrl} />}
    </div>
  );
};

export default AddToWishlist;
