import { useState } from "react";
// ----------------------- MUI Components --------------------
import {
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SendIcon from "@mui/icons-material/Send";

//----------------------Images------------------------------
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
    { sender: "TR", text: "Hello", timestamp: "12:30 PM" },
    {
      sender: "TR",
      text: "How are you, How many Leads do you have today",
      timestamp: "12:31 PM",
      bold: true,
    },
    { sender: "SJ", text: "Hello", timestamp: "12:32 PM" },
    {
      sender: "SJ",
      text: "I Don’t have any",
      timestamp: "12:33 PM",
      bold: true,
    },
  ],
};

const Messaging = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <div className="flex bg-gray-100 p-4 pb-0 pt-3 align-middle">
        <div className="w-full rounded-lg bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold">Messaging</h2>
        </div>
      </div>
      <div className="flex h-svh bg-gray-100 p-4">
        {/* Sidebar */}
        <div className="w-1/3 rounded-lg bg-white p-4 shadow-md">
          <TextField
            // className="mb-4"
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
                onClick={() => setSelectedUser(user.name)}
             >
                <div className="flex items-center gap-2">
                  <Avatar>{user.initials}</Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${user.online ? "bg-green-500" : "bg-orange-500"}`}
                  ></span>
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
              <div className="flex justify-between rounded-t-lg bg-cyan-500 px-4 py-2  text-center font-semibold text-white">
                <span className="items-center flex">{selectedUser}</span>
                <IconButton size="small" onClick={() => setSelectedUser(null)}>
                  <img src={CloseImage} alt="CloseImage" />
                </IconButton>
              </div>
              <div className="flex-1 overflow-auto p-4">
                {messages[selectedUser]?.map((msg, index) => (
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
            <>
              {/* -------------------------------- No Chat Selected Part ----------------------------------- */}
              <div className="flex flex-1 items-center justify-center">
                <Box className="text-center">
                  {/* <ChatBubbleOutlineIcon style={{ fontSize: 64, color: "#333" }} /> */}
                  <img src={MessageImage} />
                  <p className="mt-2 font-medium text-gray-600">
                    No Chat has been selected
                  </p>
                </Box>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Messaging;
