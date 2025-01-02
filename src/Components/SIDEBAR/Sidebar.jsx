import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

//external
import axios from 'axios';

//reactIcons
import { RiHome4Line } from 'react-icons/ri';
import { GrContactInfo } from 'react-icons/gr';
import { MdOutlineContactPhone } from 'react-icons/md';
import { BsGraphUpArrow } from 'react-icons/bs';
import { SiAmazonsimpleemailservice } from 'react-icons/si';
import { FiUsers } from 'react-icons/fi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { VscGraph } from 'react-icons/vsc';
import { FaRegHandshake } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { MdOutlineKeyboardVoice } from 'react-icons/md';
import PropTypes from 'prop-types';
import noAvatar from "../../assets/images/noAvatar.png";

import { getHostnamePart } from './SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl';

//file_Imported
import { main_base_url } from './../../Config/config';


export default function SidebaBar({ toggle }) {
  const name = getHostnamePart();
  const [welcomedata, setWelcomeData] = useState([]);

  //to manage multiple businessTypes
  const businessType = localStorage.getItem("businessType");
  const [business, setBusiness] = useState("");

  useEffect(() => {
    setBusiness(businessType);
    console.log(business)
  }, []);


  const sideBar = [
    {
      key: 1,
      data: 'Home',
      link: '/panel/dashboard',
      icon: <RiHome4Line />,
    },
    {
      key: 2,
      data: 'Leads',
      link: '/panel/lead',
      icon: <GrContactInfo />,
    },
    {
      key: 3,
      data: 'Contacts',
      link: '/panel/contact',
      icon: <MdOutlineContactPhone />,
    },
    {
      key: 4,
      data: 'Client',
      link: '/panel/client',
      icon: <FiUsers />,
    },
    {
      key: 5,
      data: 'Sales order',
      link: '/panel/salesorder',
      icon: <BsGraphUpArrow />,
    },
    {
      key: 6,
      data: 'Free Trail',
      link: '/panel/freeTrail',
      icon: <FaRegHandshake />,
    },
    {
      key: 7,
      data: 'Follow up',
      link: '/panel/followUp',
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
      data: 'Sms Box',
      link: '/panel/smsBox',
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
      data: 'Reports',
      link: '/panel/reports',
      icon: <IoDocumentTextOutline />,
    },
    {
      key: 12,
      data: 'Analytics',
      link: '/panel/analytics',
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
      data: 'Home',
      link: '/panel/dashboard',
      icon: <RiHome4Line />,
    },
    {
      key: 2,
      data: 'Leads',
      link: '/panel/lead',
      icon: <GrContactInfo />,
    },
    {
      key: 3,
      data: 'Contacts',
      link: '/panel/contact',
      icon: <MdOutlineContactPhone />,
    },
    {
      key: 11,
      data: 'Reports',
      link: '/panel/reports',
      icon: <IoDocumentTextOutline />,
    },
    {
      key: 14, //newLy Added 1st Sept
      data: 'Financial Activity',
      link: '/panel/FinancialActivity',
      icon: <VscGraph />,
    },
    {
      key: 12,
      data: 'Analytics',
      link: '/panel/analytics',
      icon: <VscGraph />,
    },
    {
      key: 4,
      data: 'Client',
      link: '/panel/client',
      icon: <FiUsers />,
    },
    {
      key: 5,
      data: 'Sales order',
      link: '/panel/salesorder',
      icon: <BsGraphUpArrow />,
    },
    {
      key: 6,
      data: 'Free Trail',
      link: '/panel/freeTrail',
      icon: <FaRegHandshake />,
    },
    {
      key: 7,
      data: 'Follow up',
      link: '/panel/followUp',
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
      data: 'Sms Box',
      link: '/panel/smsBox',
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
      data: 'Subscription',
      link: '/panel/subscription',
      icon: <IoDocumentTextOutline />,
    },
  ];

  const [active, setactive] = useState(sideBar[0].key);

  const handlewelcomedata = async () => {
    try {
      const response = await axios.get(`${main_base_url}/Tenants/gettenant/${name}`);
      setWelcomeData(response.data);
    } catch (error) {
      console.error('Error fetching welcome data:', error);
    }
  };

  useEffect(() => {
    handlewelcomedata();
  }, []);

  let handleClick = (key) => {
    setactive(key);
  };

  console.log(welcomedata)
  return (
    <>
      <div className="flex flex-col bg-cyan-500 gap-3 h-screen">
        {/* Fixed Image Section */}
        <div className="relative">
          <div className="sticky top-0 mt-4">
            <img
              id="logoImg"
              src={welcomedata?.tenentLogo || noAvatar}
              alt="Company Image"
              className={`mt-3 ${toggle ? 'w-14 h-14' : 'w-24 h-24'} rounded-full shadow-md shadow-cyan-600 object-cover mx-auto border`}
            />
          </div>
        </div>
        {/* Scrollable Menu Section */}
        <div className="flex flex-col h-full mt-10 CustomerTestimonialReview">
          {(business === "Brokerage" ? sideBar_Brokerage : sideBar).map(({ key, data, icon, link }, index) => (
            <Link to={link} onClick={() => handleClick(key)} key={key}>
              <li
                className={`flex ${toggle ? 'justify-center' : 'justify-start'} items-center gap-3 text-white text-md font-small py-3 shadow-md ${index === 0 ? 'border-b-2 border-t-2' : 'border-b-2'
                  } ${index === sideBar.length - 1 ? 'border-b-2' : ''} hover:bg-gradient-to-b from-cyan-300 to-cyan-600`}
              >
                <h1 className={`${toggle ? 'flex items-center gap-2 px-3 flex-col' : 'flex items-center gap-2 px-3'}`}>
                  <span className={`${toggle ? 'text-2xl' : 'text-xl'}`}>{icon}</span>
                  <span className={`${toggle ? 'text-xs whitespace-nowrap' : ''}`}>{data}</span>
                </h1>
              </li>
            </Link>
          ))}
        </div>
      </div>


    </>
  );
}
SidebaBar.propTypes = {
  toggle: PropTypes.bool.isRequired,
}
