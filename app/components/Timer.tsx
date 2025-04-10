import React, { useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
const TIME_TO_OTP = 60;
const Timer = ({ setFn }: { setFn: any }) => {
  const [secs, setSecs] = useLocalStorageState(TIME_TO_OTP, "time");
  useEffect(() => {
    if (secs === 0) {
      localStorage.setItem("time", String(TIME_TO_OTP));
      setSecs(TIME_TO_OTP);
    }
  }, []);
  useEffect(() => {
    const t = setInterval(() => {
      setSecs((s: number) => (s <= 1 ? 0 : s - 1));
      if (secs === 0) setFn();
    }, 1000);

    return () => clearInterval(t);
  }, [secs]);
  console.log(secs);
  return (
    <div className=" text-pink-400 mx-5 font-semibold fill-pink-400 " style={{ width: 70, height: 70 }}>
      <CircularProgressbar value={(secs / TIME_TO_OTP) * 100} text={`${(secs < 10 && 0) || ""}${secs}`} />
    </div>
  );
};

export default Timer;
