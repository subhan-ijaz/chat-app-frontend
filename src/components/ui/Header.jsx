import React from "react";
import { motion } from "framer-motion";

const Header = ({ fullname, img }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ stiffness: 100, duration: 0.5, ease: "easeInOut" }}
        className="sm:hidden bg-white flex items-center justify-between px-5 w-full rounded-b-[30px] border-b-[1px] border-blue-300 h-[80px]"
      >
        <h2 className="text-xl font-semibold text-blue-500">ChatApp</h2>
        <div className="flex items-center gap-2">
          <h2 className="text-base capitalize font-normal">{fullname}</h2>
          <img
            className="rounded-full w-10 h-10 object-cover object-top"
            src={img}
            alt=""
          />
        </div>
      </motion.div>
    </>
  );
};

export default Header;
