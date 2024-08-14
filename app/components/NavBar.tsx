"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import { BagIcon, CloudIcon, PersonIcon } from "./Icons";
import SearchBox from "./SearchBox";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { INSPIRED_LINKS, PARTENER_LINKS, PRODUCTS_LINKS } from "../constants";
import { usePathname, useRouter } from "next/navigation";
import BurgerMenu from "./BurgerMenu";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import ModalCustom from "./ModalCustom";
import AppDownload from "./AppDownload";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
  const [active, setIsActive] = useState(false);
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTopPage, setIsTopPage] = useState(true);
  const pathName = usePathname();
  const { userSettings, handleLogout, generalSettings } = useAuth();
  const user = userSettings;
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
    <header className=" w-full">
      <div className={`z-[999] duration-150 h-full top-0  fixed left-0  lg:hidden block`}>
        <BurgerMenu links={links} />
      </div>
      <nav
        className={`${
          isHome
            ? "text-white placeholder:text-white "
            : `text-black placeholder:text-white ${!isScrollingDown && "bg-white/80"}`
        } fixed inset-0 z-50 max-h-[10rem]   flex flex-col gap-2 px-4 lg:px-8 py-4 transition-all duration-300 ${
          isScrollingDown ? "-translate-y-full" : !isTopPage && !isScrollingDown ? "-translate-y-20" : "translate-y-0"
        }`}
      >
        {isHome && (
          <div className="absolute inset-0 h-[20rem] bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none z-10"></div>
        )}

        <MaxWidthWrapper noPadding className="  md:px-10 ">
          {
            <div className={`   relative z-20 flex flex-col  md:gap-0 gap-5  lg:flex-row justify-between items-center`}>
              <div className={`  duration-150 `}>
                <Logo type={isHome ? "white" : "blue"} />
              </div>
              <div className="flex  flex-row  lg:basis-[402px]   items-center gap-1 lg:gap-5">
                <SearchBox active={active} setIsActive={setIsActive} />

                {
                  <div
                    className={`flex  ${
                      active ? "opacity-0 lg:opacity-100" : "opacity-100"
                    } duration-200 items-center gap-4`}
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className=" cursor-pointer">
                          <CloudIcon home={isHome} />
                        </div>
                      </DialogTrigger>
                      <AppDownload />
                    </Dialog>

                    <Link href={user ? "/dashboard" : "/login"}>
                      <BagIcon home={isHome} />
                    </Link>
                    <Link href={"/cart"}>
                      {" "}
                      <PersonIcon home={isHome} />
                    </Link>
                    {user && (
                      <LogOutIcon
                        onClick={async () => {
                          const res = await Server({ method: "POST", resourceName: "logout" });
                          if (res.status) {
                            toast.success(res.message);
                            handleLogout();
                            // router.push(`/login?redirect=${pathName}`);
                            router.refresh();
                          }
                        }}
                        className=" hover:cursor-pointer hover:text-main duration-150"
                      />
                    )}
                  </div>
                }
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
