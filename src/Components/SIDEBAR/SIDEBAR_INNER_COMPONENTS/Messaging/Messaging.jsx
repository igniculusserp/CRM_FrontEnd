import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Box,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SendIcon from "@mui/icons-material/Send";
import MessageImage from "../../../../assets/Message/Message.png";
import CloseImage from "../../../../assets/Message/Close.png";

const users = [
  { name: "Shreyash Jain", initials: "SJ", online: true },
  { name: "Jaya Gogwani", initials: "JG", online: false },
  { name: "Niranjan Trivedi", initials: "NT", online: true },
  { name: "Tarun Raikwar", initials: "TR", online: true },
];

const messages = {
  "Shreyash Jain": [
    { sender: "TR", text: "Hello", timestamp: "12:30 PM", seen: true },
    { sender: "SJ", text: "Hello", timestamp: "12:32 PM", seen: true },
    { sender: "TR", text: "How are you?", timestamp: "12:31 PM", bold: true, seen: false },
    { sender: "SJ", text: "I Don’t have any", timestamp: "12:33 PM", bold: true, seen: false },
  ],
  "Jaya Gogwani": [
    { sender: "NT", text: "Hey, Jaya!", timestamp: "1:00 PM", seen: false },
  ],
  "Niranjan Trivedi": [
    { sender: "TR", text: "Meeting at 3 PM", timestamp: "2:30 PM", seen: true },
  ],
  "Tarun Raikwar": [
    { sender: "SJ", text: "Call me", timestamp: "4:00 PM", seen: false },
  ],
};

const Messaging = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatStatus, setChatStatus] = useState(messages);

  const handleSelectUser = (userName) => {
    setSelectedUser(userName);
    
    // Mark all messages as seen for the selected user
    setChatStatus((prevChatStatus) => ({
      ...prevChatStatus,
      [userName]: prevChatStatus[userName]?.map((msg) => ({ ...msg, seen: true })),
    }));
  };

  // Function to count unseen messages for each user
  const getUnseenCount = (userName) => {
    return chatStatus[userName]?.filter((msg) => !msg.seen).length || 0;
  };

  return (
    <>
      <div className="flex bg-gray-100 p-4 pb-0 pt-3 align-middle">
        <div className="w-full rounded-lg bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold">Messaging</h2>
        </div>
      </div>
      <div className="flex bg-gray-100 p-4" style={{ height: "calc(100% - 72px)" }}>
        {/* Sidebar */}
        <div className="w-1/3 rounded-lg bg-white p-4 shadow-md">
          <TextField
            style={{ marginBottom: "10px" }}
            variant="outlined"
            placeholder="Search"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <div>
            {users.map((user, index) => (
              <div
                key={index}
                className="mb-2 flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm hover:bg-gray-200"
                onClick={() => handleSelectUser(user.name)}
              >
                <div className="flex items-center gap-2">
                  <Badge
                    badgeContent={getUnseenCount(user.name)}
                    color="error"
                    overlap="circular"
                  >
                    <Avatar>{user.initials}</Avatar>
                  </Badge>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${user.online ? "bg-green-500" : "bg-orange-500"}`}></span>
                  <IconButton size="small">
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="ml-4 flex flex-1 flex-col rounded-lg bg-white shadow-md">
          {selectedUser ? (
            <>
              <div className="flex justify-between rounded-t-lg bg-cyan-500 px-4 py-2 text-center font-semibold text-white">
                <span className="items-center flex">{selectedUser}</span>
                <IconButton size="small" onClick={() => setSelectedUser(null)}>
                  <img src={CloseImage} alt="Close" />
                </IconButton>
              </div>
              <div className="flex-1 overflow-auto p-4">
                {chatStatus[selectedUser]?.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "SJ" ? "justify-end" : "justify-start"} mb-2`}
                  >
                    <Avatar>{msg.sender}</Avatar>
                    <div className="ml-2 rounded-lg bg-gray-200 p-2 shadow">
                      <p className={msg.bold ? "font-bold" : ""}>{msg.text}</p>
                      <span className="text-xs italic">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-2">
                <TextField
                  fullWidth
                  placeholder="Type your message here"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <Box className="text-center">
                <img src={MessageImage} alt="No Chat Selected" />
                <p className="mt-2 font-medium text-gray-600">
                  No Chat has been selected
                </p>
              </Box>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Messaging;
