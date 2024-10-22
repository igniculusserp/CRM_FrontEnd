//react
import { useState, useEffect } from 'react';

//reactIcon
import { FaAngleDown } from 'react-icons/fa';
import { IoInformationCircle } from 'react-icons/io5';

//reactPackages
import { Link, useNavigate, useParams } from 'react-router-dom';

//external Packages
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//file
import { tenant_base_url, protocal_url } from '../../../../Config/config';
//Images
import profilepic from './../../../../assets/images/profilePicEditLead.png';

export default function Createlead() {
  //to make id unique
  const { id } = useParams();
  const navigate = useNavigate();

  //form description is kept-out
  const [description, setdescription] = useState('Add Text Here');
  const [editLead, seteditLead] = useState({
    id: '',
    name: '',
    language: '',
    company: '',
    email: '',
    title: '',
    leadSource: '',
    leadesStatus: '',
    mobNo: '',
    phNo: '',
    assigned_To: '',
    street: '',
    pinCode: '',
    country: '',
    city: '',
    state: '',
    riskCapcity: '',
    tradingTime: '',
    tradingType: '',
    investmet: '',
    advisoryExp: '',
    trialStartDate: '',
    trialEndDate: '',
    tradingYears: '',
    callBackDateTime: '',
    contactId: '',
    lastModifiedBy: '',
    segments: [],
  });

  //----------------------------------------------------------------------------------------
  //to make code for particluar company
  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split('.')[0];

  //imp to identify mode
  const [isEditMode, setIsEditMode] = useState(false);

  //auto search id-> if found isEditMode(true)
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      handleLead(); // Fetch lead data for editing
    }
  }, [id]);

  //GET by ID---------------------------//GET---------------------------//GET---------------------------by ID-----------by ID
  async function handleLead() {
    const bearer_token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Lead/lead/${id}`,
        config
      );
      const data = response.data.data;
      setdescription(data.description);
      seteditLead({
        id: data.id || '',
        name: data.name || '',
        language: data.language || '',
        company: data.company || '',
        title: data.tital || '',
        leadSource: data.leadsSource || 'N/A',
        leadesStatus: data.leadesStatus || 'N/A',
        mobNo: data.mobileNo || '',
        phNo: data.phoneNo || '',
        email: data.email || '',
        assigned_To: data.assigned_To || '',
        street: data.street || '',
        pinCode: data.postalCode || '',
        country: data.country || '',
        city: data.city || '',
        state: data.state || '',
        riskCapcity: data.risk_Capacity || '',
        tradingTime: data.tradingTime || '',
        tradingType: data.tradingType || '',
        investmet: data.investment || '',
        advisoryExp: data.advisaryExp || '',
        segments: data.segments || [],
        trialStartDate: data.trialStartDate || null,
        trialEndDate: data.trialEndDate || null,
        tradingYears: data.trading_yrs || '',
        callBackDateTime: data.call_bck_DateTime || null,
        contactId: data.contactId || '',
        lastModifiedBy: data.lastModifiedBy || '',
      });
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  }

  //----------------------------------------------------------------------------------------
  //LeadSourceDropDown
  const LeadSourceDropDown = [
    { key: 1, name: 'Cold Call' },
    { key: 2, name: 'Advertisement' },
    { key: 3, name: 'Web Download' },
    { key: 4, name: 'Seminar Partner' },
  ];

  const [defaultTextLeadSourceDropDown, setDefaultTextLeadSourceDropDown] =
    useState('Select Lead');

  const [isDropdownVisibleLeadSource, setisDropdownVisibleLeadSource] =
    useState(false);

  const toggleDropdownLeadSource = () => {
    setisDropdownVisibleLeadSource(!isDropdownVisibleLeadSource);
  };

  const handleDropdownLeadSource = (leadSource) => {
    setDefaultTextLeadSourceDropDown(leadSource);
    setisDropdownVisibleLeadSource(!isDropdownVisibleLeadSource);
    seteditLead((prevTask) => ({
      ...prevTask,
      leadSource: leadSource,
    }));
  };

  //----------------------------------------------------------------------------------------
  //LeadStatusDropDown GET API Is being used here
  const [leadStatus, setleadStatus] = useState('');

  async function handleLeadStatus() {
    const bearer_token = localStorage.getItem('token');

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/leadstatus/getall`,
        config
      );
      setleadStatus(response.data.data);

      console.log('status:', response.data.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
      // Optionally, set an error state to display a user-friendly message
    }
  }

  useEffect(() => {
    handleLeadStatus();
  }, []);

  const [defaultTextLeadStatusDropDown, setdefaultTextLeadStatusDropDown] =
    useState('Select Status');
  const [isDropdownVisibleLeadStatus, setisDropdownVisibleLeadStatus] =
    useState(false);

  const toggleDropdownLeadStatus = () => {
    setisDropdownVisibleLeadStatus(!isDropdownVisibleLeadStatus);
  };

  const handleDropdownLeadStatus = (leadStatus) => {
    setdefaultTextLeadStatusDropDown(leadStatus);
    setisDropdownVisibleLeadStatus(!isDropdownVisibleLeadStatus);
    seteditLead((prevTask) => ({
      ...prevTask,
      leadesStatus: leadStatus,
    }));
  };

  // Segment GET API Is being used here
  const [segments, setSegments] = useState([]);
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
    const isChecked = editLead.segments.includes(segment.segment);

    let updatedSegments;
    if (isChecked) {
      // Remove segment if already selected
      updatedSegments = editLead.segments.filter(
        (selectedSegment) => selectedSegment !== segment.segment
      );
    } else {
      // Add segment if not already selected
      updatedSegments = [...editLead.segments, segment.segment];
    }
    seteditLead((prev) => ({
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
    seteditLead((prevTask) => ({
      ...prevTask,
      assigned_To: assigned_To_Username,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditLead((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  //---------->handleSubmit<----------
  //two different models one for PUT and one for POST
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    // MOBILE NUMBER VALIDATION
    if (
      !editLead.mobNo ||
      isNaN(editLead.mobNo) ||
      editLead.mobNo.length !== 10 ||
      editLead.mobNo.trim() === ""
    ) {
      errors.mobileNo = 'Enter a valid 10-digit mobile number';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const bearer_token = localStorage.getItem('token');

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          'Content-Type': 'application/json',
        },
      };
      const formData_PUT = {
        id: editLead.id,
        name: editLead.name,
        language: editLead.language,
        company: editLead.company,
        email: editLead.email,
        tital: editLead.title,
        leadsSource: editLead.leadSource,
        leadesStatus: editLead.leadesStatus,
        mobileNo: editLead.mobNo,
        phoneNo: editLead.phNo,
        assigned_To: editLead.assigned_To,
        street: editLead.street,
        postalCode: editLead.pinCode,
        country: editLead.country,
        city: editLead.city,
        state: editLead.state,
        risk_Capacity: editLead.riskCapcity,
        tradingTime: editLead.tradingTime,
        tradingType: editLead.tradingType,
        investment: editLead.investmet,
        advisaryExp: editLead.advisoryExp,
        segments: editLead.segments,
        trialStartDate: editLead.trialStartDate || null,
        trialEndDate: editLead.trialEndDate || null,
        trading_yrs: editLead.tradingYears,
        call_bck_DateTime: editLead.callBackDateTime || null,
        contactID: editLead.contactId,
        lastModifiedBy: editLead.lastModifiedBy,
        //----------------//
        description: description,
      };
      const formData_POST = {
        name: editLead.name,
        language: editLead.language,
        company: editLead.company,
        email: editLead.email,
        tital: editLead.title,
        leadsSource: editLead.leadSource,
        leadesStatus: editLead.leadesStatus,
        mobileNo: editLead.mobNo,
        phoneNo: editLead.phNo,
        assigned_To: editLead.assigned_To,
        street: editLead.street,
        postalCode: editLead.pinCode,
        country: editLead.country,
        city: editLead.city,
        state: editLead.state,
        risk_Capacity: editLead.riskCapcity,
        tradingTime: editLead.tradingTime,
        tradingType: editLead.tradingType,
        investment: editLead.investmet,
        advisaryExp: editLead.advisoryExp,
        segments: editLead.segments,
        trialStartDate: editLead.trialStartDate || null,
        trialEndDate: editLead.trialEndDate || null,
        trading_yrs: editLead.tradingYears,
        call_bck_DateTime: editLead.callBackDateTime || null,
        contactID: editLead.contactId,
        lastModifiedBy: editLead.lastModifiedBy,
        description: description,
      };

      if (isEditMode) {
        await axios.put(
          `${protocal_url}${name}.${tenant_base_url}/Lead/lead/update`,
          formData_PUT,
          config
        );
        alert('Lead updated successfully!');
        navigate(`/sidebar/lead`);
      } else {
        await axios.post(
          `${protocal_url}${name}.${tenant_base_url}/Lead/lead/add`,
          formData_POST,
          config
        );

        if (
          !formData_POST.mobileNo &&
          isNaN(formData_POST.mobileNo) &&
          formData_POST.mobileNo < 10
        ) {
          setErrors({ mobileNo: 'Enter valid mobile number' });
        }

        console.log(formData_POST);
        alert('Lead created successfully!');
        navigate(`/sidebar/lead`);
      }

      // Redirect after a short delay
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col mt-3">
        <div className="flex justify-between mx-3  bg-white border rounded p-3">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-xl">
              {isEditMode ? <h1>Edit Lead</h1> : <>Create Lead</>}
            </h1>
            <h1 className="bg-blue-500 text-xs text-white px-4 py-1 font-medium rounded-lg">
              Edit Page Layout
            </h1>
          </div>
          <div>
            <Link
              to="/sidebar/lead"
              className="px-6 py-1 rounded  border border-blue-500 text-blue-500 "
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* -------------FORM Starts FROM HERE------------- */}
        {/* Lead Image */}
        <form onSubmit={handleSubmit} className="flex mb-6">
          {/*-FORM- */}
          {/*Parent Div */}
          <div className="w-full">
            {/*CHILD Div------ Image Input */}
            <div className="mx-3 my-3 bg-white rounded-xl shadow-md flex-grow">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Lead Image
              </h2>
              <img src={profilepic} className=" max-h-24 max-w-24 p-3" />
            </div>

            <div className="mx-3 bg-white rounded-xl shadow-md ">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Lead Information
              </h2>

              {/* -------------LEAD INFORMATION STARTS FROM HERE------------- */}
              {/*CHILD Div------ Image Input */}
              {/* -------------1------------- */}
              {/* -------------Name------------- */}
              <div className="grid gap-2 p-2">
                <div className="flex space-x-4 ">
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
                      value={editLead.name}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {/* -------------Language------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="language"
                      className="text-sm font-medium text-gray-700"
                    >
                      Language
                    </label>
                    <input
                      type="text"
                      name="language"
                      value={editLead.language}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Language"
                    />
                  </div>
                </div>
                {/* -------------2------------- */}
                {/* -------------Company------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="company"
                      className="text-sm font-medium text-gray-700"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={editLead.company}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Company"
                    />
                  </div>
                  {/* -------------Title------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editLead.title}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter Title"
                    />
                  </div>
                </div>
                {/* -------------3------------- */}
                {/* -------------Lead Source------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor="leadSource"
                      className="text-sm font-medium text-gray-700"
                    >
                      Lead Source
                    </label>
                    <div
                      className="relative"
                      onClick={toggleDropdownLeadSource}
                      onMouseLeave={() => setisDropdownVisibleLeadSource(false)}
                    >
                      <button
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="LeadSourceDropDown"
                        type="button"
                      >
                        {isEditMode
                          ? editLead.leadSource
                          : defaultTextLeadSourceDropDown}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isDropdownVisibleLeadSource && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {LeadSourceDropDown.map(({ key, name }) => (
                              <li
                                key={key}
                                onClick={() => handleDropdownLeadSource(name)}
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

                  {/* -------------Lead Status------------- */}

                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor="leadesStatus"
                      className="text-sm font-medium text-gray-700"
                    >
                      Lead Status
                    </label>
                    <div
                      className="relative"
                      onClick={toggleDropdownLeadStatus}
                      onMouseLeave={() => setisDropdownVisibleLeadStatus(false)}
                    >
                      <button
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="LeadStatusDropDown"
                        type="button"
                      >
                        {isEditMode
                          ? editLead.leadesStatus
                          : defaultTextLeadStatusDropDown}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isDropdownVisibleLeadStatus && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {leadStatus.length > 0 ? (
                              leadStatus.map(({ key, status }) => (
                                <li
                                  key={key}
                                  onClick={() =>
                                    handleDropdownLeadStatus(status)
                                  }
                                  className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                >
                                  {status}
                                </li>
                              ))
                            ) : (
                              <li className="flex items-center px-4 py-2 text-center gap-1">
                                <IoInformationCircle
                                  size={25}
                                  className="text-cyan-600"
                                />{' '}
                                Lead status not available. Go to{' '}
                                <span className="font-bold">
                                  Settings - Add Lead Status{' '}
                                </span>
                                .
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* -------------4------------- */}
                {/* -------------Mobile Number------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="mobNo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="mobNo"
                      value={editLead.mobNo}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Mobile Number"
                    />
                    {errors.mobileNo && (
                      <span style={{ color: 'red' }}>{errors.mobileNo}</span>
                    )}
                  </div>
                  {/* -------------Phone Number------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="phNo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phNo"
                      value={editLead.phNo}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Phone Number"
                    />
                  </div>
                </div>
                {/* -------------5------------- */}
                {/* -------------Email------------- */}
                <div className="flex space-x-4">
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
                      value={editLead.email}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Email"
                    />
                  </div>
                  {/* -------------Assigned to------------- */}
                  <div className="flex flex-col w-1/2 relative">
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
                        {isEditMode
                          ? editLead.assigned_To
                          : defaultTextassigned_ToDropDown}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isDropdownassigned_ToDropDown && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {assigned_ToDropDown.map(
                              ({ userName, role }, index) => (
                                <li
                                  key={index}
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
              </div>
            </div>
            {/* -------------Address INFORMATION STARTS FROM HERE------------- */}
            <div className="mx-3 my-3 bg-white rounded-xl shadow-md flex-grow ">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Address Information
              </h2>

              {/* -------------Address Information STARTS FROM HERE------------- */}
              {/* -------------6------------- */}
              {/* -------------Street------------- */}
              <div className="grid gap-2 p-2">
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="street"
                      className="text-sm font-medium text-gray-700"
                    >
                      Street
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={editLead.street}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Street"
                    />
                  </div>
                  {/* -------------PinCode------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="pinCode"
                      className="text-sm font-medium text-gray-700"
                    >
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      value={editLead.pinCode}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your pincode"
                    />
                  </div>
                </div>
                {/* -------------7------------- */}
                {/* -------------Country------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="country"
                      className="text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={editLead.country}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Country Name"
                    />
                  </div>
                  {/* -------------City------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={editLead.city}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your City name"
                    />
                  </div>
                </div>
                {/* -------------8------------- */}
                {/* -------------State------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="state"
                      className="text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={editLead.state}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your State name"
                    />
                  </div>
                  {/* -------------Description------------- */}
                </div>{' '}
                {/* -------------9------------- */}
                {/* -------------Risk Capcity------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="riskCapcity"
                      className="text-sm font-medium text-gray-700"
                    >
                      Risk Capacity
                    </label>
                    <input
                      type="text"
                      name="riskCapcity"
                      value={editLead.riskCapcity}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter Risk Capacity"
                    />
                  </div>
                  {/* -------------Trading Time------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="tradingTime"
                      className="text-sm font-medium text-gray-700"
                    >
                      Trading Time
                    </label>
                    <input
                      type="text"
                      name="tradingTime"
                      value={editLead.tradingTime}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter Trading Time"
                    />
                  </div>
                </div>
                {/* -------------10------------- */}
                {/* -------------Trading Type------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="tradingType"
                      className="text-sm font-medium text-gray-700"
                    >
                      Trading Type
                    </label>
                    <input
                      type="text"
                      name="tradingType"
                      value={editLead.tradingType}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                  {/* -------------investmet------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="investmet"
                      className="text-sm font-medium text-gray-700"
                    >
                      Information
                    </label>
                    <input
                      type="text"
                      name="investmet"
                      value={editLead.investmet}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* -------------11------------- */}
                {/* -------------Advisory Exp------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="empNadvisoryExpame"
                      className="text-sm font-medium text-gray-700"
                    >
                      Advisory Exp
                    </label>
                    <input
                      type="text"
                      name="advisoryExp"
                      value={editLead.advisoryExp}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Advisory"
                    />
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
                            {segments.length > 0 ? (
                              segments.map((segment) => (
                                <li
                                  key={segment.id}
                                  className="flex items-center px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={editLead.segments.includes(
                                      segment.segment
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(segment)
                                    }
                                    className="mr-2"
                                  />
                                  {segment.segment}{' '}
                                  {/* Assuming 'segment' is the property you want to display */}
                                </li>
                              ))
                            ) : (
                              <li className="flex items-center px-4 py-2 text-center gap-1">
                                <IoInformationCircle
                                  size={25}
                                  className="text-cyan-600"
                                />{' '}
                                Segments not available. Go to{' '}
                                <span className="font-bold">
                                  Settings - Add Segment{' '}
                                </span>
                                .
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* -------------11------------- */}
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
                      value={editLead.trialStartDate?.split('T')[0]}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
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
                      value={editLead.trialEndDate?.split('T')[0]}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                {/* -------------12------------- */}
                {/* -------------Trading Years------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="tradingYears"
                      className="text-sm font-medium text-gray-700"
                    >
                      Trading Years
                    </label>
                    <input
                      type="text"
                      name="tradingYears"
                      value={editLead.tradingYears}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter years"
                    />
                    {/* -------------callBackDateTime ------------- */}
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="callBackDateTime"
                      className="text-sm font-medium text-gray-700"
                    >
                      CallBack DateTime
                    </label>
                    <input
                      type="datetime-local"
                      name="callBackDateTime"
                      value={editLead.callBackDateTime}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                {/* -------------13------------- */}
                {/* -------------contactID ------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="contactId"
                      className="text-sm font-medium text-gray-700"
                    >
                      Contact ID
                    </label>
                    <input
                      type="text"
                      name="contactId"
                      value={editLead.contactId}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter ContactID"
                    />
                  </div>
                  {/* -------------lastModifiedBy ------------- */}
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
                      value={editLead.lastModifiedBy}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter details"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-3 bg-white rounded-xl shadow-md ">
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
                  className="px-32 py-4 mt-20 mb-2 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white"
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
