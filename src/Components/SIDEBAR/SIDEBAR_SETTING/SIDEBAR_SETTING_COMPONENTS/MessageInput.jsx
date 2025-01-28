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
      <section className="z-20 w-[400px] rounded-t-md bg-white px-2 py-4">
        {/* INPUT */}
        <div className="mt-auto flex h-full w-full flex-col justify-end gap-2 px-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full rounded-md px-4 py-3 text-sm font-light ring-1 ring-blue-300"
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />
          <button
            className="w-full cursor-pointer rounded-md border-none bg-cyan-400 px-4 py-2 text-sm font-medium ring-1 ring-blue-300"
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
