import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

export default function Permissions() {
  const [permissionData, setPermissionData] = useState({
    groupName: '',
    moduleName: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  //   ON SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // ON CHANGE
  const onChange = (e) => {
    const { name, value } = e.target;
    setPermissionData({
      ...permissionData,
      [name]: value,
    });
  };

  //   DROPDOWNS HERE
  const [dropdownGroupName, setDropdownGroupName] = useState(false);
  const [defaultGroupNameText, setDefaultGroupNameText] =
    useState('Group Name');
  const [dropdownGroupModule, setDropdownGroupModule] = useState(false);
  const [defaultGroupModuleText, setDefaultGroupModuleText] =
    useState('Group Module Name');

  //   TOGGLE DROPDOWN GROUPNAME
  const toggleDropdownGroupName = () => {
    setDropdownGroupName(!dropdownGroupName);
  };

  // HANDLE DROPDOWN GROUPNAME
  const handleDropdownGroupName = (name) => {
    setDefaultGroupNameText(name);
    setDropdownGroupName(!dropdownGroupName);
    setPermissionData((prev) => ({
      ...prev,
      name: name,
    }));
  };

  //   DUMMY DATA
  const groupName = [
    { id: 1, name: 'Group Name' },
    { id: 2, name: 'Group Name' },
    { id: 3, name: 'Group Name' },
  ];

  //   TOGGLE DROPDOWN GROUPNAME
  const toggleDropdownGroupModule = () => {
    setDropdownGroupModule(!dropdownGroupModule);
  };

  // HANDLE DROPDOWN GROUPNAME
  const handleDropdownGroupModule = (name) => {
    setDefaultGroupModuleText(name);
    setDropdownGroupModule(!dropdownGroupModule);
    setPermissionData((prev) => ({
      ...prev,
      name: name,
    }));
  };

  //   DUMMY DATA
  const groupModuleName = [
    { id: 1, name: 'Group Module Name' },
    { id: 2, name: 'Group Module Name' },
    { id: 3, name: 'Group Module Name' },
  ];

  return (
    <div className="flex min-h-screen flex-col m-3 overflow-x-auto overflow-y-hidden">
      <div className="flex py-1 px-2 items-center justify-between">
        <h1 className="text-3xl">Roles & Permissions</h1>
      </div>
      {/*  */}
      <div className="overflow-hidden shadow-md">
        <div className="py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
          <h1 className="text-white">Add Roles & Permissions</h1>
        </div>
        {/* ----------- FORMS START FROM HERE ----------- */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col min-h-screen py-2 px-4 bg-white rounded-b-xl">
            <div className="flex gap-4">
              <div className="grid gap-2 pb-3 w-full">
                {/* ------ FIRST ONE -------- */}
                <div className="flex space-x-4">
                  {/* ---------- MODULE NAME DROPDOWN ---------- */}
                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor="groupName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Group Name
                    </label>
                    <div
                      className="relative"
                      onClick={toggleDropdownGroupName}
                      onMouseLeave={() => setDropdownGroupName(false)}
                    >
                      <button
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="groupName"
                        type="button"
                      >
                        {isEditMode ? groupName : defaultGroupNameText}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {dropdownGroupName && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {groupName.map(({ id, name }) => (
                              <li
                                key={id}
                                onClick={() => handleDropdownGroupName(name)}
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
                  {/* ---------- MODULE NAME DROPDOWN ---------- */}
                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor="groupName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Group Module Name
                    </label>
                    <div
                      className="relative"
                      onClick={toggleDropdownGroupModule}
                      onMouseLeave={() => setDefaultGroupModuleText(false)}
                    >
                      <button
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="groupName"
                        type="button"
                      >
                        {isEditMode ? groupModuleName : defaultGroupModuleText}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {dropdownGroupModule && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                          <ul className="py-2 text-sm text-gray-700">
                            {groupModuleName.map(({ id, name }) => (
                              <li
                                key={id}
                                onClick={() => handleDropdownGroupModule(name)}
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
                {/* ---------- CHECK BOXES ---------- */}
                <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                  <h1 className="font-normal mb-2 text-xl">Leads</h1>
                  {/* ---------- LEAD BOXES ---------- */}
                  <div className="flex gap-12">
                    {/* FIRST */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Create</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Upload</p>
                      </div>
                      {/* THIRD ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Lead Action</p>
                      </div>
                      {/* FOURTH ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Delete</p>
                      </div>
                    </div>
                    {/* SECOND */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>View</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Internal Assign</p>
                      </div>
                      {/* THIRD ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Lead Action Assign</p>
                      </div>
                    </div>
                    {/* THIRD */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Marketing Leads</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Outer Assign</p>
                      </div>
                      {/* THIRD ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Send Email Template</p>
                      </div>
                    </div>
                    {/* FOURTH */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Edit</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Global Assign</p>
                      </div>
                      {/* THIRD ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Send Email Template</p>
                      </div>
                    </div>
                    {/* FIFTH */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Dispose</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>View Follow Up</p>
                      </div>
                      {/* THIRD ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Follow Assign</p>
                      </div>
                    </div>
                    {/* SIXTH */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Dispose Clients</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Bulk Lead Operation</p>
                      </div>
                      {/* THIRD ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Refund Payment</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* --------- CONTACT --------- */}
                <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                  <h1 className="font-normal mb-2 text-xl">Contact</h1>
                  {/* CONTACT CHECKBOXES */}
                  <div className="flex items-center gap-10">
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Create</p>
                    </div>
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>View</p>
                    </div>
                    {/* THIRD */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Contact Assign</p>
                    </div>
                    {/* FOURTH */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Contact Action</p>
                    </div>
                    {/* FIFTH */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Contact Action Assign</p>
                    </div>
                  </div>
                </div>
                {/* --------- MUTUAL FUND --------- */}
                <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                  <h1 className="font-normal mb-2 text-xl">Mutual Fund</h1>
                  {/* CONTACT CHECKBOXES */}
                  <div className="flex items-center gap-10">
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Create</p>
                    </div>
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>View</p>
                    </div>
                    {/* THIRD */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Mutual Fund Assign</p>
                    </div>
                    {/* FOURTH */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Mutual Fund Action</p>
                    </div>
                    {/* FIFTH */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Mutual Fund Action Assign</p>
                    </div>
                  </div>
                </div>
                {/* --------- SO --------- */}
                <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                  <h1 className="font-normal mb-2 text-xl">SO</h1>
                  {/* ---------- LEAD BOXES ---------- */}
                  <div className="flex gap-12">
                    {/* FIRST */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Create</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Stop</p>
                      </div>
                    </div>
                    {/* SECOND */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>View</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Paid Client Assign</p>
                      </div>
                    </div>
                    {/* THIRD */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Edit</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Paid Client Action</p>
                      </div>
                    </div>
                    {/* FOURTH */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Approve SO</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Paid Client Action Assign</p>
                      </div>
                    </div>
                    {/* FIFTH */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Payment Portal</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Payment Edit</p>
                      </div>
                    </div>
                    {/* SIXTH */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Payment Approval</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Delete</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* --------- COMPLIANCE --------- */}
                <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                  <h1 className="font-normal mb-2 text-xl">Compliance</h1>
                  {/* ---------- LEAD BOXES ---------- */}
                  <div className="flex gap-14">
                    {/* FIRST */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>KYC</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>SO Report</p>
                      </div>
                    </div>
                    {/* SECOND */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Risk Profile</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Tax Report</p>
                      </div>
                    </div>
                    {/* THIRD */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Agreement Approved</p>
                      </div>
                      {/* SECOND ITEM */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Paid Client Action</p>
                      </div>
                    </div>
                    {/* FOURTH */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>View RPM</p>
                      </div>
                    </div>
                    {/* FIFTH */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Edit RPM</p>
                      </div>
                    </div>
                    {/* SIXTH */}
                    <div className="flex flex-col gap-3">
                      {/* FIRST ROW */}
                      <div className="flex gap-3 items-center font-light">
                        <input type="checkbox" />
                        <p className='text-sm font-md'>Invoice</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* --------- ATTENDANCE --------- */}
                <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                  <h1 className="font-normal mb-2 text-xl">Attendance</h1>
                  {/* CONTACT CHECKBOXES */}
                  <div className="flex items-center gap-12">
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>View</p>
                    </div>
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Regularization</p>
                    </div>
                    {/* THIRD */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p>Manager Approval</p>
                    </div>
                    {/* FOURTH */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>HR Approval</p>
                    </div>
                  </div>
                </div>
                {/* --------- PAY ROLL --------- */}
                <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                  <h1 className="font-normal mb-2 text-xl">Pay Roll</h1>
                  {/* CONTACT CHECKBOXES */}
                  <div className="flex items-center gap-12">
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>View Salary</p>
                    </div>
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Calculate Salary</p>
                    </div>
                  </div>
                </div>
                {/* --------- HR EXTRA --------- */}
                <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                  <h1 className="font-normal mb-2 text-xl">HR Extra</h1>
                  {/* CONTACT CHECKBOXES */}
                  <div className="flex items-center gap-8">
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>ORG Chart</p>
                    </div>
                    {/* SECOND */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Scrap Book</p>
                    </div>
                    {/* THIRD */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Holiday</p>
                    </div>
                  </div>
                </div>
                {/* --------- SMS MODULE --------- */}
                <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                  <h1 className="font-normal mb-2 text-xl">SMS Module</h1>
                  {/* CONTACT CHECKBOXES */}
                  <div className="flex items-center gap-8">
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Send SMS</p>
                    </div>
                    {/* SECOND */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>View SMS</p>
                    </div>
                  </div>
                </div>
                {/* --------- LEAVE --------- */}
                <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                  <h1 className="font-normal mb-2 text-xl">Leave</h1>
                  {/* CONTACT CHECKBOXES */}
                  <div className="flex items-center gap-8">
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Leave Balance</p>
                    </div>
                    {/* SECOND */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Leave Application</p>
                    </div>
                    {/* THIRD */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>View Leaves</p>
                    </div>
                  </div>
                </div>
                {/* --------- CALLING MODULE --------- */}
                <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                  <h1 className="font-normal mb-2 text-xl">Calling Module</h1>
                  {/* CONTACT CHECKBOXES */}
                  <div className="flex items-center gap-8">
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Monitoring</p>
                    </div>
                    {/* SECOND */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Reports</p>
                    </div>
                    {/* THIRD */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Send SMS Via Gateway</p>
                    </div>
                    {/* FOURTH */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>View SMS Via Gateway</p>
                    </div>
                    {/* FIFTH */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Miss Call</p>
                    </div>
                    {/* SIXTH */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Live Call</p>
                    </div>
                    {/* SEVENTH */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Call Blasting</p>
                    </div>
                  </div>
                </div>
                {/* --------- TEAM MEMBERS --------- */}
                <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2">
                  <h1 className="font-normal mb-2 text-xl">Team Members</h1>
                  {/* CONTACT CHECKBOXES */}
                  <div className="flex items-center gap-8">
                    {/* FIRST */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>List</p>
                    </div>
                    {/* SECOND */}
                    <div className="flex gap-3 items-center font-light">
                      <input type="checkbox" />
                      <p className='text-sm font-md'>Data</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* BUTTONS */}
            <div className="flex justify-end px-2 gap-2">
              <button
                type="submit"
                className="px-10 py-4 mt-20 mb-3 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white w-max"
              >
                Submit
              </button>
              <button
                type="submit"
                className="px-10 py-4 mt-20 mb-3 bg-transparent text-cyan-500 border-2 border-cyan-500 rounded hover:bg-cyan-500 hover:text-white w-max"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}