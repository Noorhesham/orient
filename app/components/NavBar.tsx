"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import { BagIcon, CloudIcon, PersonIcon } from "./Icons";
import SearchBox from "./SearchBox";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { INSPIRED_LINKS, PARTENER_LINKS, PRODUCTS_LINKS } from "../constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { Server } from "../main/Server";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import AppDownload from "./AppDownload";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Language from "./Language";
import PhoneNav from "./PhoneNav";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const NavBar = () => {
  const t = useTranslations();

  const links = [
    {
      text: t("navbar.shopNow"),
      href: "/shop",
    },
    {
      text: t("navbar.products"),
      subLinks: PRODUCTS_LINKS.map((link) => ({
        ...link,
        text: t(`productsLinks.${link.text.toLowerCase().replace(" ", "")}`),
      })),
    },
    {
      text: t("navbar.getInspired"),
      subLinks: INSPIRED_LINKS.map((link) => ({
        ...link,
        text: t(`inspiredLinks.${link.text.toLowerCase().replace(" ", "")}`),
      })),
    },
    {
      text: t("navbar.becomePartner"),
      subLinks: PARTENER_LINKS.map((link) => ({
        ...link,
        text: t(`partnerLinks.${link.text.toLowerCase().replace(" ", "")}`),
      })),
    },
    {
      text: t("navbar.aboutUs"),
      href: "/about-us",
    },
    {
      text: t("navbar.contactUs"),
      href: "/contact-us",
    },
  ];

  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [active, setIsActive] = useState(false);
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTopPage, setIsTopPage] = useState(true);
  const pathName = usePathname();
  const { userSettings, handleLogout, loading, cartCount, generalSettings } = useAuth();
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
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.delete("redirect");
  const isHome = pathName === "/ar" || pathName === "/en";

  return (
    <TooltipProvider>
      <header className="w-full">
        {/* <div className={`z-[999] duration-150 h-full top-0 fixed left-0 lg:hidden block`}> */}
        {/* </div> */}
        <nav
          className={`${
            isHome
              ? "text-white placeholder:text-white"
              : `text-black placeholder:text-white ${!isScrollingDown && "bg-white/80"}`
          } fixed inset-0 z-50 max-h-[9rem] flex flex-col gap-2 py-4 transition-all duration-300 ${
            isScrollingDown ? "-translate-y-full" : !isTopPage && !isScrollingDown ? "-translate-y-20" : "translate-y-0"
          }`}
        >
          {isHome && (
            <div className="absolute inset-0 h-[20rem] bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none z-10"></div>
          )}

          <MaxWidthWrapper noPadding>
            {
              <div className={`relative  z-40 flex flex-col gap-5 lg:flex-row justify-between items-center`}>
                <div className="flex items-center gap-2 lg:gap-4">
                  <Logo type={isHome ? "white" : "blue"} />
                  <Language />
                </div>

                <div className="flex flex-row z-40 lg:flex-row-reverse lg:basis-[36%] items-center gap-3 lg:gap-5">
                  <SearchBox active={active} setIsActive={setIsActive} />{" "}
                  <div className=" h-full w-full lg:hidden block">
                    <PhoneNav isHome={isHome} navigation={links} />
                  </div>
                  <div
                    className={`flex ${
                      active ? "opacity-0 lg:opacity-100" : "opacity-100"
                    } duration-200 items-center gap-4`}
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DialogTrigger asChild>
                              <div className="hover:opacity-80 duration-150 cursor-pointer">
                                <CloudIcon home={isHome} />
                              </div>
                            </DialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>{t("navbar.tooltips.cloud")}</TooltipContent>
                        </Tooltip>
                      </DialogTrigger>
                      <AppDownload />
                    </Dialog>
                    {loading ? (
                      <Skeleton className="w-8 h-8 rounded-full" />
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link className="hover:opacity-80 duration-150" href={user ? "/dashboard" : "/login"}>
                            <BagIcon home={isHome} />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>{t("navbar.tooltips.profile")}</TooltipContent>
                      </Tooltip>
                    )}

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link className="hover:opacity-80 duration-150 relative" href={"/cart"}>
                          {!loading && cartCount > 0 && (
                            <div className="text-[10px] w-3 flex items-center justify-center h-3 rounded-full bg-main text-white absolute top-0 -right-1">
                              {cartCount}
                            </div>
                          )}
                          <PersonIcon home={isHome} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{t("navbar.tooltips.bag")}</TooltipContent>
                    </Tooltip>

                    {loading ? (
                      <Skeleton className="md:w-8  w-4 md:h-8  h-4 rounded-full" />
                    ) : (
                      user && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <LogOutIcon
                                onClick={async () => {
                                  const res = await Server({ resourceName: "logout" });
                                  if (res?.status) {
                                    toast.success(res.message);
                                    handleLogout();
                                    router.refresh();
                                  }
                                }}
                                className="hover:cursor-pointer hover:text-main duration-150"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{t("navbar.tooltips.logout")}</TooltipContent>
                        </Tooltip>
                      )
                    )}
                  </div>
                </div>
              </div>
            }
            <div className="mt-4">
              <ul className="hidden lg:flex z-30 relative items-center justify-between">
                {links.map((link) => (
                  <NavLink
                    isHome={isHome}
                    key={link.text}
                    href={link.href}
                    text={link.text}
                    //@ts-ignore
                    subLinks={link.subLinks}
                  />
                ))}
              </ul>
            </div>
          </MaxWidthWrapper>
        </nav>
      </header>
    </TooltipProvider>
  );
};

export default NavBar;
