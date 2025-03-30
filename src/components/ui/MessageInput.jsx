import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Error from "../formik-ui/components/Error";
import Button from "./Button";
import { SendHorizontal } from "lucide-react";

const MessageInput = ({ sendMessage }) => {
  const validationSchema = Yup.object({
    message: Yup.string()
      .required("Message is required")
      .min(1, "Message must be at least 1 character")
      .max(500, "Message cannot be longer than 500 characters"),
  });

  const handleSubmit = (values, { resetForm }) => {
    resetForm();
    sendMessage(values.message);
    console.log(values.message);
  };

  return (
    <div className="flex items-center justify-between px-5 w-full border-t-[1px] border-blue-300 h-[10%] bg-white">
      <Formik
        initialValues={{ message: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full flex gap-2">
          <Field
            id="message"
            placeholder="Enter a Message..."
            className="w-full outline-none border-[1px] border-blue-400 rounded-[10px] font-normal tracking-wide text-sm md:text-base py-3 px-4 md:py-4"
            name="message"
          />
          <ErrorMessage name="message" component={Error} />
          <div className="w-max">
            <Button type="submit">
              <SendHorizontal />
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MessageInput;
