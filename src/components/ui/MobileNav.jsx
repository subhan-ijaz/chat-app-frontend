import { Link, useNavigate } from "react-router-dom";
import { MessageSquareMore, Power, User, Users } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { logout } from "../../lib/actions";

const MobileNav = ({ setCheck }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ stiffness: 100, duration: 0.5, ease: "easeInOut" }}
      className="w-full sm:hidden block fixed shadow-lg bg-white bottom-0 rounded-t-[30px] border-t-[1px] border-blue-200"
    >
      <ul className="w-full flex items-center gap-2 justify-around py-2">
        <li>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl w-16 h-16 flex-col hover:bg-blue-200"
          >
            <span className=" text-blue-600 cursor-pointer flex-col">
              <MessageSquareMore size={26} />
            </span>
            <span className="text-xs">Chats</span>
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl w-16 h-16 flex-col hover:bg-blue-200"
          >
            <span className=" text-blue-600 cursor-pointer flex-col">
              <Users size={26} />
            </span>
            <span className="text-xs">People</span>
          </Link>
        </li>
        <li>
          <Link
            to="/profileview"
            className="flex items-center justify-center gap-2 rounded-xl w-16 h-16 flex-col hover:bg-blue-200"
          >
            <span className=" text-blue-600 cursor-pointer flex-col">
              <User size={26} />
            </span>
            <span className="text-xs">Profile</span>
          </Link>
        </li>
        <li>
          <p
            onClick={() => logout(navigate)}
            className="cursor-pointer flex items-center justify-center gap-2 rounded-xl w-16 h-16 flex-col hover:bg-blue-200"
          >
            <span className=" text-blue-600 cursor-pointer flex-col">
              <Power size={26} />
            </span>
            <span className="text-xs">Logout</span>
          </p>
        </li>
      </ul>
    </motion.div>
  );
};

export default MobileNav;
