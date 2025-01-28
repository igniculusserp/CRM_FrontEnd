import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  main_base_url,
  localBase,
  urlchange_base,
} from "./../../Config/config";

//images
import VerifyOTP from "./../../assets/images/verifyOTP.png";
import companyUploadIMG from "./../../assets/images/companyUploadIMG.png";
import IgniculussLogo from "./../../assets/images/IgniculussLogo.png";
import { GiDiamonds } from "react-icons/gi";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../utils/toastNotifications";

const VerifyOtp = () => {
  const { userId } = useParams();
  const [otp, setOtp] = useState("");

  const [countdown, setCountdown] = useState(60);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [emailreg, setEmailreg] = useState("");

  const [resendDisabled, setResendDisabled] = useState(true); // Initialize to true

  useEffect(() => {
    const registration = JSON.parse(localStorage.getItem("registrationdata"));
    if (registration && registration.data && registration.data.email) {
      // console.log(registration.data.email)
      setEmailreg(registration.data.email);
    } else {
      console.error("Registration data or email is not available.");
    }
  }, []);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBase64Image(event.target.result.split(",")[1]);
        document.getElementById("profileImage").src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  //OTP Handler ----> Submit Button
  const handleSubmit = async (event) => {
    event.preventDefault();
    //validation Added for OTP
    if (otp.length < 1) {
      showErrorToast("Please enter OTP");
    } else if (otp.length > 6) {
      showErrorToast("OTP cannot be more than 6 digits");
    } else if (otp.length < 6) {
      showErrorToast("OTP cannot be less than 6 digits");
    }

    const formValues = {
      emailid: emailreg,
      otp: otp,
    };

    try {
      const response = await axios.post(
        `${main_base_url}/Users/verify/otp`,
        formValues,
      );
      if (response.data.status === 200) {
        // Toggle the modal to open it
        toggleModal();
      }
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  //OTP Handler ----> Resend Button
  const handleResend = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${main_base_url}/Users/send/otp`, {
        Email: emailreg,
      });
      if (response.data.status === 200) {
        setResendDisabled(true);
      } else {
        alert("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to resend OTP: " + error.message);
    }
  };

  //Company Name + Img Verification form SUBMIT
  const handleUpload = async (e) => {
    e.preventDefault();
    const businessType = localStorage.getItem("registrationBusinessType");
    const formData = {
      userId: userId,
      name: companyName?.replace(/\s+/g, ""),
      host: companyName?.replace(/\s+/g, "") + ".copulaa.com",
      tenentLogo: base64Image,
      connectionString: "string",
      tenantEmail: emailreg,
      domain: "",
      bussinessType: businessType,
    };
    try {
      const response = await axios.post(`${main_base_url}/Tenants`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      const data = response.data;
      if (data.isSuccess === false) {
        // console.log('Success:', response.data.tenantId);
        showErrorToast(data.message);
      } else {
        showSuccessToast("Company Added Successfully");
        localStorage.setItem("companyData", JSON.stringify(data));
        localStorage.setItem("myData", response.data.tenantId);
        const host = response.data.tenant.host;
        console.log(response);

        const tenantId = response.data.tenant.tenantId;

        //localhost
        const newUrl = `http://${host.split(".")[0]}.${localBase}/welcome/${tenantId}`;

        //forServer
        // const newUrl = `http://${host.split('.')[0]}.${urlchange_base}/welcome/${tenantId}`;

        window.location.href = newUrl;
        // console.log(newUrl)
      }
    } catch (error) {
      console.error("Error:", error.response.data.errors.tenant);
      showSuccessToast(error.response.data.errors.tenant);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <ToastContainer />
      {isModalOpen && (
        <Modal
          companyName={companyName}
          setCompanyName={setCompanyName}
          base64Image={base64Image}
          handleImageClick={handleImageClick}
          handleImageChange={handleImageChange}
          handleUpload={handleUpload}
          toggleModal={toggleModal}
        />
      )}

      <div className="flex min-h-screen items-center justify-center bg-cyan-500">
        <div className="hidden w-2/3 items-center justify-center md:flex">
          <WelcomeSection />
        </div>
        <div className="bg-cyan flex min-h-screen w-full items-center justify-center md:w-1/3 md:bg-white">
          <OtpForm
            otp={otp}
            setOtp={setOtp}
            resendDisabled={resendDisabled}
            countdown={countdown}
            handleResend={handleResend}
            handleSubmit={handleSubmit}
            emailreg={emailreg}
          />
        </div>
      </div>
    </>
  );
};

