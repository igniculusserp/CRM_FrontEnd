import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Icons
import { RiHome4Line } from "react-icons/ri";
import { GrContactInfo } from "react-icons/gr";
import { MdOutlineContactPhone, MdOutlineEmail } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { SiAmazonsimpleemailservice } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { FaRegHandshake } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { PiChatsBold } from "react-icons/pi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FaWalkieTalkie } from "react-icons/fa6";
import { GoTasklist } from "react-icons/go";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { TbSettingsSpark } from "react-icons/tb";

// Assets
import noAvatar from "../../assets/images/noAvatar.png";
import { getHostnamePart } from "./SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { main_base_url } from "./../../Config/config";

export default function SidebaBar({ toggle }) {
  const name = getHostnamePart();
  const [welcomedata, setWelcomeData] = useState({});
  //--------------------------------------- Set Business Type --------------------------------------------
  const [businessType, setBusinessType] = useState("");

  useEffect(() => {
    const storedType = localStorage.getItem("businessType") || "";
    setBusinessType(storedType);
  }, []);

  const sidebarOptions = {
    Brokerage: [
      {
        key: 1,
        data: "Home",
        link: `/panel/${businessType}/dashboard`,
        icon: <RiHome4Line />,
      },
      {
        key: 2,
        data: "Leads",
        link: `/panel/${businessType}/lead`,
        icon: <GrContactInfo />,
      },
      {
        key: 3,
        data: "Contacts",
        link: `/panel/${businessType}/contact`,
        icon: <MdOutlineContactPhone />,
      },
      {
        key: 11,
        data: "Reports",
        link: `/panel/${businessType}/reports`,
        icon: <IoDocumentTextOutline />,
      },
      {
        key: 14,
        data: "Finance",
        link: `/panel/${businessType}/FinancialActivity`,
        icon: <VscGraph />,
      },
      {
        key: 12,
        data: "Analytics",
        link: `/panel/${businessType}/analytics`,
        icon: <GiProgression />,
      },
      {
        key: 4,
        data: "Client",
        link: `/panel/${businessType}/client`,
        icon: <FiUsers />,
      },
      {
        key: 5,
        data: "Sales order",
        link: `/panel/${businessType}/salesorder`,
        icon: <BsGraphUpArrow />,
      },
      {
        key: 6,
        data: "Free Trail",
        link: `/panel/${businessType}/freeTrail`,
        icon: <FaRegHandshake />,
      },
      {
        key: 7,
        data: "Follow up",
        link: `/panel/${businessType}/followup`,
        icon: <SiAmazonsimpleemailservice />,
      },
      {
        key: 9,
        data: "Service Box",
        link: `/panel/${businessType}/servicebox`,
        icon: <MdOutlineEmail />,
      },
      {
        key: 16,
        data: "Subscription",
        link: `/panel/${businessType}/subscription`,
        icon: <IoDocumentTextOutline />,
      },
      {
        key: 13,
        data: "Messaging",
        link: `/panel/${businessType}/messaging`,
        icon: <PiChatsBold />,
      },
    ],
    Advisory: [
      {
        key: 1,
        data: "Home",
        link: `/panel/${businessType}/dashboard`,
        icon: <RiHome4Line />,
      },
      {
        key: 2,
        data: "Leads",
        link: `/panel/${businessType}/lead`,
        icon: <GrContactInfo />,
      },
      {
        key: 3,
        data: "Contacts",
        link: `/panel/${businessType}/contact`,
        icon: <MdOutlineContactPhone />,
      },
      {
        key: 6,
        data: "Free Trail",
        link: `/panel/${businessType}/freeTrail`,
        icon: <FaRegHandshake />,
      },
      {
        key: 7,
        data: "Follow up",
        link: `/panel/${businessType}/followup`,
        icon: <SiAmazonsimpleemailservice />,
      },
      {
        key: 5,
        data: "Sales order",
        link: `/panel/${businessType}/salesorder`,
        icon: <BsGraphUpArrow />,
      },
      {
        key: 4,
        data: "Client",
        link: `/panel/${businessType}/client`,
        icon: <FiUsers />,
      },
      {
        key: 9,
        data: "Service Box",
        link: `/panel/${businessType}/servicebox`,
        icon: <MdOutlineEmail />,
      },
      {
        key: 11,
        data: "Reports",
        link: `/panel/${businessType}/reports`,
        icon: <IoDocumentTextOutline />,
      },
      {
        key: 12,
        data: "Analytics",
        link: `/panel/${businessType}/analytics`,
        icon: <VscGraph />,
      },
      {
        key: 13,
        data: "Messaging",
        link: `/panel/${businessType}/messaging`,
        icon: <PiChatsBold />,
      },
    ],
    RealEstate: [
      {
        key: 1,
        data: "Home",
        link: `/panel/${businessType}/dashboard`,
        icon: <RiHome4Line />,
      },
      {
        key: 2,
        data: "Leads",
        link: `/panel/${businessType}/leads`,
        icon: <GrContactInfo />,
      },
      {
        key: 15,
        data: "Booking & Brokrage",
        link: `/panel/${businessType}/Bookings_and_Brokrage`,
        icon: <HiOutlineBookOpen />,
      },
      {
        key: 16,
        data: "Conversations",
        link: `/panel/${businessType}/conversations`,
        icon: <FaWalkieTalkie />,
      },
      {
        key: 17,
        data: "Tasks",
        link: `/panel/${businessType}/Tasks`,
        icon: <GoTasklist />,
      },
      {
        key: 18,
        data: "Documents",
        link: `/panel/${businessType}/Documents`,
        icon: <IoDocumentAttachOutline />,
      },
      {
        key: 3,
        data: "Contacts",
        link: `/panel/${businessType}/contact`,
        icon: <MdOutlineContactPhone />,
      },
      {
        key: 6,
        data: "Free Trail",
        link: `/panel/${businessType}/freeTrail`,
        icon: <FaRegHandshake />,
      },
      {
        key: 7,
        data: "Follow up",
        link: `/panel/${businessType}/followup`,
        icon: <SiAmazonsimpleemailservice />,
      },
      {
        key: 5,
        data: "Sales order",
        link: `/panel/${businessType}/salesorder`,
        icon: <BsGraphUpArrow />,
      },
      {
        key: 4,
        data: "Client",
        link: `/panel/${businessType}/client`,
        icon: <FiUsers />,
      },
      {
        key: 9,
        data: "Service Box",
        link: `/panel/${businessType}/servicebox`,
        icon: <MdOutlineEmail />,
      },
      {
        key: 11,
        data: "Reports",
        link: `/panel/${businessType}/Reports`,
        icon: <IoDocumentTextOutline />,
      },
      {
        key: 12,
        data: "Analytics",
        link: `/panel/${businessType}/analytics`,
        icon: <VscGraph />,
      },
      {
        key: 13,
        data: "Messaging",
        link: `/panel/${businessType}/messaging`,
        icon: <PiChatsBold />,
      },
      {
        key: 14,
        data: "Product",
        link: `/panel/${businessType}/product_management`,
        icon: <PiChatsBold />,
      },
      {
        key: 19,
        data: "Setting Management",
        link: `/panel/${businessType}/setting_management`,
        icon: <TbSettingsSpark />,
      },
    ],
  };

  const activeSidebar = sidebarOptions[businessType] || sidebarOptions.Advisory;

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

  const [active, setActive] = useState(
    () => Number(localStorage.getItem("activeSidebarKey")) || activeSidebar[0].key
  );
  
  useEffect(() => {
    localStorage.setItem("activeSidebarKey", active);
  }, [active]);
  
  const handleClick = (key) => setActive(key);

  return (
    <div className="flex flex-col gap-3 bg-cyan-500">
      <div className="relative">
        <div className="sticky top-0 mt-4">
          <img
            src={welcomedata?.tenentLogo || noAvatar}
            alt="Company Image"
            className={`mt-3 ${toggle ? "h-14 w-14" : "h-20 w-20"} mx-auto rounded-full border object-cover shadow-md shadow-cyan-600`}
          />
        </div>
      </div>

      <div className="CustomerTestimonialReview mt-10 flex h-full flex-col">
        {activeSidebar.map(({ key, data, icon, link }, index) => (
          <Link to={link} onClick={() => handleClick(key)} key={key}>
            <li
              className={`flex ${toggle ? "justify-center" : "justify-start"} text-md font-small items-center gap-3 from-cyan-300 to-cyan-700 py-3 text-white shadow-md hover:bg-gradient-to-b ${
                index === 0 ? "border-b-2 border-t-2" : "border-b-2"
              } ${
                active === key
                  ? "bg-gradient-to-r from-cyan-600 to-cyan-800 hover:bg-gradient-to-b hover:from-cyan-300 hover:to-cyan-700"
                  : "hover:bg-gradient-to-b hover:from-cyan-300 hover:to-cyan-700"
              } `}
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
        ))}
      </div>
    </div>
  );
}

SidebaBar.propTypes = {
  toggle: PropTypes.bool.isRequired,
};
