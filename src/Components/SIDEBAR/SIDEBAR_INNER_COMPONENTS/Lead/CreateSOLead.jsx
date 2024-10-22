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
import { getHostnamePart } from '../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl';

export default function CreateSO() {
  //to make id unique
  const { id, leadId } = useParams();
  const navigate = useNavigate();

  //form description is kept-out
  const [description, setdescription] = useState('Add Text Here');
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
  }, [id]);

  //GET by ID---------------------------//GET---------------------------//GET---------------------------by ID-----------by ID
  async function handleLeadbyId() {
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

      seteditLead({
        //Personal Details
        leadId: data.id || '',
        clientName: data.name || '',
        language: data.language || '',
        mobileNo: data.mobileNo || '',
        phoneNo: data.phoneNo || '',
        email: data.email || '',
        assigned_To: data.assigned_To || '',
        street: data.street || '',
        postalCode: data.postalCode || '',
        country: data.country || '',
        city: data.city || '',
        state: data.state || '',
        advisaryExp: data.advisaryExp || '',

        //Payment Details
        segments: data.segments || [],

        //Service Details
        subscription_start_date: data.trialStartDate.split('T')[0] || null,
        subscription_end_date: data.trialEndDate.split('T')[0] || null,
      });
      //Description Information
      setdescription(data.description);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  }

  //----------------------------------------------------------------------------------------
  //SEGMENETS API Is being used here

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
    useState('Select Product');
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
  //assigned_ToDropDown  Is being used here
  const [assigned_ToDropDown, setassigned_ToDropDown] = useState({});

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
      setassigned_ToDropDown(response.data.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
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

  //----------------------------------------------------------------------------------------
  //Service
  const Service_DropDown = [
    { key: 1, name: 'SMS' },
    { key: 3, name: 'Call' },
    { key: 2, name: "What's App" },
  ];

  const [defaultText_Service_DropDown, setDefaultText_Service_DropDown] =
    useState('Select Service');

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
    { key: 1, name: 'Monthly' },
    { key: 2, name: 'Quartely' },
    { key: 3, name: 'Half Yearly' },
    { key: 4, name: 'Yearly' },
  ];

  const [defaultText_Term_DropDown, setDefaultText_Term_DropDown] =
    useState('Select Term');

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
    { key: 1, name: 'IT' },
    { key: 2, name: 'eCommerce' },
    { key: 3, name: 'Marketing' },
    { key: 4, name: 'Hospitality' },
  ];

  const [defaultTextbusinessTypeDropDown, setDefaultTextbusinessTypeDropDown] =
    useState('Select Business Type');

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
      console.log("status:", response.data.data);
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
    // console.log("@@@===",isPoolDropdownOpen);
  };

  const handleDropdownSelection = (poolName) => {
    setIsPoolDropdownOpen(false);
    setDefaultTextPool(poolName);
    console.log("@@@===", isPoolDropdownOpen);
    seteditLead((prev) => ({
      ...prev,
      leadSource: poolName,
    }));
    setPoolEdit(poolName);
  };


  //---------->handleSubmit<----------
  //two different models one for PUT and one for POST
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
      const formData_PUT = {};
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
        dob : editLead.dob,
        country : editLead.country,
        business: editLead.business|| "",
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
          `${protocal_url}${name}.${tenant_base_url}/SalesOrder/salesOrder/add`,
          formData_POST,
          config
        );
        console.log(formData_POST);
        alert('Sales Order created successfully!');
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
              to="/sidebar/lead"
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
              <div className="py-2 px-4">
                <div className="flex space-x-4  ">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="clientName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Client Name
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
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="mobileNo"
                      value={editLead.mobileNo}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Mobile Number"
                    />
                  </div>
                  {/* -------------III--2------------- */}
                  {/* -------------Phone Number------------- */}
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
                      value={editLead.phoneNo}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Phone Number"
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
                      Enter UIDAI Id
                    </label>
                    <input
                      type="number"
                      name="uidaI_Id_No"
                      value={editLead.uidaI_Id_No}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="9009 9009 9009"
                    />
                  </div>
                  {/* -------------IV--2--------------- */}
                  {/* -------------Pan Card No.------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="panCard_No"
                      className="text-sm font-medium text-gray-700"
                    >
                      Pan Card No.
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
                  {/* -------------V--2--------------- */}
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
                        {poolEdit ===""
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
            </div>
            {/* -------------Payment Details INFORMATION STARTS FROM HERE------------- */}
            <div className="mx-3 my-3 bg-white rounded-xl shadow-md flex-grow">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Payment Details
              </h2>
              <div className="py-2 px-4">
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
                      Ref No
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
                    />
                  </div>
                  {/* -------------XI--2------------- */}
                  {/* -------------  Due Amount------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="due_Amount"
                      className="text-sm font-medium text-gray-700"
                    >
                      Due Amount
                    </label>
                    <input
                      type="text"
                      name="due_Amount"
                      value={editLead.due_Amount}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Due Amount"
                    />
                  </div>
                </div>
                {/* -------------XII--1------------- */}
                {/* -------------Amount Paid------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="amount_paid"
                      className="text-sm font-medium text-gray-700"
                    >
                      Amount Paid
                    </label>
                    <input
                      type="text"
                      name="amount_paid"
                      value={editLead.amount_paid}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Amount Paid"
                    />
                  </div>
                  {/* -------------XII--2------------- */}
                  {/* -------------Discount------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="discount"
                      className="text-sm font-medium text-gray-700"
                    >
                      Discount
                    </label>
                    <input
                      type="text"
                      name="discount"
                      value={editLead.discount}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Discount"
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
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="segment"
                      className="text-sm font-medium text-gray-700"
                    >
                      Product
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
                                  checked={editLead.segments.includes(
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
                      type="number"
                      name="saleS_ODR_NO"
                      value={editLead.saleS_ODR_NO}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* -------------SALES ORDER INFORMATION STARTS FROM HERE------------- */}
            <div className="mx-3 my-3 bg-white rounded-xl shadow-md flex-grow">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Service Details
              </h2>
              <div className="py-2 px-4">
                {/* -------------SALES ORDER INFORMATION FORM STARTS FROM HERE------------- */}
                {/* -------------XV--1------------- */}
                {/* -------------period_of_Subscription------------- */}
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

                {/* -------------XVI--1------------- */}
                {/* -------------Subscription Start Date------------- */}
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
                      type="test"
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
              <div className="px-2 py-4 ">
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
                    className=" text-balance hyphens-auto max-w-5xl  max-h-60 h-60"
                    theme="snow"
                    onChange={setdescription}
                    placeholder="Add Description"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-5 mr-10">
                <div className="flex justify-end mr-20">
                  <button
                    type="submit"
                    className="px-32 py-4 mt-20 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
                  >
                    {isEditMode ? 'Update' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}