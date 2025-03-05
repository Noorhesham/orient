import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ type = "white", size }: { type?: "blue" | "white"; size?: { width: number; height: number } }) => {
  return (
    <Link href="/">
      {type === "blue" ? (
        <Image src="/orient logo.png" alt="logo" width={200} height={60} />
      ) : (
        <Image src="/E logo Blue (2).png" alt="logo" width={200} height={60} />
      )}
    </Link>
  );
};

export default Logo;
