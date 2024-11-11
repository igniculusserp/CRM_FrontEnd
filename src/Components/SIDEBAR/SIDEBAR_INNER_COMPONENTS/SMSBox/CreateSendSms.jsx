import { useState,useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';
import { IoInformationCircle } from 'react-icons/io5';

//file
import { tenant_base_url, protocal_url } from "../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

export default function CreateSendSms() {

  const name = getHostnamePart();

  // --------------------------------------------- Check Box Start -------------------------------------------


  const [selectedCheckbox, setSelectedCheckbox] = useState("Free Trail");

  const handleCheckboxChange = (name) => {
    setSelectedCheckbox(name === selectedCheckbox ? "" : name); // Toggle selection
  };

  // --------------------------------------------- Check Box End -------------------------------------------


  const [editSms, setEditSms] = useState({
    template: "",
    textMsg: "",
    callStatus: "",
  });

  //   HANDLING INPUTS CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditSms({
      ...editSms,
      [name]: value,
    });
  };

  //   HANDLING FORM
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //   DROPDOWNS
  


  // DUMMY CALL STATUS
  const callStatusData = [
    { key: 1, name: "Service Call" },
    { key: 2, name: "Trail call" },
    { key: 3, name: "Promotional call" },
  ];

  // ---------------------------------------------  Call Status Start -------------------------------------------
  const [callStatusDropdown, setCallStatusDropdown] = useState(false);
  const [defaultCallStatusText, setDefaultCallStatusText] =
    useState("Call Status");
    
  const toggleDropdownCallStatus = () => {
    setCallStatusDropdown(!callStatusDropdown);
  };

  const handleDropdownCallStatus = (name) => {
    setDefaultCallStatusText(name);
    setCallStatusDropdown(!callStatusDropdown);
    setEditSms((prev) => ({
      ...prev,
      name: name,
    }));
  };

  // ---------------------------------------------  Call Status End -------------------------------------------

  // ---------------------------------------------  SMS Templates Start -------------------------------------------
  const [templates, setTemplates] = useState([]);
  const [templateDropdown, setTemplateDropdown] = useState(false);
  const [defaultTemplateText, setDefaultTemplateText] = useState("Select Template");

