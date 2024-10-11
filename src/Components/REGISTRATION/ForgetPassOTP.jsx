import { useOTP } from "../../store/OTPContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import forgetPassword from "./../../assets/images/forgetPassword.png";
import IgniculussLogo from "./../../assets/images/IgniculussLogo.png";
import { main_base_url } from "./../../Config/config";
import { GiDiamonds } from "react-icons/gi";
import { showSuccessToast, showErrorToast } from "./../../utils/toastNotifications";
import { useState, useEffect } from "react";

export default function ForgetPassOTP() {
  const { otp, resendDisabled, countdown, handleResend, handleChange } = useOTP();
  const [email, setemail] = useState("")

  useEffect(() => {
    const storedEmail = localStorage.getItem("myData_forget");
    if (storedEmail) {
      setemail(storedEmail);
    } else {
      console.error("Email is not available in localStorage.");
    }
  }, []);

  const navigate = useNavigate();

  // Handle OTP verification
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formValues = { 
            emailid: email, 
            otp: otp 
          };

    try {
      const response = await axios.post(`${main_base_url}/Users/verify/otp`, formValues);
      if (response.data.status === 200) {
        showSuccessToast("OTP Verified");
        navigate("/forgetresetpass");
      } else {
        showErrorToast("OTP verification failed");
      }
    } catch (error) {
      console.error("Error:", error);
      showErrorToast("OTP verification failed: " + error.message);
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
              <h1>
                Forgot your <br />
                Password
              </h1>
            </div>

            <div className="flex sm:mx-10">
              <p className=" text-gray-500">Don't worry about your account</p>
            </div>

            <div className="mt-8 md:mt-16">
              <form onSubmit={handleSubmit} className="flex flex-col mx-10">
                <label htmlFor="forgetemail" className="text-xs font-medium text-gray-700">
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
                <div className="flex flex-col justify-center items-center gap-2 mt-6">
                  <div className="text-sm">
                    <p>Code was sent to your Mail Address</p>
                    <p className="text-center text-cyan-500">{email}</p>
                  </div>
                  <div className="mt-6">
                    <span className="text-sm">This code will expire in </span>
                    <span className="text-red-500">{countdown}{' '}</span>
                    <span className="text-sm">sec's</span>
                  </div>
                </div>
                <button className="bg-cyan-500 outline-none text-white py-4 text-xs mt-3 rounded-md font-bold">
                  Verify
                </button>
                <div className="flex justify-between items-center mt-3">
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
