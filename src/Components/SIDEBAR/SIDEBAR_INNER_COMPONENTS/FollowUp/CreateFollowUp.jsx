import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import ReactQuill from "react-quill";
import axios from "axios";


import { tenant_base_url, protocal_url } from "./../../../../Config/config"

import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";


const CreateFollowUp = () => {
  const { id } = useParams();
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();
  const navigate = useNavigate();

  const [followupsData, setFollowupsData] = useState({
    id: "",
    leadId: "",
    name: "",
    language: "",
    mobileNo: "",
    phoneNo: "",
    email: "",
    assigned_To: "",
    segments: [],
    call_bck_DateTime: "",
    lastModifiedBy: "",
  });

  const [description, setDescription] = useState(""); // For Quill editor

  // Fetch Data by ID
  useEffect(() => {
    fetchDataById();
     
  }, [id, bearer_token, name]);

  // Function to fetch data by ID
  const fetchDataById = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FollowUp/getbyid/${id}`,
        config
      );

      if (response.status === 200 && response.data.isSuccess) {
        const followup = response.data.data;
        setFollowupsData({
          id: followup.id,
          leadId: followup.leadId || "",
          name: followup.name || "",
          language: followup.language || "",
          mobileNo: followup.mobileNo || "",
          phoneNo: followup.phoneNo || "",
          email: followup.email || "",
          assigned_To: followup.assigned_To || "",
          segments: followup.segments || [],
          call_bck_DateTime: followup.call_bck_DateTime || "",
          lastModifiedBy: followup.lastModifiedBy || "",
        });

        // Set description in Quill editor
        setDescription(followup.description || "");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Function to set description value
  const setDescriptionValue = (value) => {
    setDescription(value);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFollowupsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle PUT request for submitting data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem("token");

    if (!bearer_token) {
      alert("No token found, please log in again.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
      };

      const formData_PUT = {
        id: followupsData.id,
        leadId: followupsData.leadId,
        name: followupsData.name,
        language: followupsData.language,
        mobileNo: followupsData.mobileNo,
        phoneNo: followupsData.phoneNo,
        email: followupsData.email,
        assigned_To: followupsData.assigned_To,
        segments: followupsData.segments,
        call_bck_DateTime: followupsData.call_bck_DateTime,
        lastModifiedBy: followupsData.lastModifiedBy,
        description: description,
      };

      // Log the URL and payload for debugging
      console.log(
        "PUT URL:",
        `${protocal_url}${name}.${tenant_base_url}/FollowUp/update`
      );
      console.log("formData_PUT:", formData_PUT);

      // Make the PUT request
      await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/FollowUp/update`,
        formData_PUT,
        config
      );

      alert("Follow updated successfully!");
      navigate(`/sidebar/followup`);
    } catch (error) {
      // Log the detailed error response
      console.error("Error response:", error.response);

      if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        console.error("Validation errors:", validationErrors);

        // Create a readable error message from the validation errors
        let errorMessage = "Validation errors:\n";
        for (const field in validationErrors) {
          if (validationErrors.hasOwnProperty(field)) {
            errorMessage += `${field}: ${validationErrors[field].join(", ")}\n`;
          }
        }
        alert(errorMessage);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  // ......................... Segment.....................................

  const [segments, setSegments] = useState([]);

  // Segment GET API Is being used here
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
      // console.log("segment:", response.data.data);
    } catch (error) {
      console.error("Error fetching segments:", error);
    }
  }

  useEffect(() => {
    handleSegment();
  }, []);

  const [defaultTextSegmentDropDown, setdefaultTextSegmentDropDown] =
    useState("Select Segment");
  const [isDropdownVisibleSegment, setisDropdownVisibleSegment] =
    useState(false);

  const toggleDropdownSegment = () => {
    setisDropdownVisibleSegment(true);
  };

  const handleCheckboxChange = (segment) => {
    const isChecked = followupsData.segments.includes(segment.segment);

    let updatedSegments;
    if (isChecked) {
      // Remove segment if already selected
      updatedSegments = followupsData.segments.filter(
        (selectedSegment) => selectedSegment !== segment.segment
      );
    } else {
      // Add segment if not already selected
      updatedSegments = [...followupsData.segments, segment.segment];
    }

    // Update followupsData with new segments array
    setFollowupsData((prev) => ({
      ...prev,
      segments: updatedSegments,
    }));

    console.log("Selected segments:", updatedSegments);
  };

  // Segment GET API Is being used here

  //----------------------------------------------------------------------------------------
  //assigned_ToDropDown
  const [assigned_ToDropDown, setassigned_ToDropDown] = useState([]);

  async function handleAssigned_To() {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/Alluser`,
        config
      );
      setassigned_ToDropDown(response.data);
      console.log("status:", response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Optionally, set an error state to display a user-friendly message
    }
  }

  useEffect(() => {
    handleAssigned_To();
    
  }, []);

  const [defaultTextassigned_ToDropDown, setdefaultTextassigned_ToDropDown] =
    useState("Select Assigned");
  const [isDropdownassigned_ToDropDown, setisDropdownassigned_ToDropDown] =
    useState(false);

  const toggleDropdownassigned_ToDropDown = () => {
    setisDropdownassigned_ToDropDown(!isDropdownassigned_ToDropDown);
  };

  const handleDropdownassigned_ToDropDown = (
    assigned_To_Username,
    assigned_To_Role
  ) => {
    setdefaultTextassigned_ToDropDown(
      assigned_To_Username + " " + assigned_To_Role
    );
    setisDropdownassigned_ToDropDown(!isDropdownassigned_ToDropDown);
    setFollowupsData((prevTask) => ({
      ...prevTask,
      assigned_To: assigned_To_Username,
    }));
  };


  return (
    <>
      {/* TOP PART */}
      <div className="px-3 py-4 bg-white rounded-md flex items-center justify-between m-3">
        <h1 className="text-xl font-bold">Create Follow Up</h1>
        <Link to="/sidebar/followup">
          <button className="px-6 py-2 text-center text-sm border border-blue-600 text-blue-600 rounded-md">
            Cancel
          </button>
        </Link>
      </div>

      {/* FOLLOW-UP FORM */}
      <form onSubmit={handleSubmit}>
        <div className="m-3">
          <h1 className="py-3 px-6 rounded-t-lg bg-cyan-500 text-white text-md font-bold">
            Follow Up Details
          </h1>
          <div className="bg-white px-6 py-6">
            <div className="flex gap-4">
              {/* LEFT COLUMN */}
              <div className="flex-1 flex flex-col">
                {/* ..................Lead ID................. */}
                <label
                  htmlFor="leadId"
                  className="text-sm font-medium text-gray-700"
                >
                  Lead ID
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  name="leadId"
                  value={followupsData.leadId}
                  onChange={handleChange}
                />
                {/* ..................Language................. */}
                <label
                  htmlFor="language"
                  className="text-sm font-medium text-gray-700"
                >
                  Language
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  name="language"
                  value={followupsData.language}
                  onChange={handleChange}
                />
                {/* ..................Mobile Number................. */}
                <label
                  htmlFor="mobileNo"
                  className="text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  name="mobileNo"
                  value={followupsData.mobileNo}
                  onChange={handleChange}
                />

                {/* -------------Assigned to------------- */}
                <div className="flex flex-col w-1/1 relative">
                  <label
                    htmlFor="leadesStatus"
                    className="text-sm font-medium text-gray-700"
                  >
                    Assigned to
                  </label>
                  <div
                    className="relative"
                    onClick={toggleDropdownassigned_ToDropDown}
                    onMouseLeave={() => setisDropdownassigned_ToDropDown(false)}
                  >
                    <button
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                      id="LeadStatusDropDown"
                      type="button"
                    >
                      {followupsData.assigned_To === ""
                        ? defaultTextassigned_ToDropDown
                        : followupsData.assigned_To}

                      <FaAngleDown className="ml-2 text-gray-400" />
                    </button>
                    {isDropdownassigned_ToDropDown && (
                      <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                        <ul className="py-2 text-sm text-gray-700">
                          {assigned_ToDropDown.map(
                            ({ key, userName, role }) => (
                              <li
                                key={key}
                                onClick={() =>
                                  handleDropdownassigned_ToDropDown(
                                    userName,
                                    role
                                  )
                                }
                                className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                              >
                                {userName}-({role})
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {/* ------------Call Back Date------------- */}
                <label
                  htmlFor="call_bck_DateTime"
                  className="text-sm font-medium text-gray-700"
                >
                  Call Back Date
                </label>
                <input
                  type="datetime-local"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  name="call_bck_DateTime"
                  value={followupsData.call_bck_DateTime}
                  onChange={handleChange}
                />
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex-1 flex flex-col">
                {/* ................Client Name................... */}
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Client Name
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  name="name"
                  value={followupsData.name}
                  onChange={handleChange}
                />
                {/* ..................Phone Number................. */}
                <label
                  htmlFor="phoneNo"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  name="phoneNo"
                  value={followupsData.phoneNo}
                  onChange={handleChange}
                />
                {/* ..........................Email..................... */}
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  name="email"
                  value={followupsData.email}
                  onChange={handleChange}
                />
                {/* -------------Segments------------- */}
                <div className="flex flex-col w-1/1 relative">
                  <label
                    htmlFor="segment"
                    className="text-sm font-medium text-gray-700"
                  >
                    Segment
                  </label>
                  <div
                    className="relative"
                    onClick={toggleDropdownSegment}
                    onMouseLeave={() => setisDropdownVisibleSegment(false)}
                  >
                    <button
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
                          {segments.map((segment) => (
                            <li
                              key={segment.id}
                              className="flex items-center px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={followupsData.segments.includes(
                                  segment.segment
                                )} // Ensure correct checked state
                                onChange={() => handleCheckboxChange(segment)} // Handle checkbox change
                                className="mr-2"
                              />
                              {segment.segment}{" "}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {/* .................Modified By...................... */}
                <label
                  htmlFor="lastModifiedBy"
                  className="text-sm font-medium text-gray-700"
                >
                  Last Modified By
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                  name="lastModifiedBy"
                  value={followupsData.lastModifiedBy}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="m-3">
          <h1 className="py-3 px-6 rounded-t-lg bg-cyan-500 text-white text-md font-bold">
            Description Information
          </h1>
          <div className="bg-white px-6 py-6">
            <div className="flex">
              {/* Description Information COLUMN */}
              <div className="flex-1 flex flex-col">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <ReactQuill
                  value={description}
                  className="text-balance hyphens-auto max-w-5xl max-h-60 h-60"
                  theme="snow"
                  onChange={setDescriptionValue}
                  placeholder="Add Description"
                />
              </div>
            </div>
            {/* BUTTONS */}
            <div className="flex items-center justify-end gap-4 py-10 px-2 mr-20">
              <button
                type="submit"
                className="px-32 py-4 mt-40 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateFollowUp;
