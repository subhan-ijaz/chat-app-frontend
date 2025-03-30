import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import { useSearchParams } from "react-router-dom";
import { useProfile } from "../../lib/profileContext";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { getMessages } from "../../lib/actions";

const Chat = ({ setIsOpen }) => {
  const [searchParams] = useSearchParams();
  const userid = searchParams.get("userid");
  const profile = searchParams.get("q");
  const { users } = useProfile();
  const user = users?.find((user) => user.id === profile);
  const [inputVal, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [roomId, setRoomId] = useState([]);
  const [uuid] = useState(localStorage.getItem("uuid"));

  useEffect(() => {
    // Fetch messages
    (async function () {
      const res = await getMessages();
      setMessages(res);
    })();

    if (userid && uuid) {
      // Create WebSocket connection
      const socket = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${userid}/?user_id=${uuid}`
      );

      // Set WebSocket instance on open
      socket.onopen = () => {
        console.log("WebSocket connection established");
        setWs(socket);
      };

      // Handle WebSocket errors
      socket.onerror = (event) => {
        console.error("WebSocket connection error", event);
      };

      // Handle incoming messages
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.room) {
            localStorage.setItem("room", data.room);
            setRoomId(data.room);
          } else {
            setMessages((prevMessages) => {
              const isDuplicate = prevMessages.some(
                (msg) => msg.message_id === data.message_id
              );

              if (!isDuplicate) {
                return [data, ...prevMessages];
              }

              return prevMessages;
            });
          }
        } catch (error) {
          console.error("Error parsing message", error);
        }
      };

      // Clean up WebSocket connection on unmount
      return () => {
        console.log("Closing WebSocket connection");
        socket.close();
      };
    }
  }, [userid, uuid]);

  const sendMessage = (message) => {
    if (ws) {
      const send = { body: message };
      ws.send(JSON.stringify(send));
    } else {
      console.error("WebSocket connection not established");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-start">
      <ChatHeader
        setIsOpen={setIsOpen}
        image={user?.image}
        name={user?.fullname}
      />
      <div className="w-full h-[80%] px-6 md:p-6 lg:p-10 ">
        <Messages
          messages={messages}
          sendMessage={sendMessage}
          inputVal={inputVal}
          setValue={setValue}
          roomId={roomId}
        />
      </div>
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
