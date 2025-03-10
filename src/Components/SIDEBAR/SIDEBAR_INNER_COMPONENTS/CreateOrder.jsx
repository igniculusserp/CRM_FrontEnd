import { useState,useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreateOrder = () => {
     //--------------------------------------- Set Business Type --------------------------------------------
     const [BusinessType, setBusinessType] = useState("");
      
     useEffect(() => {
       const storedType = localStorage.getItem("businessType") || "";
       setBusinessType(storedType);
     }, []);

  const [ordersData, setOrdersData] = useState({
    clientName: "",
    alternateNumber: "",
    leadSource: "",
    clientId: "",
    managerName: "",
    segment: "",
    pan: "",
    city: "",
    number: "",
    assignedTo: "",
    invoiceId: "",
    createdDate: "",
    ftCreatedDate: "",
    dob: "",
    email: "",
  });
  const [leadSourceDropdown, setLeadSourceDropdown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [defaultLeadSourceDropDownText, setDefaultLeadSourceDropDownText] =
    useState("Lead Source");
  const [assignedToDropdown, setAssignedToDropdown] = useState(false);
  const [defaultAssignedToText, setDefaultAssignedToText] =
    useState("Assigned To");
  const [defaultInvoiceIdText, setDefaultInvoiceIdText] =
    useState("Invoice ID");
  const [invoiceIdDropdown, setInvoiceIdDropdown] = useState(false);

  // EDIT CONTACT
  const [editOrder, setEditOrder] = useState({
    id: "",
    clientName: "",
    alternateNumber: "",
    leadSource: "",
    clientId: "",
    managerName: "",
    segment: "",
    pan: "",
    city: "",
    number: "",
    assignedTo: "",
    invoiceId: "",
    createdDate: "",
    ftCreatedDate: "",
    dob: "",
    email: "",
  });

  //   HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrdersData({
      ...ordersData,
      [name]: value,
    });
  };

  //   HANDLING FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(ordersData);
  };

  //   TOGGLE LEADSOURCE DROPDOWN
  const toggleLeadSourceDropdown = () => {
    setLeadSourceDropdown(!leadSourceDropdown);
    console.log("Clickg");
  };

  // HANDLE DROPDOWN FOR LEAD SOURCE
  const handleDropdownLeadSource = (leadSource) => {
    setDefaultLeadSourceDropDownText(leadSource);
    setLeadSourceDropdown(!leadSourceDropdown);
    setEditOrder((prevTask) => ({
      ...prevTask,
      leadSource: leadSource,
    }));
  };

  //   TOGGLE ASSIGNEDTO DROPDOWN
  const toggleDropdownAssignedTo = () => {
    setAssignedToDropdown(!assignedToDropdown);
  };

  // HANDLE DROPDOWN FOR LEAD SOURCE
  const handleDropdownAssignedTo = (assignedTo) => {
    setDefaultLeadSourceDropDownText(assignedTo);
    setLeadSourceDropdown(!leadSourceDropdown);
    setEditOrder((prevTask) => ({
      ...prevTask,
      assignedTo: assignedTo,
    }));
  };

  // HANDLE DROPDOWN FOR INVOICEID
  const handleDropdownInvoiceId = (invoice) => {
    setDefaultInvoiceIdText(invoice);
    setInvoiceIdDropdown(!leadSourceDropdown);
    setEditOrder((prevTask) => ({
      ...prevTask,
      invoice: invoice,
    }));
  };

  //   TOGGLE INVOICEID DROPDOWN
  const toggleInvoiceDropdown = () => {
    setInvoiceIdDropdown(!invoiceIdDropdown);
  };

  // LeadSource DATA
  const leadSource = [
    { key: 1, name: "Staff" },
    { key: 2, name: "Manager" },
    { key: 3, name: "Company" },
    { key: 4, name: "Employee" },
  ];

  // assigned_ToDropDown DATA
  const assignedData = [
    { key: 1, name: "Staff" },
    { key: 2, name: "Manager" },
    { key: 3, name: "Company" },
    { key: 4, name: "Employee" },
  ];

  // INVOICEID DATA
  const invoiceData = [
    { id: 1, name: 228 },
    { id: 2, name: 8899 },
    { id: 3, name: 1144 },
    { id: 4, name: 2465 },
  ];

  return (
    <div className="">
      {/* TOP PART */}
      <div className="m-3 flex items-center justify-between rounded-md bg-white px-3 py-4">
        <h1 className="text-xl font-bold">Create Sales Oreder</h1>
        <Link to={`/panel/${BusinessType}/salesorder`}>
          <button className="rounded-md border border-blue-600 px-6 py-2 text-center text-sm text-blue-600">
            Cancel
          </button>
        </Link>
      </div>
      {/* SECOND PART */}
      <div className="m-3">
        <h1 className="text-md rounded-t-lg bg-cyan-500 px-6 py-3 font-bold text-white">
          Sales Order Details
        </h1>
        <form className="bg-white px-6 py-6" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            {/* LEFT */}
            <div className="flex flex-1 flex-col">
              {/* CLIENT NAME FIELD */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                Client Name
              </label>
              <input
                type="text"
                placeholder="SMS"
                className="mt-1 rounded-md border border-gray-300 p-2"
                name="clientName"
                value={FormData.clientName}
                onChange={handleChange}
              />
              {/* ALTER NUMBER FIELD */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                Alternate Number
              </label>
              <input
                type="number"
                placeholder="Entrez votre prenom"
                className="mt-1 rounded-md border border-gray-300 p-2"
                name="alternateNumber"
                value={FormData.alternateNumber}
                onChange={handleChange}
              />
              {/* LEAD SOURCE DROPDOWN */}
              <label
                htmlFor="leadSource"
                className="text-sm font-medium text-gray-700"
              >
                Lead Source
              </label>
              <div
                className="relative"
                onClick={toggleLeadSourceDropdown}
                onMouseLeave={() => setLeadSourceDropdown(false)}
              >
                <button
                  className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                  id="LeadStatusDropDown"
                  type="button"
                >
                  {isEditMode
                    ? editOrder.leadSource
                    : defaultLeadSourceDropDownText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {leadSourceDropdown && (
                  <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                    <ul className="py-2 text-sm text-gray-700">
                      {leadSource.map((lead) => (
                        <li
                          key={lead.key}
                          onClick={() => handleDropdownLeadSource(lead.name)}
                          className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                        >
                          {lead.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* CLIENT ID FIELD */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                Client ID
              </label>
              <input
                type="number"
                placeholder="Entrez votre prenom"
                className="mt-1 rounded-md border border-gray-300 p-2"
                name="clientId"
                value={FormData.clientId}
                onChange={handleChange}
              />
              {/* MANAGER NAME FIELD */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                Manager Name
              </label>
              <input
                type="text"
                placeholder="Entrez votre prenom"
                className="mt-1 rounded-md border border-gray-300 p-2"
                name="managerName"
                value={FormData.managerName}
                onChange={handleChange}
              />
              {/* SEGMENT FIELD */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                Segment
              </label>
              <input
                type="text"
                placeholder="Entrez votre prenom"
                className="mt-1 rounded-md border border-gray-300 p-2"
                name="segment"
                value={FormData.segment}
                onChange={handleChange}
              />
              {/* PAN FIELD */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                Pan
              </label>
              <input
                type="text"
                placeholder="Entrez votre prenom"
                className="mt-1 rounded-md border border-gray-300 p-2"
                name="pan"
                value={FormData.pan}
                onChange={handleChange}
              />
              {/* CITY FIELD */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                placeholder="Entrez votre prenom"
                className="mt-1 rounded-md border border-gray-300 p-2"
                name="city"
                value={FormData.city}
                onChange={handleChange}
              />
            </div>
            {/* RIGHT */}
            <div className="flex flex-1 flex-col">
              {/* NUMBER FIELD */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                Number
              </label>
              <input
                type="number"
                placeholder="Entrez votre prenom"
                className="mt-1 rounded-md border border-gray-300 p-2"
                name="number"
                value={FormData.number}
                onChange={handleChange}
              />
              {/* ASSIGNED TO DROPDOWN */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                Assigned To
              </label>
              <div
                className="relative"
                onClick={toggleDropdownAssignedTo}
                onMouseLeave={() => setAssignedToDropdown(false)}
              >
                <button
                  className="mt-1 flex w-full items-center justify-between border border-gray-300 p-2"
                  id="LeadStatusDropDown"
                  type="button"
                >
                  {isEditMode ? editOrder.assignedTo : defaultAssignedToText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {assignedToDropdown && (
                  <div className="absolute top-10 z-10 w-full rounded-md border border-gray-300 bg-white">
                    <ul className="py-2 text-sm text-gray-700">
                      {assignedData.map((assign) => (
                        <li
                          className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                          key={assign.key}
                          onClick={() => handleDropdownAssignedTo(assign)}
                        >
                          {assign.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* INVOICE ID DROPDOWN */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                Invoice Id
              </label>
              <div
                className="relative"
                onClick={toggleInvoiceDropdown}
                onMouseLeave={() => setInvoiceIdDropdown(false)}
              >
                <button
                  className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                  id="LeadStatusDropDown"
                  type="button"
                >
                  {isEditMode ? editOrder.invoiceId : defaultInvoiceIdText}
                  <FaAngleDown className="ml-2 text-gray-400" />
                </button>
                {invoiceIdDropdown && (
                  <div className="absolute top-10 z-10 w-full rounded-md bg-white">
                    <ul className="py-2 text-sm text-gray-700">
                      {invoiceData.map((invoice) => (
                        <li
                          className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                          key={invoice.id}
                          onClick={() => handleDropdownInvoiceId(invoice.name)}
                        >
                          {invoice.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* CREATED DATE FIELD */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                Created Date
              </label>
              <input
                type="date"
                placeholder="Entrez votre prenom"
                className="mt-1 rounded-md border border-gray-300 p-2"
                name="createdDate"
                value={FormData.createdDate}
                onChange={handleChange}
              />
              {/* FT CREATED DATE FIELD */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                Ft Created Date
              </label>
              <input
                type="date"
                placeholder="Entrez votre prenom"
                className="mt-1 rounded-md border border-gray-300 p-2"
                name="ftCreatedDate"
                value={FormData.ftCreatedDate}
                onChange={handleChange}
              />
              {/* DOB FIELD */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                DOB
              </label>
              <input
                type="date"
                placeholder="Entrez votre prenom"
                className="mt-1 rounded-md border border-gray-300 p-2"
                name="dob"
                value={FormData.dob}
                onChange={handleChange}
              />
              {/* EMAIL FIELD */}
              <label
                htmlFor="clentName"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="Entrez votre prenom"
                className="mt-1 rounded-md border border-gray-300 p-2"
                name="email"
                value={FormData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* RIGHT END */}
          {/* BUTTONS */}
          <div className="mr-20 flex items-center justify-end gap-4 px-2 py-10">
            <button className="mb-4 mt-40 rounded border-2 border-cyan-500 bg-white px-32 py-4">
              Save and New
            </button>
            <button className="mb-4 mt-40 rounded border-2 border-cyan-500 bg-cyan-500 px-32 py-4 text-white hover:bg-white hover:text-cyan-500">
              Save
            </button>
          </div>
          {/* BUTTONS END */}
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
