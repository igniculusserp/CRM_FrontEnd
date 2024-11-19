//react
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

// TOGGLE ICONS
import { FaBarsStaggered } from 'react-icons/fa6';
import { FaBars } from 'react-icons/fa6';

//file_Imported
import { main_base_url } from './../../Config/config';

export default function SidebaBar() {
  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split('.')[0];

  const [welcomedata, setWelcomeData] = useState([]);

  const sideBar = [
    {
      key: 1,
      data: 'Home',
      link: '/sidebar',
      icon: <RiHome4Line />,
    },
    {
      key: 2,
      data: 'Leads',
      link: '/sidebar/lead',
      icon: <GrContactInfo />,
    },
    {
      key: 3,
      data: 'Contacts',
      link: '/sidebar/contact',
      icon: <MdOutlineContactPhone />,
    },
    {
      key: 4,
      data: 'Client',
      link: '/sidebar/client',
      icon: <FiUsers />,
    },
    {
      key: 5,
      data: 'Sales order',
      link: '/sidebar/salesorder',
      icon: <BsGraphUpArrow />,
    },
    {
      key: 6,
      data: 'Free Trail',
      link: '/sidebar/freeTrail',
      icon: <FaRegHandshake />,
    },
    {
      key: 7,
      data: 'Follow up',
      link: '/sidebar/followUp',
      icon: <SiAmazonsimpleemailservice />,
    },
    {
      key: 8,
      data: 'Mail Box',
      link: '/sidebar/mailBox',
      icon: <MdOutlineEmail />,
    },
    {
      key: 9,
      data: 'Sms Box',
      link: '/sidebar/smsBox',
      icon: <MdOutlineEmail />,
    },
    {
      key: 10,
      data: 'Voice Box',
      link: '/sidebar/voicebox',
      icon: <MdOutlineKeyboardVoice />,
    },
    {
      key: 11,
      data: 'Reports',
      link: '/sidebar/reports',
      icon: <IoDocumentTextOutline />,
    },
    {
      key: 12,
      data: 'Analytics',
      link: '/sidebar/analytics',
      icon: <VscGraph />,
    },
    {
      key: 13,
      data: 'Logs',
      link: '/sidebar/logs',
      icon: <VscGraph />,
    },
    {
      key: 14, //newLy Added 1st Sept
      data: 'Group Chat',
      link: '/sidebar/groupChat',
      icon: <VscGraph />,
    },
    {
      key: 15,
      data: 'MIS Reports',
      link: '/sidebar/misreports',
      icon: <IoDocumentTextOutline />,
    },
    {
      key: 16,
      data: 'Subscription',
      link: '/sidebar/subscription',
      icon: <IoDocumentTextOutline />,
    },
  ];

  const [active, setactive] = useState(sideBar[0].key);

  const handlewelcomedata = async () => {
    try {
      const response = await axios.get(
        `${main_base_url}/Tenants/gettenant/${name}`
      );

      console.log('Response:', response.data);
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

  // TOGGLE STATE
  const [toggle, setToggle] = useState(false);
  const [showLeads, setShowLeads] = useState(false);

  return (
    <>
      <div
        className={`flex flex-col  bg-cyan-500 ${
          toggle ? 'w-[80px]' : 'w-[250px]'
        } gap-3`}
      >
        <div>
          <img
            id="logoImg"
            src={welcomedata.tenentLogo}
            alt="Company Logo"
            className={`mt-3 ${
              toggle ? 'w-14 h-14' : 'w-24 h-24'
            } rounded-full object-contain mx-auto border`}
          />
        </div>

        <div className="flex flex-col  my-4">
          {sideBar.map(({ key, data, icon, link }, index) => (
            <Link to={link} onClick={() => handleClick(key)} key={key}>
              <li
                className={`flex ${
                  toggle ? 'justify-center' : 'justify-start'
                } items-center gap-3 text-white text-md font-small py-3 shadow-md ${
                  index === 0 ? 'border-b-2 border-t-2' : 'border-b-2'
                } ${
                  index === sideBar.length - 1 ? 'border-b-2' : ''
                } hover:bg-gradient-to-b from-cyan-300 to-cyan-600`}
                key={key}
              >
                <h1 className="flex items-center gap-2 px-3">
                  <span className={`${toggle ? 'text-2xl' : 'text-xl'}`}>
                    {icon}
                  </span>
                  {toggle ? '' : data}
                </h1>
              </li>
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`absolute  right-[0.2rem] h-8 w-8 p-2 bg-white rounded-full shadow-md cursor-pointer text-cyan-700 ${
          toggle
            ? 'text-center top-[4rem] right-[1.5rem] mt-1 mb-1'
            : 'top-[2rem]'
        }`}
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? <FaBarsStaggered /> : <FaBars />}
      </div>
    </>
  );
}
