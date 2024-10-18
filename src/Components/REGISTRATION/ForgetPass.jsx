//react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiDiamonds } from "react-icons/gi";
import { Link } from "react-router-dom";

import forgetPassword from "./../../assets/images/forgetPassword.png";
import IgniculussLogo from "./../../assets/images/IgniculussLogo.png";
import { showErrorToast, showSuccessToast } from "./../../utils/toastNotifications";
import { useOTP } from "../../store/OTPContext";

export default function ForgetPass() {
  const [forgetemail, setForgetEmail] = useState("");
  const { handleResend } = useOTP(); // Use OTP context for OTP sending
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForgetEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/;

    if (forgetemail.length === 0) {
      showErrorToast("Please enter Email");
      return;
    }

    if (!forgetemail.match(emailRegex)) {
      showErrorToast("Invalid Email");
      return;
    }

    try {
      // Store email in localStorage for OTPContext to pick up
      localStorage.setItem("myData_forget", forgetemail);

      // Trigger OTP resend using the context
      await handleResend();

      showSuccessToast("OTP successfully sent to your registered email");

      // Navigate to OTP page
      navigate("/forgetpasswordotp");
    } catch (error) {
      showErrorToast("Failed to send OTP: " + error.toString());
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-cyan-500 min-h-screen flex flex-col md:flex-row">
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

        <div className="w-full md:w-1/3 bg-cyan-500 md:bg-white flex min-h-screen flex-col justify-center ">
          <div className="flex md:hidden justify-center">
            <img src={IgniculussLogo} alt="sample" width={100} height={50} />
          </div>

          <div className="flex flex-col justify-center mx-10 md:mx-4 px-3 mt-8 bg-white py-3 rounded-2xl">
            <div className="flex text-2xl font-semibold gap-3 items-center">
              <GiDiamonds className="text-3xl hidden md:block mb-6" />
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
                  className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm"
                  onChange={handleChange}
                  placeholder="specimen@company.com"
                />
                <button className="bg-cyan-500 outline-none text-white py-4 text-xs mt-12 mx-12 rounded-md font-bold">
                  Submit
                </button>
              </form>

              <div className="relative text-center mt-8">
                <div className="absolute inset-2 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative inline-block px-4 bg-white text-sm">
                  <span className="font-light">Back to</span>
                  <Link to="/tenantlogin">
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
