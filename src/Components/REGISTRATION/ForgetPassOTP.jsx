import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import forgetPassword from "./../../assets/images/forgetPassword.png";
import IgniculussLogo from "./../../assets/images/IgniculussLogo.png";
import { main_base_url } from "./../../Config/config";

import { GiDiamonds } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../utils/toastNotifications";

export default function ForgetPassOTP() {
  const navigate = useNavigate();
  const [otp, setotp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true); 
  const [countdown, setCountdown] = useState(120);
  const [email, setemail] = useState("");

  //-----------------Email Read-----------------
  useEffect(() => {
    const storedEmail = localStorage.getItem("myData_forget");
    if (storedEmail) {
      setemail(storedEmail);
    } else {
      console.error("Email is not available in localStorage.");
    }
  }, []);

  //-----------------Resend OTP TIMER-----------------
  useEffect(() => {
    let timer;
    if (resendDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendDisabled(false); // Enable resend button
            return 120;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendDisabled]);

  //-----------------Resend OTP Function-----------------
  const handleResend = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${main_base_url}/Users/send/otp`, {
        Email: email,
      });
      if (response.data.status === 200) {
        setResendDisabled(true); // Disable the resend button
        showSuccessToast("OTP Sent");
      } else {
        showErrorToast("Failed To Sent OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to resend OTP: " + error.message);
    }
  };

  //-----------------HandleChange OTP INPUT-----------------
  const handleChange = (e) => {
    let OTP = e.target.value;
    setotp(OTP);
    console.log(otp);
  };

  //-----------------Handle SUBMIT-----------------
  const handleSubmit = async (event) => {
    event.preventDefault();

     //validation Added for OTP
     if(otp.length < 1 ){
      showErrorToast('OTP field is empty')
    }
    else if(otp.length > 6){
      showErrorToast('OTP cannot be more than 6 digits')
    }
    else if(otp.length < 6){
      showErrorToast('OTP cannot be less than 6 digits')
    }

    const formValues = {
      emailid: email,
      otp: otp,
    };

    try {
      const response = await axios.post(`${main_base_url}/Users/verify/otp`, formValues);
      const {message, isSuccess} = response.data
      if (isSuccess) {
        showSuccessToast(message);
        navigate("/forgetresetpass");
      } else {
        showErrorToast("OTP verification failed");
      }
    } catch (error) {
      console.error("Error:", error);
      showErrorToast(error.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer />
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
              <p className=" text-gray-500">Don't worry about your account</p>
            </div>

            <div className="mt-8 md:mt-16">
              <form onSubmit={handleSubmit} className="flex flex-col mx-10">
                <label
                  htmlFor="forgetemail"
                  className="text-xs font-medium text-gray-700"
                >
                  Enter OTP
                </label>
                <input
                  type="number"
                  name="otp"
                  value={otp}
                  className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm"
                  onChange={handleChange}
                  placeholder="000000"
                />
                <div className="flex flex-col justify-center items-center gap-2 mt-6  ">
                  <div className="text-sm">
                    <p>Code has been sent to your Mail Address </p>
                    <p className="text-center text-cyan-500">{email}</p>
                  </div>
                  <div className="mt-6">
                    <span className="text-sm">This code will expire in </span>
                    <span className="text-red-500">{countdown}{' '}</span>
                    <span className="text-sm">sec's </span>
                  </div>
                </div>
                <button className="bg-cyan-500 outline-none text-white py-4 text-xs  mt-3 rounded-md font-bold">
                  Verify
                </button>
                <div className="flex justify-between items-center mt-3 ">
                  <div
                    className={`text-left text-sm text-slate-900 cursor-pointer ${
                      resendDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={!resendDisabled ? handleResend : null}
                  >
                    {resendDisabled ? `Resend` : "Resend"}
                  </div>
                  <div className="text-right text-sm">
                    <Link to="/" className="underline text-cyan-500">
                      Back to login
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}