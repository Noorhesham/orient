"use client";
import { SearchIcon } from "./Icons";
import { usePathname } from "next/navigation";

const SearchBox = ({ bg, icon, onSearch }: { bg?: string; icon?: any; onSearch?: (value: string) => void }) => {
  const pathname = usePathname();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch && onSearch(event.target.value);
  };
  return (
    <div
      className={` ${
        bg === "blue" ? `bg-main2/15 text-gray-800 ` : " bg-white/10 "
      } flex  items-center gap-10  rounded-3xl py-2 px-4`}
    >
      <input
        onChange={handleSearchChange}
        className={` w-full
          bg-transparent
          placeholder:font-[300] placeholder:my-auto outline-none placeholder:text-xs text-xs  font-medium `}
        type="text"
        placeholder="Hey, what are you looking for ?"
      />
      <div className={icon === "white" ? " px-2 py-1  rounded-full bg-main2" : ""}>
        <SearchIcon color={pathname === "/ar" || pathname === "/en" || icon === "white" ? "white" : "black"} />
      </div>
    </div>
  );
};

export default SearchBox;
