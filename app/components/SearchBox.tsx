"use client";
import React, { useState, useRef, useEffect } from "react";
import { SearchIcon } from "./Icons";
import { redirect, usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useGetEntity } from "@/lib/queries";
import debounce from "lodash.debounce";
import CartItem from "./CartItem";
import Image from "next/image";
import Link from "next/link";
import MotionItem from "./MotionItem";
import PriceWithSale from "./PriceWithSale";

const SearchBox = ({
  bg,
  icon,
  onSearch,
  active,
  setIsActive,
  nonactive,
}: {
  bg?: string;
  icon?: any;
  onSearch?: (value: string) => void;
  active?: boolean;
  setIsActive?: (value: boolean) => void;
  nonactive?: boolean;
}) => {
  const [val, setVal] = useState("");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    searchParams.set("search", query);
  }, [query]);
  const searchParams = new URLSearchParams();
  const { data, isLoading } = useGetEntity(
    "getProducts",
    `search=${query}`,
    "",
    { enabled: query.length > 3 },
    `search=${query}`
  );
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLg, setIsLg] = useState(false);
  const t = useTranslations();
  // Track screen size
  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth >= 1024);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const search = React.useCallback(
    debounce((newsearch) => {
      setQuery(newsearch);
    }, 500),
    [query]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
    if (!nonactive && (event.target.value.includes("%") || event.target.value.length < 3))
      return setResultActive(false);
    setResultActive(true);
    onSearch && onSearch(event.target.value);
    if (!nonactive) search(event.target.value);
  };

  // Handle clicks outside the search box to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      if (setIsActive) {
        setResultActive(false);
        setIsActive(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // When active state changes, focus the input if active
  useEffect(() => {
    if (active) {
      inputRef.current?.focus();
    }
  }, [active]);
  const locale = useLocale();
  const router = useRouter();
  const [resultActive, setResultActive] = useState(false);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && data) {
      data.products.length > 0 ? router.push(`/shop?search=${query}`) : router.push(`/shop`);
      setResultActive(false);
    }
  };
  return (
    <div
      ref={containerRef}
      className={` ${
        bg === "blue"
          ? `bg-main2/15 text-gray-800 placeholder:text-gray-800 `
          : !bg && !active
          ? "   "
          : active
          ? ""
          : "placeholder:text-white "
      }  relative flex lg:w-full items-center lg:bg-white/10 lg:gap-10 rounded-3xl mr-1   ${
        active && locale === "ar"
          ? "translate-x-20  py-2 px-4 lg:translate-x-0"
          : active && locale === "en"
          ? "-translate-x-20  py-2 px-4 lg:translate-x-0"
          : "translate-x-0"
      } duration-150 lg:py-2 ${!nonactive && " lg:border  lg:px-4 border-input"}   shadow-sm z-[999] relative ${
        locale === "ar" && "lg:flex-row-reverse"
      } `}
    >
      <AnimatePresence>
        {data && resultActive && (
          <MotionItem
            nohover
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`${
              locale === "ar" ? "right-0" : "left-0"
            } flex items-start w-[340px] shadow-md xl:w-full bg-white absolute gap-2 top-full py-4 px-2 rounded-md  max-h-[14rem] overflow-y-scroll flex-col `}
          >
            {(data && data.products?.length > 0) || query.length > 4 ? (
              data?.products.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className=" hover:bg-gray-100 duration-150 w-full flex items-center gap-2"
                >
                  <div className=" overflow-hidden rounded-md w-10 h-10 relative">
                    <Image src={item?.main_cover[0]?.sizes?.thumbnail} fill alt="product" className=" object-contain" />
                  </div>
                  <div className=" flex flex-col">
                    <h2 className=" text-black text-sm line-clamp-1 font-medium rounded-xl">{item.title}</h2>
                    <PriceWithSale
                      price={item.price_after_discount}
                      discount={
                        item.price_after_discount !== item.price_before_discount ? item.price_before_discount : null
                      }
                      size="xs"
                    />
                  </div>
                </Link>
              ))
            ) : (
              <p className=" text-main text-xs">No results Found</p>
            )}
            <Link
              onClick={() => setResultActive(false)}
              className=" text-main duration-150 hover:underline"
              href={data.products?.length > 1 ? `/shop?search=${query}` : "/shop"}
            >
              {`${data.products?.length > 1 ? t("browseAllProducts", { query }) : t("browseAllProducts")}`}
            </Link>
          </MotionItem>
        )}
      </AnimatePresence>
      {nonactive ? (
        <input
          onKeyDown={handleKeyDown}
          value={val}
          onChange={handleSearchChange}
          placeholder={t("search")}
          className="bg-transparent  w-[88%] border-2 rounded-full border-input outline-none placeholder:text-black  py-1.5 
           lg:pt-4  lg:py-3 px-3 lg:px-6 "
        />
      ) : (
        <input
          value={val}
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onChange={handleSearchChange}
          className={` bg-transparent text-sm   w-full duration-150 absolute py-3 px-4  lg:relative lg:px-0 lg:py-0 right-0 placeholder:font-[300] 
          placeholder:my-auto placeholder:tracking-wide  placeholder:capitalize     lg:block  hidden outline-none placeholder:text-sm lg:z-50  font-medium `}
          type="text"
          placeholder={t("search")}
        />
      )}

      {active && (
        <motion.input
          onKeyDown={handleKeyDown}
          value={val}
          ref={inputRef}
          initial={{ width: 0 }}
          animate={{ width: active ? "350px" : 0 }}
          transition={{ duration: 0.5 }}
          onChange={handleSearchChange}
          className={`${
            active ? "bg-white/10 py-3 px-4" : "bg-transparent placeholder:w-0"
          }  duration-150 absolute  block lg:hidden ${
            locale === "ar" ? "right-0 pr-14" : " left-0  pl-14 "
          }     placeholder:font-[300] outline-1 placeholder:my-auto  rounded-3xl outline-none placeholder:text-xs text-xs font-medium ${
            active ? "z-50" : "w-0"
          }`}
          type="text"
          placeholder={t("search")}
        />
      )}
      <div
        onClick={(event) => {
          if (setIsActive) {
            setResultActive(!resultActive);
            setIsActive(!active);
            if (data?.products.length > 0) {
              router.push(`/shop?search=${query}`);
              setResultActive(false);
            }
          }
        }}
        className={`${icon === "white" ? " rounded-full bg-main2" : ""} ${
          active ? "lg:rotate-0 rotate-[60deg]" : ""
        }  duration-150 cursor-pointer z-[60]  `}
      >
        <SearchIcon color={pathname === "/ar" || pathname === "/en" || icon === "white" ? "white" : "black"} />
      </div>
    </div>
  );
};

export default SearchBox;
