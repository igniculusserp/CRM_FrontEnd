const ChatWindow = ({ messages }) => {
  return (
    <div className="w-[400px] h-[150px] bg-white rounded-t-md overflow-y-auto p-4 space-y-2">
      {messages?.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`p-3 h-18 rounded-lg flex flex-col justify-end ${
              msg.isSender
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            <p className="text-md font-medium text-start">{msg.text}</p>
            <span className="text-xs font-medium text-end">2 min ago.</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;