//--------------------------------------- Fatch Templates -------------------------------------------------
  async function handleLead() {
    const bearer_token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/smstemplates/getall`,
        config
      );
      setTemplates(response.data.data);
      
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  }

  useEffect(() => {
    handleLead(); // Fetch the  list on initial load
  }, []);

   //--------------------------------------- DropDown Handling -------------------------------------------------

  // TOGGLE CALL TEST MSG
  const toggleDropdownTemplate = () => {
    setTemplateDropdown(!templateDropdown);
  };

  const handleDropdownTemplate = (name) => {
    setDefaultTemplateText(name);
    setTemplateDropdown(!templateDropdown);
    setEditSms((prev) => ({
      ...prev,
      name: name,
    }));
  };
// --------------------------------------------- SMS Templates End -------------------------------------------

  //--------------------------------------- Segments OR Product -------------------------------------------------
  const [segments, setSegments] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [defaultTextSegmentDropDown, setDefaultTextSegmentDropDown] =
    useState("Select Segment");
  const [isDropdownVisibleSegment, setIsDropdownVisibleSegment] =
    useState(false);

    //--------------------------------------- Fatch Segment -------------------------------------------------
  async function handleSegment() {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/segment/getall`,
        config
      );
      setSegments(response.data.data);
    } catch (error) {
      console.error("Error fetching segments:", error);
    }
  }

  useEffect(() => {
    handleSegment();
  }, []);

  //--------------------------------------- DropDown Handling -------------------------------------------------

  const toggleDropdownSegment = () => {
    setIsDropdownVisibleSegment(!isDropdownVisibleSegment);
  };

  const handleProductChange = (segment) => {
    
    const isChecked = selectedSegments.includes(segment.segment);

    let updatedSegments;
    if (isChecked) {
      // Remove segment if already selected
      updatedSegments = selectedSegments.filter(
        (selectedSegment) => selectedSegment !== segment.segment
      );
    } else {
      // Add segment if not already selected
      updatedSegments = [...selectedSegments, segment.segment];
    }

    setSelectedSegments(updatedSegments);
   
    setDefaultTextSegmentDropDown(
      updatedSegments.length > 0 ? updatedSegments.join(", ") : "Select Segment"
    );
  };

  //--------------------------------------- Segments END-------------------------------------------------

   //--------------------------------------- Get Mobile Number by Segment -------------------------------------------------

   const [getMobileNumber, setGetMobileNumber] = useState([]);

   useEffect(() => {
    
      fetchMobileNumber();
    
  }, [selectedSegments]);

   async function fetchMobileNumber() {
    const bearer_token = localStorage.getItem("token");
  
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
  
      setGetMobileNumber([]);
  
      // Construct the query string with selected segments
      const segmentQuery = selectedSegments
        .map((segment) => `segments=${encodeURIComponent(segment)}`)
        .join("&");
  
      let url;
      if (selectedCheckbox === "Free Trail") {
        url = `${protocal_url}${name}.${tenant_base_url}/Trail/alltrailmobileno/bysegment?${segmentQuery}`;
      } else if (selectedCheckbox === "Paid Clients") {
        url = `${protocal_url}${name}.${tenant_base_url}/SalesOrder/salesOrder/clientmobilenobysegments?${segmentQuery}`;
      }
  
      const response = await axios.get(url, config);
      setGetMobileNumber(response.data.data);
      console.log("Fetched Mobile Numbers:", response.data.data);
      
      console.log("Fetched Mobile Numbers:", getMobileNumber);
  
    } catch (error) {
      console.error("Error fetching mobile numbers:", error);
    }
  }
  
  

  return (
    // TOP SECTION
    <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-2 px-3 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">Send SMS</h1>
        <Link
          to="/sidebar/smsbox"
          className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
        >
          Cancel
        </Link>
      </div>
      {/* -------------FORM Starts FROM HERE------------- */}
      <form onSubmit={handleSubmit} className="flex flex-col mb-6">
        {/* -------------SMS DETAILS STARTS FROM HERE------------- */}
        <div className="my-3 bg-white rounded-xl shadow-md flex-grow ">
          <h2 className="font-medium py-2 px-3 rounded-t-xl text-white bg-cyan-500">
            SMS Details
          </h2>

          {/* CHECK BOXES */}
          <div className="flex bg-white px-3 py-2 max-w-full items-center gap-3">
            {/* Free Trail */}
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedCheckbox === "Free Trail"}
                onChange={() => handleCheckboxChange("Free Trail")}
              />
              <p className="text-sm text-gray-700">Free Trail</p>
            </div>
            {/* Paid Client */}
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedCheckbox === "Paid Clients"}
                onChange={() => handleCheckboxChange("Paid Clients")}
              />
              <p className="text-sm text-gray-700">Paid Clients</p>
            </div>

            {/* Telegram */}
            {/* <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectedCheckbox === "Telegram"}
                onChange={() => handleCheckboxChange("Telegram")}
              />
              <p className="text-sm text-gray-700">Telegram</p>
            </div> */}
          </div>

          {/* -------------SMS DETAILS STARTS FROM HERE------------- */}
          {/* -------------6------------- */}
          {/* -------------Street------------- */}
          <div className="grid gap-2 p-2">
            <div className="flex space-x-4">
               {/* PRODUCTS DROPDOWN */}
               <div className="flex flex-col w-1/2 relative">
                <label
                  htmlFor="segment"
                  className="text-sm font-medium text-gray-700"
                >
                  Products
                </label>
                <div
                  className="relative"
                  onMouseLeave={() => setIsDropdownVisibleSegment(false)}
                  >
                  <button
                  onClick={toggleDropdownSegment}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="LeadStatusDropDown"
                    type="button"
                  >
                    {defaultTextSegmentDropDown}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {isDropdownVisibleSegment && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {segments.length > 0 ? (
                          segments.map((segment) => (
                            <li
                              key={segment.id}
                              className="flex items-center px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSegments.includes(
                                  segment.segment
                                )}
                                onChange={() => handleProductChange(segment)}
                                className="mr-2"
                              />
                              {segment.segment}
                            </li>
                          ))
                        ) : (
                          <li className="flex items-center px-4 py-2 text-center gap-1">
                            <IoInformationCircle
                              size={25}
                              className="text-cyan-600"
                            />
                            Segments not available. Go to{" "}
                            <span className="font-bold">
                              Settings - Add Segment
                            </span>
                            .
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* CALL STATUS DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="callStatus"
                  className="text-sm font-medium text-gray-700"
                >
                  Call Status
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownCallStatus}
                  onMouseLeave={() => setCallStatusDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="callStatus"
                    type="button"
                  >
                    {defaultCallStatusText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {callStatusDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {callStatusData.map(({ key, name }) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={key}
                            onClick={() => handleDropdownCallStatus(name)}
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* DROPDOWNS FIELD */}
            <div className="flex space-x-4">
              {/* MAIL TYPE DROPDOWN */}
              <div className="flex flex-col w-1/2">
                {/* SUBJECT FIELD */}
                <label
                  htmlFor="template"
                  className="text-sm font-medium text-gray-700"
                >
                  Template
                </label>
                <div
                  className="relative"
                  onClick={toggleDropdownTemplate}
                  onMouseLeave={() => setTemplateDropdown(false)}
                >
                  <button
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                    id="template"
                    type="button"
                  >
                  {defaultTemplateText}
                    <FaAngleDown className="ml-2 text-gray-400" />
                  </button>
                  {templateDropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10 z-10">
                      <ul className="py-2 text-sm text-gray-700">
                        {templates.map((data) => (
                          <li
                            className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer z-10"
                            key={data.id}
                            onClick={() => handleDropdownTemplate(data.templateDescription)}
                          >
                            {data.templateDescription}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* TEXT MESSAGE DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="textMsg"
                  className="text-sm font-medium text-gray-700 mt-2"
                >
                  Text Message
                </label>
                <input
                  type="text"
                  name="textMsg"
                  id="textMsg"
                  value={editSms.textMsg}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
            </div>
            {/* HIDDEN INPUT */}
            <div className="flex space-x-4">
              <div className="flex flex-col w-full">
                <input className="mt-1 p-2 border border-gray-300 rounded-md hidden" />
              </div>
            </div>
          </div>

          <div className="flex justify-end px-2">
            <button
              type="submit"
              className="px-32 py-4 mt-20 mb-3 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
