import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../formik-ui/FormikControl";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Text from "../ui/Text";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../lib/actions";
import Loading from "../ui/Loading";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    setLoading(true);
    // Handle form submission
    const res = await login(values.email, values.password);
    console.log(res);

    if (res.success) {
      console.log(res.message);
      navigate("/");
      setLoading(false);
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} // Smooth transition duration
            className="w-full h-screen absolute bg-white top-0 left-0 grid place-content-center"
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className="w-full flex items-center flex-col gap-4">
            <div className="text-center pb-4 flex flex-col space-y-2 md:space-x-4">
              <Heading>
                Sign in to <span className="text-blue-500">Chat</span>
              </Heading>
              <Text align="center">
                Welcome to the chat app, please enter your email and password to
                continue
              </Text>
            </div>
            <FormikControl
              control="input"
              name="email"
              type="email"
              placeholder="Email"
            />
            <FormikControl
              control="input"
              name="password"
              type="password"
              placeholder="Password"
            />
            <Link
              to="/reset-password"
              className="text-xs md:text-sm lg:text-base tracking-normal font-medium text-blue-600"
            >
              Forgot the password?
            </Link>
            <Button type="submit">Login</Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
