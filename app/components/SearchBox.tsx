"use client";
import { useState, useRef, useEffect } from "react";
import { SearchIcon } from "./Icons";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const SearchBox = ({
  bg,
  icon,
  onSearch,
  active,
  setIsActive,
}: {
  bg?: string;
  icon?: any;
  onSearch?: (value: string) => void;
  active: boolean;
  setIsActive: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLg, setIsLg] = useState(false);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch && onSearch(event.target.value);
  };

  // Handle clicks outside the search box to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsActive(false);
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

  return (
    <div
      ref={containerRef}
      className={` ${
        bg === "blue" ? `bg-main2/15 text-gray-800 ` : !bg && !active ? " bg-white/10 " : active ? "bg-transparent" : ""
      }  relative flex lg:w-full items-center lg:gap-10 rounded-3xl mr-1  py-2 px-4 ${active&&'-translate-x-20'} duration-150`}
    >
       {isLg ? (
        <input
          ref={inputRef}
          onChange={handleSearchChange}
          className={` bg-transparent rounded-3xl duration-150 absolute py-3 px-4 lg:relative lg:px-0 lg:py-0 right-0 placeholder:font-[300] 
          placeholder:my-auto outline-none placeholder:text-xs lg:z-50 text-xs font-medium w-full`}
          type="text"
          placeholder="Hey, what are you looking for?"
        />
      ) : (
        <motion.input
          ref={inputRef}
          initial={{ width: 0 }}
          animate={{ width: active ? "350px" : 0 }}
          transition={{ duration: 0.5 }}
          onChange={handleSearchChange}
          className={`${
            active ? "bg-white/10" : "bg-transparent"
          } rounded-3xl duration-150 absolute    py-3 px-4 left-0 pl-10 placeholder:font-[300] placeholder:my-auto outline-none placeholder:text-xs text-xs font-medium ${
            active ? "z-50" : "w-0"
          }`}
          type="text"
          placeholder="Hey, what are you looking for?"
        />
      )}
      <div
        onClick={() => setIsActive(!active)}
        className={`${icon === "white" ? "px-2 py-1 rounded-full bg-main2" : ""} ${
          active ? "rotate-[60deg]" : ""
        }  duration-150 cursor-pointer z-[60] `}
      >
        <SearchIcon color={pathname === "/ar" || pathname === "/en" || icon === "white" ? "white" : "black"} />
      </div>
    </div>
  );
};

export default SearchBox;
