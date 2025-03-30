import FileUpload from "./components/File";
import Input from "./components/Input";
import Textarea from "./components/Textarea";

const FormikControl = (props) => {
  // eslint-disable-next-line react/prop-types
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "file":
      return <FileUpload {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
