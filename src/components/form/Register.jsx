import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../formik-ui/FormikControl";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Text from "../ui/Text";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../lib/actions";
import Loading from "../ui/Loading";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const navigate = useNavigate();

  const onSubmit = async (values, { resetForm }) => {
    // Handle form submission
    setLoading(true);
    const res = await register(values);

    if (res.success) {
      console.log(res);
      console.log(res.message);
      navigate("/profile");
      setLoading(false);
      resetForm();
    } else {
      navigate("/");
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
            transition={{ duration: 0.5 }}
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
              <Heading>Create New Account</Heading>
              <Text align="center">
                Welcome to the chat app, please enter your information
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
              name="first_name"
              type="text"
              placeholder="First Name"
            />
            <FormikControl
              control="input"
              name="last_name"
              type="text"
              placeholder="Last Name"
            />
            <FormikControl
              control="input"
              name="password"
              type="password"
              placeholder="Password"
            />
            {formik.isSubmitting && console.log("Submitting!")}
            <Button type="submit">Register</Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
