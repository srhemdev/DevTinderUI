import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import createSocketConnection from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector(store => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;
    socket.emit("joinchat", { userId, targetUserId });

    socket.on("messageReceived", ({ userId: fromUserId, text }) => {
      setMessages(prev => [...prev, { userId: fromUserId, text }]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    socketRef.current?.emit("sendMessage", { userId, targetUserId, text: newMessage });
    setMessages(prev => [...prev, { userId, text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="mt-[90px] p-5 border border-gray-600  w-1/2 mx-auto flex flex-col items-center h-[70vh]">
      <h1 className="">Chat</h1>
      <div className="pt-5 flex-1 w-full overflow-y-auto">
        {messages.map((message, idx) => (
          <div key={idx} className={`chat ${message?.userId !== targetUserId ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-bubble">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="mt-auto w-full flex items-center gap-3 pt-5 border-t border-gray-600">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="input input-bordered flex-1"
        />
        <button className="btn btn-secondary" onClick={sendMessage}>Send</button>
      </div>
    </div >
  )
}

export default Chat;