import clsx from "clsx";
import { motion } from "framer-motion";

const MessageBox = ({ text, created, userid, sender }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, stiffness: 100, ease: "easeInOut" }}
      className={clsx(
        "flex flex-col",
        userid === sender && "items-end self-end",
        userid !== sender && "items-start self-start"
      )}
    >
      <div
        className={clsx(
          "text-white w-max py-2 px-4 text-sm md:text-base rounded-2xl",
          userid === sender && "bg-blue-500 self-end",
          userid !== sender && "bg-zinc-700 self-start"
        )}
      >
        {text}
      </div>
      <p className="px-2 text-sm">{created}</p>
    </motion.div>
  );
};

export default MessageBox;
