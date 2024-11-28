import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { main_base_url } from './../../Config/config';

//react-Icons

import { RiAddBoxFill } from 'react-icons/ri';
import { IoMdNotifications } from 'react-icons/io';
import { TbCalendarMonth } from 'react-icons/tb';
import { IoMdSettings } from 'react-icons/io';
import { FaAngleDown } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

//toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  showSuccessToast,
  showErrorToast,
} from './../../utils/toastNotifications';

// TOGGLE ICONS
import { FaBarsStaggered } from 'react-icons/fa6';
import { FaBars } from 'react-icons/fa6';
import { FiMessageSquare } from 'react-icons/fi';
import ChatPopup from './SIDEBAR_SETTING/ChatPopup';

export default function Header({ toggle, setToggle }) {
  const navigate = useNavigate();

  const location = useLocation();

  const [welcomedata, setWelcomeData] = useState([]);
  const [tenantId, setData] = useState('');
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const registrationdata = localStorage.getItem('registrationdata');

    const userDetail = localStorage.getItem('userDetail');

    if (token && (userDetail || registrationdata)) {
      const registrationDataParsed = JSON.parse(registrationdata || '{}');
      setData(registrationDataParsed.tenantId || '');
      setWelcomeData(JSON.parse(userDetail));
      if (window.location.pathname === '/sidebar') {
        navigate('/sidebar');
      } else if (window.location.pathname !== '/sidebar') {
        navigate(window.location.pathname);
      }
    } else {
      navigate('/tenantlogin'); // Redirect to login if no data found
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
        `${main_base_url}/Tenants/gettenant/${tenantId}`
      );
    } catch (error) {
      console.error('Error fetching welcome data:', error);
    }
  };

  const signout = () => {
    localStorage.clear();
    sessionStorage.clear();
    showSuccessToast('Logout Successful');
    navigate(`/tenantlogin`);
  };

  const [popup, setPopup] = useState(true);

  const handlePopup = () => {
    setPopup(!popup);
  };

  const menu = [
    {
      key: 1,
      logo: <RiAddBoxFill />,
    },
    {
      key: 2,
      logo: <FiMessageSquare />,
      functionality: handlePopup,
    },
    {
      key: 3,
      logo: <IoMdNotifications />,
    },
    {
      key: 4,
      logo: <TbCalendarMonth />,
    },
    {
      key: 5,
      logo: <IoMdSettings />,
      link: '/sidebar/setting',
    },
    {
      key: 6,
      logo: <MdLogout />,
      functionality: signout,
    },
  ];

  useEffect(() => {
    const activeMenuItem = menu.find((item) =>
      location.pathname.includes(item.link)
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
      <div className="flex justify-between items-center py-3 mx-3 overflow-visible">
        <div className="flex justify-center items-center">
          <button
            className="flex flex-start bg-cyan-500 text-white shadow rounded-full text-lg p-1 "
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <FaBarsStaggered /> : <FaBars />}
          </button>

          <button className="flex items-center  gap-2 border rounded-full py-1 px-2 ml-[10px]">
            Igniculuss <FaAngleDown />
          </button>
        </div>

        <div className="flex gap-1 justify-end  items-center">
          {menu.map(({ key, logo, link, functionality }) => (
            <div
              key={key}
              className={`cursor-pointer p-1 ${
                activeKey === key
                  ? 'rounded-full p-1 bg-gray-700 text-cyan-500 shadow-md '
                  : 'text-gray-700 '
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
        {/* POPUP */}
        {popup && <ChatPopup />}
      </div>
    </>
  );
}
Header.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
};