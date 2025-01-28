import { useState } from "react";
import ChatWindow from "./ChatWindow";
import MessageInput from "./SIDEBAR_SETTING_COMPONENTS/MessageInput";
import { VscChromeMinimize } from "react-icons/vsc";
import { FaPlus, FaWindowMinimize } from "react-icons/fa";

export default function ChatPopup() {
  const [message, setMessage] = useState(true);
  const [popupChat, setPopupChat] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  const users = [
    { id: 1, firstName: "Shub", lastName: "Mishra", status: true },
    { id: 2, firstName: "Ravi", lastName: "Mishra", status: false },
    { id: 3, firstName: "Ujjwal", lastName: "Mishra", status: true },
    { id: 4, firstName: "Ujjwal", lastName: "Mishra", status: true },
  ];

  // -------------   CHATS   -------------
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, isSender: true }]);
    // Simulate receiving a reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "This is a reply!", isSender: false },
      ]);
    }, 1000);
  };

  const handleChatClick = () => {
    setPopupChat(false);
    setMessage(false);
  };

  const handleMaximize = () => {
    setPopupChat(false);
  };

  return (
    <>
      <div className="absolute bottom-[17px] right-2 h-12 p-3">
        {message && (
          <section
            className={`fixed bottom-0 right-4 w-[300px] ${
              popupChat
                ? "hidden h-[400px] rounded-none border-none"
                : "block rounded-t-lg"
            } z-10 bg-cyan-400 py-1 text-center opacity-70 shadow-lg`}
          >
            <div className="sticky bottom-0 flex h-8 items-center justify-between px-6">
              <h1 className="cursor-pointer text-center text-xl font-semibold tracking-wider text-cyan-900">
                Chat
              </h1>
              {/* BUTTONS */}
              <div className="flex items-center gap-2">
                <FaPlus
                  className="cursor-pointer text-white"
                  onClick={() => setPopupChat(true)}
                ></FaPlus>
                <FaWindowMinimize
                  className="mb-2 cursor-pointer text-white"
                  onClick={() => setPopupChat(false)}
                />
              </div>
            </div>
          </section>
        )}
      </div>
      <div className="absolute bottom-0 right-0">
        {popupChat && (
          <section className="chatBar fixed bottom-0 right-0 z-20 h-[200px] w-[300px] overflow-y-scroll rounded-t-md border-none bg-slate-50 text-justify">
            <div className="flex w-full items-center justify-between bg-cyan-400 px-4 py-2 text-justify">
              {/* USERNAME */}
              <h1 className="cursor-pointer text-center text-xl font-semibold tracking-wider text-white">
                Chat
              </h1>
              {/* ICONS */}
              <div className="flex items-center justify-center gap-2">
                <FaPlus
                  type="button"
                  onClick={() => setOpenChat(true)}
                  className="cursor-pointer text-white"
                ></FaPlus>
                <FaWindowMinimize
                  className="mb-2 cursor-pointer text-white"
                  onClick={() => setPopupChat(false)}
                />
              </div>
            </div>
            {/* USERS */}
            {users?.map((user) => (
              <div className={`flex items-center gap-2`} key={user.id}>
                <div
                  className={`flex w-full cursor-pointer items-center gap-2 border-b border-gray-300 p-3 font-medium text-gray-600`}
                  onClick={() => setOpenChat(true)}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      user.status ? "bg-green-600" : "bg-red-500"
                    }`}
                  ></div>
                  <p className="text-sm">{user.firstName}</p>
                  <p className="text-sm">{user.lastName}</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
      <div className="absolute bottom-0 right-[18.7rem]">
        {openChat && (
          <section className="fixed bottom-0 right-[18.7rem] rounded-t-lg border bg-slate-50">
            <div className="flex h-full w-full items-center justify-between gap-2 rounded-t-lg bg-cyan-400 p-3">
              <div className="sticky bottom-0 right-0">
                <h1 className="cursor-pointer text-center text-2xl font-semibold tracking-wider text-white">
                  Shubh Mishra
                </h1>
              </div>
              {/* ICONS */}
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  className="cursor-pointer text-xl font-medium text-white"
                >
                  +
                </button>
                <VscChromeMinimize
                  className="cursor-pointer text-xl font-medium text-white"
                  onClick={() => setOpenChat(false)}
                />
              </div>
            </div>
            <ChatWindow messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
          </section>
        )}
      </div>
    </>
  );
}
