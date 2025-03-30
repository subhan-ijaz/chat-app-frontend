import { ErrorMessage, Field } from "formik";
import Error from "./Error";

const Input = (props) => {
  const { label, name, ...rest } = props;

  return (
    <div className="w-full">
      <Field
        id={name}
        className="w-full outline-none border-[1px] border-zinc-400 rounded-[10px] font-normal tracking-wide text-sm md:text-base py-3 px-4 md:py-4"
        name={name}
        {...rest}
      />
      <ErrorMessage name={name} component={Error} />
    </div>
  );
};

export default Input;
