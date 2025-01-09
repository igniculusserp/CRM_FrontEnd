//react
import { useState, useEffect } from 'react';

//reactPackages
import { Link, useNavigate, useParams } from 'react-router-dom';

//reactIcon
import { FaAngleDown, FaStarOfLife } from 'react-icons/fa';
import { IoInformationCircle } from 'react-icons/io5';
import { GrContactInfo } from 'react-icons/gr';

//external Packages
import axios from 'axios';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

//file
import { tenant_base_url, protocal_url } from '../../../../Config/config';


//-----------------------------ToastContainer-----------------------------
import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from './../../../../utils/toastNotifications'

import { getHostnamePart } from '../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl';

export default function Createlead() {
  //to make id unique
  const { id } = useParams();
  const navigate = useNavigate();

  //-->--->createLead/editLead--> Schema<->Model

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

  const [description, setdescription] = useState('Add Text Here');

  //----------------------------------------------------------------------------------------
  //using a global name
  const name = getHostnamePart();

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

      //desciption is kept out of model
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
        assigned_To: data.assigned_To || 'N/A',
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

  //---------------------------> Language <---------------------------
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

  const handleDropdownLanguage = (Language) => {
    setDefaultTextLanguageDropDown(Language);
    setisDropdownVisibleLanguage(!isDropdownVisibleLanguage);
    seteditLead((prevTask) => ({
      ...prevTask,
      language: Language,
    }));
  };

  //----------------------------------------------------------------------------------------

  //---------------------------> Lead Source <---------------------------
  //PooL API used in -> Lead Source DropDown
  const [poolToDropDown, setPoolToDropDown] = useState([]);

  //default text for LeadStatus
  const [defaultTextPool, setDefaultTextPool] = useState("Select Lead Source");

  //dropDown State
  const [isPoolDropdownOpen, setIsPoolDropdownOpen] = useState(false);

  //error
  const [error, setError] = useState(null); // New error state

  //
  const [poolEdit, setPoolEdit] = useState("");


  //--------------------------> GET API --> leadSource <--------------------------
  const handlePool = async () => {
    const bearerToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/pool/getall`,
        config
      );
      setPoolToDropDown(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setError("Failed to fetch pools."); // Set error message
    }
  };

  useEffect(() => {
    handlePool();
  }, []);

  const toggleDropdown = () => {
    setIsPoolDropdownOpen((prev) => !prev);
  };

  const handleDropdownSelection = (poolName) => {
    setIsPoolDropdownOpen(false);
    setDefaultTextPool(poolName);
    seteditLead((prev) => ({
      ...prev,
      leadSource: poolName,
    }));
    setPoolEdit(poolName);
  };

  //----------------------------------------------------------------------------------------

  //---------------------------> Lead Source <---------------------------
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

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //---------------------------> Segment <---------------------------
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
    setdefaultTextSegmentDropDown(
      editLead.segments.length > 0 ? editLead.segments.join(", ") : "Select Segment"
    );
  }, [editLead]);

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

    setdefaultTextSegmentDropDown(
      updatedSegments.length > 0 ? updatedSegments.join(", ") : "Select Segment"
    );


    console.log('Selected segments:', updatedSegments);
  };

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //---------------------------> Assigned To <---------------------------

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


  //------------------------------------------Mobile Regex------------------------------------------
  const handleContactChange = (event) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    const { name } = event.target;

    seteditLead((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };


  //------------------------------------------Email Regex------------------------------------------
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  //---------->handleSubmit<----------
  //two different schemas, one for PUT and one for POST
  const handleSubmit = async (event) => {
    event.preventDefault();

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

      console.log(formData_POST)

      //------------------------------------------------------------------------------------> Validations//--> Validations//--> Validations//--> Validations//--> Validations


      if (!formData_POST.name || !formData_PUT.name) {
        showErrorToast('Please enter name')
        return;
      }

      if (!formData_POST.mobileNo) {
        showErrorToast('Please enter mobile number')
        return;
      }

      if (formData_POST.phoneNo && (formData_POST.phoneNo.length < 9 || formData_PUT.phoneNo.length > 15)) {
        showErrorToast('Please check phone no')
        return;
      }

      if (formData_POST.mobileNo.length < 9 || formData_PUT.mobileNo.length > 15) {
        showErrorToast('Invalid mobile number')
        return;
      }

      if ((formData_POST.email && !emailRegex.test(formData_POST.email)) || (formData_PUT.email && !emailRegex.test(formData_PUT.email))) {
        showErrorToast('Invalid email format');
        return;
      }

      //Date Logic Validation
      const today = new Date().toISOString().split('T')[0];

      //Previous date cannot be selected
      if (formData_POST.trialStartDate < today) {
        showErrorToast('Previous date cannot be selected')
        return;
      }

      if (formData_POST.trialEndDate < today) {
        showErrorToast('Previous date cannot be selected')
        return;
      }

      //Date should not be more than 1 or less than 1
      const date = (formData_POST.trialEndDate?.split('-')[2] - formData_POST.trialStartDate?.split('-')[2])

      if (formData_POST.trialStartDate && formData_POST.trialEndDate && date === 1) {
        if (formData_POST.segments.length === 0) {
          showErrorToast('Please Select segments');
          return;
        }
      }


      if (formData_POST.trialStartDate && !formData_POST.trialEndDate) {
        showErrorToast("Please Select trial end date");
        return;
      }

      if (formData_POST.trialEndDate && !formData_POST.trialStartDate) {
        showErrorToast("Please Select trial start date");
        return;
      }

      // Check if isEditMode and handle API calls accordingly
      if (isEditMode) {
        await axios.put(`${protocal_url}${name}.${tenant_base_url}/Lead/lead/update`, formData_PUT, config);
        alert('Lead updated successfully!');
        showSuccessToast('Lead updated successfully!')
        navigate(`/panel/lead`);
      } else {
        await axios.post(`${protocal_url}${name}.${tenant_base_url}/Lead/lead/add`, formData_POST, config);
        alert('Lead created successfully!');
        showSuccessToast('Lead created successfully')
        navigate(`/panel/lead`);
      }
    } catch (error) {
      showErrorToast(error.response?.data?.message || "An error occurred");


    }
  }

  return (
    <>
      <ToastContainer />
      {/* ------------------------------------------------> Parent <------------------------------------------------ */}
      <div className=" mt-3">

        {/* ------------------------------------------------> Heading  <------------------------------------------------ */}
        <div className="flex justify-between mx-3  bg-white border rounded p-3 ">
          {/* ------------------------------------------------> Text and Logo  <------------------------------------------------ */}
          <div className="flex items-center justify-center gap-3 ">
            <h1 className=" text-xl">
              {isEditMode ? (
                <>
                  <div className='flex justify-center items-center gap-2  '>
                    <GrContactInfo size={25} />
                    <h1>Edit Lead</h1>
                  </div>
                </>
              ) :
                (<>
                  <div className=' flex justify-center items-center  gap-2   '>
                    <GrContactInfo size={25} />
                    <h1>Create Lead</h1>
                  </div>
                </>
                )
              }
            </h1>
          </div>
          <div>
            {/* ------------------------------------------------> Cancel Button  <------------------------------------------------ */}
            <Link
              to="/panel/lead"
              className="sm:px-6 py-1 px-4 rounded  border border-blue-500 text-blue-500 "
            >
              Cancel
            </Link>
          </div>
        </div>

        {/* -------------FORM Starts FROM HERE------------- */}
        {/* Lead Image */}
        <form onSubmit={handleSubmit} className="flex mb-6">
          {/* ------------------------------------------------> FORM PARENT includes 4 tabs <------------------------------------------------ */}
          <div className="w-screen">
            {/* ------------------------------------------------>TAB  1 :  Lead Information TAB <------------------------------------------------ */}
            <div className="m-3 bg-white rounded-xl shadow-md  ">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Lead Information
              </h2>
              {/* -------------Parent <Lead Information Inputs>------------- */}
              <div className=" space-y-3 p-2 ">

                {/* ------------------------------------1------------------------------------- */}
                {/* -------------SUB -> Parent -> <Name && Language>------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4">
                  {/* -------------Name------------- */}
                  <div className="flex flex-col relative ">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      <span className="flex gap-1">
                        Name
                        <FaStarOfLife size={8} className="text-red-500" />
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editLead.name}
                      onChange={handleChange}
                      placeholder="Enter your Name"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  {/* -------------Language------------- */}
                  <div className="flex flex-col relative">
                    <label
                      htmlFor="language"
                      className="text-sm font-medium text-gray-700"
                    >
                      Language
                    </label>

                    <div
                      className="relative "
                      onClick={toggleDropdownLanguage}
                      onMouseLeave={() => setisDropdownVisibleLanguage(false)}
                    >
                      <button
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="LanguageDropDown"
                        type="button"
                      >
                        {!isEditMode ? defaultTextLanguageDropDown : editLead.language === "" ? defaultTextLanguageDropDown : editLead.language}
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
                </div>

                {/* ------------------------------------2------------------------------------- */}
                {/* -------------SUB -> Parent -> < Company &&  Title >------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4">
                  {/* -------------Company------------- */}
                  <div className="flex flex-col relative ">
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
                      onChange={handleChange}
                      placeholder="Enter your Company"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full "
                    />
                  </div>
                  {/* -------------Title------------- */}
                  <div className="flex flex-col relative ">
                    <label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700"
                    >
                      Lead Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editLead.title}
                      onChange={handleChange}
                      placeholder="Enter Title"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full "

                    />
                  </div>
                </div>
                {/* ------------------------------------3------------------------------------- */}
                {/* -------------SUB -> Parent -> <Lead Source && Lead Status>------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4">
                  {/* -------------Lead Source------------- */}
                  <div className="flex flex-col relative">
                    <label
                      htmlFor="Pool"
                      className="text-sm font-medium text-gray-700"
                    >
                      Lead Source
                    </label>
                    <div
                      className="relative"
                      onMouseLeave={() => setIsPoolDropdownOpen(false)}
                    >
                      <button
                        onClick={toggleDropdown}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="LeadPoolDropDown"
                        type="button"
                      >
                        {poolEdit === ""
                          ? defaultTextPool
                          : editLead.leadSource}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isPoolDropdownOpen && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                          {error ? (
                            <div className="py-2 text-red-600">{error}</div>
                          ) : (
                            <ul className="py-2 text-sm text-gray-700">
                              {poolToDropDown.map(({ id, poolName }) => (
                                <li
                                  key={id}
                                  onClick={() =>
                                    handleDropdownSelection(poolName)
                                  }
                                  className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                >
                                  {poolName}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* -------------Lead Status------------- */}

                  <div className="flex flex-col relative">
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

                {/* ------------------------------------4------------------------------------- */}
                {/* -------------SUB -> Parent -> <Mobile Numbe && Alternate Number>------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4">
                  {/* -------------Mobile Number------------- */}
                  <div className="flex flex-col relative ">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      <span className="flex gap-1">
                        Mobile Number
                        <FaStarOfLife size={8} className="text-red-500" />
                      </span>
                    </label>
                    <input
                      type="number"
                      name="mobNo"
                      maxLength="15"
                      value={editLead.mobNo}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleContactChange}
                      placeholder="Enter your Mobile Number"
                    />

                  </div>
                  {/* -------------Alternate Number------------- */}
                  <div className="flex flex-col relative ">
                    <label
                      htmlFor="phNo"
                      className="text-sm font-medium text-gray-700"
                    >
                      Alternate Number
                    </label>
                    <input
                      type="text"
                      name="phNo"
                      maxLength="15"
                      value={editLead.phNo}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleContactChange}
                      placeholder="Enter your Alternate Number"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[a-zA-Z]/g, ""); // Removes all letters (a to z and A to Z)
                      }}
                    />
                  </div>
                </div>
                {/* ------------------------------------5------------------------------------- */}
                {/* -------------SUB -> Parent -> <Email && Assigned TO>------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4">

                  {/* -------------Email------------- */}
                  <div className="flex flex-col relative ">
                    <label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editLead.email}
                      onChange={handleChange}
                      placeholder="Enter your Email"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full "
                    />
                  </div>
                  {/* -------------Assigned to------------- */}
                  <div className="flex flex-col relative">
                    <label
                      htmlFor="leadesStatus"
                      className="text-sm font-medium text-gray-700"
                    >
                      Managed By
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

            {/* ------------------------------------------------>TAB  2 :  Address Information  TAB <------------------------------------------------ */}
            <div className="m-3 bg-white rounded-xl shadow-md  ">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Address Information
              </h2>
              {/* -------------Parent <Address Information Inputs>------------- */}
              <div className=" space-y-3 p-2 ">
                {/* ------------------------------------1------------------------------------- */}
                {/* -------------SUB -> Parent -> <Street && Pincode>------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4">
                  {/* -------------Street------------- */}
                  <div className="flex flex-col relative ">
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
                      onChange={handleChange}
                      placeholder="Enter your Street"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  {/* -------------Pincode------------- */}
                  <div className="flex flex-col relative ">
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
                      onChange={handleChange}
                      placeholder="Enter your pincode"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
                {/* ------------------------------------2------------------------------------- */}
                {/* -------------SUB -> Parent -> <Country && City>------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4">
                  {/* -------------Country------------- */}
                  <div className="flex flex-col relative ">
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
                      onChange={handleChange}
                      placeholder="Enter your Country name"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  {/* -------------City------------- */}
                  <div className="flex flex-col relative ">
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
                      onChange={handleChange}
                      placeholder="Enter your City name"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
                {/* -------------3------------- */}
                {/* -------------SUB -> Parent -> <State>------------- */}

                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4">
                  {/* -------------State------------- */}
                  <div className="flex flex-col relative ">
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
                      onChange={handleChange}
                      placeholder="Enter your State name"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"

                    />
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------------------------------------>TAB  3 :  Trading Information TAB <------------------------------------------------ */}
            <div className="m-3 bg-white rounded-xl shadow-md  ">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Trading Information
              </h2>
              {/* -------------Parent <Lead Information Inputs>------------- */}
              <div className=" space-y-3 p-2 ">

                {/* ------------------------------------1------------------------------------- */}
                {/* -------------SUB -> Parent -> <Risk Capacity && Trading Time>------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4">
                  {/* -------------Risk Capacity------------- */}
                  <div className="flex flex-col relative ">
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
                      onChange={handleChange}
                      placeholder="Enter Risk Capacity"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  {/* -------------Trading Time------------- */}
                  <div className="flex flex-col relative ">
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
                      onChange={handleChange}
                      placeholder="Enter Trading Time"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
                {/* ------------------------------------2------------------------------------- */}
                {/* -------------SUB -> Parent -> <Trading Type && Investmet>------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4">
                  {/* -------------Trading Type------------- */}
                  <div className="flex flex-col relative ">
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
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  {/* -------------Investmet------------- */}
                  <div className="flex flex-col relative ">
                    <label
                      htmlFor="investmet"
                      className="text-sm font-medium text-gray-700"
                    >
                      Investment
                    </label>
                    <input
                      type="text"
                      name="investmet"
                      value={editLead.investmet}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
                {/* ------------------------------------2------------------------------------- */}
                {/* -------------SUB -> Parent -> <Trading Type && Segments>------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-4">
                  {/* -------------Trading Type------------- */}
                  <div className="flex flex-col relative ">
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
                      onChange={handleChange}
                      placeholder="Enter your Advisory"
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  {/* -------------Segments------------- */}
                  <div className="flex flex-col relative ">
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
                        id="LeadStatusDropDown"
                        type="button"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
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
                {/* ------------------------------------2------------------------------------- */}
                {/* -------------SUB -> Parent -> <Trail Start Date && Trail End Date>------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-2 gap-2 sm:gap-4">
                  {/* -------------Trail Start Date------------- */}
                  <div className="flex flex-col relative ">
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
                  <div className="flex flex-col relative ">
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
                {/* ------------------------------------3------------------------------------- */}
                {/* -------------SUB -> Parent -> <Trading Years && CallBack DateTime>------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-2 gap-2 sm:gap-4">
                  {/* -------------Trading Years------------- */}
                  <div className="flex flex-col relative ">
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
                  <div className="flex flex-col relative ">
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
              {/* ------------------------------------3------------------------------------- */}
                {/* -------------SUB -> Parent -> <Trading Years && CallBack DateTime>------------- */}
                <div className="grid sm:grid-cols-2 grid-cols-2 gap-2 sm:gap-4">
                  {/* -------------Trading Years------------- */}
                  <div className="flex flex-col relative ">

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
                  <div className="flex flex-col relative ">
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
                    className="text-balance hyphens-auto max-h-full sm:h-60 h-40  mt-1 "
                    theme="snow"
                    onChange={setdescription}
                    placeholder="Add Description"
                  />
                </div>
              </div>
              <div className="flex justify-end px-2">
                <button
                  type="submit"
                  className="px-36 py-4 sm:mt-20 mt-16 mb-2 sm:me-10 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white w-full sm:w-1/3"
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

