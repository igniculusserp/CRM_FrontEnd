import { useState, useEffect } from "react";

import forgetPassword from "./../../assets/images/forgetPassword.png";
import IgniculussLogo from "./../../assets/images/IgniculussLogo.png";
import { main_base_url, protocal_url, tenant_base_url } from "./../../Config/config";

import { IoIosEye, IoIosEyeOff } from "react-icons/io";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../utils/toastNotifications";

import { GiDiamonds } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgetResetPassword() {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordEye, setPasswordEye] = useState(false);

  const navigate = useNavigate();

    const fullURL = window.location.href;
    const url = new URL(fullURL);
    const subdomain = url.hostname.split('.')[0];


  useEffect(() => {
    const storedEmail = localStorage.getItem("myData_forget");
    if (storedEmail) {
      setemail(storedEmail);
    } else {
      console.error("Email is not available in localStorage.");
    }
  }, []);

  function handlepassword(e) {
    let pass = e.target.value
    setPassword(pass);
  }

  function handleConfirmPassword(e) {
    //console.log(e.target.value)
    let cnfPass = e.target.value
    setConfirmPassword(cnfPass);
  }

  function togglePasswordEye() {
    setPasswordEye(!passwordEye);
  }

  const  handleSubmit = async (e) => {
    e.preventDefault(); 

    const formValue = {
      email : email,
      newPassword : password,
      confirmPassword: confirmPassword
    };
    try {

      const response = await axios.post(`${protocal_url}${subdomain}.${tenant_base_url}/Users/reset/password`, formValue);
      if(response.data.status === 200) {
        showSuccessToast('Password has been changed')

        navigate("/forgetpasssucess")
      }
    }catch (error) {
      showErrorToast(error)
    }
    };  

  return (
    <>
    <ToastContainer/>
      <div className="bg-cyan-500 min-h-screen flex flex-col md:flex-row">
        {/*----------> Part-I <---------- */}
        <div className="hidden md:flex w-2/3 bg-cyan min-h-screen flex-col justify-center items-center">
          <div className="bg-white flex flex-col justify-center items-center py-10 px-16 gap-2 rounded-md">
            <img src={IgniculussLogo} alt="Brandlogo" width={80} height={80} />
            <img src={forgetPassword} alt="sample" width={300} height={150} />
            <div className="flex text-3xl font-semibold">
              <GiDiamonds className="mt-1 text-cyan-500" />
              <h1 className="">
                Don't worry <br />
                we'll help you.
              </h1>
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
              <GiDiamonds className="text-3xl hidden md:block mb-6" />
              <h1 className="">
                Forgot your <br />
                Password
              </h1>
            </div>

            <div className="flex sm:mx-10">
              <p className="text-sm text-gray-500">
                Your password must be different from the previous used
                passwords.
              </p>
            </div>

            <div className="mt-8 md:mt-8">
              <form onSubmit={handleSubmit} className="flex flex-col mx-10">
                {/*----------> Password <---------- */}
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="password"
                    className="text-xs font-medium text-gray-700 relative block"
                  >
                    Set New Password
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

                  {/*---------->Confirm Password <---------- */}
                  <label
                    htmlFor="confirmPassword"
                    className="text-xs font-medium text-gray-700 relative block"
                  >
                    Re-Enter Password
                    <input
                      type={passwordEye ? "text" : "password"}
                      name="password"
                      className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm pr-12" // Add padding to the right to avoid overlapping text
                      value={confirmPassword}
                      onChange={handleConfirmPassword}
                      placeholder="Confirm Password"
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
                </div>

                <button className="bg-cyan-500 outline-none text-white py-4 text-xs  mt-16  rounded-md font-bold">
                  Reset Password
                </button>
              </form>
            
            </div>
            <div className="mx-auto text-sm mt-8">
              <span className="text-cyan-500 font-medium"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
