//react
import { useState, useEffect } from "react";
//reactIcon
import { FaAngleDown, FaStarOfLife } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

//reactPackages
import { Link, useNavigate, useParams } from "react-router-dom";

//external Packages
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//file
import { tenant_base_url, protocal_url } from "../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { ToastContainer } from 'react-toastify';
import { showSuccessToast, showErrorToast } from '../../../../utils/toastNotifications'

export default function CreateSOContact() {
  //to make id unique
  const { id, leadId } = useParams();
  const navigate = useNavigate();

  //------- Business Type --------
  const businessType = localStorage.getItem("businessType");
  const [business, setBusiness] = useState("");

  //form description is kept-out
  const [description, setdescription] = useState("Add Text Here");
  const [editLead, seteditLead] = useState({});

  //IMP used as ${name} in an API
  const name = getHostnamePart();

  //imp to identify mode
  const [isEditMode, setIsEditMode] = useState(false);

  //auto search id-> if found isEditMode(true)
  useEffect(() => {
    if (id) {
      setIsEditMode(false);
      handleLeadbyId(); // Fetch lead data for editing
    } else {
      setIsEditMode(true);
    }

    //------- Business Type --------
    console.log("Company Type :-> ", businessType);
    setBusiness(businessType);

  }, [id]);

  //GET by ID---------------------------//GET---------------------------//GET---------------------------by ID-----------by ID
  async function handleLeadbyId() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(`${protocal_url}${name}.${tenant_base_url}/Contact/contact/${id}`, config);
      const data = response.data.data;

      seteditLead({
        //Personal Details
        leadId: data.id || "",
        clientName: data.name || "",
        language: data.language || "",
        mobileNo: data.mobileNo || "",
        phoneNo: data.phoneNo || "",
        email: data.email || "",
        assigned_To: data.assigned_To || "N/A",
        street: data.street || "",
        postalCode: data.postalCode || "",
        country: data.country || "",
        city: data.city || "",
        state: data.state || "",
        advisaryExp: data.advisaryExp || "",

        //Payment Details
        segments: data.segments || [],

        // Service Details
        subscription_start_date: data?.trialStartDate ? data.trialStartDate.split("T")[0] : null,
        subscription_end_date: data?.trialEndDate ? data.trialEndDate.split("T")[0] : null,

      });
      //Description Information
      setdescription(data.description);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  }

  //----------------------------------------------------------------------------------------

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
      const response = await axios.get(`${protocal_url}${name}.${tenant_base_url}/Admin/segment/getall`, config);
      setSegments(response.data.data);
    } catch (error) {
      console.error('Error fetching segments:', error);
    }
  }

  useEffect(() => {
    handleSegment();
  }, []);

  const [defaultTextSegmentDropDown, setdefaultTextSegmentDropDown] = useState('Select Segment');
  const [isDropdownVisibleSegment, setisDropdownVisibleSegment] = useState(false);

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
  };
  // Segment GET API Is being used here

  //----------------------------------------------------------------------------------------
  //assigned_ToDropDown  Is being used here
  const [assigned_ToDropDown, setassigned_ToDropDown] = useState({});

  async function handleAssigned_To() {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(`${protocal_url}${name}.${tenant_base_url}/Setting/users/byusertoken`, config);
      setassigned_ToDropDown(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Optionally, set an error state to display a user-friendly message
    }
  }

  useEffect(() => {
    handleAssigned_To();
  }, []);

  const [defaultTextassigned_ToDropDown, setdefaultTextassigned_ToDropDown] =
    useState();
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

  //----------------------------------------------------------------------------------------
  //Service
  const Service_DropDown = [
    { key: 1, name: "SMS" },
    { key: 3, name: "Call" },
    { key: 2, name: "What's App" },
  ];

  const [defaultText_Service_DropDown, setDefaultText_Service_DropDown] =
    useState("Select Service");

  const [isDropdownVisible_Service_, setisDropdownVisible_Service_] =
    useState(false);

  const toggleDropdown_Service_ = () => {
    setisDropdownVisible_Service_(!isDropdownVisible_Service_);
  };

  const handleDropdownisDropdown_Service_ = (service) => {
    setDefaultText_Service_DropDown(service);
    setisDropdownVisible_Service_(!isDropdownVisible_Service_);
    seteditLead((prevTask) => ({
      ...prevTask,
      service: service,
    }));
  };

  //----------------------------------------------------------------------------------------
  //TERM
  const Term_DropDown = [
    { key: 1, name: "Monthly" },
    { key: 2, name: "Quartely" },
    { key: 3, name: "Half Yearly" },
    { key: 4, name: "Yearly" },
  ];

  const [defaultText_Term_DropDown, setDefaultText_Term_DropDown] =
    useState("Select Term");

  const [isDropdownVisible_Term_, setisDropdownVisible_Term_] = useState(false);

  const toggleDropdown_Term_ = () => {
    setisDropdownVisible_Term_(!isDropdownVisible_Term_);
  };

  const handleDropdownisDropdown_Term_ = (term) => {
    setDefaultText_Term_DropDown(term);
    setisDropdownVisible_Term_(!setisDropdownVisible_Term_);
    seteditLead((prevTask) => ({
      ...prevTask,
      term: term,
    }));
  };

  //----------------------------------------------------------------------------------------
  //Business Type
  const BusinessTypeDropDown = [
    { key: 1, name: "IT" },
    { key: 2, name: "eCommerce" },
    { key: 3, name: "Marketing" },
    { key: 4, name: "Hospitality" },
    { key: 5, name: "Brokerage" },
  ];

  const [defaultTextbusinessTypeDropDown, setDefaultTextbusinessTypeDropDown] =
    useState("Select Business Type");

  const [isDropdownVisiblebusinessType, setisDropdownVisiblebusinessType] =
    useState(false);

  const toggleDropdownbusinessType = () => {
    setisDropdownVisiblebusinessType(!isDropdownVisiblebusinessType);
  };

  const handleDropdownisDropdownVisiblebusinessType = (businessType) => {
    setDefaultTextbusinessTypeDropDown(businessType);
    setisDropdownVisiblebusinessType(!isDropdownVisiblebusinessType);
    seteditLead((prevTask) => ({
      ...prevTask,
      business: businessType,
    }));
  };

  //----------------------------------------------------------------------------------------
  //PooL_ToDropDown
  const [poolToDropDown, setPoolToDropDown] = useState([]);
  const [defaultTextPool, setDefaultTextPool] = useState("Select Lead Source");
  const [isPoolDropdownOpen, setIsPoolDropdownOpen] = useState(false);
  const [error, setError] = useState(null); // New error state
  const [poolEdit, setPoolEdit] = useState("");

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
  //two different models one for PUT and one for POST
  const handleSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem("token");


    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
          "Content-Type": "application/json",
        },
      };

      const formData_POST = {
        //Personal Details
        leadId: editLead.leadId,
        leadSource: editLead.leadSource || null,
        clientName: editLead.clientName,
        language: editLead.language,
        fatherName: editLead.fatherName,
        motherName: editLead.motherName,
        mobileNo: editLead.mobileNo,
        phoneNo: editLead.phoneNo,
        uidaI_Id_No: editLead.uidaI_Id_No,
        panCard_No: editLead.panCard_No,
        email: editLead.email,
        assigned_To: editLead.assigned_To,
        state: editLead.state,
        city: editLead.city,
        street: editLead.street,
        postalCode: editLead.postalCode,
        dob: editLead.dob,
        country: editLead.country,
        business: editLead.business || "",
        advisaryExp: editLead.advisaryExp,
        bank_name: editLead.bank_name,
        branch_name: editLead.branch_name,
        paymenT_MODE: editLead.paymenT_MODE,
        reference_Number: editLead.reference_Number,
        totalAmount: editLead.totalAmount,
        due_Amount: editLead.due_Amount,
        amount_paid: editLead.amount_paid,
        discount: editLead.discount,
        paymentDate: editLead.paymentDate,
        chequeOrDD_no: editLead.chequeOrDD_no,
        segments: editLead.segments,
        saleS_ODR_NO: editLead.saleS_ODR_NO,
        period_of_Subscription: editLead.period_of_Subscription || null,
        term: editLead.term,
        subscription_start_date: editLead.subscription_start_date || null,
        subscription_end_date: editLead.subscription_end_date || null,
        remarks: editLead.remarks,
        service: editLead.service || null,
        status: false,
        description: description,
      };


      //------------------------------------------------------------------------------------> Validations//--> Validations//--> Validations//--> Validations//--> Validations
      //------------------------------------------------------------------------------------> Validations//--> FOR BROKERAGE

      if (business == "Brokerage") {
        if (!formData_POST.clientName) {
          showErrorToast("Please enter name")
          return;
        }

        if (!formData_POST.mobileNo) {
          showErrorToast('Please enter mobile number')
          return;
        }
        if (!formData_POST.assigned_To) {
          showErrorToast("Please select Managed by")
          return;
        }
        if (!formData_POST.due_Amount) {
          showErrorToast("Please enter brokerage")
          return;
        }
        if (!formData_POST.amount_paid) {
          showErrorToast("Please enter funds")
          return;
        }

      }
      //------------------------------------------------------------------------------------> Validations//--> FOR OTHERS
      else {

        if (!formData_POST.clientName) {
          showErrorToast("Please enter name")
          return;
        }

        if (!formData_POST.mobileNo) {
          showErrorToast('Please enter mobile number')
          return;
        }

        if (!formData_POST.uidaI_Id_No) {
          showErrorToast("Please enter UIDAI Id")
          return;
        }

        if (!formData_POST.panCard_No) {
          showErrorToast("Please enter pan card number")
          return;
        }


        if ((formData_POST.email && !emailRegex.test(formData_POST.email))) {
          showErrorToast('Invalid email format');
          return;
        }

        if (!formData_POST.assigned_To) {
          showErrorToast("Please select Managed by")
          return;
        }
        if (!formData_POST.reference_Number) {
          showErrorToast("Please enter reference number")
          return;
        }

        if (!formData_POST.amount_paid) {
          showErrorToast("Please enter paid amount")
          return;
        }

        if (!formData_POST.paymentDate) {
          showErrorToast("Please enter payment date")
          return;
        }
        //Date Logic Validation
        const today = new Date().toISOString().split('T')[0];

        //Previous date cannot be selected
        if (formData_POST.subscription_start_date < today) {
          showErrorToast('Previous date cannot be selected')
          return;
        }

        if (formData_POST.subscription_end_date < today) {
          showErrorToast('Previous date cannot be selected')
          return;
        }


        if (!formData_POST.subscription_start_date) {
          showErrorToast("Please select subscription start date")
          return
        }

        if (!formData_POST.subscription_end_date) {
          showErrorToast("Please select subscription end date")
          return
        }
      }

      const response = await axios.post(`${protocal_url}${name}.${tenant_base_url}/SalesOrder/salesOrder/add`, formData_POST, config);
      if (response.data.isSuccess) {
        showSuccessToast("Sales Order created successfully!")
        navigate(`/panel/lead`);
      }
      // Redirect after a short delay
    } catch (error) {
      console.log(error)
      showErrorToast(error.data.message);

    }
  };



  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col mt-3">
        <div className="flex justify-between mx-3 px-3 bg-white border rounded py-3">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-xl">
              {/*  {isEditMode? <h1>Edit Lead</h1>: <>Create Lead</> } */}
              Create Sales Order
            </h1>
            <h1 className="bg-blue-500 text-xs text-white px-4 py-1 font-medium rounded-lg">
              Edit Page Layout
            </h1>
          </div>
          <div>
            <Link
              to="/panel/contact"
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

            <div className="mx-3 my-3 bg-white rounded-xl shadow-md flex-grow">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Personal Details
              </h2>

              {/* -------------SALES ORDER INFORMATION STARTS FROM HERE------------- */}
              {/* -------------I--1------------- */}
              {/* -------------Client Name------------- */}

              {business === "Brokerage" ?
                <div className="py-2 px-4 grid gap-2">
                  <div className="flex space-x-4  ">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="clientName"
                        className="text-sm font-medium text-gray-700"
                      >
                        <span className="flex gap-1">
                          Client Name
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        value={editLead.clientName}
                        placeholder="Enter Client's Name"
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    {/* -------------Mobile Number------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="mobileNo"
                        className="text-sm font-medium text-gray-700"
                      >
                        <span className="flex gap-1">
                          Mobile Number
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
                      </label>
                      <input
                        type="text"
                        name="mobileNo"
                        value={editLead.mobileNo}
                        maxLength="15"
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleContactChange}
                        placeholder="Enter your Mobile Number"
                      />
                    </div>
                  </div>



                  <div className="flex space-x-4">


                    {/* -------------Alternate Number------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="phoneNo"
                        className="text-sm font-medium text-gray-700"
                      >
                        Alternate Number
                      </label>
                      <input
                        type="number"
                        name="phoneNo"
                        maxLength="15"
                        value={editLead.phoneNo}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleContactChange}
                        placeholder="Enter your Alternate Number"
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "E") {
                            e.preventDefault(); // Block 'e' and 'E'
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // Disable scroll
                      />
                    </div>
                    {/* -------------Email------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        <span className="flex gap-1">
                          Email
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editLead.email}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter your Email"
                      />
                    </div>
                  </div>

                  {/* -------------V--1--------------- */}

                  <div className="flex space-x-4">

                    {/* -------------V--2--------------- */}
                    {/* -------------Managed By------------- */}
                    <div className="flex flex-col w-1/2 relative">
                      <label
                        htmlFor="leadesStatus"
                        className="text-sm font-medium text-gray-700"
                      >
                        <span className="flex gap-1">
                          Managed By
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
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
                            ? defaultTextassigned_ToDropDown
                            : editLead.assigned_To}
                          <FaAngleDown className="ml-2 text-gray-400" />
                        </button>
                        {isDropdownassigned_ToDropDown && (
                          <div className="absolute w-full bg-white border border-gray-300 rounded-md top-9.9 z-10 ">
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

                    {/* -------------Country------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="country"
                        className="text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={editLead.country}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter your Country"
                      />
                    </div>
                  </div>



                  {/* -------------VI--1--------------- */}
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
                        placeholder="Enter your State"
                      />
                    </div>
                    {/* -------------VI--2--------------- */}
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
                        placeholder="Enter your City"
                      />
                    </div>
                  </div>

                  {/* -------------VII--1--------------- */}
                  <div className="flex space-x-4">

                    {/* -------------VII--2--------------- */}
                    {/* -------------PinCode------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="postalCode"
                        className="text-sm font-medium text-gray-700"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pinCode"
                        value={editLead.postalCode}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter your pincode"
                      />
                    </div>
                    {/* -------------Lead Source------------- */}

                    <div className="flex flex-col w-1/2 relative">
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
                  </div>
                </div>
                :

                <div className="py-2 px-4 grid gap-2">
                  <div className="flex space-x-4  ">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="clientName"
                        className="text-sm font-medium text-gray-700"
                      >
                        <span className="flex gap-1">
                          Client Name
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        value={editLead.clientName}
                        placeholder="Enter Client's Name"
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    {/* -------------I--2------------- */}
                    {/* -------------Language------------- */}
                    <div className="flex flex-col w-1/2 relative">
                      <label
                        htmlFor="language"
                        className="text-sm font-medium text-gray-700"
                      >
                        Language
                      </label>
                      <div
                        className="relative"
                        onClick={toggleDropdownLanguage}
                        onMouseLeave={() => setisDropdownVisibleLanguage(false)}
                      >
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
                  </div>
                  {/* -------------II--1------------- */}
                  <div className="flex space-x-4">
                    {/* -------------Father's Name------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="fathesName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Father's Name
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={editLead.fatherName}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter Father's Name"
                      />
                    </div>
                    {/* -------------Mother's Name------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="motherName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Mother's Name
                      </label>
                      <input
                        type="text"
                        name="motherName"
                        value={editLead.motherName}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter Mother's Name"
                      />
                    </div>
                  </div>
                  {/* -------------III--1------------- */}
                  {/* -------------Mobile Number------------- */}
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="mobileNo"
                        className="text-sm font-medium text-gray-700"
                      >
                        <span className="flex gap-1">
                          Mobile Number
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
                      </label>
                      <input
                        type="number"
                        name="mobileNo"
                        value={editLead.mobileNo}
                        maxLength="15"
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleContactChange}
                        placeholder="Enter your Mobile Number"
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "E") {
                            e.preventDefault(); // Block 'e' and 'E'
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // Disable scroll

                      />
                    </div>
                    {/* -------------III--2------------- */}
                    {/* -------------Alternate Number------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="phoneNo"
                        className="text-sm font-medium text-gray-700"
                      >
                        Alternate Number
                      </label>
                      <input
                        type="text"
                        name="phoneNo"
                        maxLength="15"
                        value={editLead.phoneNo}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleContactChange}
                        placeholder="Enter your Alternate Number"
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "E") {
                            e.preventDefault(); // Block 'e' and 'E'
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // Disable scroll

                      />
                    </div>
                  </div>

                  {/* -------------IV--1--------------- */}
                  {/* -------------UIDAI Id------------- */}
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="uidaI_Id_No"
                        className="text-sm font-medium text-gray-700"
                      >
                        <span className="flex gap-1">
                          Enter UIDAI Id
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
                      </label>
                      <input
                        type="number"
                        name="uidaI_Id_No"
                        maxLength="12"
                        value={editLead.uidaI_Id_No}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="9009 9009 9009"
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "E") {
                            e.preventDefault(); // Block 'e' and 'E'
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // Disable scroll

                      />
                    </div>
                    {/* -------------IV--2--------------- */}
                    {/* -------------Pan Card No.------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="panCard_No"
                        className="text-sm font-medium text-gray-700"
                      >
                        <span className="flex gap-1">
                          Pan Card No.
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
                      </label>
                      <input
                        type="text"
                        name="panCard_No"
                        value={editLead.panCard_No}
                        className="mt-1 p-2 border border-gray-300 rounded-md uppercase"
                        onChange={handleChange}
                        placeholder="Enter your Pan Card Details"
                      />
                    </div>
                  </div>
                  {/* -------------V--1--------------- */}
                  {/* -------------Email------------- */}
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700"
                      >
                        <span className="flex gap-1">
                          Email
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editLead.email}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter your Email"
                      />
                    </div>
                    {/* -------------V--2--------------- */}
                    {/* -------------Managed By------------- */}
                    <div className="flex flex-col w-1/2 relative">
                      <label
                        htmlFor="leadesStatus"
                        className="text-sm font-medium text-gray-700"
                      >
                        <span className="flex gap-1">
                          Managed By
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
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
                            ? defaultTextassigned_ToDropDown
                            : editLead.assigned_To}
                          <FaAngleDown className="ml-2 text-gray-400" />
                        </button>
                        {isDropdownassigned_ToDropDown && (
                          <div className="absolute w-full bg-white border border-gray-300 rounded-md top-9.9 z-10 ">
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

                  {/* -------------0--1--------------- */}
                  {/* -------------DOB------------- */}
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="dob"
                        className="text-sm font-medium text-gray-700"
                      >
                        DOB
                      </label>
                      <input
                        type="date"
                        name="state"
                        value={editLead.dob}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                      />
                    </div>
                    {/* -------------0--2--------------- */}
                    {/* -------------Country------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="country"
                        className="text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={editLead.country}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter your Country"
                      />
                    </div>
                  </div>

                  {/* -------------VI--1--------------- */}
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
                        placeholder="Enter your State"
                      />
                    </div>
                    {/* -------------VI--2--------------- */}
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
                        placeholder="Enter your City"
                      />
                    </div>
                  </div>

                  {/* -------------VII--1--------------- */}
                  {/* -------------Street------------- */}
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
                    {/* -------------VII--2--------------- */}
                    {/* -------------PinCode------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="postalCode"
                        className="text-sm font-medium text-gray-700"
                      >
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pinCode"
                        value={editLead.postalCode}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter your pincode"
                      />
                    </div>
                  </div>

                  {/* -------------VIII--1--------------- */}
                  <div className="flex space-x-4">
                    {/* -------------Business Type------------- */}
                    <div className="flex flex-col w-1/2 relative">
                      <label
                        htmlFor="businessType"
                        className="text-sm font-medium text-gray-700"
                      >
                        Business Type
                      </label>
                      <div
                        className="relative"
                        onClick={toggleDropdownbusinessType}
                        onMouseLeave={() =>
                          setisDropdownVisiblebusinessType(false)
                        }
                      >
                        <button
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                          id="businessTypeDropDown"
                          type="button"
                        >
                          {isEditMode
                            ? editLead.businessType
                            : defaultTextbusinessTypeDropDown}
                          <FaAngleDown className="ml-2 text-gray-400" />
                        </button>
                        {isDropdownVisiblebusinessType && (
                          <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                            <ul className="py-2 text-sm text-gray-700">
                              {BusinessTypeDropDown.map(({ key, name }) => (
                                <li
                                  key={key}
                                  onClick={() =>
                                    handleDropdownisDropdownVisiblebusinessType(
                                      name
                                    )
                                  }
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
                    {/* -------------VIII--2--------------- */}
                    {/* -------------Advisory Experience------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="advisaryExp"
                        className="text-sm font-medium text-gray-700"
                      >
                        Advisory Experience
                      </label>
                      <input
                        type="text"
                        name="advisaryExp"
                        value={editLead.advisaryExp}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter years"
                      />
                    </div>
                  </div>
                  {/* -------------IX--1--------------- */}
                  {/* -------------Lead Source------------- */}
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2 relative">
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
                  </div>
                </div>
              }


            </div>
            {/* -------------Payment Details INFORMATION STARTS FROM HERE------------- */}

            {business === "Brokerage" ?

              <div className="mx-3 my-3 bg-white rounded-xl shadow-md flex-grow">
                <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                  Payment Details
                </h2>
                <div className="py-2 px-4 grid gap-2">

                  {/* -------------XI--1------------- */}
                  {/* -------------Total Amount------------- */}
                  <div className="flex space-x-4">

                    {/* -------------XI--2------------- */}
                    {/* -------------  Brokerage------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="due_Amount"
                        className="text-sm font-medium text-gray-700"
                      >
                      <span className="flex gap-1">
                      Brokerage
                      <FaStarOfLife size={8} className="text-red-500" />
                    </span>
                      </label>
                      <input
                        type="text"
                        name="due_Amount"
                        value={editLead.due_Amount}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Brokerage"
                      />
                    </div>

                    <div className="flex flex-col w-1/2">
                      <label htmlFor="amount_paid" className="text-sm font-medium text-gray-700">
                      <span className="flex gap-1">
                      Funds
                      <FaStarOfLife size={8} className="text-red-500" />
                    </span>
                      </label>
                      <input
                        type="text"
                        name="amount_paid"
                        id="amount_paid"
                        value={editLead.amount_paid}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Funds"
                      />
                    </div>

                  </div>




                  {/* -------------XIII--1------------- */}
                  {/* -------------Payment Date------------- */}
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="paymentDate"
                        className="text-sm font-medium text-gray-700"
                      >
                        Payment Date
                      </label>
                      <input
                        type="date"
                        name="paymentDate"
                        value={editLead.paymentDate}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                      />
                    </div>
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
                                      checked={editLead.segments?.includes(
                                        segment.segment
                                      )}
                                      onChange={() => handleCheckboxChange(segment)}
                                      className="mr-2"
                                    />
                                    {segment.segment}{' '}
                                    {/* Assuming segment is the property you want to display */}
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


                </div>
              </div>
              :
              <div className="mx-3 my-3 bg-white rounded-xl shadow-md flex-grow">
                <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                  Payment Details
                </h2>
                <div className="py-2 px-4 grid gap-2">
                  {/* -------------IX--1----------------- */}
                  {/* -------------Bank Name------------- */}

                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="bank_name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bank_name"
                        value={editLead.bank_name}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Bank Name"
                      />
                    </div>
                    {/* -------------IX--2----------------- */}
                    {/* -------------Branch Name------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="branch_name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Branch Name
                      </label>
                      <input
                        type="text"
                        name="branch_name"
                        value={editLead.branch_name}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Branch Name"
                      />
                    </div>
                  </div>
                  {/* -------------X--1----------------- */}
                  {/* -------------Payment Mode------------- */}
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="paymenT_MODE"
                        className="text-sm font-medium text-gray-700"
                      >
                        Payment Mode
                      </label>
                      <input
                        type="text"
                        name="paymenT_MODE"
                        value={editLead.paymenT_MODE}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                      />
                    </div>
                    {/* -------------X--2----------------- */}
                    {/* -------------Ref No------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="reference_Number"
                        className="text-sm font-medium text-gray-700"
                      >
                        <span className="flex gap-1">
                          Ref No
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
                      </label>
                      <input
                        type="text"
                        name="reference_Number"
                        value={editLead.reference_Number}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}

                      />
                    </div>
                  </div>


                  {/* -------------XI--1------------- */}
                  {/* -------------Total Amount------------- */}
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="totalAmount"
                        className="text-sm font-medium text-gray-700"
                      >
                        Total Amount

                      </label>
                      <input
                        type="number"
                        name="totalAmount"
                        value={editLead.totalAmount}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Total Amount"
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "E") {
                            e.preventDefault(); // Block 'e' and 'E'
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // Disable scroll
                      />
                    </div>
                    {/* -------------XI--2------------- */}
                    {/* -------------  Due Amount------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="due_Amount"
                        className="text-sm font-medium text-gray-700"
                      >
                        {/* Due Amount */}
                        Due Amount
                      </label>
                      <input
                        type="number"
                        name="due_Amount"
                        value={editLead.due_Amount}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Due Amount"
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "E") {
                            e.preventDefault(); // Block 'e' and 'E'
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // Disable scroll
                      />
                    </div>
                  </div>
                  {/* -------------XII--1------------- */}
                  <div className="flex space-x-4">

                    <div className="flex flex-col w-1/2">
                      <label htmlFor="amount_paid" className="text-sm font-medium text-gray-700">
                        <span className="flex gap-1">
                          Amount Paid
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
                      </label>
                      <input
                        type="number"
                        name="amount_paid"
                        id="amount_paid"
                        value={editLead.amount_paid}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Amount Paid"
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "E") {
                            e.preventDefault(); // Block 'e' and 'E'
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // Disable scroll
                      />
                    </div>



                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="discount"
                        className="text-sm font-medium text-gray-700"
                      >
                        Discount
                      </label>
                      <input
                        type="number"
                        name="discount"
                        id="discount"
                        value={editLead.discount}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Discount"
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "E") {
                            e.preventDefault(); // Block 'e' and 'E'
                          }
                        }}
                        onWheel={(e) => e.target.blur()} // Disable scroll
                      />
                    </div>

                  </div>



                  {/* -------------XIII--1------------- */}
                  {/* -------------Payment Date------------- */}
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="paymentDate"
                        className="text-sm font-medium text-gray-700"
                      >
                        <span className="flex gap-1">
                          Payment Date
                          <FaStarOfLife size={8} className="text-red-500" />
                        </span>
                      </label>
                      <input
                        type="date"
                        name="paymentDate"
                        value={editLead.paymentDate}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                      />
                    </div>
                    {/* -------------XIII--2------------- */}
                    {/* -------------Cheque No Or DD No.------------- */}


                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="chequeOrDD_no"
                        className="text-sm font-medium text-gray-700"
                      >
                        Cheque No Or DD No.
                      </label>
                      <input
                        type="text"
                        name="chequeOrDD_no"
                        value={editLead.chequeOrDD_no}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Cheque No Or DD No"
                      />
                    </div>

                  </div>

                  {/* -------------XIV--1------------- */}
                  <div className="flex space-x-4">
                    {/* -------------Product-------------> Means Segments */}
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
                                      checked={editLead.segments?.includes(
                                        segment.segment
                                      )}
                                      onChange={() => handleCheckboxChange(segment)}
                                      className="mr-2"
                                    />
                                    {segment.segment}{' '}
                                    {/* Assuming segment is the property you want to display */}
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
                    {/* -------------XIV--2------------- */}
                    {/* -------------Sales Order No------------- */}

                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="saleS_ODR_NO"
                        className="text-sm font-medium text-gray-700"
                      >
                        Sales Order No
                      </label>
                      <input
                        type="text"
                        name="saleS_ODR_NO"
                        value={editLead.saleS_ODR_NO}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                      />
                    </div>

                  </div>
                </div>
              </div>
            }

            {/* -------------SALES ORDER INFORMATION STARTS FROM HERE------------- */}
            <div className="mx-3 my-3 bg-white rounded-xl shadow-md flex-grow">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Service Details
              </h2>
              <div className="py-2 px-4 grid gap-2">
                {/* -------------SALES ORDER INFORMATION FORM STARTS FROM HERE------------- */}
                {/* -------------XV--1------------- */}
                {/* -------------period_of_Subscription------------- */}
                {business === "Brokerage" ?
                  "" :
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="period_of_Subscription"
                        className="text-sm font-medium text-gray-700"
                      >
                        Period of Subscription
                      </label>
                      <input
                        type="text"
                        name="period_of_Subscription"
                        value={editLead.period_of_Subscription}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Period of Subscription"
                      />
                    </div>
                    {/* -------------Select Term------------- */}
                    {/* -------------XV--2------------- */}
                    <div className="flex flex-col w-1/2 relative">
                      <label
                        htmlFor="term"
                        className="text-sm font-medium text-gray-700"
                      >
                        Term
                      </label>
                      <div
                        className="relative"
                        onClick={toggleDropdown_Term_}
                        onMouseLeave={() => setisDropdownVisible_Term_(false)}
                      >
                        <button
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                          id="termDropDown"
                          type="button"
                        >
                          {isEditMode ? editLead.term : defaultText_Term_DropDown}
                          <FaAngleDown className="ml-2 text-gray-400" />
                        </button>
                        {isDropdownVisible_Term_ && (
                          <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                            <ul className="py-2 text-sm text-gray-700">
                              {Term_DropDown.map(({ key, name }) => (
                                <li
                                  key={key}
                                  onClick={() =>
                                    handleDropdownisDropdown_Term_(name)
                                  }
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
                }


                {/* -------------XVI--1------------- */}
                {/* -------------Subscription Start Date------------- */}
                {business === "Brokerage" ?
                  "" :
                  <div className="flex space-x-4">
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="subscription_start_date"
                        className="text-sm font-medium text-gray-700"
                      >
                        Subscription Start Date
                      </label>
                      <input
                        type="date"
                        name="subscription_start_date"
                        value={editLead.subscription_start_date}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                      />
                    </div>
                    {/* -------------XVI--2------------- */}
                    {/* -------------subscription_end_date------------- */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="subscription_end_date"
                        className="text-sm font-medium text-gray-700"
                      >
                        Subscription End Date
                      </label>
                      <input
                        type="date"
                        name="subscription_end_date"
                        value={editLead.subscription_end_date}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                }

                {/* -------------XVII--1------------- */}
                <div className="flex space-x-4">
                  {/* -------------Service------------- */} {/* sms , wp,  */}
                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor="service"
                      className="text-sm font-medium text-gray-700"
                    >
                      Service
                    </label>
                    <div
                      className="relative"
                      onClick={toggleDropdown_Service_}
                      onMouseLeave={() => setisDropdownVisible_Service_(false)}
                    >
                      <button
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="serviceDropDown"
                        type="button"
                      >
                        {isEditMode
                          ? editLead.service
                          : defaultText_Service_DropDown}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isDropdownVisible_Service_ && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {Service_DropDown.map(({ key, name }) => (
                              <li
                                key={key}
                                onClick={() =>
                                  handleDropdownisDropdown_Service_(name)
                                }
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
                  {/* -------------XVII--2------------- */}
                  {/* -------------Status------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="status"
                      className="text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <input
                      readOnly
                      type="text"
                      name="status"
                      value="Pending"
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  {/* -------------Service------------- */} {/* sms , wp,  */}
                  {/* -------------Remark------------- */}
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="remarks"
                      className="text-sm font-medium text-gray-700"
                    >
                      Remarks
                    </label>
                    <input
                      type="text"
                      name="remarks"
                      value={editLead.remarks}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/*--------------------------Description Box-------------------------- */}
            <div className="mx-3 bg-white rounded-xl shadow-md ">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Description Information
              </h2>
              <div className="px-2 py-4 grid gap-2">
                <div className="flex flex-col ">
                  <label
                    htmlFor="remarks"
                    className="text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <ReactQuill
                    name="remarks"
                    value={description}
                    className=" text-balance hyphens-auto  max-h-60 h-60"
                    theme="snow"
                    onChange={setdescription}
                    placeholder="Add Description"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-5 mb-6">
                <div className="flex justify-end mr-5">
                  <button
                    type="submit"
                    className="px-32 py-4 mt-20 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form >
      </div >
    </>
  );
}