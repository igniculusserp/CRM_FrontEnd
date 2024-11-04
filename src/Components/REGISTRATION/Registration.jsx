import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { main_base_url } from "./../../Config/config";

import IgniculussLogo from "./../../assets/images/IgniculussLogo.png";
import CRMRegistrationPage from "./../../assets/images/CRMRegistrationPage.png";


import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { GiDiamonds } from "react-icons/gi";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {showSuccessToast, showErrorToast} from "./../../utils/toastNotifications";

export default function Registration() {
  const navigate = useNavigate();
  
  //countries
  const [countries, setCountries] = useState([]);
  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQueryCountry, setSearchQueryCountry] = useState("");

  //countryCodes
  const [countryCodes, setCountryCodes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  const [searchQueryCode, setSearchQueryCode] = useState("");
  
  const [passwordEye, setPasswordEye] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNo: "",
    country: "",
    businessType: "",
  });

  //countryCodes--->>toggle
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //Selected countryCodes
  const handleSelect = (code) => {
    setSelectedCode(code);
    setFormValues((prev) => ({
      ...prev,
      contactNo: prev.contactNo
    }));
    setIsOpen(false);
  };


  //countries--->>toggle
  const toggleDropdownCountry = () => {
    setIsOpenCountry(!isOpenCountry);
  };
  
  //Selected countries
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setFormValues((prev) => ({
      ...prev,
      country: country.countryName,
    }));
    setIsOpenCountry(false);
  };

  // to fetch countries and countryCode
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${main_base_url}/Users/getCountryNames`
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    const fetchCountryCodes = async () => {
      try {
        const response = await axios.get(`${main_base_url}/Users/getCountryCode`);
        const countryCodeData = response.data.map((code) => ({
          value: code.mobilePrefix,
          label: code.mobilePrefix,
          img: code.flagUrl,
          countryName: code.countryName,
        }));
        setCountryCodes(countryCodeData);
        setCountries(countryCodeData)
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
    };

    fetchCountries();
    fetchCountryCodes();
  }, []);

  //countryCode
  const filteredCountryCodes = countryCodes.filter((code) =>
    code.countryName.toLowerCase().includes(searchQueryCode.toLowerCase())
);

//countryName
  const filteredCountries = countries.filter((country) =>
    country.countryName.toLowerCase().includes(searchQueryCountry.toLowerCase())
  );

  //Handle <---> Change
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Handle <---> Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const {
      userId,
      firstName,
      lastName,
      email,
      contactNo,
      password,
      confirmPassword,
      businessType,
    } = formValues;
  
    // Check if country code and contact number are available
    const contactNumberWithCode = selectedCode ? `${selectedCode.value}${contactNo}` : contactNo;
  
    const predefinedValues = {
      userId,
      firstName,
      lastName,
      email,
      contactNo: contactNumberWithCode, // Use concatenated contact number here
      country: selectedCountry ? selectedCountry.countryName : "", // Handle case if no country is selected
      businessType,
      password,
      confirmPassword,
      createdDate: new Date().toISOString(),
      deletedDate: new Date().toISOString(),
      isActive: true,
    };
  
    // Validation
    if (!formValues.firstName) {
      showErrorToast('Please enter first name');
      return; // Exit function if validation fails
    }
  
    if (!formValues.lastName) {
      showErrorToast('Please enter last name');
      return; // Exit function if validation fails
    }

    if (!formValues.email) {
      showErrorToast('Please enter email');
      return; // Exit function if validation fails
    }

    if (!formValues.password ) {
      showErrorToast('Please enter password');
      return; // Exit function if validation fails
    }

    if (!formValues.confirmPassword ) {
      showErrorToast('Please enter confirm password ');
      return; // Exit function if validation fails
    }

    if(formValues.password !== formValues.confirmPassword ){
      showErrorToast("Password doesn't match ")
      return;
    }
  
    if (!formValues.businessType) {
      showErrorToast('Please select business type ');
      return; // Exit function if validation fails
    }
  
    // All validations passed, proceed with submission
    try {
      const response = await axios.post(`${main_base_url}/Users`, predefinedValues);
      localStorage.setItem("myData", response.data.userId);
      localStorage.setItem("registrationdata", JSON.stringify(response));
  
      const { userId } = response.data;
      navigate(`/verifyotp/${userId}`);
    } catch (error) {
      console.error("Error:", error.response.data.message);
      showErrorToast(error.response.data.message);
    }
  };
  
  

  function togglePasswordEye() {
    setPasswordEye(!passwordEye);
  }

  return (
    <>
      <ToastContainer />
      <div className="bg-cyan-500 sm:bg-cyan-500 min-h-screen flex flex-col md:flex-row">
        {/*----------> Part-I <---------- */}
        <div className="hidden md:flex w-2/3 bg-cyan min-h-screen flex-col justify-center items-center">
          <div className="bg-white flex flex-col justify-center items-center py-16 px-16 gap-2 rounded-md">
            <img src={IgniculussLogo} alt="Brandlogo" width={80} height={80} />
            <img
              src={CRMRegistrationPage}
              alt="sample"
              className="h-4/5 w-4/5"
            />
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
        <div className="w-full md:w-1/3 bg-cyan-500 md:bg-white flex min-h-screen flex-col justify-center md:my-0 my-6">
          {/* Image on Top for Small Screens */}
          <div className="flex md:hidden justify-center">
            <img src={IgniculussLogo} alt="sample" width={100} height={50} />
          </div>

          <div className="flex flex-col justify-center mx-10 md:mx-4 px-3 mt-8  bg-white py-3 rounded-2xl">
            <div className="flex text-2xl font-semibold gap-3 items-center">
              <GiDiamonds className="text-3xl hidden md:block" />
              <h1 className="">Create your Account</h1>
            </div>

            <div className="mt-6">
              {/*----------> FORM <---------- */}
              <form
                className="flex flex-col gap-3  rounded-md"
                onSubmit={handleSubmit}
              >
                {/*----------> First-Name <---------- */}
                <label
                  htmlFor="firstName"
                  className="text-xs font-medium text-gray-700"
                >
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm flex justify-between"
                    value={formValues.firstName}
                    onChange={handleChange}
                    placeholder="John"
                  />
                </label>
                {/*----------> Last-Name <---------- */}
                <label
                  htmlFor="lastName"
                  className="text-xs font-medium text-gray-700"
                >
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm flex justify-between"
                    value={formValues.lastName}
                    onChange={handleChange}
                    placeholder="Mark"
                  />
                </label>

                {/*----------> Email <---------- */}
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-gray-700"
                >
                  Email
                  <input
                    type="email"
                    name="email"
                    className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm flex justify-between"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="specimen@company.com"
                  />
                </label>

                {/*---------->Password<---------- */}
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-gray-700 relative block"
                >
                  Password
                  <input
                    type={passwordEye ? "text" : "password"}
                    name="password"
                    className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm flex justify-between"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordEye}
                    className="absolute inset-y-0  top-5 right-2 flex items-center text-gray-500 transition-opacity duration-300 ease-in-out"
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

                {/*---------->Confirm Password<---------- */}
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-medium text-gray-700  relative block"
                >
                  Confirm Password
                  <input
                    type={passwordEye ? "text" : "password"}
                    name="confirmPassword"
                    className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm "
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordEye}
                    className="absolute inset-y-0 top-5 right-2 flex items-center text-gray-500 transition-opacity duration-300 ease-in-out"
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

                   {/*----------> Contact No <---------- */}
               <label htmlFor="Contact" className="text-xs font-medium text-gray-700">
               Contact
               <div className="flex items-center border rounded-md">
                 <div className="relative justify-center items-center w-2/3">
                   <button
                     type="button"
                     onClick={toggleDropdown}
                     className="rounded px-4 py-2 bg-white"
                   >
                     {selectedCode ? (
                       <div className="flex items-center">
                         <img
                           src={selectedCode.img}
                           alt="flag"
                           className="w-6 h-4 mr-2"
                           onError={(e) => e.target.style.display = 'none'} // Hides image if not found
                         />
                         {selectedCode.label}
                       </div>
                     ) : (
                       "Country Code"
                     )}
                   </button>

                   {isOpen && (
                     <div className="absolute mt-2 w-full border rounded bg-white shadow-lg z-10 h-60 overflow-y-scroll">
                       <input
                         type="text"
                         placeholder="Search Country"
                         value={searchQueryCode}
                         onChange={(e) => setSearchQueryCode(e.target.value)}
                         className="w-full px-4 py-2 border-b outline-none"
                       />
                       {filteredCountryCodes.map((code, index) => (
                         <div
                           key={index}
                           onClick={() => handleSelect(code)}
                           className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                         >
                           <img
                             src={code.img}
                             alt="flag"
                             className="w-6 h-4 mr-2"
                             onError={(e) => e.target.style.display = 'none'} // Hides image if not found
                           />
                           {code.label} - {code.countryName}
                         </div>
                       ))}
                     </div>
                   )}
                 </div>
                 <input
                   type="text"
                   name="contactNo"
                   value={formValues.contactNo}
                   onChange={handleChange}
                   className="mt-1 py-2 px-2 rounded-md w-full outline-none text-sm flex justify-between"
                   placeholder="Phone Number"
                 />
               </div>
             </label>

              {/*----------> Country Selection <---------- */}
              <label htmlFor="country" className="text-xs font-medium text-gray-700">
                Country
                <div className="flex items-center border rounded-md">
                  <div className="relative justify-center items-center w-full">
                    <button
                      type="button"
                      onClick={toggleDropdownCountry}
                      className="rounded px-4 py-2 bg-white w-full"
                    >
                      {selectedCountry ? (
                        <div className="flex items-center">
                          <img
                            src={selectedCountry.img}
                            alt="flag"
                            className="w-6 h-4 mr-2"
                            onError={(e) => e.target.style.display = 'none'} // Hides image if not found
                          />
                          {selectedCountry.countryName}
                        </div>
                      ) : (
                        "Select Country"
                      )}
                    </button>

                    {isOpenCountry && (
                      <div className="absolute mt-2 w-full border rounded bg-white shadow-lg z-10 h-60 overflow-y-scroll">
                        <input
                          type="text"
                          placeholder="Search Country"
                          value={searchQueryCountry}
                          onChange={(e) => setSearchQueryCountry(e.target.value)}
                          className="w-full px-4 py-2 border-b outline-none"
                        />
                        {filteredCountries.map((code, index) => (
                          <div
                            key={index}
                            onClick={() => handleCountrySelect(code)}
                            className="w-full flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <img
                              src={code.img}
                              alt="flag"
                              className="w-6 h-4 mr-2"
                              onError={(e) => e.target.style.display = 'none'} // Hides image if not found
                            />
                            {code.countryName}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </label>

                {/*----------> Business Selection <---------- */}

                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-medium text-gray-700 "
                >
                  Select Business
                  <select
                    id="businessInput"
                    name="businessType"
                    value={formValues.businessType}
                    onChange={handleChange}
                    className="mt-1 py-2 px-2 border border-gray-300 rounded-md w-full outline-none text-sm flex justify-between"
                  >
                    <option value="" disabled>
                      Select Business Type
                    </option>
                    <option value="Advisory">Advisory</option>
                    <option value="IT">IT</option>
                    <option value="Retail">Retail</option>
                    <option value="Ecommerce">Ecommerce</option>
                  </select>
                </label>

                <button className="bg-cyan-500 outline-none text-white py-4 text-xs rounded-md font-bold mt-4">
                  Submit
                </button>
              </form>

              
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}