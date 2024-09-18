"use client";
import React from "react";
import PaymentMethod from "./PaymentMethod";

const PaymentMethods = ({ methods }: any) => {
  const [selectedMethod, setSelectedMethod] = React.useState(0);
  return (
    <div className=" flex justify-center my-4 items-center gap-4">
      {methods.map((item: any) => (
        <PaymentMethod
          setSelected={setSelectedMethod}
          selected={selectedMethod === item.id}
          id={item.id}
          key={item.id}
          logo={item.logo}
          name={item.name}
        />
      ))}
    </div>
  );
};

export default PaymentMethods;
