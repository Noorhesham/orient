import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const SocialMedia = () => {
  return (
    <div className=" flex mt-2 items-center gap-2">
      <span className=" text-white p-2 text-xl rounded-full bg-main">
        <FaWhatsapp />
      </span>
      <span className=" text-white p-2 text-xl rounded-full bg-main">
        <FaLinkedin />
      </span>
      <span className=" text-white p-2 text-xl rounded-full bg-main">
        <FaYoutube />
      </span>
      <span className=" text-white p-2 text-xl rounded-full bg-main">
        <FaInstagram />
      </span>
      <span className=" text-white p-2 text-xl rounded-full bg-main">
        <FaFacebook />
      </span>
      <span className=" text-white p-2 text-xl rounded-full bg-main">
        <FaXTwitter />
      </span>
    </div>
  );
};

export default SocialMedia;
