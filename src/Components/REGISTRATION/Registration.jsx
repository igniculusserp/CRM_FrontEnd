import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { main_base_url } from "./../../Config/config";

import IgniculussLogo from "./../../assets/images/IgniculussLogo.png";
import CRMRegistrationPage from "./../../assets/images/CRMRegistrationPage.png";

import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { GiDiamonds } from "react-icons/gi";

import { ToastContainer } from "react-toastify";
import { FaChevronDown, FaStarOfLife } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../utils/toastNotifications";

// EXTERNAL CSS
import "../../ExternalCSS/ExternalCSS_Settings.css";

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
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNo: "",
    country: "",
    businessType: "",
    userName: "",
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
      contactNo: prev.contactNo,
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
          `${main_base_url}/Users/getCountryNames`,
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    const fetchCountryCodes = async () => {
      try {
        const response = await axios.get(
          `${main_base_url}/Users/getCountryCode`,
        );
        const countryCodeData = response.data.map((code) => ({
          value: code.mobilePrefix,
          label: code.mobilePrefix,
          img: code.flagUrl,
          countryName: code.countryName,
        }));
        setCountryCodes(countryCodeData);
        setCountries(countryCodeData);
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
    };

    fetchCountries();
    fetchCountryCodes();
  }, []);

  //countryCode
  const filteredCountryCodes = countryCodes.filter((code) =>
    code.countryName?.toLowerCase()?.includes(searchQueryCode?.toLowerCase()),
  );

  //countryName
  const filteredCountries = countries.filter((country) =>
    country.countryName
      ?.toLowerCase()
      ?.includes(searchQueryCountry?.toLowerCase()),
  );

  //Handle <---> Change
  const handleChange = (e) => {
    let { name, value } = e.target;
    localStorage.setItem("registrationBusinessType", value);
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
      userName,
    } = formValues;

    // Check if country code and contact number are available
    const contactNumberWithCode = selectedCode
      ? `${selectedCode.value}${contactNo}`
      : contactNo;

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
      userName: "",
    };

    // Validation
    if (!formValues.firstName) {
      showErrorToast("Please enter first name");
      return; // Exit function if validation fails
    }

    if (!formValues.lastName) {
      showErrorToast("Please enter last name");
      return; // Exit function if validation fails
    }

    if (!formValues.email) {
      showErrorToast("Please enter email");
      return; // Exit function if validation fails
    }

    if (!formValues.password) {
      showErrorToast("Please enter password");
      return; // Exit function if validation fails
    }

    if (!formValues.confirmPassword) {
      showErrorToast("Please enter confirm password ");
      return; // Exit function if validation fails
    }

    if (formValues.password !== formValues.confirmPassword) {
      showErrorToast("Password doesn't match ");
      return;
    }

    if (!formValues.businessType) {
      showErrorToast("Please select business type ");
      return; // Exit function if validation fails
    }

    // All validations passed, proceed with submission
    try {
      const response = await axios.post(
        `${main_base_url}/Users`,
        predefinedValues,
      );
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

  function toggleConfirmPasswordEye() {
    setConfirmPasswordEye(!confirmPasswordEye);
  }

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen flex-col bg-cyan-500 sm:bg-cyan-500 md:flex-row">
        {/*----------> Part-I <---------- */}
        <div className="bg-cyan hidden min-h-screen w-2/3 flex-col items-center justify-center md:flex">
          <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-white px-16 py-16">
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
              <p className="text-center text-xs text-gray-400">
                Skip repetitive and manual sales-marketing tasks. Get highly
                <br />
                productive through automation and save tons of time!
              </p>
            </div>
          </div>
        </div>

        {/*----------> Part-II <---------- */}
        <div className="my-6 flex min-h-screen w-full flex-col justify-center overflow-hidden bg-cyan-500 md:my-0 md:w-1/3 md:bg-white">
          {/* Image on Top for Small Screens */}
          <div className="flex justify-center md:hidden">
            <img src={IgniculussLogo} alt="sample" width={100} height={50} />
          </div>

          <div className="mx-10 mt-8 flex flex-col justify-center rounded-2xl bg-white px-3 py-3 md:mx-4">
            <div className="flex items-center gap-3 text-2xl font-semibold">
              <GiDiamonds className="hidden text-3xl hover:skew-x-12 md:block" />
              <h1 className="">Create your Account</h1>
            </div>

            <div className="mt-6">
              {/*----------> FORM <---------- */}
              <form
                className="flex flex-col gap-3 rounded-md"
                onSubmit={handleSubmit}
              >
                {/*----------> First-Name <---------- */}
                <label
                  htmlFor="firstName"
                  className="text-xs font-medium text-gray-700"
                >
                  <span className="flex gap-1">
                    First Name
                    <FaStarOfLife size={7} className="text-red-500" />
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    className="mt-1 flex w-full justify-between rounded-md border border-gray-300 px-2 py-2 text-sm outline-none"
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
                  <span className="flex gap-1">
                    Last Name
                    <FaStarOfLife size={7} className="text-red-500" />
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    className="mt-1 flex w-full justify-between rounded-md border border-gray-300 px-2 py-2 text-sm outline-none"
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
                  <span className="flex gap-1">
                    Email
                    <FaStarOfLife size={7} className="text-red-500" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 flex w-full justify-between rounded-md border border-gray-300 px-2 py-2 text-sm outline-none"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="specimen@company.com"
                  />
                </label>

                {/*---------->Password<---------- */}
                <label
                  htmlFor="password"
                  className="relative block text-xs font-medium text-gray-700"
                >
                  <span className="flex gap-1">
                    Password
                    <FaStarOfLife size={7} className="text-red-500" />
                  </span>

                  <input
                    type={passwordEye ? "text" : "password"}
                    name="password"
                    className="mt-1 flex w-full justify-between rounded-md border border-gray-300 px-2 py-2 text-sm outline-none"
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordEye}
                    className="absolute inset-y-0 right-2 top-5 flex items-center text-gray-500 transition-opacity duration-300 ease-in-out"
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
                  className="relative block text-xs font-medium text-gray-700"
                >
                  <span className="flex gap-1">
                    Confirm Password
                    <FaStarOfLife size={7} className="text-red-500" />
                  </span>

                  <input
                    type={confirmPasswordEye ? "text" : "password"}
                    name="confirmPassword"
                    className="mt-1 w-full rounded-md border border-gray-300 px-2 py-2 text-sm outline-none"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordEye}
                    className="absolute inset-y-0 right-2 top-5 flex items-center text-gray-500 transition-opacity duration-300 ease-in-out"
                  >
                    {confirmPasswordEye ? (
                      <IoIosEye
                        size={22}
                        className={`transition-opacity duration-300 ease-in-out ${
                          confirmPasswordEye ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    ) : (
                      <IoIosEyeOff
                        size={22}
                        className={`transition-opacity duration-300 ease-in-out ${
                          confirmPasswordEye ? "opacity-0" : "opacity-100"
                        }`}
                      />
                    )}
                  </button>
                </label>

                {/*----------> Contact No <---------- */}
                <label
                  htmlFor="Contact"
                  className="text-xs font-medium text-gray-700"
                >
                  <span className="flex gap-1">
                    Contact
                    <FaStarOfLife size={7} className="text-red-500" />
                  </span>
                  <div className="flex items-center rounded-md border">
                    <div className="w-28 text-xs">
                      <button
                        type="button"
                        onClick={toggleDropdown}
                        className="rounded bg-white px-4 py-2"
                      >
                        {selectedCode ? (
                          <div className="flex items-center">
                            <img
                              src={selectedCode.img}
                              alt="flag"
                              className="mr-2 h-4 w-6"
                              onError={(e) => (e.target.style.display = "none")} // Hides image if not found
                            />
                            {selectedCode.label}
                          </div>
                        ) : (
                          <div className="w-10">Country Code</div>
                        )}
                      </button>

                      {isOpen && (
                        <div className="code absolute z-10 h-48 w-96 overflow-y-scroll rounded border bg-white shadow-lg">
                          <input
                            type="text"
                            placeholder="Search Country"
                            value={searchQueryCode}
                            onChange={(e) => setSearchQueryCode(e.target.value)}
                            className="w-full border-b px-4 py-2 outline-none"
                          />
                          {filteredCountryCodes.map((code, index) => (
                            <div
                              key={index}
                              onClick={() => handleSelect(code)}
                              className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                            >
                              <img
                                src={code.img}
                                alt="flag"
                                className="mr-2 h-4 w-6"
                                onError={(e) =>
                                  (e.target.style.display = "none")
                                } // Hides image if not found
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
                      className="mt-1 flex w-full justify-between rounded-md px-2 py-2 text-sm outline-none"
                      placeholder="Alternate Number"
                    />
                  </div>
                </label>

                {/*----------> Country Selection <---------- */}
                <label
                  htmlFor="country"
                  className="text-xs font-medium text-gray-700"
                >
                  <span className="flex gap-1">
                    Country
                    <FaStarOfLife size={7} className="text-red-500" />
                  </span>
                  <div className="flex items-center rounded-md border">
                    <div className="relative w-full items-center justify-center">
                      <button
                        type="button"
                        onClick={toggleDropdownCountry}
                        className="w-full rounded bg-white px-4 py-2"
                      >
                        {selectedCountry ? (
                          <div className="flex">
                            <img
                              src={selectedCountry.img}
                              alt="flag"
                              className="mr-2 h-4 w-6"
                              onError={(e) => (e.target.style.display = "none")} // Hides image if not found
                            />
                            {selectedCountry.countryName}
                          </div>
                        ) : (
                          <div className="text-ms flex justify-between font-medium text-gray-400">
                            Select Country <FaChevronDown />{" "}
                          </div>
                        )}
                      </button>

                      {isOpenCountry && (
                        <div className="absolute z-10 h-36 w-full overflow-y-scroll rounded border bg-white shadow-lg">
                          <input
                            type="text"
                            placeholder="Search Country"
                            value={searchQueryCountry}
                            onChange={(e) =>
                              setSearchQueryCountry(e.target.value)
                            }
                            className="w-full border-b px-8 py-2 outline-none"
                          />
                          {filteredCountries.map((code, index) => (
                            <div
                              key={index}
                              onClick={() => handleCountrySelect(code)}
                              className="flex w-full cursor-pointer px-4 py-2 hover:bg-gray-100"
                            >
                              <img
                                src={code.img}
                                alt="flag"
                                className="mr-2 h-4 w-6"
                                onError={(e) =>
                                  (e.target.style.display = "none")
                                } // Hides image if not found
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
                  className="text-xs font-medium text-gray-700"
                >
                  <span className="flex gap-1">
                    Select Business
                    <FaStarOfLife size={7} className="text-red-500" />
                  </span>
                  <select
                    id="businessInput"
                    name="businessType"
                    value={formValues.businessType}
                    onChange={handleChange}
                    className="mt-1 flex w-full justify-between rounded-md border border-gray-300 px-2 py-2 text-sm outline-none"
                  >
                    <option value="" disabled>
                      Select Business Type
                    </option>
                    <option value="Advisory">Advisory</option>
                    <option value="Brokerage">Brokerage</option>
                    <option value="IT">IT</option>
                    <option value="Retail">Retail</option>
                    <option value="Ecommerce">Ecommerce</option>
                  </select>
                </label>

                <button className="mt-4 rounded-md bg-cyan-500 py-4 text-xs font-bold text-white outline-none">
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
