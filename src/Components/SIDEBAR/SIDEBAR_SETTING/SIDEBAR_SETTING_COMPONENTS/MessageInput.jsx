import { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [chat, setChat] = useState("");

  const handleSend = () => {
    if (chat.trim() !== "") {
      onSendMessage(chat);
      setChat("");
    }
  };

  return (
    <>
      <section className="w-[400px] rounded-t-md bg-white py-4 px-2 z-20">
        {/* INPUT */}
        <div className="flex h-full mt-auto flex-col w-full justify-end px-2 gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="py-3 px-4 text-sm ring-1 ring-blue-300 rounded-md w-full font-light"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />
          <button
            className="py-2 px-4 text-sm ring-1 ring-blue-300 rounded-md w-full font-medium bg-cyan-400 border-none cursor-pointer"
            onClick={handleSend}
          >
            Chat
          </button>
        </div>
      </section>
    </>
  );
};

export default MessageInput;
