import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoInformationCircle } from "react-icons/io5";

//file
import { tenant_base_url, protocal_url } from "../../../../../Config/config";
import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

export default function CreateSendEmail() {
  const name = getHostnamePart();

  // --------------------------------------------- Check Box Start -------------------------------------------

  const [selectedCheckbox, setSelectedCheckbox] = useState("Free Trail");

  const handleCheckboxChange = (name) => {
    setSelectedCheckbox(name === selectedCheckbox ? "" : name); // Toggle selection
  };

  // --------------------------------------------- Check Box End -------------------------------------------

  const [editSms, setEditSms] = useState({
    subject: "",
    msg: "",
    attachment: "",
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

   const [getEmailId, setGetEmailId] = useState([]);

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
  
      setGetEmailId([]);
  
      // Construct the query string with selected segments
      const segmentQuery = selectedSegments
        .map((segment) => `segments=${encodeURIComponent(segment)}`)
        .join("&");
  
      let url;
      if (selectedCheckbox === "Free Trail") {
        url = `${protocal_url}${name}.${tenant_base_url}/Trail/alltrailEmail/bysegment?${segmentQuery}`;
      } else if (selectedCheckbox === "Paid Clients") {
        url = `${protocal_url}${name}.${tenant_base_url}/SalesOrder/salesOrder/clientEmailbysegments?${segmentQuery}`;
      }
  
      const response = await axios.get(url, config);
      setGetEmailId(response.data.data);
      console.log("Fetched Mobile Numbers:", response.data.data);
    
      console.log("Fetched Mobile Numbers:", getEmailId);
  
    } catch (error) {
      console.error("Error fetching mobile numbers:", error);
    }
  }
  
  



  

  return (
    <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-2 px-3 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">Send Email</h1>
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
            Email Details
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
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={editSms.subject}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              
            </div>
            {/* DROPDOWNS FIELD */}
            <div className="flex space-x-4">
              {/* MESSAGE DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="msg"
                  className="text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <input
                  type="text"
                  name="msg"
                  id="msg"
                  value={editSms.msg}
                  className="p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  placeholder="Entere verox peron"
                />
              </div>
              {/* TEXT MESSAGE DROPDOWN */}
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="attachment"
                  className="text-sm font-medium text-gray-700"
                >
                  Attachment
                </label>
                <input
                  type="file"
                  name="attachment"
                  id="attachment"
                  value={editSms.attachment}
                  accept=".pdf"
                  className="p-2 border border-gray-300 rounded-md"
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
