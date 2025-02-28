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


//reactIcons
import { CgCloseO } from "react-icons/cg";
import { BsCheck2 } from "react-icons/bs";
import { BsCheck2All } from "react-icons/bs";
import { BsCheck2Circle } from "react-icons/bs";

//Folder Imported
import { tenant_base_url, protocal_url } from "../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

//Images Imported
import MessageImage from "../../../../assets/Message/Message.png";


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
  const [messages, setMessages] = useState([]);
  const [myInitials, setMyInitials] = useState("");
  const [userInitials, setUserInitials] = useState("");

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

  //--------------------------------------- Fetch messages (sent & received) By ID ------------------------------------

  const fetchMessages = async (receiverId) => {
    if (!receiverId) return;

    const config = { headers: { Authorization: `Bearer ${bearer_token}` } };

    try {
      const [sentRes, receivedRes] = await Promise.all([
        axios.get(
          `${protocal_url}${name}.${tenant_base_url}/Chat/getsendmessages/${receiverId}`,
          config,
        ),
        axios.get(
          `${protocal_url}${name}.${tenant_base_url}/Chat/getrecievemessages/${receiverId}`,
          config,
        ),
      ]);

      if (sentRes.status === 200 && receivedRes.status === 200) {
        const sentMessages = sentRes.data.data.map((msg) => ({
          ...msg,
          type: "sent",
        }));

        const receivedMessages = receivedRes.data.data.map((msg) => ({
          ...msg,
          type: "received",
        }));

        // Sort messages based on the `date` field
        const allMessages = [...sentMessages, ...receivedMessages].sort(
          (a, b) => new Date(a.date) - new Date(b.date), // Sort by date (oldest first)
        );

        setMessages(allMessages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  //---------------------------------------- UseEffect call ------------------------------------
  useEffect(() => {
    fetchUsers();
  }, [messages]);
  //------------------------------------------- Select Users Functionality --------------------------------
  const handleSelectUser = (fullName, userId) => {
    setSelectedUser(fullName);
    setChatStatus((prevChat) => ({
      ...prevChat,
      [fullName]: prevChat[fullName]?.map((msg) => ({ ...msg, seen: true })),
    }));
    setReceiverId(userId);
    setUserInitials(getInitials(fullName));
    fetchMessages(userId);
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

  //------------------------------------------- Set My Initials Functionality --------------------------------
  useEffect(() => {
    const currentUser = activeUsers.find(
      (user) => parseInt(CurrentUserId) === user.userId,
    );
    if (currentUser) {
      setMyInitials(getInitials(currentUser.fullName));
    }
  }, [CurrentUserId, activeUsers]);

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
        fetchMessages();
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      alert("Failed to send message.");
    }
  };

  return (
    <>
      <div className="flex p-4 pt-3 pb-0 align-middle bg-gray-100">
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Messaging</h2>
        </div>
      </div>
      <div
        className="flex p-4 bg-gray-100"
        style={{ height: "calc(100% - 72px)" }}
      >
        {/* ------------------------------------------------------- Sidebar --------------------------------------------- */}
        <div className="w-1/3 p-4 bg-white rounded-lg shadow-md">
          {/* ------------------------------------------ Loged in User ------------------------------------------ */}
          <div>
            {activeUsers.map((user) => {
              if (parseInt(CurrentUserId) !== user.userId) return null;

              return (
                <div
                  key={user.userId}
                  className="flex items-center justify-between p-2 mb-2 rounded-lg shadow-sm bg-cyan-500"
                >
                  <div className="flex items-center gap-2">
                    <Badge>
                      <Avatar>{getInitials(user.fullName)}</Avatar>
                    </Badge>
                    <span className="font-medium">{user.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex items-center justify-center w-3 h-3 mr-4 rounded-full shadow-xl bg-gradient-to-br from-green-400 to-green-700 "></span>
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
          {/* ---------------------------------------------- User Area ---------------------------------------------------- */}
          <div>
            {activeUsers.map((user) => {
              if (parseInt(CurrentUserId) === user.userId) return null;

              return (
                <div
                  key={user.userId}
                  className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200"
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
                        <span className="absolute w-3 h-3 bg-green-400 rounded-full opacity-50 animate-ping"></span>
                      )}
                      <span className="absolute inset-0 w-full h-full bg-white rounded-full opacity-20"></span>
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

        {/* ------------------------------------------------------- Chat Area ----------------------------------------------- */}
        <div className="flex flex-col flex-1 ml-4 bg-white rounded-lg shadow-md">
          {selectedUser ? (
            <>
              {/* ---------------------------------------------- Heading ------------------------------------------- */}
              <div className="flex justify-between px-4 py-2 font-semibold text-white rounded-t-lg bg-cyan-500">
                <span className="flex items-center">{selectedUser}</span>
                <IconButton size="small" onClick={() => setSelectedUser(null)}>
                <CgCloseO size={22} className="text-white text-semibold"/> 
                </IconButton>
              </div>
              {/* -------------------------------------------------- Chat Box --------------------------------------------------- */}
              <div className="flex-1 p-4 overflow-auto">
                {messages.map((msg, index) => {
                  return parseInt(CurrentUserId) === msg.senderId ? (
                    <div key={index} className="flex items-center justify-end gap-3 mb-2">
                      <div className="p-2 ml-2 bg-gray-200 rounded-lg shadow">
                        <p>{msg.messageContent}</p>
                        <span className="text-xs italic">{(msg.date.replace('T', ' ').split('.')[0]).split(' ').reverse().join(' ')}</span>
                      </div>
                      <Avatar>{myInitials}</Avatar>
                    </div>
                  ) : (
                    <div key={index} className="flex items-center justify-start mb-2">
                      <Avatar>{userInitials}</Avatar>
                      <div className="p-2 ml-2 bg-gray-200 rounded-lg shadow">
                        <p>{msg.messageContent}</p>
                        <span className="text-xs italic">{(msg.date.replace('T', ' ').split('.')[0]).split(' ').reverse().join(' ')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ------------------------------------------- Text Box ------------------------------------------------------------ */}
              <div className="p-2 border-t">
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
            <div className="flex items-center justify-center flex-1">
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
