"use client";
import React from "react";
import PaymentMethod from "./PaymentMethod";

const PaymentMethods = ({ methods, defaultPayment }: any) => {
  const [selectedMethod, setSelectedMethod] = React.useState(defaultPayment || 0);
  console.log(defaultPayment, methods);
  return (
    <div className=" flex justify-start my-4 items-center gap-4  lg:gap-8">
      {methods.map((item: any) => (
        <PaymentMethod
          setSelected={setSelectedMethod}
          selected={selectedMethod === item.id}
          id={item.id}
          key={item.id}
          logo={item.logo}
          name={item.title}
        />
      ))}
    </div>
  );
};

export default PaymentMethods;
