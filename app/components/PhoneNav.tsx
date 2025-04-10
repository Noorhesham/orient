"use client";
import React, { useRef, useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 1, scale: 0 },
  exit: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const PhoneNav = ({ navigation, isHome }: { navigation: any; isHome?: boolean }) => {
  const pathName = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const [openNavigation, setOpenNavigation] = useState(false);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (openNavigation && window.innerWidth <= 1024 && ref.current && !ref.current.contains(e.target as Node)) {
      setOpenNavigation(false);
      enablePageScroll();
    }
  };

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  return (
    <div ref={ref}>
      <AnimatePresence>
        {openNavigation && (
          <motion.nav
            variants={container}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 bg-black/40 w-full h-screen backdrop-blur-lg bottom-0 uppercase right-0 z-[999] bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent"
            onClick={handleClickOutside}
          >
            <MaxWidthWrapper className="relative z-[9999] mt-32 my-auto h-full w-full flex flex-col gap-4 items-center justify-start mx-auto lg:flex-row">
              <div onClick={toggleNavigation} className="absolute top-4 right-4">
                <CloseSvg />
              </div>
              {navigation.map((link: any, i: number) =>
                link.subLinks ? (
                  <Accordion key={i} className="text-gray-50 z-[999] w-full" type="single" collapsible>
                    <AccordionItem className="w-full" value={`item-${i}`}>
                      <AccordionTrigger className="font-medium uppercase">
                        {t(`${link.text.toLowerCase()}`)}
                      </AccordionTrigger>
                      <AccordionContent className="flex z-50 flex-col gap-2">
                        {link.subLinks.map((subLink: any, i: number) => (
                          <Link
                            onClick={() => {
                              setOpenNavigation(false);
                              enablePageScroll();
                            }}
                            key={i}
                            className="py-2 px-3 text-nowrap"
                            href={subLink.href || ""}
                          >
                            {t(`${subLink.text.toLowerCase()}`)}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <motion.div key={i} variants={item} className="border-gray-50 border-b py-4 w-full">
                    <Link
                      href={link.href || ""}
                      className={`text-balance my-2 z-50 w-full text-start text-gray-50 font-medium ${
                        pathName === link.url ? "text-main" : ""
                      }`}
                      onClick={() => {
                        setOpenNavigation(false);
                        enablePageScroll();
                      }}
                    >
                      {t(`${link.text.toLowerCase()}`)}
                    </Link>
                  </motion.div>
                )
              )}
            </MaxWidthWrapper>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Button that toggles the navigation */}
      <button className="z-[999999] mt-1  hover:opacity-90 duration-150" onClick={toggleNavigation}>
        {<MenuSvg isHome={isHome} />}
      </button>
    </div>
  );
};

export default PhoneNav;

// Menu Icon
// Menu Icon
const MenuSvg = ({ isHome }: { isHome?: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ff4d6d" // Pink color
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// Close Icon (Same pink color)
const CloseSvg = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ff4d6d" // Pink color
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
