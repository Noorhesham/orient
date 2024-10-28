"use client";
import { createContext, useContext, useState } from "react";
interface loadingInterface {
  loading: boolean;
  setLoading: any;
}
const LoadingContext = createContext<loadingInterface | undefined>(undefined);

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  return <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>;
};

export default LoadingProvider;
export const useIsLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useIsLoading must be used within a LoadingProvider");
  }
  return context;
};
