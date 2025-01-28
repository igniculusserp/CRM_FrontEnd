import { useState } from "react";
import { main_base_url } from "./../../Config/config";

import axios from "axios";

import forgetPassword from "./../../assets/images/forgetPassword.png";
import IgniculussLogo from "./../../assets/images/IgniculussLogo.png";

import { GiDiamonds } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../utils/toastNotifications";

export default function ForgetPass() {
  const [forgetemail, setforgetemail] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    let fEmail = e.target.value;
    setforgetemail(fEmail);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/;

    if (forgetemail.length === 0) {
      showErrorToast("Please enter Email");
    } else if (!forgetemail.match(emailRegex)) {
      showErrorToast("Invalid Email");
      return;
    }

    try {
      const response = await axios.post(`${main_base_url}/Users/send/otp`, {
        email: forgetemail,
      });
      const emailFromResponse =
        response.data.email || response.data.forgetemail || forgetemail;
      const { message } = response.data;
      localStorage.setItem("myData_forget", emailFromResponse);
      localStorage.setItem("forgetpass", JSON.stringify(response));
      showSuccessToast("OTP sent successfully");

      navigate("/forgetpasswordotp");
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col min-h-screen bg-cyan-500 md:flex-row">
        {/*----------> Part-I <---------- */}
        <div className="flex-col items-center justify-center hidden w-2/3 min-h-screen md:flex bg-cyan">
          <div className="flex flex-col items-center justify-center gap-2 px-16 py-10 bg-white rounded-md">
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
              <p className="text-xs text-center text-gray-400">
                Skip repetitive and manual sales-marketing tasks. Get highly
                <br />
                productive through automation and save tons of time!
              </p>
            </div>
          </div>
        </div>

        {/*----------> Part->II <---------- */}
        <div className="flex flex-col justify-center w-full min-h-screen md:w-1/3 bg-cyan-500 md:bg-white ">
          {/* Image on Top for Small Screens */}
          <div className="flex justify-center md:hidden">
            <img src={IgniculussLogo} alt="sample" width={100} height={50} />
          </div>

          <div className="flex flex-col justify-center px-3 py-3 mx-10 mt-8 bg-white md:mx-4 rounded-2xl">
            <div className="flex items-center gap-3 text-2xl font-semibold">
              <GiDiamonds className="hidden mb-6 text-3xl md:block" />
              <h1 className="">
                Forgot your <br />
                Password
              </h1>
            </div>

            <div className="mt-8 md:mt-16">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <label
                  htmlFor="forgetemail"
                  className="text-xs font-medium text-gray-700"
                >
                  Enter your Email
                </label>
                <input
                  type="email"
                  name="forgetemail"
                  value={forgetemail}
                  className="w-full px-2 py-2 mt-1 text-sm border border-gray-300 rounded-md outline-none"
                  onChange={handleChange}
                  placeholder="specimen@company.com"
                />
                <button className="py-4 mx-12 mt-12 text-xs font-bold text-white rounded-md outline-none bg-cyan-500">
                  Submit
                </button>
              </form>

              <div className="relative mt-8 text-center">
                <div className="absolute flex items-center inset-2">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative inline-block px-4 text-sm bg-white">
                  <span className="font-light">Back to</span>
                  <Link to="/">
                    <span className="text-cyan-500"> Login</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
