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
      <div className="flex min-h-screen flex-col bg-cyan-500 md:flex-row">
        {/*----------> Part-I <---------- */}
        <div className="bg-cyan hidden min-h-screen w-2/3 flex-col items-center justify-center md:flex">
          <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-white px-16 py-10">
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
              <p className="text-center text-xs text-gray-400">
                Skip repetitive and manual sales-marketing tasks. Get highly
                <br />
                productive through automation and save tons of time!
              </p>
            </div>
          </div>
        </div>

        {/*----------> Part->II <---------- */}
        <div className="flex min-h-screen w-full flex-col justify-center bg-cyan-500 md:w-1/3 md:bg-white">
          {/* Image on Top for Small Screens */}
          <div className="flex justify-center md:hidden">
            <img src={IgniculussLogo} alt="sample" width={100} height={50} />
          </div>

          <div className="mx-10 mt-8 flex flex-col justify-center rounded-2xl bg-white px-3 py-3 md:mx-4">
            <div className="flex items-center gap-3 text-2xl font-semibold">
              <GiDiamonds className="mb-6 hidden text-3xl md:block" />
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
                  className="mt-1 w-full rounded-md border border-gray-300 px-2 py-2 text-sm outline-none"
                  onChange={handleChange}
                  placeholder="specimen@company.com"
                />
                <button className="mx-12 mt-12 rounded-md bg-cyan-500 py-4 text-xs font-bold text-white outline-none">
                  Submit
                </button>
              </form>

              <div className="relative mt-8 text-center">
                <div className="absolute inset-2 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative inline-block bg-white px-4 text-sm">
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
