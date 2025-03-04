import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  protocal_url,
  tenant_base_url,
  main_base_url,
} from "./../../Config/config";

// React-Icons
import { IoMdNotifications } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { RiBuilding2Line } from "react-icons/ri";

import { MdLogout } from "react-icons/md";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../utils/toastNotifications";

// Material UI
import { Badge, Menu, MenuItem } from "@mui/material";

// TOGGLE ICONS
import { FaBarsStaggered } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";

import { getHostnamePart } from "./SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

export default function Header({ toggle, setToggle }) {
  const navigate = useNavigate();
  const name = getHostnamePart();
  const bearer_token = localStorage.getItem("token");
  const location = useLocation();

  // const [welcomedata, setWelcomeData] = useState([]);
  const [tenantId, setData] = useState("");
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const registrationdata = localStorage.getItem("registrationdata");
    const userDetail = localStorage.getItem("userDetail");

    if (token && (userDetail || registrationdata)) {
      const registrationDataParsed = JSON.parse(registrationdata || "{}");
      setData(registrationDataParsed.tenantId || "");
      // setWelcomeData(JSON.parse(userDetail));
      if (window.location.pathname === "/panel") {
        navigate("/panel/dashboard");
      } else if (window.location.pathname !== "/panel") {
        navigate(window.location.pathname);
      }
    } else {
      navigate("/tenantlogin"); // Redirect to login if no data found
    }
  }, [navigate]);

  useEffect(() => {
    if (tenantId) {
      handlewelcomedata();
    }
  }, [tenantId]);

  const handlewelcomedata = async () => {
    try {
      const response = await axios.get(
        `${main_base_url}/Tenants/gettenant/${tenantId}`,
      );
    } catch (error) {
      console.error("Error fetching welcome data:", error);
    }
  };

  const signout = async () => {
    const bearer_token = localStorage.getItem("token");
    if (!bearer_token) {
      console.log("No token found in localStorage");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Users/logout`,
        {},
        config,
      );

      if (response.data.isSuccess) {
        console.log("Logout Success: ", response.data);
        localStorage.clear();
        showSuccessToast("Logout Successful");
        navigate(`/tenantlogin`);
      } else {
        console.error("Logout failed: ", response.data);
        showErrorToast("Logout Failed. Try again.");
      }
    } catch (error) {
      console.error("Error during logout: ", error.response || error.message);
      showErrorToast("An error occurred while logging out.");
    }
  };
//------------------------------------------------------- Messages Notification Part -------------------------------------------------
  // ----------------------------------------------------- State ----------------------------------------------
  const [allMessage, setAllMessage] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [userMessageCounts, setUserMessageCounts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  //---------------------------------------- UseEffect call ------------------------------------
  useEffect(() => {
    fetchUsers();
    fetchAllMessages();
  }, []);
  //---------------------------------------- UseEffect fetchMessages ------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
        fetchUsers();
      fetchAllMessages();
    }, 2000); 

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
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
        setAllMessage(response.data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
    }
  };

    //---------------------------------------------- Set Count of Un read Messages --------------------------------
    useEffect(() => {
        const interval = setInterval(() => {
          if (activeUsers.length > 0 && allMessage.length > 0) {
            const userMessageCounts = activeUsers.map((user) => {
              const count = allMessage.reduce((acc, msg) => {  
                return msg.senderId === user.userId && msg.status === false ? acc + 1 : acc;
              }, 0);
              return { userName: user.fullName, count }; // Store count with userId
            });
      
            setUserMessageCounts(userMessageCounts); 
          }
        }, 100); // Runs every 5 seconds
      
        return () => clearInterval(interval); // Cleanup interval when component unmounts
      }, [activeUsers, allMessage]); // Dependency array

      //--------------------------------------------------- Handle Drop DOwn --------------------------------------------------

      const handleDropdownClose = () => {
        setAnchorEl(null);
      };

//----------------------------------------------------------- MENU --------------------------------------------------------------------
  const menu = [
    { key: 2, logo:  (
        <Badge
          badgeContent={userMessageCounts.length}
          color="error"
          overlap="circular"
          classes={{ badge: "bg-green-500" }}
        >
          <FiMessageSquare />
        </Badge>
      ),
      dropdown: true, },
    { key: 3, logo: <IoMdNotifications /> },
    { key: 5, logo: <IoMdSettings />, link: "/panel/setting" },
    {
      key: 6,
      logo: <MdLogout />,
      functionality: signout, // Corrected: pass the function reference, not invoke it
    },
  ];

  useEffect(() => {
    const activeMenuItem = menu.find((item) =>
      location.pathname.includes(item.link),
    );
    if (activeMenuItem) {
      setActiveKey(activeMenuItem.key);
    } else {
      setActiveKey(null);
    }
  }, [location.pathname, menu]); // Update activeKey whenever location changes

  const handleMenuClick = (key, functionality) => {
    setActiveKey(key);
    if (functionality) {
      functionality(); // If functionality exists, execute it (for signout)
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-between py-3 mx-3 sm:min-w-screen">
        <div className="flex items-center justify-center">
          {/*-> Toggle Button <-*/}
          <button
            className="flex p-1 text-lg text-white rounded-full shadow flex-start bg-cyan-500"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <FaBarsStaggered /> : <FaBars />}
          </button>
          {/*-> Igniculuss DropDown Button hidden For mobile <-*/}
          <div className="flex items-center gap-2 p-1 ml-4 border border-gray-800 rounded shadow-sm">
          < RiBuilding2Line size={25}/>
          <span className="border-b-2 border-gray-600 arsenal-sc-bold"> {name?.toUpperCase()} </span>
          </div>
        </div>

        <div className="flex items-center justify-start gap-1 px-3 sm:justify-end">
          {menu.map(({ key, logo, link, functionality }) => (
            <div
              key={key}
              className={`cursor-pointer p-1 ${
                activeKey === key
                  ? "rounded-full bg-gray-700 p-1 text-cyan-500 shadow-md"
                  : "text-gray-700"
              }`}
            >
              <div onClick={() => handleMenuClick(key, functionality)}>
                {link ? (
                  <Link to={link} onClick={() => setPopup(!popup)}>
                    <span className="text-2xl">{logo}</span>
                  </Link>
                ) : (
                  <span className="text-2xl">{logo}</span> // No link, just execute functionality
                )}
              </div>
            </div>
          ))}
        </div>
         {/* Dropdown for Messages */}
       <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
      >
        {userMessageCounts?.length > 0 ? (
          userMessageCounts.map((msg, index) => (
            <MenuItem key={index}>
              <span className="text-sm">{msg.userName} ({msg.count})</span>
            </MenuItem>
          ))
        ) : (
          <MenuItem>No new messages</MenuItem>
        )}
      </Menu>
      </div>
    </>
  );
}

Header.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
};
