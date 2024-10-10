import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import axios from 'axios';

import { tenant_base_url, protocal_url } from './../../../../Config/config';

import { getHostnamePart } from '../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl';

const CreateFollowUp = () => {
  const { id } = useParams();
  const bearer_token = localStorage.getItem('token');
  const name = getHostnamePart();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [followupsData, setFollowupsData] = useState({
    id: '',
    leadId: '',
    name: '',
    language: '',
    mobileNo: '',
    phoneNo: '',
    email: '',
    assigned_To: '',
    segments: [],
    call_bck_DateTime: '',
    lastModifiedBy: '',
  });

  const [description, setDescription] = useState(''); // For Quill editor

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
          leadId: followup.leadId || '',
          name: followup.name || '',
          language: followup.language || '',
          mobileNo: followup.mobileNo || '',
          phoneNo: followup.phoneNo || '',
          email: followup.email || '',
          assigned_To: followup.assigned_To || '',
          segments: followup.segments || [],
          call_bck_DateTime: followup.call_bck_DateTime || '',
          lastModifiedBy: followup.lastModifiedBy || '',
        });

        // Set description in Quill editor
        setDescription(followup.description || '');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
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
    const bearer_token = localStorage.getItem('token');

    if (!bearer_token) {
      alert('No token found, please log in again.');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          'Content-Type': 'application/json',
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
        'PUT URL:',
        `${protocal_url}${name}.${tenant_base_url}/FollowUp/update`
      );
      console.log('formData_PUT:', formData_PUT);

      // Make the PUT request
      await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/FollowUp/update`,
        formData_PUT,
        config
      );

      alert('Follow updated successfully!');
      navigate(`/sidebar/followup`);
    } catch (error) {
      // Log the detailed error response
      console.error('Error response:', error.response);

      if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        console.error('Validation errors:', validationErrors);

        // Create a readable error message from the validation errors
        let errorMessage = 'Validation errors:\n';
        for (const field in validationErrors) {
          if (validationErrors.hasOwnProperty(field)) {
            errorMessage += `${field}: ${validationErrors[field].join(', ')}\n`;
          }
        }
        alert(errorMessage);
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  // ......................... Segment.....................................

  const [segments, setSegments] = useState([]);

  // Segment GET API Is being used here
  async function handleSegment() {
    const bearer_token = localStorage.getItem('token');

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
      console.error('Error fetching segments:', error);
    }
  }

  useEffect(() => {
    handleSegment();
  }, []);

  const [defaultTextSegmentDropDown, setdefaultTextSegmentDropDown] =
    useState('Select Segment');
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

    console.log('Selected segments:', updatedSegments);
  };

  // Segment GET API Is being used here

  //----------------------------------------------------------------------------------------
  //assigned_ToDropDown
  const [assigned_ToDropDown, setassigned_ToDropDown] = useState([]);

  async function handleAssigned_To() {
    const bearer_token = localStorage.getItem('token');

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
      console.log('status:', response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
      // Optionally, set an error state to display a user-friendly message
    }
  }

  useEffect(() => {
    handleAssigned_To();
  }, []);

  const [defaultTextassigned_ToDropDown, setdefaultTextassigned_ToDropDown] =
    useState('Select Assigned');
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
      assigned_To_Username + ' ' + assigned_To_Role
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
      <div className="px-3 py-2 bg-white rounded-md flex items-center justify-between m-3">
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
          <h1 className="py-2 px-3 rounded-t-lg bg-cyan-500 text-white text-md font-medium">
            Follow Up Details
          </h1>
          <div className="bg-white px-3 py-3">
            <div className="">
              <div className="grid gap-2 p-2">
                {/* FIRST ROW */}
                <div className="flex space-x-4">
                  {/* LEAD ID FIELD */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="leadId"
                      className="text-sm font-medium text-gray-700"
                    >
                      Lead Id
                    </label>
                    <input
                      type="number"
                      name="leadId"
                      id="leadId"
                      value={followupsData.leadId}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Entere verox peron"
                    />
                  </div>
                  {/* CLIENT NAME FIELD */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Client Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={followupsData.name}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Entere verox peron"
                    />
                  </div>
                </div>
                {/* SECOND ROW */}
                <div className="flex space-x-4">
                  {/* LANGUAGE FIELD */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="language"
                      className="text-sm font-medium text-gray-700"
                    >
                      Language
                    </label>
                    <input
                      type="language"
                      name="language"
                      id="language"
                      value={followupsData.language}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Entere verox peron"
                    />
                  </div>
                  {/* phoneNo FIELD */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="phoneNo"
                      className="text-sm font-medium text-gray-700"
                    >
                      phone Number
                    </label>
                    <input
                      type="number"
                      name="phoneNo"
                      id="phoneNo"
                      value={followupsData.phoneNo}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Entere verox peron"
                    />
                  </div>
                </div>
                {/* THIRD ROW */}
                <div className="flex space-x-4">
                  {/* MOBILE NUMBER FIELD */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="mobileNo"
                      className="text-sm font-medium text-gray-700"
                    >
                      mobile Number
                    </label>
                    <input
                      type="number"
                      name="mobileNo"
                      id="mobileNo"
                      value={followupsData.mobileNo}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Entere verox peron"
                    />
                  </div>
                  {/* EMAIL FIELD */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="mobileNo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="mobileNo"
                      id="mobileNo"
                      value={followupsData.email}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Entere verox peron"
                    />
                  </div>
                </div>
                {/* FOURTH ROW */}
                <div className="flex space-x-4">
                  {/* ASSIGNED TO DROPDOWN */}
                  <div className="flex flex-col w-1/2">
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
                        onMouseLeave={() =>
                          setisDropdownassigned_ToDropDown(false)
                        }
                      >
                        <button
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                          id="LeadStatusDropDown"
                          type="button"
                        >
                          {followupsData.assigned_To === ''
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
                  </div>
                  {/* CALL BACK DATE FIELD */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="call_bck_DateTime"
                      className="text-sm font-medium text-gray-700"
                    >
                      Call Back Date
                    </label>
                    <input
                      type="date"
                      name="call_bck_DateTime"
                      id="call_bck_DateTime"
                      value={followupsData.call_bck_DateTime}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Entere verox peron"
                    />
                  </div>
                </div>
                {/* FIFTH ROW */}
                <div className="flex space-x-4">
                  {/* LAST MODIFIED BY FIELD */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="lastModifiedBy"
                      className="text-sm font-medium text-gray-700"
                    >
                      Last Modified By
                    </label>
                    <input
                      type="date"
                      name="lastModifiedBy"
                      id="lastModifiedBy"
                      value={followupsData.lastModifiedBy}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Entere verox peron"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* DESCRIPTION */}
        <div className="bg-white rounded-xl shadow-md mx-3 mb-6">
          <h2 className="py-2 font-medium px-3 rounded-t-xl text-white bg-cyan-500">
            Description Information
          </h2>
          <div className="p-2 ">
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-sm  font-medium text-gray-700"
              >
                Description
              </label>
              <ReactQuill
                name="description"
                value={description}
                className="text-balance hyphens-auto  max-h-full h-60 mt-1"
                theme="snow"
                onChange={setDescription}
                placeholder="Add Description"
              />
            </div>
          </div>
          <div className="flex justify-end px-2">
            <button
              type="submit"
              className="px-32 py-4 mt-20 mb-3 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white"
            >
              {isEditMode ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateFollowUp;