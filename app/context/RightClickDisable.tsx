"use client";
import { createContext } from "react";
const RightClickContext = createContext(undefined);

const RightClickProvider = ({ children }: { children: React.ReactNode }) => {
  global?.document?.addEventListener("contextmenu", (event) => event.preventDefault());

  return <RightClickContext.Provider value={undefined}>{children}</RightClickContext.Provider>;
};

export default RightClickProvider;
