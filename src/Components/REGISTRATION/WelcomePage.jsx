import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { main_base_url } from "./../../Config/config";
import welcomePageLeft from "./../../assets/images/welcomePageLeft.png";
import welcomePageRight from "./../../assets/images/welcomePageRight.png";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { tenantId } = useParams();
  const [welcomedata, setWelcomeData] = useState({});
  const [condition, setCondition] = useState(false); // State to track the condition

  const handleClick = () => {
    if (!condition) {
      setCondition(true);
      navigate('/tenantlogin') // Set condition to true on first click
    } else {
      navigate('/desired-path'); // Replace '/desired-path' with the path you want to navigate to
    }
  };

  useEffect(() => {
    const fetchWelcomeData = async () => {
      try {
        const response = await axios.get(`${main_base_url}/Tenants/tenantuser/${tenantId}`);
        const tenantWithUsers = response.data.tenantWithUsers;
        setWelcomeData(tenantWithUsers);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("registrationdata", JSON.stringify(tenantWithUsers));
        localStorage.setItem("userDetail", JSON.stringify({ firstName: tenantWithUsers.firstName, lastName: tenantWithUsers.lastName }));
      } catch (error) {
        console.error('Error fetching welcome data:', error);
      }
    };

    if (tenantId) {
      fetchWelcomeData();
    } else {
      console.error('No tenantId found in URL parameters.');
    }
  }, [tenantId]); // Fetch data when tenantId changes

  return (
    <div className="bg-cyan-500 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-3xl sm:w-2/3 lg:w-1/3 w-full mx-6 py-10 shadow-lg">
        <div className="relative w-full">
          <div className="absolute top-8 left-0 w-16 md:w-24">
            <img src={welcomePageLeft} alt="Decoration"  />
          </div>
          <div className="absolute top-32 right-0 w-16 md:w-24">
            <img src={welcomePageRight} alt="Decoration" />
          </div>

          <div className="">
            <img
              id="logoImg"
              src={welcomedata.tenantUrl}
              alt="Company Logo"
              className="rounded-full mx-auto w-28 h-28"
            />
          </div>
          <div className="flex justify-center pt-12">
            <div className="font-extrabold text-cyan-500 text-3xl sm:text-5xl">
              Welcome
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-center py-2 text-lg text-slate-900">
              {welcomedata.firstName} {welcomedata.lastName}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-center pt-2 pb-2 text-slate-900">
              {welcomedata.tenantName}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleClick}
              className="font-medium bg-cyan-500 text-white rounded-md w-2/3 py-2 mx-10 hover:bg-cyan-"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
