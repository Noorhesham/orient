"use client";

import React, { useEffect, useState } from "react";

interface DesktopOnlyProps {
  children: React.ReactNode;
}

export default function DesktopOnly({ children }: DesktopOnlyProps) {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isDesktop) return null;
  return <>{children}</>;
}
