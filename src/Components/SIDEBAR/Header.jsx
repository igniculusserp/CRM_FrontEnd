import { useState, useEffect } from "react";
import { RiAddBoxFill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { FaCalendar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { main_base_url } from "./../../Config/config";
import axios from "axios";
import { BiLogOut } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../utils/toastNotifications";

export default function Header() {
    const navigate = useNavigate();
    const [welcomedata, setWelcomeData] = useState([]);
    const [tenantId, setData] = useState('');

    const signout = () => {
        localStorage.clear();
        sessionStorage.clear();
        showSuccessToast('Logout Successful');
        navigate(`/tenantlogin`);
    };

   // In homeScreen component
   useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);  //28-Aug
    const registrationdata = localStorage.getItem('registrationdata');
    const userDetail = localStorage.getItem('userDetail');

    if (token && (userDetail || registrationdata)) {
        // Set the tenantId if registrationdata exists
        const registrationDataParsed = JSON.parse(registrationdata || '{}');
        setData(registrationDataParsed.tenantId || '');
        
        // Optionally set state with retrieved data
        setWelcomeData(JSON.parse(userDetail));

        if (window.location.pathname === '/sidebar') {
            navigate('/sidebar');
        }
        else if(window.location.pathname !== '/sidebar'){
              navigate(window.location.pathname);
              console.log(window.location.pathname)
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
            console.log(`Fetching data for tenantId: ${tenantId}`);
            const response = await axios.get(`${main_base_url}/Tenants/gettenant/${tenantId}`);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error fetching welcome data:', error);
        }
    };

    return (
        <>
        <ToastContainer/>
        <div className="flex justify-between items-center py-3 mx-3">
            <button className="flex items-center justify-center gap-2 border rounded-full py-1 px-2">
                Igniculuss <FaAngleDown />
            </button>
            <div className="flex text-gray-500 gap-3 text-2xl">
                <RiAddBoxFill />
                <IoMdNotifications />
                <FaCalendar />
                <Link to = "/sidebar/setting"> <IoMdSettings /></Link>
                <BiLogOut onClick={signout} className="cursor-pointer"/>
            </div>
        </div>
        </>
    );
}