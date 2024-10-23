//react
import { useState, useEffect } from 'react';
//reactIcon
import { FaAngleDown } from 'react-icons/fa';
//reactPackages
import { Link, useNavigate, useParams } from 'react-router-dom';

//external Packages
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//file
import { tenant_base_url, protocal_url } from '../../../../Config/config';
//Images
// import profilepic from "./../../../../assets/images/profilePicEditLead.png";

export default function CreateTrial() {
  //to make id unique
  const { id } = useParams();
  const navigate = useNavigate();

  //form description is kept-out
  const [description, setdescription] = useState('Add Text Here');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTrail, setEditTrail] = useState({
    id: '',
    leadId: '',
    name: '',
    language: '',
    mobileNo: '',
    phoneNo: '',
    email: '',
    assigned_To: '',
    trialStartDate: '',
    trialEndDate: '',
    call_bck_DateTime: '',
    lastModifiedBy: '',
    segments: [],
  });

  //----------------------------------------------------------------------------------------
  //to make code for particluar company
  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split('.')[0];

  useEffect(() => {
    handleFreeTrail(); // Fetch lead data for editing
  }, [id]);

  //GET by ID---------------------------//GET---------------------------//GET---------------------------by ID-----------by ID
  async function handleFreeTrail() {
    const bearer_token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Trail/getbyid/${id}`,
        config
      );
      const data = response.data.data;
      setdescription(data.description);
      console.log('@@@@=====', response.data.data);
      setEditTrail({
        id: data.id || '',
        leadId: data.leadId || '',
        name: data.name || '',
        language: data.language || '',
        mobileNo: data.mobileNo || '',
        phoneNo: data.phoneNo || '',
        email: data.email || '',
        assigned_To: data.assigned_To || '',
        call_bck_DateTime: data.call_bck_DateTime || '',
        segments: data.segments || [],
        trialStartDate: data.trialStartDate || '',
        trialEndDate: data.trialEndDate || '',
        lastModifiedBy: data.lastModifiedBy || '',
      });
    } catch (error) {
      console.error('Error fetching Trail:', error);
    }
  }

  //----------------------------------------------------------------------------------------

  // >>>>>>>>>>>>>>>Segment<<<<<<<<<<<<<<<<<<

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
    const isChecked = editTrail.segments.includes(segment.segment);

    let updatedSegments;
    if (isChecked) {
      // Remove segment if already selected
      updatedSegments = editTrail.segments.filter(
        (selectedSegment) => selectedSegment !== segment.segment
      );
    } else {
      // Add segment if not already selected
      updatedSegments = [...editTrail.segments, segment.segment];
    }
    setEditTrail((prev) => ({
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
        `${protocal_url}${name}.${tenant_base_url}/Setting/users/byusertoken`,
        config
      );
      setassigned_ToDropDown(response.data?.data);
      console.log('status:', response.data);
    } catch (error) {
      console.error('Error fetching Trail:', error);
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
    setEditTrail((prevTask) => ({
      ...prevTask,
      assigned_To: assigned_To_Username,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTrail((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  //---------->handleSubmit<----------
  //two different models one for PUT and one for POST
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem('token');

    const error = {};

    // VALIDATION
    if (
      !editTrail.mobileNo ||
      isNaN(editTrail.mobileNo) ||
      editTrail.mobileNo.length !== 10 ||
      editTrail.mobileNo.trim() === ''
    ) {
      errors.mobileNo = 'Enter a valid 10-digit mobile number';
    } else if (editTrail.segments) {
      error.segment = 'Segments are required';
    } else if (
      !editTrail.trialStartDate ||
      editTrail.trialStartDate.trim() === ''
    ) {
      error.trialStartDate = 'Enter trail start date';
    } else if (editTrail.trialEndDate || editTrail.trialEndDate.trim() === '') {
      error.trialEndDate = 'Enter trail end date';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
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
        id: editTrail.id,
        leadId: editTrail.leadId,
        name: editTrail.name,
        language: editTrail.language,
        email: editTrail.email,
        mobileNo: editTrail.mobileNo,
        phoneNo: editTrail.phoneNo,
        assigned_To: editTrail.assigned_To,
        segments: editTrail.segments,
        trialStartDate: editTrail.trialStartDate || null,
        trialEndDate: editTrail.trialEndDate || null,
        trading_yrs: editTrail.tradingYears,
        call_bck_DateTime: editTrail.call_bck_DateTime || null,
        contactID: editTrail.contactId,
        lastModifiedBy: editTrail.lastModifiedBy,
        //----------------//
        description: description,
      };

      await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/Trail/update`,
        formData_PUT,
        config
      );
      alert('Free Trail updated successfully!');
      navigate(`/sidebar/freeTrail`);

      // Redirect after a short delay
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };


  //----------------------------------------------------------------------------------------
  //LanguageDropDown
  
  const LanguageDropDown = [
    { key: 1, name: "English" },
    { key: 2, name: "Portuguese" },
    { key: 3, name: "Hindi" },
    { key: 4, name: "Arabic" },
    { key: 5, name: "Japanese" },
  ];

  const [defaultTextLanguageDropDown, setDefaultTextLanguageDropDown] =
    useState("Select Language");
  const [isDropdownVisibleLanguage, setisDropdownVisibleLanguage] =
    useState(false);

  const toggleDropdownLanguage = () => {
    setisDropdownVisibleLanguage(!isDropdownVisibleLanguage);
  };

  const handleDropdownLanguage = (language) => {
    setDefaultTextLanguageDropDown(language);
    setisDropdownVisibleLanguage(false);
    seteditLead((prevTask) => ({
      ...prevTask,
      language: language,
    }));
  };

  return (
    <>
      <div className="min-h-screen flex flex-col mt-3">
        <div className="flex justify-between mx-3 px-3 bg-white border rounded py-3">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-xl">
              <h1>Edit Free Trail</h1>
            </h1>
          </div>
          <div>
            <Link
              to="/sidebar/freeTrail"
              className="px-6 py-1 rounded  border border-blue-500 text-blue-500 "
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* -------------FORM Starts FROM HERE------------- */}
        {/* Lead Image */}
        <form onSubmit={handleSubmit} className="flex">
          {/*-FORM- */}
          {/*Parent Div */}
          <div className="w-full">
            {/*CHILD Div------ Image Input */}
            {/* <div className="mx-3 my-3 bg-white rounded-xl shadow-md flex-grow">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Lead Image
              </h2>
              <img src={profilepic} className=" max-h-24 max-w-24 p-3" />
            </div> */}

            <div className="mx-3 my-3 bg-white rounded-xl shadow-md flex-grow">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Free Trail Information
              </h2>

              {/* -------------Free Trail INFORMATION STARTS FROM HERE------------- */}

              {/* -------------1------------- */}
              {/* -------------Name------------- */}
              <div className="grid gap-2 p-2">
                <div className="flex space-x-4  ">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="leadId"
                      className="text-sm font-medium text-gray-700"
                    >
                      Lead ID
                    </label>
                    <input
                      type="text"
                      name="leadId"
                      value={editTrail.leadId}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* -------------Language------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editTrail.name}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                {/* -------------2------------- */}
                <div className="flex space-x-4">
                  {/* -------------Language------------- */}
                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor="language"
                      className="text-sm font-medium text-gray-700"
                    >
                      Language
                    </label>
                    <div className="relative" onClick={toggleDropdownLanguage}>
                      <button
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="LanguageDropDown"
                        type="button"
                      >
                        {!isEditMode
                          ? defaultTextLanguageDropDown
                          : editLead.language === ""
                          ? defaultTextLanguageDropDown
                          : editLead.language}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isDropdownVisibleLanguage && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {LanguageDropDown.map(({ key, name }) => (
                              <li
                                key={key}
                                onClick={() => handleDropdownLanguage(name)}
                                className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                              >
                                {name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* ------------- Mobile Number------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="mobileNo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="mobileNo"
                      value={editTrail.mobileNo}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Mobile Number"
                    />
                    {errors.mobileNo && (
                      <span style={{ color: 'red' }}>{errors.mobileNo}</span>
                    )}
                  </div>
                </div>
                {/* -------------3------------- */}
                {/* -------------Phone Number------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="phoneNo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phoneNo"
                      value={editTrail.phoneNo}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Phone Number"
                    />
                  </div>

                  {/* -------------Email------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={editTrail.email}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Email"
                    />
                  </div>
                </div>

                {/* -------------4------------- */}
                {/* -----------Assigned To------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor=" AssignedTo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Assigned To
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
                        {editTrail.assigned_To === ''
                          ? editTrail.assigned_To
                          : defaultTextassigned_ToDropDown}
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
                  {/* -------------Segments------------- */}
                  <div className="flex flex-col w-1/2 relative">
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
                                  checked={editTrail.segments.includes(
                                    segment.segment
                                  )}
                                  onChange={() => handleCheckboxChange(segment)}
                                  className="mr-2"
                                />
                                {segment.segment}{' '}
                                {/* Assuming 'segment' is the property you want to display */}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    {errors.segment && (
                      <span style={{ color: 'red' }}>{errors.segment}</span>
                    )}
                  </div>
                </div>
                {/* -------------5------------- */}
                {/* -------------Trail Start Date------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="trialStartDate"
                      className="text-sm font-medium text-gray-700"
                    >
                      Trail Start Date
                    </label>
                    <input
                      type="date"
                      name="trialStartDate"
                      value={editTrail.trialStartDate.split('T')[0]}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                    {errors.trialStartDate && (
                      <span style={{ color: 'red' }}>
                        {errors.trialStartDate}
                      </span>
                    )}
                  </div>
                  {/* -------------Trail End Date------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="trialEndDate"
                      className="text-sm font-medium text-gray-700"
                    >
                      Trail End Date
                    </label>
                    <input
                      type="date"
                      name="trialEndDate"
                      value={editTrail.trialEndDate.split('T')[0]}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                    {errors.trialEndDate && (
                      <span style={{ color: 'red' }}>
                        {errors.trialEndDate}
                      </span>
                    )}
                  </div>
                </div>
                {/* -------------6------------- */}
                {/* -------------CallBack DateTime------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="callBackDateTime"
                      className="text-sm font-medium text-gray-700"
                    >
                      CallBack DateTime
                    </label>
                    <input
                      type="date"
                      name="callBackDateTime"
                      value={editTrail.call_bck_DateTime.split('T')[0]}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {/* ------------Last Modified By------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="lastModifiedBy"
                      className="text-sm font-medium text-gray-700"
                    >
                      Last Modified By
                    </label>
                    <input
                      type="text"
                      name="lastModifiedBy"
                      value={editTrail.lastModifiedBy}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter details"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* -------------Description Information------------- */}
            <div className="bg-white rounded-xl shadow-md mx-3 mb-6">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
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
                    onChange={setdescription}
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
          </div>
        </form>
      </div>
    </>
  );
}