const WelcomeSection = () => (
  <div className="flex flex-col bg-cyan-500 md:flex-row">
    <div className="bg-cyan hidden flex-col items-center justify-center md:flex">
      <div className="flex flex-col justify-center gap-2 rounded-md bg-white px-6 py-12">
        <img
          src={IgniculussLogo}
          alt="Brandlogo"
          width={80}
          height={80}
          className="mx-auto"
        />
        <img src={VerifyOTP} alt="sample" className="mx-auto h-2/3 w-3/4" />
        <div className="flex justify-center text-3xl font-semibold">
          <GiDiamonds className="place-content-start text-cyan-500" />
          <h1 className="">Hello, Igniculuss</h1>
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
  </div>
);

const OtpForm = ({
  otp,
  setOtp,
  resendDisabled,
  countdown,
  handleResend,
  handleSubmit,
  emailreg,
}) => (
  <div className="md:w-3/3 flex min-h-screen w-full flex-col justify-center bg-cyan-500 md:bg-white">
    <div className="flex justify-center md:hidden">
      <img src={IgniculussLogo} alt="sample" width={100} height={50} />
    </div>
    <div className="mx-10 mt-8 flex flex-col justify-center rounded-2xl bg-white px-3 py-3 md:mx-4">
      <div className="flex items-center gap-3 text-2xl font-semibold">
        <GiDiamonds className="hidden text-3xl md:block" />
        <h1 className="">Verify your Sign-up</h1>
      </div>

      <div className="text-sm text-slate-900">
        Enter the one-time password sent to your Email ID.
      </div>

      <div className="mt-8 md:mt-16">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-2 flex justify-between">
            <span>{emailreg}</span>
            {/* Change button on email 
            <Link to="/" className="text-sm underline text-cyan-500">
              Change
            </Link>
            */}
          </div>
          <input
            type="number"
            className="h-10 rounded-md border px-3 text-xs focus:outline-none"
            placeholder="XXX XXX"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="mt-3 flex items-center justify-between">
            <div
              className={`cursor-pointer text-left text-sm text-slate-900 ${
                resendDisabled ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={!resendDisabled ? handleResend : null}
            >
              {resendDisabled ? `Resend in ${countdown}s` : "Resend"}
            </div>
            <div className="text-right text-sm"></div>
          </div>
          <div className="mt-12">
            <button
              type="submit"
              className="w-full rounded-lg bg-cyan-500 py-3 text-sm text-white"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

const Modal = ({
  companyName,
  setCompanyName,
  base64Image,
  handleImageClick,
  handleImageChange,
  handleUpload,
  toggleModal,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    {/*Change padding form here */}
    <div className="mx-10 w-full rounded-lg bg-white p-12 md:w-2/3 lg:w-1/3">
      <div className="sm:text-2-xl mb-4 flex text-center text-xl font-semibold">
        <span className="cursor-default text-gray-400" onClick={toggleModal}>
          {" "}
          X{" "}
        </span>
        <span className="mx-auto">Add Compnay Logo </span>
      </div>
      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex w-full flex-col gap-8">
          <input
            id="imageInput"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
          <img
            id="profileImage"
            src={
              base64Image
                ? `data:image/png;base64,${base64Image}`
                : companyUploadIMG
            }
            alt="Profile"
            onClick={handleImageClick}
            className="mx-auto h-24 w-24 cursor-pointer rounded-full border text-center"
          />
          <p className="text-center text-xs text-gray-500">
            Supported formates: JPEG, PNG
          </p>
          <label
            htmlFor="companyName"
            className="text-md font-medium text-gray-700"
          >
            Company Name
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mb-4 w-full rounded-md border p-2"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-cyan-500 px-4 py-4 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
);

export default VerifyOtp;
