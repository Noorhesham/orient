"use client";
import { createContext, useContext, useEffect, useState } from "react";
import cookies from "js-cookie";
import { Server } from "../main/Server";
import { useQueryClient } from "@tanstack/react-query";
const AuthContext = createContext<any>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  // i want to store all the last date in a local storage array
  //on each use effect i will check if the server returned new data i will set the query client with the key of the settings that changes
  // with the new data and updated the date in the local storage ... else i will do nothing
  useEffect(() => {
    const getToken = async () => {
      const res = await Server({
        method: "POST",
        resourceName: "MGS",
        body: {
          needed: ["general_settings", "user_settings", "user2_settings", "check_auth"],
          token: cookies.get("jwt"),
        },
      });
      console.log(res)
      queryClient.setQueryData(["general_settings"], res.general_settings);
      queryClient.setQueryData(["user_settings"], res.user_settings);
      queryClient.setQueryData(["user2_settings"], res.user2_settings);
    };
    getToken();
  }, []);
  console.log(queryClient.getQueryData(["general_settings"]));
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
