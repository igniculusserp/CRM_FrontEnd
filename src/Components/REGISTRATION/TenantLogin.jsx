//react
import { Link,  useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//react-icons
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { GiDiamonds } from "react-icons/gi";

//react-toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {showSuccessToast,showErrorToast} from "./../../utils/toastNotifications";

//imgUsed
import IgniculussLogo from "./../../assets/images/IgniculussLogo.png";
import CRMLoginPage from "./../../assets/images/CRMLoginPage.png";
import Microsoft from "./../../assets/images/microsoft-logo.png";

import { getHostnamePart } from "../SIDEBAR/SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import {protocal_url, tenant_base_url, urlchange_base } from "./../../Config/config";

// ---------------------------- MSAl Import --------------------------------

import { useMsal } from "@azure/msal-react";
import msalInstance, { loginRequest, graphConfig } from "../../Config/msalConfig";

export default function TenantLogin() {

//-------------------------------------- Microsoft Authentication Setup --------------------------------

const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userData, setUserData] = useState(null);
const { instance } = useMsal();

const handleMicrosoftLogin = async () => {
  try {
    // Trigger login popup
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    console.log("Login successful:", loginResponse);

    // Set active account after login
    msalInstance.setActiveAccount(loginResponse.account);
    setIsAuthenticated(true);

    // Fetch user profile
    fetchUserProfile();
  } catch (error) {
    console.error("Login failed:", error);
    setIsAuthenticated(false);
  }
};

const fetchUserProfile = async () => {
  try {
    const activeAccount = msalInstance.getActiveAccount();
    if (!activeAccount) {
      throw new Error("No active account! Please log in.");
    }

    // Acquire token silently for the active account
    const tokenResponse = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: activeAccount,
    });

    const userProfile = await fetch(graphConfig.graphMeEndpoint, {
      headers: {
        Authorization: `Bearer ${tokenResponse.accessToken}`,
      },
    }).then((res) => res.json());

    console.log("User Profile:", userProfile);
    if(userProfile.mail!=""){
      navigate("/sidebar");
    }
    setUserData(userProfile);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
};

useEffect(() => {
  // Check for existing accounts in the cache on component mount
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]); // Set the first account as active
    setIsAuthenticated(true);
  }
 
}, []);

  //username
  const [userName, setuserName] = useState("")
  //password
  const [password, setPassword] = useState("")

  //not resolved yet 23/10/2024
  const deviceType = "";
  const deviceAddress ="";

  //
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  //naviagate fuction
  const navigate = useNavigate()

  //to read url
  const name = getHostnamePart();


  //it is just to verify companyName in URL 
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

        // console.log("API Response:", response); 
        const { isSuccess } = response.data;
      } catch (error) {
        console.error("Error checking tenant:", error); // Log the error
        setTimeout(() => {
          //localhost
            const newUrl = `http://${name}.localhost:5173`;
          
          //forServer
          //  const newUrl = `http://${name}.${urlchange_base}/VerifyTenant `
          window.location.href = newUrl;
        }, 100);

      }
    };
    verifyTenant();
  }, []);
    
    const emailRegex = /^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/
    function handleusername(e) {
        let userName = e.target.value;
        if (!userName.match(emailRegex)) {
            setEmailError(true)
        }
        else {
            setEmailError(false)
        }
        setuserName(e.target.value)
    }

    const passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    function handlepassword(e) {
        let password = e.target.value;
        if (!password.match(passwordRegex)) {
            setPasswordError(true)
        }
        else {
            setPasswordError(false)
        }
        setPassword(e.target.value)
    }
    const [passwordEye, setPasswordEye] = useState(false);
  
    function togglePasswordEye() {
      setPasswordEye(!passwordEye);
    }


    async function handleSubmit(e) {
        e.preventDefault()
        
        //Email Regex match
        const emailRegex = /^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/

          //Password Regex match
        const passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

        
        try {
            const response = await axios.post(`${protocal_url}${name}.${tenant_base_url}/Users/login`, {
                userName: userName,
                password: password,
                deviceType: deviceType,
                deviceAddress: deviceAddress
            })
            const logindetail = response.data.data
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("userDetail", JSON.stringify(logindetail))
            localStorage.setItem("myData_forget", userName);
            
            navigate('/tenantloginOTP')
        }
        catch (error) {
            if (error.response.data) {
              console.log(error)
              showErrorToast(error.response.data.message)
            } else {
              console.log(error)
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
              <h1 className="">Log In</h1>
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
                {/*----------> Password <---------- */}
                <label htmlFor="password" className="text-xs font-medium text-gray-700 relative block">
                  Password
                  <input
                    type={passwordEye ? "text" : "password"}
                    name="password"
                    className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm pr-12" // Add padding to the right to avoid overlapping text
                    value={password}
                    onChange={handlepassword}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordEye}
                    className="absolute inset-y-0 top-6 right-2 flex items-center text-gray-500 transition-opacity duration-300 ease-in-out"
                  >
                    {passwordEye ? (
                      <IoIosEye
                        size={22}
                        className={`transition-opacity duration-300 ease-in-out ${
                          passwordEye ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ) : (
                      <IoIosEyeOff
                        size={22}
                        className={`transition-opacity duration-300 ease-in-out ${
                          passwordEye ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    )}
                  </button>
                </label>


                <Link to  = "/forgetpassword" className="text-xs font-medium text-cyan-500 underline">Reset Password</Link>

                
                <button className="bg-cyan-500 outline-none text-white py-4 text-xs rounded-md font-bold mt-4">
                  Submit
                </button>
              </form>

              <div className="relative text-center mt-8">
                <div className="absolute inset-2 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative inline-block px-4 bg-white text-sm">
                  <span className="font-light">Or Login With</span>
                </div>
              </div>
              </div>
              <button 
               onClick={handleMicrosoftLogin}
              className="bg-white py-4 text-xs rounded-md font-bold border-2 border-gray-400 mt-8 flex justify-center items-center gap-2">
              Login with Microsoft <img src =  {Microsoft} className="h-4 w-4 shadow-md"/>
            </button>
        
            </div>
          </div>
        </div>

    </>
  );
}