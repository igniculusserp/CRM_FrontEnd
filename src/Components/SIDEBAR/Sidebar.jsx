import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

//external
import axios from "axios";

//reactIcons
import { RiHome4Line } from "react-icons/ri";
import { GrContactInfo } from "react-icons/gr";
import { MdOutlineContactPhone } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { SiAmazonsimpleemailservice } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { FaRegHandshake } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import PropTypes from "prop-types";
import noAvatar from "../../assets/images/noAvatar.png";
import { GiProgression } from "react-icons/gi";

import { getHostnamePart } from "./SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

//file_Imported
import { main_base_url } from "./../../Config/config";

export default function SidebaBar({ toggle, setToggle }) {
  const name = getHostnamePart();
  const [welcomedata, setWelcomeData] = useState([]);

  //to manage multiple businessTypes
  const businessType = localStorage.getItem("businessType");
  const [business, setBusiness] = useState("");

  useEffect(() => {
    setBusiness(businessType);
    console.log(business);
  }, []);

  const sideBar = [
    {
      key: 1,
      data: "Home",
      link: "/panel/dashboard",
      icon: <RiHome4Line />,
    },
    {
      key: 2,
      data: "Leads",
      link: "/panel/lead",
      icon: <GrContactInfo />,
    },
    {
      key: 3,
      data: "Contacts",
      link: "/panel/contact",
      icon: <MdOutlineContactPhone />,
    },
    {
      key: 6,
      data: "Free Trail",
      link: "/panel/freeTrail",
      icon: <FaRegHandshake />,
    },
    {
      key: 7,
      data: "Follow up",
      link: "/panel/followUp",
      icon: <SiAmazonsimpleemailservice />,
    },

    {
      key: 5,
      data: "Sales order",
      link: "/panel/salesorder",
      icon: <BsGraphUpArrow />,
    },
    {
      key: 4,
      data: "Client",
      link: "/panel/client",
      icon: <FiUsers />,
    },

    // {
    //   key: 8,
    //   data: 'Mail Box',
    //   link: '/panel/mailBox',
    //   icon: <MdOutlineEmail />,
    // },
    {
      key: 9,
      data: "Service Box",
      link: "/panel/servicebox",
      icon: <MdOutlineEmail />,
    },
    // {
    //   key: 10,
    //   data: 'Voice Box',
    //   link: '/panel/voicebox',
    //   icon: <MdOutlineKeyboardVoice />,
    // },
    {
      key: 11,
      data: "Reports",
      link: "/panel/reports",
      icon: <IoDocumentTextOutline />,
    },
    {
      key: 12,
      data: "Analytics",
      link: "/panel/analytics",
      icon: <VscGraph />,
    },
    // {
    //   key: 13,
    //   data: 'Logs',
    //   link: '/panel/logs',
    //   icon: <VscGraph />,
    // },
    // {
    //   key: 14,
    //   data: 'MIS Reports',
    //   link: '/panel/misreports',
    //   icon: <IoDocumentTextOutline />,
    // },
    // {
    //   key: 15,
    //   data: 'Subscription',
    //   link: '/panel/subscription',
    //   icon: <IoDocumentTextOutline />,
    // },
  ];

  const sideBar_Brokerage = [
    {
      key: 1,
      data: "Home",
      link: "/panel/dashboard",
      icon: <RiHome4Line />,
    },
    {
      key: 2,
      data: "Leads",
      link: "/panel/lead",
      icon: <GrContactInfo />,
    },
    {
      key: 3,
      data: "Contacts",
      link: "/panel/contact",
      icon: <MdOutlineContactPhone />,
    },
    {
      key: 11,
      data: "Reports",
      link: "/panel/reports",
      icon: <IoDocumentTextOutline />,
    },
    {
      key: 14, //newLy Added 1st Sept
      data: "Finance ",
      link: "/panel/FinancialActivity",
      icon: <VscGraph />,
    },
    {
      key: 12,
      data: "Analytics",
      link: "/panel/analytics",
      icon: <GiProgression />,
    },
    {
      key: 4,
      data: "Client",
      link: "/panel/client",
      icon: <FiUsers />,
    },
    {
      key: 5,
      data: "Sales order",
      link: "/panel/salesorder",
      icon: <BsGraphUpArrow />,
    },
    {
      key: 6,
      data: "Free Trail",
      link: "/panel/freeTrail",
      icon: <FaRegHandshake />,
    },
    {
      key: 7,
      data: "Follow up",
      link: "/panel/followUp",
      icon: <SiAmazonsimpleemailservice />,
    },
    // {
    //   key: 8,
    //   data: 'Mail Box',
    //   link: '/panel/mailBox',
    //   icon: <MdOutlineEmail />,
    // },
    {
      key: 9,
      data: "Service Box",
      link: "/panel/servicebox",
      icon: <MdOutlineEmail />,
    },
    // {
    //   key: 10,
    //   data: 'Voice Box',
    //   link: '/panel/voicebox',
    //   icon: <MdOutlineKeyboardVoice />,
    // },

    // {
    //   key: 13,
    //   data: 'Logs',
    //   link: '/panel/logs',
    //   icon: <VscGraph />,
    // },

    // {
    //   key: 15,
    //   data: 'MIS Reports',
    //   link: '/panel/misreports',
    //   icon: <IoDocumentTextOutline />,
    // },
    {
      key: 16,
      data: "Subscription",
      link: "/panel/subscription",
      icon: <IoDocumentTextOutline />,
    },
  ];

  const [active, setactive] = useState(sideBar[0].key);

  const handlewelcomedata = async () => {
    try {
      const response = await axios.get(
        `${main_base_url}/Tenants/gettenant/${name}`,
      );
      setWelcomeData(response.data);
    } catch (error) {
      console.error("Error fetching welcome data:", error);
    }
  };

  useEffect(() => {
    handlewelcomedata();
  }, []);

  let handleClick = (key) => {
    setactive(key);
    setToggle(false);
  };

  console.log(welcomedata);
  return (
    <>
      <div className="flex flex-col gap-3 bg-cyan-500">
        {/* Fixed Image Section */}
        <div className="relative">
          <div className="sticky top-0 mt-4">
            <img
              id="logoImg"
              src={welcomedata?.tenentLogo || noAvatar}
              alt="Company Image"
              className={`mt-3 ${toggle ? "h-14 w-14" : "h-20 w-20"} mx-auto rounded-full border object-cover shadow-md shadow-cyan-600`}
            />
          </div>
        </div>
        {/* Scrollable Menu Section */}
        <div className="flex flex-col h-full mt-10 CustomerTestimonialReview">
          {(business === "Brokerage" ? sideBar_Brokerage : sideBar).map(
            ({ key, data, icon, link }, index) => (
              <Link to={link} onClick={() => handleClick(key)} key={key}>
                <li
                  className={`flex ${toggle ? "justify-center" : "justify-start"} text-md font-small items-center gap-3 py-3 text-white shadow-md ${
                    index === 0 ? "border-b-2 border-t-2" : "border-b-2"
                  } ${index === sideBar.length - 1 ? "border-b-2" : ""} from-cyan-300 to-cyan-700 hover:bg-gradient-to-b`}
                >
                  <h1
                    className={`${toggle ? "flex flex-col items-center gap-1 px-1" : "flex items-center gap-2 px-2"}`}
                  >
                    <span
                      className={`${toggle ? "text-sm sm:text-xl" : "text-xl"}`}
                    >
                      {icon}
                    </span>
                    <span
                      className={`${toggle ? "whitespace-nowrap text-xs" : "text-md"}`}
                    >
                      {data}
                    </span>
                  </h1>
                </li>
              </Link>
            ),
          )}
        </div>
      </div>
    </>
  );
}
SidebaBar.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.bool.isRequired,
};
