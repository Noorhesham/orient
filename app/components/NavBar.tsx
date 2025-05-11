"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import NavLink from "./NavLink";
import { BagIcon, CloudIcon, PersonIcon } from "./Icons";
import SearchBox from "./SearchBox";
import MaxWidthWrapper from "./MaxWidthWrapper";
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
import { useTranslations, useLocale } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useCachedQuery from "../hooks/useCachedData";

const NavBar: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { data, loading } = useCachedQuery("general_settings");
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  params.delete("redirect");
  const isHome = pathName === "/ar" || pathName === "/en";

  const { userSettings: user, handleLogout, loading: authLoading, cartCount } = useAuth();

  // Transform backend home_nav into the shape our NavLink & PhoneNav expect:
  const navItems = React.useMemo(() => {
    if (!data?.home_nav) return [];
    return data.home_nav.map((item: any) => ({
      text: item.title?.[locale] ?? item.title?.en ?? "",
      href: item.url ? `/${item.url}` : item.route ? `/${item.route.replace(/^frontend\./, "")}` : "#",
      subLinks: item.sub
        ? item.sub.map((sub: any) => ({
            text: sub.title?.[locale] ?? sub.title?.en ?? "",
            href: sub.url ? `/${sub.url}` : sub.route ? `/${sub.route.replace(/^frontend\./, "")}` : "#",
          }))
        : undefined,
    }));
  }, [data, locale]);

  // scroll & hide logic...
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTopPage, setIsTopPage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTopPage(window.scrollY < 50);
      setIsScrollingDown(window.scrollY > lastScrollY);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // build the jobs link as before...
  const searchParamsNoRedirect = params.toString() ? `?${params.toString()}` : "";
  console.log(data);
  return (
    <TooltipProvider>
      <header className="w-full">
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
            <div className="absolute inset-0 h-[20rem] bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none z-10" />
          )}

          <MaxWidthWrapper noPadding>
            <div className="relative z-40 flex flex-col gap-5 lg:flex-row justify-between items-center">
              <div className="flex items-center gap-2 lg:gap-4">
                <Logo type={isHome ? "white" : "blue"} />
                <Language />
              </div>

              <div className="flex flex-row z-40 lg:flex-row-reverse lg:basis-[36%] items-center gap-3 lg:gap-5">
                <SearchBox setIsActive={() => {}} active={false} />

                {/* Mobile menu */}
                <div className="h-full w-full lg:hidden block">
                  {loading ? <Skeleton className="w-full h-12" /> : <PhoneNav isHome={isHome} navigation={navItems} />}
                </div>

                {/* Icons */}
                <div className="flex items-center gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="hover:opacity-80 duration-150 cursor-pointer">
                            <CloudIcon home={isHome} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>{t("navbar.tooltips.cloud")}</TooltipContent>
                      </Tooltip>
                    </DialogTrigger>
                    <AppDownload />
                  </Dialog>

                  {authLoading ? (
                    <Skeleton className="w-8 h-8 rounded-full" />
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={user ? "/dashboard" : "/login"} className="hover:opacity-80 duration-150">
                          <BagIcon home={isHome} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{t("navbar.tooltips.profile")}</TooltipContent>
                    </Tooltip>
                  )}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/cart" className="relative hover:opacity-80 duration-150">
                        {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-main text-white rounded-full flex items-center justify-center">
                            {cartCount}
                          </span>
                        )}
                        <PersonIcon home={isHome} />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>{t("navbar.tooltips.bag")}</TooltipContent>
                  </Tooltip>

                  {user && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={async () => {
                            const res = await Server({ resourceName: "logout" });
                            if (res?.status) {
                              toast.success(res.message);
                              handleLogout();
                              router.refresh();
                            }
                          }}
                          className="hover:cursor-pointer hover:text-main duration-150"
                        >
                          <LogOutIcon />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{t("navbar.tooltips.logout")}</TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop nav */}
            <div className="mt-4">
              {loading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <ul className="hidden lg:flex z-30 relative items-center justify-between">
                  {navItems.map((link) => (
                    <NavLink
                      key={link.text}
                      isHome={isHome}
                      href={link.href}
                      text={link.text}
                      subLinks={link.subLinks}
                    />
                  ))}
                </ul>
              )}
            </div>
          </MaxWidthWrapper>
        </nav>
      </header>
    </TooltipProvider>
  );
};

export default NavBar;
