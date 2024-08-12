"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import { BagIcon, CloudIcon, PersonIcon } from "./Icons";
import SearchBox from "./SearchBox";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { INSPIRED_LINKS, PARTENER_LINKS, PRODUCTS_LINKS } from "../constants";
import { redirect, usePathname, useRouter } from "next/navigation";
import BurgerMenu from "./BurgerMenu";
import Link from "next/link";
import { useGetGeneralSettings } from "@/lib/queries";
import { LogOutIcon } from "lucide-react";
import { Server } from "../main/Server";
import cookies from "js-cookie";
import { toast } from "react-toastify";
const links = [
  {
    text: "Shop Now",
    href: "/shop",
  },
  {
    text: "Products",
    subLinks: PRODUCTS_LINKS,
  },
  {
    text: "Get Inspired",
    subLinks: INSPIRED_LINKS,
  },
  {
    text: "Become Partener",
    subLinks: PARTENER_LINKS,
  },
  {
    text: "About Us",
    href: "/about-us",
  },
  {
    text: "Contact Us",
    href: "/contact-us",
  },
];
const NavBar = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTopPage, setIsTopPage] = useState(true);
  const pathName = usePathname();
  const { data, isLoading } = useGetGeneralSettings(["user_settings", "check_auth"]);
  const user = data?.user_settings;
  console.log(user);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setIsTopPage(true);
      } else setIsTopPage(false);
      if (window.scrollY > lastScrollY) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isTopPage]);
  const isHome = pathName === "/ar" || pathName === "/en";
  return (
    <header>
      <div className="  z-[999] h-full fixed top-0 left-0  lg:hidden block">
        <BurgerMenu links={links} />
      </div>
      <nav
        className={`${
          isHome
            ? "text-white placeholder:text-white "
            : `text-black placeholder:text-white ${!isScrollingDown && "bg-white/80"}`
        } fixed inset-0 z-50 max-h-[10rem]  flex flex-col gap-2 px-8 py-4 transition-all duration-300 ${
          isScrollingDown ? "-translate-y-full" : !isTopPage && !isScrollingDown ? "-translate-y-20" : "translate-y-0"
        }`}
      >
        {isHome && (
          <div className="absolute inset-0 h-[20rem] bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none z-10"></div>
        )}

        <MaxWidthWrapper>
          {
            <div className={`   relative z-20 flex justify-between items-center`}>
              <div className=" ">
                <Logo type={isHome ? "white" : "blue"} />
              </div>
              <div className="flex flex-col-reverse items-end lg:flex-row basis-[402px]   lg:items-center gap-5">
                <div className=" flex  items-center gap-4">
                  <CloudIcon home={isHome} />
                  <Link href={!isLoading && user ? "/dashboard" : "/login"}>
                    <BagIcon home={isHome} />
                  </Link>
                  <Link href={"/cart"}>
                    {" "}
                    <PersonIcon home={isHome} />
                  </Link>
                  {!isLoading && user && (
                    <LogOutIcon
                      onClick={async () => {
                        const res = await Server({ method: "POST", resourceName: "logout" });
                        if (res.status) {
                          toast.success(res.message);
                          cookies.remove("jwt");
                          // router.push(`/login?redirect=${pathName}`);
                          router.refresh();
                        }
                      }}
                      className=" hover:cursor-pointer hover:text-main duration-150"
                    />
                  )}
                </div>
                <SearchBox />
              </div>
            </div>
          }
          <div className=" mt-4">
            <ul className=" hidden lg:flex z-30 relative items-center justify-between ">
              {links.map((link) => (
                //@ts-ignore
                <NavLink isHome={isHome} key={link.text} href={link.href} text={link.text} subLinks={link.subLinks} />
              ))}
            </ul>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
};

export default NavBar;
