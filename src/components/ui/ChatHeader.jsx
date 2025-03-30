import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ image, name, setIsOpen }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-5 w-full rounded-b-3xl border-b-[1px] border-blue-300 h-[10%] bg-white">
      <div className="flex items-center gap-4">
        <button
          className="text-blue-500"
          onClick={() => {
            navigate("/");
            setIsOpen(false);
          }}
        >
          <ChevronLeft />
        </button>
        <div>
          <img
            className="w-12 h-12 rounded-full object-cover object-top"
            src={image}
            alt=""
          />
        </div>
        <h2 className="text-xl capitalize font-semibold text-blue-600">
          {name}
        </h2>
      </div>
    </div>
  );
};

export default ChatHeader;
