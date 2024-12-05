//react
import { Link,  useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//react-icons
import { GiDiamonds } from "react-icons/gi";

//react-toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {showSuccessToast, showErrorToast} from "../../utils/toastNotifications";

//imgUsed
import IgniculussLogo from "./../../assets/images/IgniculussLogo.png";
import CRMLoginPage from "./../../assets/images/CRMLoginPage.png";

import { getHostnamePart } from "../SIDEBAR/SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { main_base_url, protocal_url, tenant_base_url, urlchange_base } from "../../Config/config";

export default function VerifyTenant() {
  const [userName, setuserName] = useState("");

  const name = getHostnamePart(); 
  console.log("Hostname part:", name); 
  
  
  useEffect(() => {
    const apiUrl = `${protocal_url}${name}.${tenant_base_url}/Tenants/check`;
    console.log("Constructed API URL:", apiUrl); 

    const verifyTenant = async () => {
      try {
        const response = await axios.post(apiUrl, {
          tenantName: name, 
          tenanturl: apiUrl 
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log("API Response:", response); 
        const { isSuccess } = response.data;

        if (isSuccess) {
          {
          showSuccessToast("Tenant Verified!");
          setTimeout(() => {
            //localhost
              const newUrl = `http://${name}.localhost:5173/tenantlogin`;
            
            //forServer
            //  const newUrl = `http://${name}.${urlchange_base}/tenantlogin `
            window.location.href = newUrl;
          }, 100);
        }
        } else {
          showErrorToast("Tenant verification failed");
        }
      } catch (error) {
        console.error("Error checking tenant:", error); // Log the error
      }
    };

    verifyTenant();
  }, []);

  function handleusername(e) {
    setuserName(e.target.value);
  }
   
  async function handleSubmit(e) {
    e.preventDefault();
    const emailRegex = /^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/;
    try {
      const response = await axios.post(`${main_base_url}/Tenants/check1`, {
        emailId: userName,
      });
    
      const {isSuccess, data, message} = response.data

      if(!isSuccess){
          showErrorToast(message)
          
        }
        else{
          showSuccessToast("Login Successful!");
          setTimeout(() => {
            //localhost
              const newUrl = `http://${data.name}.localhost:5173/tenantlogin`;
            
            //forServer
            //  const newUrl = `http://${data.name}.${urlchange_base}/tenantlogin `
            window.location.href = newUrl;
          }, 100);
        }
      }
    catch (error) {
      if (error.response.data) {
        showErrorToast(error);
      }
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="bg-cyan-500 sm:bg-cyan-500 min-h-screen flex flex-col md:flex-row">
        {/*----------> Part-I <---------- */}
        <div className="hidden md:flex w-2/3 bg-cyan min-h-screen flex-col justify-center items-center">
          <div className="bg-white flex flex-col justify-center items-center py-8 px-16 gap-2 rounded-md">
            <img src={IgniculussLogo} alt="Brandlogo" width={80} height={80} />
            <img src={CRMLoginPage} alt="sample" className="h-2/4" />
            <div className="flex text-3xl font-semibold">
              <GiDiamonds className="text-cyan-500" />
              <h1>Hello, Igniculuss</h1>
            </div>
            <div>
              <p className="text-xs text-gray-400 text-center">
                Skip repetitive and manual sales-marketing tasks. Get highly
                <br />
                productive through automation and save tons of time!
              </p>
            </div>
          </div>
        </div>

        {/*----------> Part-II <---------- */}
        <div className="w-full md:w-1/3 bg-cyan-500 md:bg-white flex min-h-screen flex-col justify-center ">
          {/* Image on Top for Small Screens */}
          <div className="flex md:hidden justify-center">
            <img src={IgniculussLogo} alt="sample" width={100} height={50} />
          </div>

          <div className="flex flex-col justify-center mx-10 md:mx-4 px-3 mt-8  bg-white py-3 rounded-2xl">
            <div className="flex text-2xl font-semibold gap-3 items-center">
              <GiDiamonds className="text-3xl hidden md:block" />
              <h1 className="">Check Tenant</h1>
            </div>

            <div className="mt-6">
              {/*----------> FORM <---------- */}
              <form
                className="flex flex-col gap-2  rounded-md"
                onSubmit={handleSubmit}
              >
                {/*----------> Username <---------- */}
                <label
                  htmlFor="userName"
                  className="text-xs font-medium text-gray-700"
                >
                  User Name
                  <input
                    type="email"
                    name="userName"
                    className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm flex justify-between"
                    value={userName}
                    onChange={handleusername}
                    placeholder="specimen@company.com"
                  />
                </label>
              
                <button className="bg-cyan-500 outline-none text-white py-4 text-xs rounded-md font-bold mt-4">
                  Submit
                </button>
              </form>
             
          <div className="relative text-center mt-8">
          <div className="absolute inset-2 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative inline-block px-4 bg-white text-sm">
            <span className="font-light">Or Join Us</span>
          </div>
        </div>
        </div>
    
      <div className="mx-auto text-sm mt-8">
        <span className="font-light">
          Don’t have an Account?
          <Link to="/registration">
            <span className="text-cyan-500 font-semibold block text-center underline md:inline-block md:no-underline md:font-normal">
              Create Account
            </span>
          </Link>
        </span>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}