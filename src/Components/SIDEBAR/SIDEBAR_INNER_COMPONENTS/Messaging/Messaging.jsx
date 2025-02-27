import { useState, useEffect } from "react";
//external Packages
import axios from "axios";
//MUi Packages
import {
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Box,
  Badge,
} from "@mui/material";
//Icons
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SendIcon from "@mui/icons-material/Send";
//Folder Imported
import { tenant_base_url, protocal_url } from "../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

//Images Imported
import MessageImage from "../../../../assets/Message/Message.png";
import CloseImage from "../../../../assets/Message/Close.png";

const Messaging = () => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();
  //------------------------- Get Current User ID From Local Storage --------------------------------
  const CurrentUserId = localStorage.getItem("CurrentUserId");
  //----------------------------------- All States ---------------------------------------------------
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatStatus, setChatStatus] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [receiverId, setReceiverId] = useState(0);
  const [messageContent, setMessageContent] = useState("");

  // ------------------------------------------ Fetch user ----------------------------------------
  const fetchUsers = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${bearer_token}` } };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Chat/activenotactivestatus`,
        config,
      );
      if (response.status === 200) {
        setActiveUsers(response.data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
    }
  };

  //--------------------------------------- Fetch Sender Chat By ID ------------------------------------

  const fetchSenderDataById = async (receiverId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Chat/getsendmessages/${receiverId}`,
        config,
      );

      if (response.status === 200 && response.data.isSuccess) {
        const Chat = response.data.data;
        console.log("Fetch Sender response", Chat);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  
  //--------------------------------------- Fetch Receiver Chat By ID ------------------------------------

  const fetchReceiverDataById = async (receiverId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Chat/getrecievemessages/${receiverId}`,
        config,
      );

      if (response.status === 200 && response.data.isSuccess) {
        const Chat = response.data.data;
        console.log("Fetch Receiver response", Chat);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  //---------------------------------------- UseEffect call ------------------------------------
  useEffect(() => {
    fetchUsers();
    fetchSenderDataById(receiverId);
    fetchReceiverDataById(receiverId);
  }, [receiverId]);
  //------------------------------------------- Select Users Functionality --------------------------------
  const handleSelectUser = (fullName, userId) => {
    console.log("@@@@====", userId);

    setSelectedUser(fullName);
    setChatStatus((prevChat) => ({
      ...prevChat,
      [fullName]: prevChat[fullName]?.map((msg) => ({ ...msg, seen: true })),
    }));
    setReceiverId(userId);
  };
  //------------------------------------------- Count Functionality --------------------------------

  const getUnseenCount = (fullName) =>
    chatStatus[fullName]?.filter((msg) => !msg.seen).length || 0;

  //------------------------------------------- Users Initials Functionality --------------------------------

  const getInitials = (name) => {
    const words = name.split(" ");
    return words.length >= 2
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : words[0][0].toUpperCase();
  };

  // ------------------------------------------- Send Message Functionality --------------------------------
  //------------------------------------------------Handle Submit---------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem("token");
    const currentTime = new Date().toISOString(); // Ensure valid sendtime
    if (!messageContent.trim()) {
      alert("Message cannot be empty!");
      return;
    }
    const payload = {
      receiverId: receiverId,
      messageContent: messageContent,
      sendtime: currentTime,
      status: true,
      createdDate: null,
      deletedDate: null,
    };

    console.log("Payload before sending:", payload);

    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Chat/snedsms`,
        payload,
        config,
      );

      if (response.status === 200) {
        setMessageContent("");
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      alert("Failed to send message.");
    }
  };

  return (
    <>
      <div className="flex bg-gray-100 p-4 pb-0 pt-3 align-middle">
        <div className="w-full rounded-lg bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold">Messaging</h2>
        </div>
      </div>
      <div
        className="flex bg-gray-100 p-4"
        style={{ height: "calc(100% - 72px)" }}
      >
        {/* Sidebar */}
        <div className="w-1/3 rounded-lg bg-white p-4 shadow-md">
        {/* Loged in User */}
   <div>
  {activeUsers.map((user) => {
    if (parseInt(CurrentUserId) !== user.userId) return null; 

    return (
      <div
        key={user.userId}
        className="mb-2 flex items-center justify-between rounded-lg bg-cyan-500 p-2 shadow-sm "
      >
        <div className="flex items-center gap-2">
          <Badge>
            <Avatar>{getInitials(user.fullName)}</Avatar>
          </Badge>
          <span className="font-medium">{user.fullName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="relative flex h-3 w-3 items-center justify-center rounded-full shadow-xl bg-gradient-to-br from-green-400 to-green-700 mr-4"
          >
          </span>
          
        </div>
      </div>
    );
  })}
</div>
        {/* Search Bar */}
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            fullWidth
            style={{ marginBottom: "10px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
   {/* User Area */}
   <div>
  {activeUsers.map((user) => {
    if (parseInt(CurrentUserId) === user.userId) return null; 

    return (
      <div
        key={user.userId}
        className="mb-2 flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm hover:bg-gray-200"
        onClick={() => handleSelectUser(user.fullName, user.userId)}
      >
        <div className="flex items-center gap-2">
          <Badge
            badgeContent={getUnseenCount(user.fullName)}
            color="error"
            overlap="circular"
            classes={{ badge: "bg-green-500" }}
          >
            <Avatar>{getInitials(user.fullName)}</Avatar>
          </Badge>
          <span className="font-medium">{user.fullName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`relative flex h-3 w-3 items-center justify-center rounded-full shadow-xl ${
              user.status
                ? "bg-gradient-to-br from-green-400 to-green-700"
                : "bg-gradient-to-br from-orange-400 to-orange-700"
            }`}
          >
            {user.status && (
              <span className="absolute h-3 w-3 animate-ping rounded-full bg-green-400 opacity-50"></span>
            )}
            <span className="absolute inset-0 h-full w-full rounded-full bg-white opacity-20"></span>
          </span>
          <IconButton size="small">
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    );
  })}
</div>
        </div>

        {/* Chat Area */}
        <div className="ml-4 flex flex-1 flex-col rounded-lg bg-white shadow-md">
          {selectedUser ? (
            <>
              <div className="flex justify-between rounded-t-lg bg-cyan-500 px-4 py-2 font-semibold text-white">
                <span className="flex items-center">{selectedUser}</span>
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
                      <p>{msg.text}</p>
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
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleSubmit}>
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
