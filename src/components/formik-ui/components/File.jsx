/* eslint-disable react/prop-types */
import { ErrorMessage, Field } from "formik";

const FileUpload = ({ label, name, setImagePreview, ...rest }) => {
  return (
    <div className="w-full">
      <Field id={name} name={name} {...rest}>
        {({ form }) => (
          <input
            placeholder={label}
            type="file"
            className="w-full outline-none border-[1px] border-zinc-400 rounded-[10px] font-normal tracking-wide text-sm md:text-base py-3 px-4 md:py-4"
            id={name}
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              form.setFieldValue(name, file);
              setImagePreview(URL.createObjectURL(file));
            }}
            {...rest}
          />
        )}
      </Field>
      <ErrorMessage name={name} component={Error} />
    </div>
  );
};

export default FileUpload;
