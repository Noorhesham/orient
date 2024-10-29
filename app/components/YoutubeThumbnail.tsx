"use client";
import Image from "next/image";
import React, { useState } from "react";
import { getYouTubeThumbnail } from "../helpers/utils";
import { Play } from "./Icons";

const YoutubeThumbnail = ({ url }: { url: string }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(getYouTubeThumbnail(url));

  return (
    <div className=" cursor-pointer z-40 hover:opacity-90 duration-150 my-3 rounded-2xl overflow-hidden w-full h-full aspect-video relative">
      <Image
        onError={() => setThumbnailUrl(thumbnailUrl.replace("maxresdefault", "hqdefault"))}
        src={`${getYouTubeThumbnail(url)}`}
        fill
        alt="image"
        className="object-cover "
      />
      <div className=" absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-7xl text-gray-100 ">
        <Play />
      </div>
    </div>
  );
};

export default YoutubeThumbnail;
