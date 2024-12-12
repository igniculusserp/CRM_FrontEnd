//react
import { useState, useEffect } from "react";
//reactIcon
import { FaAngleDown } from "react-icons/fa";

//external Packages
import axios from "axios";
import PropTypes from 'prop-types';
import "react-quill/dist/quill.snow.css";

import { IoInformationCircle } from "react-icons/io5";
//file
import { tenant_base_url, protocal_url } from "../../../../../../Config/config";
import { getHostnamePart } from "../../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";
import { showSuccessToast, showErrorToast } from "../../../../../../utils/toastNotifications";

export default function AddExpense({ setActive, setShowTopSection }) {

  //name for url
  const name = getHostnamePart();
  
  //date for passing by default date in an option
  const today = new Date().toISOString().split('T')[0];

  const [finance, setFinance] = useState({
    headName: "",
    date: "",
    amount: "",
    refaranceNo: "",
    remarks: "",
    lastmodifiedby: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinance((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

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
        headName: finance.headName,
        amount: finance.amount,
        date: finance?.date || today,
        refaranceNo: finance.refaranceNo,
        remarks: finance.remarks,
        lastmodifiedby: null,
      };

     

      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/expensedetail/add`,
        formData_POST,
        config
      );
      if (response.data.isSuccess) {
        showSuccessToast("Expense added successfully!");
        setActive(true);
      }
      // Redirect after a short delay
    } catch (error) {
      console.log(error);
      showErrorToast('failed');
    }
  };

  //--------------------------------------------------------------Get---------------------------------------
  //----------------------------------------------------------------------------------------
  //LeadStatusDropDown GET API Is being used here
  const [leadStatus, setleadStatus] = useState("");

  async function handleLeadStatus() {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/headsdescriptions/getall`,
        config
      );
      setleadStatus(response.data.data);

      console.log("status:", response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      // Optionally, set an error state to display a user-friendly message
    }
  }

  useEffect(() => {
    handleLeadStatus();

  }, []);

  const [defaultTextLeadStatusDropDown, setdefaultTextLeadStatusDropDown] =
    useState("Select Status");
  const [isDropdownVisibleLeadStatus, setisDropdownVisibleLeadStatus] =
    useState(false);

  const toggleDropdownLeadStatus = () => {
    setisDropdownVisibleLeadStatus(!isDropdownVisibleLeadStatus);
  };

  const handleDropdownLeadStatus = (leadStatus) => {
    setdefaultTextLeadStatusDropDown(leadStatus);
    setisDropdownVisibleLeadStatus(!isDropdownVisibleLeadStatus);
    setFinance((prevTask) => ({
      ...prevTask,
      headName: leadStatus,
    }));
  };


  //----------------------------------------------------------handleCancel---------------------------------------------
  const handleCancel = () => {
    setActive(true);
    setShowTopSection(true);
  };



  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col mt-3">
        <div className="flex justify-between px-3 bg-white border rounded py-3">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-xl">
              {/*  {isEditMode? <h1>Edit Lead</h1>: <>Create Lead</> } */}
              Add Expense
            </h1>
          </div>
          <div>
            <div
              onClick={handleCancel}
              className="px-6 py-1 rounded  border border-blue-500 text-blue-500 cursor-pointer "
            >
              Cancel
            </div>
          </div>
        </div>

        {/* -------------FORM Starts FROM HERE------------- */}
        <form onSubmit={handleSubmit} className="flex">
          <div className="w-full">
            <div className="mt-3 bg-white rounded-xl shadow-md flex-grow">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Lead Information
              </h2>
              {/* -------------1------------- */}
              {/* -------------HeadName------------- */}
              <div className="grid gap-2 p-2">

              <div className="flex space-x-4">

                <div className="flex flex-col w-1/2 relative">
                  <label
                    htmlFor="leadesStatus"
                    className="text-sm font-medium text-gray-700"
                  >
                    Head Name
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
                      {finance.headName != ""
                        ? finance.headName
                        : defaultTextLeadStatusDropDown}
                      <FaAngleDown className="ml-2 text-gray-400" />
                    </button>
                    {isDropdownVisibleLeadStatus && (
                      <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                        <ul className="py-2 text-sm text-gray-700">
                        {leadStatus.length > 0 ? (
                          leadStatus.map(({ i, headDescription }) => (
                            <li
                              key={i}
                              onClick={() => handleDropdownLeadStatus(headDescription)}
                              className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                            >
                              {headDescription}
                            </li>
                            ))
                          ) : (
                            <li className="flex items-center px-4 py-2 text-center gap-1">
                              <IoInformationCircle
                                size={25}
                                className="text-cyan-600"
                              />{" "}
                              Expense Head is not available. Go to{" "}
                              <span className="font-bold">
                                Settings - Expense Head{" "}
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="date"
                      className="text-sm font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={finance.date || today}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />

                </div>
              </div>



              {/* -------------2------------- */}
                {/* -------------Amount------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="amount"
                      className="text-sm font-medium text-gray-700"
                    >
                    Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={finance.amount}
                      maxLength="15"
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Amount"
                    />
                  </div>
                  {/* -------------Reference Number------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="refaranceNo"
                      className="text-sm font-medium text-gray-700"
                    >
                    Reference Number
                    </label>
                    <input
                      type="text"
                      name="refaranceNo"
                      value={finance.refaranceNo}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Reference Number"
                    />
                  </div>
                </div>

              {/* -------------3------------- */}

                <div className="flex space-x-4">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="remarks"
                    className="text-sm font-medium text-gray-700"
                  >
                    Remark
                  </label>
                  <input
                    type="text"
                    name="remarks"
                    value={finance.remarks}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    onChange={handleChange}
                    placeholder="Enter Remark"
                  />
                </div>
                
              </div>


            </div>

            {/* -------------Button------------- */}
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

          </div >
        </form >
      </div >
    </>
  );
}
AddExpense.propTypes = {
  setActive: PropTypes.func.isRequired,
  setShowTopSection: PropTypes.bool.isRequired,
};
