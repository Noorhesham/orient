"use client";

import { useState, useEffect, ReactNode } from "react";

const MobileWrapper = ({ mobile, desktop }: { mobile: ReactNode; desktop: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{isMobile ? mobile : desktop}</>;
};

export default MobileWrapper;
