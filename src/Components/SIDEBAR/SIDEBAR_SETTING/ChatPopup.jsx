import { useState } from 'react';
import ChatWindow from './ChatWindow';
import MessageInput from './SIDEBAR_SETTING_COMPONENTS/MessageInput';
import { VscChromeMinimize } from 'react-icons/vsc';

export default function ChatPopup() {
  const [message, setMessage] = useState(true);
  const [popupChat, setPopupChat] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  const users = [
    { id: 1, firstName: 'Shub', lastName: 'Mishra', status: true },
    { id: 2, firstName: 'Ravi', lastName: 'Mishra', status: false },
    { id: 3, firstName: 'Ujjwal', lastName: 'Mishra', status: true },
    { id: 4, firstName: 'Ujjwal', lastName: 'Mishra', status: true },
  ];

  // -------------   CHATS   -------------
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, isSender: true }]);
    // Simulate receiving a reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: 'This is a reply!', isSender: false },
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
      <div className="absolute bottom-[17px] -right-2 h-12 p-3">
        {message && (
          <section
            className={`fixed right-0 bottom-0 w-[300px] ${
              popupChat
                ? 'border-none rounded-none h-[400px] hidden'
                : 'rounded-t-lg block'
            } bg-cyan-400 py-1 z-10 shadow-lg text-center`}
          >
            <div className="flex items-center px-4 justify-between sticky bottom-0 h-12">
              <h1 className="text-2xl text-white font-semibold text-center tracking-wider cursor-pointer">
                Chat
              </h1>
              {/* BUTTONS */}
              <div className="flex items-center gap-2">
                <button
                  className="text-white cursor-pointer text-xl font-medium"
                  onClick={() => setPopupChat(!popupChat)}
                >
                  +
                </button>
                <button
                  className="text-white cursor-pointer text-xl font-medium"
                  onClick={handleChatClick}
                >
                  -
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
      <div className="absolute bottom-0 right-0">
      {popupChat && (
        <section className="fixed right-0 bottom-0 w-[300px] h-[200px] bg-slate-50 rounded-t-md border-none overflow-y-scroll chatBar text-justify z-20">
          <div className="flex items-center justify-between text-justify bg-cyan-400 w-full py-3 px-4">
            {/* USERNAME */}
            <h1 className="text-2xl text-white font-semibold text-center tracking-wider cursor-pointer">
              Chat
            </h1>
            {/* ICONS */}
            <div className="flex items-center justify-center gap-2">
              <VscChromeMinimize
                className="text-white cursor-pointer text-xl font-medium"
                onClick={handleMaximize}
              />
              <button
                type="button"
                onClick={handleMaximize}
                className="text-white cursor-pointer text-xl font-medium"
              >
                +
              </button>
            </div>
          </div>
          {/* USERS */}
          {users?.map((user) => (
            <div className={`flex items-center gap-2`} key={user.id}>
              <div
                className={`flex items-center gap-2 p-3 border-b border-gray-300 w-full text-gray-600 font-medium cursor-pointer`}
                onClick={() => setOpenChat(true)}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    user.status ? 'bg-green-600' : 'bg-red-500'
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
            <div className="flex h-full justify-between items-center gap-2 p-3 bg-cyan-400 w-full rounded-t-lg">
              <div className="sticky bottom-0 right-0">
                <h1 className="text-2xl text-white font-semibold text-center tracking-wider cursor-pointer">
                  Shubh Mishra
                </h1>
              </div>
              {/* ICONS */}
              <div className="flex items-center justify-center gap-2">
                <VscChromeMinimize
                  className="text-white cursor-pointer text-xl font-medium"
                  onClick={() => setOpenChat(false)}
                />
                <button
                  type="button"
                  className="text-white cursor-pointer text-xl font-medium"
                >
                  +
                </button>
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
