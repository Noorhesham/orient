"use client";

import React, { useEffect, useState } from "react";

interface MobileOnlyProps {
  children: React.ReactNode;
}

export default function MobileOnly({ children }: MobileOnlyProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Check initially
    checkScreen();

    // Add a resize event listener
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isMobile) return null;
  return <>{children}</>;
}
