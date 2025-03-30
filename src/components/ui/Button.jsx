import React from "react";

const Button = ({ children, type = "button" }) => {
  return (
    <button
      type={type}
      className="font-normal text-white py-3 px-5 md:py-4 text-sm md:text-base lg:text-lg bg-blue-500 hover:bg-blue-600 w-full rounded-[10px] "
    >
      {children}
    </button>
  );
};

export default Button;
