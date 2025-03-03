import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { useTranslations } from "next-intl";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

const PhotoInput = ({ value, onChange }: { value: any; onChange: (event: any) => any }) => {
  const [preview, setPreview] = useState("");
  const t = useTranslations();

  return (
    <div className="w-full">
      <div className="w-40 h-40 mx-auto my-2 relative">
        <Image src={preview || value || ""} fill alt={t("image_preview")} className="rounded-full object-cover" />
      </div>
      <Input
        type="file"
        onChange={(event) => {
          const { files, displayUrl } = getImageData(event);
          setPreview(displayUrl);
          onChange(files);
        }}
        aria-label={t("upload_image")}
      />
    </div>
  );
};

export default PhotoInput;
