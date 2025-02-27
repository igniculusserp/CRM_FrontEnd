import { useState, useEffect } from "react";
//external Packages
import axios from "axios";
//MUi Packages
import {
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material";
//Icons
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
//Folder Imported
import { tenant_base_url, protocal_url } from "../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";


const Messaging = () => {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();
  //------------------------- Get Current User ID From Local Storage --------------------------------
  const CurrentUserId = localStorage.getItem("CurrentUserId");
  //----------------------------------- All States ---------------------------------------------------
  const [chatStatus, setChatStatus] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [receiverId, setReceiverId] = useState(0);

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

  //--------------------------------------- Fetch Chat By ID ------------------------------------

  const fetchDataById = async (receiverId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Chat/getmessages/${receiverId}`,
        config,
      );

      if (response.status === 200 && response.data.isSuccess) {
        const Chat = response.data.data;
        console.log("Fetch response", Chat);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  //---------------------------------------- UseEffect call ------------------------------------
  useEffect(() => {
    fetchUsers();
    fetchDataById(receiverId);
    console.log("CurrentUserId",CurrentUserId);
    
  }, [receiverId,CurrentUserId]);
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
   
   <div>
  {activeUsers.map((user) => {
    if (CurrentUserId === user.userId) return null; // Skip rendering for the current user

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

     
      </div>
    </>
  );
};

export default Messaging;
