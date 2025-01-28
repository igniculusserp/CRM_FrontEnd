const ChatWindow = ({ messages }) => {
  return (
    <div className="h-[150px] w-[400px] space-y-2 overflow-y-auto rounded-t-md bg-white p-4">
      {messages?.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.isSender ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`h-18 flex flex-col justify-end rounded-lg p-3 ${
              msg.isSender
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <p className="text-md text-start font-medium">{msg.text}</p>
            <span className="text-end text-xs font-medium">2 min ago.</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
