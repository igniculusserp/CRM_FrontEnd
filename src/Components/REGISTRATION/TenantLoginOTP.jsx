//react
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { ToastContainer } from "react-toastify";

import forgetPassword from "./../../assets/images/forgetPassword.png";
import IgniculussLogo from "./../../assets/images/IgniculussLogo.png";

import { main_base_url } from "./../../Config/config";
import { GiDiamonds } from "react-icons/gi";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../utils/toastNotifications";
import { FaStarOfLife } from "react-icons/fa";

export default function TenantLoginOTP() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true); // Initialize to true
  const [countdown, setCountdown] = useState(120);

  const [count, setCount] = useState(0);

  // Countdown logic for OTP resend
  useEffect(() => {
    let timer;
    if (resendDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendDisabled(false); // Re-enable resend after countdown finishes
            return 120;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendDisabled]);

  // Fetch email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("myData_forget");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      console.error("Email is not available in localStorage.");
    }
  }, []);

  const handleChange = (event) => {
    const newOtp = event.target.value;

    setOtp(newOtp); // Update state
    localStorage.setItem("otp", newOtp); // Store OTP in localStorage
    console.log(newOtp, "dd");
  };

  // Handle OTP submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    //validation Added for OTP
    if (otp.length < 1) {
      showErrorToast("OTP field is empty");
    } else if (otp.length > 6) {
      showErrorToast("OTP cannot be more than 6 digits");
    } else if (otp.length < 6) {
      showErrorToast("OTP cannot be less than 6 digits");
    }

    const formValues = { emailid: email, otp: otp };

    try {
      const response = await axios.post(
        `${main_base_url}/Users/verify/otp`,
        formValues,
      );
      const { isSucess, message } = response.data;

      if (isSucess) {
        showErrorToast(message);
      } else if (!isSucess) {
        showSuccessToast(message);
        navigate("/panel");
      }
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  // Handle OTP resend logic
  const handleResend = async () => {
    try {
      const storedEmail = localStorage.getItem("myData_forget");
      if (!storedEmail) {
        throw new Error("Email not found");
      }

      const response = await axios.post(`${main_base_url}/Users/send/otp`, {
        Email: storedEmail,
      });

      if (response.data.status === 200) {
        setResendDisabled(true);
        showSuccessToast("OTP Sent");
      } else {
        showErrorToast("Failed To Send OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      showErrorToast("Failed to resend OTP: " + error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen flex-col bg-cyan-500 md:flex-row">
        <div className="bg-cyan hidden min-h-screen w-2/3 flex-col items-center justify-center md:flex">
          <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-white px-16 py-10">
            <img src={IgniculussLogo} alt="Brandlogo" width={80} height={80} />
            <img src={forgetPassword} alt="sample" width={300} height={150} />
            <div className="flex text-3xl font-semibold">
              <GiDiamonds className="mt-1 text-cyan-500" />
              <h1>
                Two Factor <br />
                Authentication
              </h1>
            </div>
            <div>
              <p className="text-center text-xs text-gray-400">
                Skip repetitive and manual sales-marketing tasks. Get highly
                <br />
                productive through automation and save tons of time!
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-h-screen w-full flex-col justify-center bg-cyan-500 md:w-1/3 md:bg-white">
          <div className="flex justify-center md:hidden">
            <img src={IgniculussLogo} alt="sample" width={100} height={50} />
          </div>

          <div className="mx-10 mt-8 flex flex-col justify-center rounded-2xl bg-white px-3 py-3 md:mx-4">
            <div className="flex items-center gap-3 text-2xl font-semibold">
              <GiDiamonds className="hidden text-3xl md:block" />
              <h1>Verify OTP</h1>
            </div>

            <div className="flex sm:mx-10">
              <p className="text-gray-500">
                2-FA Enabled for your account, please verify{" "}
              </p>
            </div>

            <div className="mt-8 md:mt-16">
              <form onSubmit={handleSubmit} className="mx-10 flex flex-col">
                <label
                  htmlFor="forgetemail"
                  className="text-xs font-medium text-gray-700"
                >
                  <span className="flex gap-1">
                    Please enter OTP here
                    <FaStarOfLife size={8} className="text-red-500" />
                  </span>
                </label>
                <input
                  type="text"
                  maxLength={6}
                  name="otp"
                  value={otp} // Added OTP state binding
                  className="mt-1 w-full rounded-md border border-gray-300 px-2 py-2 text-sm outline-none"
                  onChange={handleChange} // Added onChange handler
                  placeholder="XXX-XXX"
                  onWheel={(e) => e.target.blur()} // Disable scroll
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(
                      /[a-zA-Z+\-{}\|=\[\]\s]/g,
                      "",
                    ); // Removes letters, symbols, and whitespaces
                  }}
                />
                <div className="mt-6 flex flex-col items-center justify-center gap-2">
                  <div className="text-sm">
                    <p>OTP has been sent to your mail address</p>
                    <p className="text-center text-cyan-500">{email}</p>
                  </div>
                  <div className="mt-6">
                    <span className="text-sm">This code will expire in </span>
                    <span className="text-red-500">{countdown} </span>
                    <span className="text-sm">sec's</span>
                  </div>
                </div>
                <button className="mt-3 rounded-md bg-cyan-500 py-4 text-xs font-bold text-white outline-none">
                  Verify
                </button>
                <div className="mt-3 flex items-center justify-between">
                  <div
                    className={`cursor-pointer text-left text-sm text-slate-900 ${
                      resendDisabled ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={!resendDisabled ? handleResend : null}
                  >
                    {resendDisabled ? `Resend` : "Resend"}
                  </div>
                  <div className="text-right text-sm">
                    <Link to="/tenantlogin" className="text-cyan-500 underline">
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
