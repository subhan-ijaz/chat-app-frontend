import React, { useEffect, useState } from "react";
import clsx from "clsx";

const Hambuger = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={clsx(
        "flex w-[50px] h-[50px] cursor-pointer flex-col relative items-center",
        isOpen && "justify-center self-end",
        !isOpen && "justify-evenly"
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span
        className={clsx(
          "border-t-2 border-blue-500 w-3/4 transition duration-500",
          isOpen && "absolute -rotate-45",
          !isOpen && "rotate-180"
        )}
      ></span>
      <span
        className={clsx(
          "border-t-2 border-blue-500 w-3/4 transition duration-500",
          isOpen && "opacity-0",
          !isOpen && "opacity-1"
        )}
      ></span>
      <span
        className={clsx(
          "border-t-2 border-blue-500 w-3/4 transition duration-500",
          isOpen && "absolute rotate-45",
          !isOpen && "-rotate-180"
        )}
      ></span>
    </div>
  );
};

export default Hambuger;
