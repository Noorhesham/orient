"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, Variants, useCycle } from "framer-motion";
import { useDimensions } from "../hooks/useDimensions";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const BurgerMenu = ({ links }: { links: any[] }) => {
  const [isOpen, toggleOpen] = useCycle(false, true); // is switches between the vals on each trigger
  const containerRef = useRef(null); //the nav bar container
  const { height } = useDimensions(containerRef);
  const [white, setWhite] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setWhite((w) => !w);
    }, 300);
  }, [isOpen]);
  return (
    <motion.nav
      className={`   h-full  absolute inset-0 ${white ? "bg-white  " : ""} `}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div
        className={` overflow-y-auto   absolute top-0 left-0  w-[300px] bottom-0 min-h-full  bg-white`}
        variants={sidebar}
      />
      <Navigation isOpen={isOpen} links={links} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
const Path = ({ ...props }: { variants?: Variants; d?: string; transition?: object }) => (
  <motion.path fill="transparent" strokeWidth="3" stroke="hsl(0, 0%, 18%)" strokeLinecap="round" {...props} />
);
const MenuToggle = ({ toggle }: { toggle: () => void }) => {
  return (
    <button className=" absolute w-30 h-20 top-1 left-7  bottom-0 rounded-xl z-[98]" onClick={toggle}>
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  );
};

const variants = {
  open: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({ links, isOpen }: { links: any[]; isOpen: boolean }) => (
  <motion.ul
    className={` absolute ${isOpen ? " z-[999] " : "z-[-1]"} top-20    px-10 py-5 w-full h-full`}
    variants={variants}
  >
    {links.map((link, i) => (
      <MenuItem isOpen={isOpen} link={link} i={i} key={i} />
    ))}
  </motion.ul>
);
const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF", "#7700FF"];

const MenuItem = ({ i, link, isOpen }: { i: number; link: any; isOpen: boolean }) => {
  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      className={` flex  w-[180px]  items-center z-[999]`}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-placeholder" style={style} />
      <div className="text-placeholder" style={style} />
      {link.subLinks ? (
        <Accordion className={` z-[999] w-full ml-3`} type="single" collapsible>
          <AccordionItem className=" w-full" value="item-1">
            <AccordionTrigger>{link.text}</AccordionTrigger>
            <AccordionContent className=" flex flex-col gap-2">
              {link.subLinks.map((subLink: any, i: number) => (
                <Link key={i} className=" ml-3 py-2 px-3 text-nowrap" href={subLink.href || ""}>
                  {subLink.text}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <Link className=" ml-3 py-2 px-3 text-nowrap" href={link.href || ""}>
          {link.text}
        </Link>
      )}
    </motion.li>
  );
};

export default BurgerMenu;
