import { Link, useNavigate } from "react-router-dom";
import { MessageSquareMore, Power, User, Users } from "lucide-react";
import Hambuger from "./Hambuger";
import { useState } from "react";
import clsx from "clsx";
import { logout } from "../../lib/actions";
import { motion } from "framer-motion";

const Sidebar = ({ fullname, img, setOpen, setCheck }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        `hidden sm:flex flex-col items-center justify-between border bg-white px-2 border-blue-200 rounded-2xl h-full py-4`,
        isOpen && "transition-all duration-300 ease-in-out w-[300px]",
        !isOpen && "transition-all duration-300 ease-in-out w-[70px]"
      )}
      onClick={() => setOpen(false)}
    >
      <div className={clsx("w-full flex items-center gap-20")}>
        {isOpen && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-semibold text-blue-500 pl-4"
          >
            ChatApp
          </motion.h2>
        )}
        <Hambuger isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* navlist */}
      <ul className="w-full flex flex-col items-center gap-2 py-4">
        <li className={clsx("w-full", isOpen && "px-2")}>
          <Link
            to="/"
            className="flex items-center rounded-xl hover:bg-blue-200"
            onClick={() => setCheck(false)}
          >
            <span className="grid place-content-center rounded-md transition duration-150 text-blue-600 w-[50px] h-[50px] cursor-pointer flex-col">
              <MessageSquareMore size={26} />
            </span>
            {isOpen && (
              <motion.span
                initial={{ display: "none", x: -10, opacity: 0 }}
                animate={{ display: "block", x: 0, opacity: 1 }}
                exit={{ display: "none", x: -10, opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                Chats
              </motion.span>
            )}
          </Link>
        </li>
        <li className={clsx("w-full", isOpen && "px-2")}>
          <Link
            to="/"
            onClick={() => setCheck(false)}
            className="flex items-center rounded-xl hover:bg-blue-200"
          >
            <span className="grid place-content-center rounded-md transition duration-150 text-blue-600 w-[50px] h-[50px] cursor-pointer flex-col">
              <Users size={26} />
            </span>
            {isOpen && (
              <motion.span
                initial={{ display: "none", x: -10, opacity: 0 }}
                animate={{ display: "block", x: 0, opacity: 1 }}
                exit={{ display: "none", x: -10, opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                People
              </motion.span>
            )}
          </Link>
        </li>
        <li className={clsx("w-full", isOpen && "px-2")}>
          <Link
            to="/profileview"
            className="flex items-center rounded-xl hover:bg-blue-200"
          >
            <span className="grid place-content-center rounded-md transition duration-150 text-blue-600 w-[50px] h-[50px] cursor-pointer flex-col">
              <User size={26} />
            </span>
            {isOpen && (
              <motion.span
                initial={{ display: "none", x: -10, opacity: 0 }}
                animate={{ display: "block", x: 0, opacity: 1 }}
                exit={{ display: "none", x: -10, opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                Profile
              </motion.span>
            )}
          </Link>
        </li>
        <li className={clsx("w-full", isOpen && "px-2")}>
          <p
            onClick={() => isOpen && logout(navigate)}
            className="flex items-center rounded-xl cursor-pointer hover:bg-blue-200"
          >
            <span
              className="grid place-content-center rounded-md transition duration-150 text-blue-600 w-[50px] h-[50px] cursor-pointer flex-col"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Power size={26} />
            </span>
            {isOpen && (
              <motion.span
                initial={{ display: "none", x: -10, opacity: 0 }}
                animate={{ display: "block", x: 0, opacity: 1 }}
                exit={{ display: "none", x: -10, opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                Logout
              </motion.span>
            )}
          </p>
        </li>
      </ul>

      <div className={clsx("w-full", isOpen && "px-2")}>
        <div
          onClick={() => {
            navigate("/profileview");
            // setCheck(true);
          }}
          className="flex items-center cursor-pointer gap-4"
        >
          <img
            className="object-cover object-top rounded-full w-[50px] h-[50px] cursor-pointer"
            // onClick={() => {
            //   setIsOpen(true);
            // }}
            src={img}
            alt=""
          />
          {isOpen && (
            <motion.h2
              initial={{ display: "none", x: -10, opacity: 0 }}
              animate={{ display: "block", x: 0, opacity: 1 }}
              exit={{ display: "none", x: -10, opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl capitalize font-semibold text-blue-600"
            >
              {fullname}
            </motion.h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
