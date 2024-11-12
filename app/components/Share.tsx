"use client";
import { CopyIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { FiCopy } from "react-icons/fi";
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
} from "react-share";

const Share = ({
  handleShare,
  currentUrl,
  title,
  imageUrl,
}: {
  handleShare: () => void;
  currentUrl: string;
  title: string;
  imageUrl: string;
}) => {
  const t = useTranslations();
  return (
    <div className="flex items-center gap-2 text-sm">
      <p>{t("share")}</p> {/* Use translation */}
      <CopyIcon onClick={handleShare} className="cursor-pointer text-xl w-6  text-main h-6 hover:text-blue-500" />
      <FacebookShareButton url={currentUrl} quote={title} hashtag={`#${title.replace(/\s+/g, "")}`}>
        <FacebookIcon className="hover:text-blue-600 w-6 h-6" size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={currentUrl} title={title} hashtags={["yourHashtag"]}>
        <TwitterIcon className="hover:text-blue-400 w-6 h-6" size={32} round />
      </TwitterShareButton>
      <PinterestShareButton url={currentUrl} media={imageUrl} description={title}>
        <PinterestIcon className="hover:text-red-500 w-6 h-6" size={32} round />
      </PinterestShareButton>
    </div>
  );
};

export default Share;
