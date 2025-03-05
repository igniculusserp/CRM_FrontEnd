import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
      navigate("/tenantlogin"); 
    } else {
      navigate("/desired-path"); 
    }
  };

  useEffect(() => {
    const fetchWelcomeData = async () => {
      try {
        const response = await axios.get(
          `${main_base_url}/Tenants/tenantuser/${tenantId}`,
        );
        const tenantWithUsers = response.data.tenantWithUsers;
        setWelcomeData(tenantWithUsers);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "registrationdata",
          JSON.stringify(tenantWithUsers),
        );
        localStorage.setItem(
          "userDetail",
          JSON.stringify({
            firstName: tenantWithUsers.firstName,
            lastName: tenantWithUsers.lastName,
          }),
        );
      } catch (error) {
        console.error("Error fetching welcome data:", error);
      }
    };

    if (tenantId) {
      fetchWelcomeData();
    } else {
      console.error("No tenantId found in URL parameters.");
    }
  }, [tenantId]); 

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-500">
      <div className="w-full py-10 mx-6 bg-white shadow-lg rounded-3xl sm:w-2/3 lg:w-1/3">
        <div className="relative w-full">
          <div className="absolute left-0 w-16 top-8 md:w-24">
            <img src={welcomePageLeft} alt="Decoration" />
          </div>
          <div className="absolute right-0 w-16 top-32 md:w-24">
            <img src={welcomePageRight} alt="Decoration" />
          </div>

          <div className="">
            <img
              id="logoImg"
              src={welcomedata.tenantUrl}
              alt="Company Logo"
              className="mx-auto rounded-full h-28 w-28"
            />
          </div>
          <div className="flex justify-center pt-12">
            <div className="text-3xl font-extrabold text-cyan-500 sm:text-5xl">
              Welcome
            </div>
          </div>
          <div className="flex justify-center">
            <div className="py-2 text-lg text-center text-slate-900">
              {welcomedata.firstName} {welcomedata.lastName}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="pt-2 pb-2 text-center text-slate-900">
              {welcomedata.tenantName}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleClick}
              className="w-2/3 py-2 mx-10 font-medium text-white rounded-md hover:bg-cyan- bg-cyan-500"
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
