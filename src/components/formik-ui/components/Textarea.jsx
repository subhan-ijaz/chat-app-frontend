import { ErrorMessage, Field } from "formik";
import Error from "./Error";

const Textarea = ({ label, name, value, ...rest }) => {
  return (
    <div className="w-full">
      <Field
        id={name}
        name={name}
        as="textarea"
        placeholder={label}
        value={value}
        rows={4}
        className="w-full outline-none border-[1px] border-zinc-400 rounded-[10px] font-normal tracking-wide text-sm md:text-base py-3 px-4 md:py-4"
        {...rest}
      />
      <ErrorMessage name={name} component={Error} />
    </div>
  );
};

export default Textarea;
