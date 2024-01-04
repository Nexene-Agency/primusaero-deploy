"use client";
import Print from "@components/icons/Print";
import React from "react";

const PrintIcon = () => {

  const print = () => {
    window?.print();
  };

  return (
    <a onClick={print}><Print className="text-black cursor-pointer"/></a>
  );
};

export default PrintIcon;