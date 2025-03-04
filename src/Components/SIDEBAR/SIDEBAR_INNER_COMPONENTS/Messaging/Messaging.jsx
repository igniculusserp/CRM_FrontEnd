import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

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
import LongMenu from "./LongMenu";

//reactIcons
import { CgCloseO } from "react-icons/cg";
import { BsCheck2 } from "react-icons/bs";
import { BsCheck2All } from "react-icons/bs";
// import { BsCheck2Circle } from "react-icons/bs";

//Folder Imported
import { tenant_base_url, protocal_url } from "../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

//Images Imported
import MessageImage from "../../../../assets/Message/Message.png";

// External Emoji Files
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const Messaging = () => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();
  const messagesEndRef = useRef(null);
  const location = useLocation();
  //------------------------- Get Current User ID From Local Storage --------------------------------
  const CurrentUserId = localStorage.getItem("CurrentUserId");

  //----------------------------------- All States ---------------------------------------------------
  const [selectedUser, setSelectedUser] = useState(null);
  const [allMessage, setAllMessage] = useState([]);
  const [userMessageCounts, setUserMessageCounts] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [receiverId, setReceiverId] = useState(0);
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [myInitials, setMyInitials] = useState("");
  const [userInitials, setUserInitials] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  //------------------------------------------- Set User ID From Drop down --------------------------------
  useEffect(() => {
    if (location.state?.userId) {
      handleSelectUser(
        location.state?.userName || "Unknown",
        location.state.userId,
      );
    }
  }, [location.state?.userId]);

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

  // ------------------------------------------ Fetch All Messages ----------------------------------------
  const fetchAllMessages = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${bearer_token}` } };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Chat/getAllrecievemessages`,
        config,
      );

      if (response.status === 200) {
        const messages = response.data?.data || [];
        setAllMessage(messages);

        CheckMessages(messages);
      }
    } catch (error) {
      console.error("Error fetching user messages:", error);
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

        // Sort messages by date (oldest first)
        const allMessages = [...sentMessages, ...receivedMessages].sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );

        // Use a callback function inside setMessages
        setMessages((prevMessages) => {
          if (allMessages.length > prevMessages.length) {
            setTimeout(scrollToBottom, 100); // Scroll after rendering
          }
          return allMessages;
        });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  //---------------------------------------- UseEffect call ------------------------------------
  useEffect(() => {
    fetchUsers();
    fetchAllMessages();
  }, []);
  //---------------------------------------- UseEffect fetchMessages ------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages(receiverId);
      fetchAllMessages();
    }, 2000); // Fetch messages every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [receiverId]);
  //------------------------------------------- Select Users Functionality --------------------------------
  const handleSelectUser = (fullName, userId) => {
    setSelectedUser(fullName);
    setReceiverId(userId);
    setUserInitials(getInitials(fullName));
    fetchMessages(userId);
  };

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
  const handleSubmit = async () => {
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
        fetchMessages(receiverId);
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      alert("Failed to send message.");
    }
  };

  //---------------------------------------------------------- Handle Delete -----------------------------------------------

  const handleDelete = async (id) => {
    if (!id) {
      alert("Message ID is missing!");
      return; // Stop execution if id is undefined/null
    }

    const bearer_token = localStorage.getItem("token");
    const name = getHostnamePart();
    console.log("Deleting Message ID:", id);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
      };

      const payload = { messageId: id };

      const response = await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Chat/deletemessage`,
        { data: payload, ...config },
      );

      console.log("Delete Response:", response.data);
      fetchMessages(receiverId);
      alert("Message deleted successfully");
    } catch (error) {
      console.error("Delete Error:", error.response?.data);
      alert(error.response?.data?.message || "Failed to delete message.");
    }
  };

  // ------------------------------------------ Scroll to bottom ---------------------------------

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  //------------------------------------------ Handle Update -------------------------------------
  const handleChangeStatus = async (id) => {
    if (!id) {
      alert("Message ID is missing!");
      return; // Stop execution if id is undefined/null
    }
    const bearer_token = localStorage.getItem("token");
    const name = getHostnamePart();
    console.log("Updating Message Status for ID:", id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
      };
      const payload = { messageId: id };
      const response = await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/Chat/updatemessagestatusread`,
        payload,
        config,
      );

      console.log("Status Update Response:", response.data);
      // fetchMessages(receiverId);
    } catch (error) {
      console.error("Update Status Error:", error.response?.data);
      alert(
        error.response?.data?.message || "Failed to update message status.",
      );
    }
  };

  //---------------------------------------------- Set Count of Un read Messages --------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeUsers.length > 0 && allMessage.length > 0) {
        const userMessageCounts = activeUsers.map((user) => {
          const count = allMessage.reduce((acc, msg) => {
            return msg.senderId === user.userId && msg.status === false
              ? acc + 1
              : acc;
          }, 0);
          return { userId: user.userId, count }; // Store count with userId
        });

        setUserMessageCounts(userMessageCounts);
      }
    }, 100); // Runs every 5 seconds

    return () => clearInterval(interval); // Cleanup interval when component unmounts
  }, [activeUsers, allMessage]); // Dependency array

  //------------------------------------------ Check all un read messages -------------------------------------

  const CheckMessages = (updatedMessages) => {
    updatedMessages.forEach((msg) => {
      if (msg.status === false && msg.senderId === receiverId) {
        handleChangeStatus(msg.messageId);
      }
    });
  };

  const handleEmojiSelect = (emoji) => {
    setMessageContent((prev) => prev + emoji.native);
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
        {/* ------------------------------------------------------- Sidebar --------------------------------------------- */}
        <div className="w-1/3 rounded-lg bg-white p-4 shadow-md">
          {/* ------------------------------------------ Loged in User ------------------------------------------ */}
          <div>
            {activeUsers.map((user) => {
              if (parseInt(CurrentUserId) !== user.userId) return null;

              return (
                <div
                  key={user.userId}
                  className="mb-2 flex items-center justify-between rounded-lg bg-cyan-500 p-2 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Badge>
                      <Avatar>{getInitials(user.fullName)}</Avatar>
                    </Badge>
                    <span className="font-medium">{user.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative mr-4 flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-700 shadow-xl"></span>
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
              // Find the unread message count for this user
              const userCount = userMessageCounts?.find(
                (countObj) => countObj?.userId === user.userId,
              );

              return (
                <div
                  key={user.userId}
                  className="mb-2 flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm hover:bg-gray-200"
                  onClick={() => handleSelectUser(user.fullName, user.userId)}
                >
                  <div className="flex items-center gap-2">
                    <Badge
                      badgeContent={userCount?.count}
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

        {/* ------------------------------------------------------- Chat Area ----------------------------------------------- */}
        <div className="ml-4 flex flex-1 flex-col rounded-lg bg-white shadow-md">
          {selectedUser ? (
            <>
              {/* ---------------------------------------------- Heading ------------------------------------------- */}
              <div className="flex justify-between rounded-t-lg bg-cyan-500 px-4 py-2 font-semibold text-white">
                <span className="flex items-center">{selectedUser}</span>
                <IconButton size="small" onClick={() => setSelectedUser(null)}>
                  <CgCloseO size={22} className="text-semibold text-white" />
                </IconButton>
              </div>
              {/* -------------------------------------------------- Chat Box --------------------------------------------------- */}
              <div className="flex-1 overflow-auto p-4">
                {messages.map((msg, index) => {
                  const isCurrentUser =
                    parseInt(CurrentUserId) === msg.senderId;

                  return (
                    <div
                      key={index}
                      className={`mb-2 flex items-center ${
                        isCurrentUser ? "justify-end" : "justify-start"
                      } gap-3`}
                    >
                      {isCurrentUser ? (
                        <>
                          <div className="relative ml-2 flex max-w-[75%] flex-col justify-start rounded-lg bg-gray-100 p-2 shadow">
                            <div className="relative flex items-center justify-between gap-3">
                              <p>{msg.messageContent}</p>
                              <LongMenu
                                onDelete={() => handleDelete(msg.messageId)}
                              />
                            </div>
                            <div className="flex items-center gap-8 pr-3 pt-2 text-xs italic text-gray-500">
                              <div>
                                {msg.date
                                  .replace("T", " ")
                                  .split(".")[0]
                                  .split(" ")
                                  .reverse()
                                  .join(" ")}
                              </div>
                              <div>
                                {msg.status ? (
                                  <BsCheck2All color="green" size={16} />
                                ) : (
                                  <BsCheck2 size={16} />
                                )}
                              </div>
                            </div>
                          </div>
                          <Avatar>{myInitials}</Avatar>
                        </>
                      ) : (
                        <div
                          onMouseEnter={() => handleChangeStatus(msg.messageId)}
                          className="flex items-center"
                        >
                          <Avatar>{userInitials}</Avatar>
                          <div className="relative ml-2 flex max-w-[75%] flex-col justify-start rounded-lg bg-gray-100 p-2 shadow">
                            <div className="relative flex items-center justify-between gap-3">
                              <p>{msg.messageContent}</p>
                              <LongMenu
                                onDelete={() => handleDelete(msg.messageId)}
                              />
                            </div>
                            <span className="pl-3 pt-2 text-xs italic text-gray-500">
                              {msg.date
                                .replace("T", " ")
                                .split(".")[0]
                                .split(" ")
                                .reverse()
                                .join(" ")}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Invisible div for auto-scroll */}
                <div ref={messagesEndRef} />
              </div>

              {/* ------------------------------------------- Text Box ------------------------------------------------------------ */}
              <div className="flex items-center gap-3 rounded-lg border-t bg-white p-3 shadow-md">
                {/* Emoji Picker Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowPicker(!showPicker)}
                    // onBlur={()=>setShowPicker(false)}
                    className="rounded-full p-2 transition hover:bg-gray-200"
                  >
                    😊
                  </button>

                  {/* Emoji Picker */}
                  {showPicker && (
                    <div className="absolute bottom-12 left-0 z-10 rounded-lg bg-white shadow-lg">
                      <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                    </div>
                  )}
                </div>

                {/* Message Input Field */}
                <TextField
                  fullWidth
                  multiline
                  minRows={1}
                  maxRows={3}
                  placeholder="Type your message..."
                  variant="outlined"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  sx={{
                    flex: 1,
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    "& textarea": {
                      scrollbarWidth: "none", // Firefox
                      "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari, Edge
                    },
                  }}
                  InputProps={{
                    style: {
                      height: "50px",
                      overflow: "hidden", // Hides the scrollbar completely
                    },
                  }}
                />

                {/* Send Button */}
                <IconButton
                  onClick={handleSubmit}
                  color="primary"
                  className="rounded-full bg-blue-500 p-3 text-white transition hover:bg-blue-600"
                >
                  <SendIcon />
                </IconButton>
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
