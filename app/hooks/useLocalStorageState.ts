"use client";
import cookies from "js-cookie";
import { useState, useEffect } from "react";
export function useLocalStorageState<T>(
  initialState: T,
  key: string,
  cookie = false
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(function () {
    const storedValue = global?.window?.localStorage?.getItem(key);
    if (cookie) {
      cookies.set(key, storedValue || JSON.stringify(initialState));
    }
    if (!storedValue) localStorage.setItem(key, JSON.stringify(initialState));
    return storedValue && storedValue !== "undefined" ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      if (!localStorage.getItem(key)) window.location.reload(), localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
