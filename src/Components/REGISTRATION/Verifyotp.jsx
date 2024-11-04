import axios from "axios";
import { useState, useEffect } from "react";
import {  useParams, Link } from "react-router-dom";
import { main_base_url,localBase, urlchange_base } from "./../../Config/config";

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
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [emailreg, setEmailreg] = useState("");


  useEffect(() => {
    const registration = JSON.parse(localStorage.getItem('registrationdata'));
    if (registration && registration.data && registration.data.email) {
      // console.log(registration.data.email)  
      setEmailreg(registration.data.email);
    } else {
      console.error('Registration data or email is not available.');
    }
  }, []);

  useEffect(() => {
    let timer;
    if (resendDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 60;
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
        setBase64Image(event.target.result.split(',')[1]);
        document.getElementById('profileImage').src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById('imageInput').click();
  };

  const handleSubmit = async (event) => {

  event.preventDefault();

   //validation Added for OTP
   if(otp.length < 1 ){
    showErrorToast('Please enter OTP')
  }
  else if(otp.length > 6){
    showErrorToast('OTP cannot be more than 6 digits')
  }
  else if(otp.length < 6){
    showErrorToast('OTP cannot be less than 6 digits')
  }

  const formValues = { 
    emailid: emailreg, 
    otp: otp 
  };

  try {
    const response = await axios.post(`${main_base_url}/Users/verify/otp`, formValues);
    if (response.data.status === 200) {
      // Toggle the modal to open it
      toggleModal();
    } 
  } catch (error) {
    showErrorToast(error.response.data.message);
  }
};



  const handleResend = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${main_base_url}/Users/send/otp`, { Email: emailreg });
      if (response.data.status === 200) {
        setResendDisabled(true);
      } else {
        alert('Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to resend OTP: ' + error.message);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = {
      userId: userId,
      name: companyName,
      host: companyName + ".copulaa.com",
      tenentLogo: base64Image,
      connectionString: "string",
      tenantEmail: emailreg,
      domain: "",
    };
    try {
      const response = await axios.post(`${main_base_url}/Tenants`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response.data)
      const data = response.data
      if (data.isSuccess === false) {
        // console.log('Success:', response.data.tenantId);
        showErrorToast(data.message);
      } else {
        showSuccessToast("Company Added Successfully");
        localStorage.setItem('companyData', JSON.stringify(data));
        localStorage.setItem('myData', response.data.tenantId);
        const host = response.data.tenant.host;
        console.log(response)

        const tenantId = response.data.tenant.tenantId
        
        //localhost
         const newUrl = `http://${host.split('.')[0]}.${localBase}/welcome/${tenantId}`;
        
         //forServer
          // const newUrl = `http://${host.split('.')[0]}.${urlchange_base}/welcome/${tenantId}`;

        window.location.href = newUrl;
        // console.log(newUrl)

      }
    } catch (error) {
      console.error('Error:', error.response.data.errors.tenant);
      showSuccessToast(error.response.data.errors.tenant);
    }
  };


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
    <ToastContainer/>
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

      <div className="bg-cyan-500 min-h-screen flex items-center justify-center">
        <div className="hidden md:flex w-2/3 items-center justify-center">
          <WelcomeSection />
        </div>
        <div className="w-full md:w-1/3 min-h-screen flex items-center bg-cyan md:bg-white justify-center">
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
  <div className="bg-cyan-500 flex flex-col md:flex-row">
    <div className="hidden md:flex bg-cyan flex-col justify-center items-center">
      <div className="bg-white flex flex-col justify-center  gap-2 rounded-md px-6 py-12">
        <img src={IgniculussLogo} alt="Brandlogo" width={80} height={80} className="mx-auto" />
        <img src={VerifyOTP} alt="sample" className ="h-2/3 w-3/4 mx-auto"  />
        <div className="flex text-3xl font-semibold justify-center">
          <GiDiamonds className="place-content-start text-cyan-500" />
          <h1 className="">
              Hello, Igniculuss
          </h1>
        </div>
        <div>
          <p className="text-xs text-gray-400 text-center">
            Skip repetitive and manual sales-marketing tasks. Get highly<br/>
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
  <div className="w-full md:w-3/3 bg-cyan-500 md:bg-white flex min-h-screen flex-col justify-center  ">
    <div className="flex md:hidden justify-center ">
      <img src={IgniculussLogo} alt="sample" width={100} height={50} />
    </div>
    <div className="flex flex-col justify-center mx-10 md:mx-4 px-3 mt-8  bg-white py-3 rounded-2xl">
      <div className="flex text-2xl font-semibold gap-3 items-center">
        <GiDiamonds className="text-3xl hidden md:block" />
        <h1 className="">Verify your Sign-up</h1>
      </div>

      <div className="text-slate-900 text-sm ">
        Enter the one-time password sent to your Email ID.
      </div>

      <div className="mt-8 md:mt-16">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between mb-2">
            <span>{emailreg}</span>
            <Link to="/" className="text-sm underline text-cyan-500">
              Change
            </Link>
          </div>
          <input
            type="number"
            className="h-10 rounded-md px-3 border text-xs focus:outline-none"
            placeholder="XXX XXX"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="flex justify-between items-center mt-3">
            <div
              className={`text-left text-sm text-slate-900 cursor-pointer ${
                resendDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={!resendDisabled ? handleResend : null}
            >
              {resendDisabled ? `Resend in ${countdown}s` : "Resend"}
            </div>
            <div className="text-right text-sm">
              <Link to="/" className="underline text-cyan-500">
                Back to login
              </Link>
            </div>
          </div>
          <div className="mt-12">
            <button
              type="submit"
              className="bg-cyan-500 py-3 rounded-lg text-white text-sm w-full"
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
    <div className="bg-white p-12 rounded-lg md:w-2/3 lg:w-1/3   w-full mx-10">
      <div className="text-center text-xl sm:text-2-xl  font-semibold mb-4 flex">
        <span className="cursor-default	text-gray-400" onClick={toggleModal}> X </span>
        <span className ="mx-auto ">
          Add Compnay Logo </span>
      </div>
      <form onSubmit={handleUpload} className="flex flex-col items-center gap-6">
        
        <div className="w-full flex flex-col gap-8">
          <input
            id="imageInput"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
          <img
            id="profileImage"
            src={base64Image ? `data:image/png;base64,${base64Image}` : `companyUploadIMG`}
            alt="Profile"
            onClick={handleImageClick}
            className="w-24 h-24 rounded-full cursor-pointer border text-center mx-auto"
          />
          <p className ="text-center text-xs text-gray-500">Supported formates: JPEG, PNG</p>
          <label
           htmlFor="companyName"
                  className="text-md font-medium text-gray-700" 
          >Company Name
          <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mb-4 p-2 border rounded-md w-full"
        />
        </label>
        </div>
        <button
          type="submit"
          className="bg-cyan-500 py-4 px-4 rounded-lg text-white w-full"
        >
          Submit
        </button>
      </form>

    </div>
  </div>
);

export default VerifyOtp;
