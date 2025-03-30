import { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";

const Messages = ({ messages, roomId }) => {
  const endOfMessagesRef = useRef(null);
  const userid = localStorage.getItem("uuid");

  useEffect(() => {
    const timeout = setTimeout(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 400);
    return () => clearTimeout(timeout);
  }, [messages]);

  const filteredMessages = messages.filter(
    (message) => message.chat === roomId
  );
  const reversedMessages = [...filteredMessages].reverse();

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
      {reversedMessages?.map((message) => (
        <MessageBox
          key={message.message_id}
          created={message.created_at.split(" ")[0].slice(0, -3)}
          text={message.body}
          userid={userid}
          sender={message.sender}
        />
      ))}
      <div ref={endOfMessagesRef}></div>
    </div>
  );
};

export default Messages;
