import React, { useState } from "react";
import Login from "./Login";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import Register from "./Register";
import Loading from "../ui/Loading";

const Authentication = () => {
  const [form, setForm] = useState("login");

  const handleForm = () => {
    setForm(form === "register" ? "login" : "register");
  };

  const formVariants = {
    initial: {
      opacity: 0,
      overflow: "hidden",
    },
    animate: {
      opacity: 1,
      overflow: "hidden",
      transition: { duration: 0.2, stiffness: 100, ease: "easeIn" },
    },
    exit: {
      opacity: 0,
      overflow: "hidden",
      transition: { duration: 0.2, stiffness: 100, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={form}
        variants={formVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex flex-col gap-4 mx-auto w-11/12 md:w-[500px] sm:p-6 rounded-lg"
      >
        {form === "register" ? <Register /> : <Login />}
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <hr className="w-full border-t-[1px] border-zinc-400" />
            <span className="text-zinc-500 font-medium">OR</span>
            <hr className="w-full border-t-[1px] border-zinc-400" />
          </div>

          <button
            className="border-[1px] text-zinc-600 border-zinc-400 rounded-[10px] font-medium py-3 px-5 md:py-4 text-sm md:text-base lg:text-lg bg-transparent w-full capitalize"
            onClick={handleForm}
          >
            {form === "register" ? "Sign in" : "Create new account"}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Authentication;
