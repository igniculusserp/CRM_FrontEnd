//react
import { useState, useEffect } from "react";
//reactIcon
import { FaAngleDown } from "react-icons/fa";

//external Packages
import axios from "axios";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";

import { IoInformationCircle } from "react-icons/io5";
//file
import { tenant_base_url, protocal_url } from "../../../../../../Config/config";
import { getHostnamePart } from "../../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../../utils/toastNotifications";

export default function AddExpense({ setActive, setShowTopSection }) {
  //name for url
  const name = getHostnamePart();

  //date for passing by default date in an option
  const today = new Date().toISOString().split("T")[0];

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
        config,
      );
      if (response.data.isSuccess) {
        showSuccessToast("Expense added successfully!");
        setActive(true);
      }
      // Redirect after a short delay
    } catch (error) {
      console.log(error);
      showErrorToast("failed");
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
        config,
      );
      setleadStatus(response.data.data);
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
      <div className="mt-3 flex min-h-screen flex-col">
        <div className="flex justify-between rounded border bg-white px-3 py-3">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-xl">
              {/*  {isEditMode? <h1>Edit Lead</h1>: <>Create Lead</> } */}
              Add Expense
            </h1>
          </div>
          <div>
            <div
              onClick={handleCancel}
              className="cursor-pointer rounded border border-blue-500 px-6 py-1 text-blue-500"
            >
              Cancel
            </div>
          </div>
        </div>

        {/* -------------FORM Starts FROM HERE------------- */}
        <form onSubmit={handleSubmit} className="flex">
          <div className="w-full">
            <div className="mt-3 flex-grow rounded-xl bg-white shadow-md">
              <h2 className="rounded-t-xl bg-cyan-500 px-4 py-2 font-medium text-white">
                Lead Information
              </h2>
              {/* -------------1------------- */}
              {/* -------------HeadName------------- */}
              <div className="grid gap-2 p-2">
                <div className="flex space-x-4">
                  <div className="relative flex w-1/2 flex-col">
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
                        className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 p-2"
                        id="LeadStatusDropDown"
                        type="button"
                      >
                        {finance.headName != ""
                          ? finance.headName
                          : defaultTextLeadStatusDropDown}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isDropdownVisibleLeadStatus && (
                        <div className="top-10.5 absolute z-10 w-full rounded-md border border-gray-300 bg-white">
                          <ul className="py-2 text-sm text-gray-700">
                            {leadStatus.length > 0 ? (
                              leadStatus.map(({ i, headDescription }) => (
                                <li
                                  key={i}
                                  onClick={() =>
                                    handleDropdownLeadStatus(headDescription)
                                  }
                                  className="block cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                                >
                                  {headDescription}
                                </li>
                              ))
                            ) : (
                              <li className="flex items-center gap-1 px-4 py-2 text-center">
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

                  <div className="flex w-1/2 flex-col">
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
                      className="mt-1 rounded-md border border-gray-300 p-2"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* -------------2------------- */}
                {/* -------------Amount------------- */}
                <div className="flex space-x-4">
                  <div className="flex w-1/2 flex-col">
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
                      className="mt-1 rounded-md border border-gray-300 p-2"
                      onChange={handleChange}
                      placeholder="Enter your Amount"
                    />
                  </div>
                  {/* -------------Reference Number------------- */}
                  <div className="flex w-1/2 flex-col">
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
                      className="mt-1 rounded-md border border-gray-300 p-2"
                      onChange={handleChange}
                      placeholder="Enter your Reference Number"
                    />
                  </div>
                </div>

                {/* -------------3------------- */}

                <div className="flex space-x-4">
                  <div className="flex w-full flex-col">
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
                      className="mt-1 rounded-md border border-gray-300 p-2"
                      onChange={handleChange}
                      placeholder="Enter Remark"
                    />
                  </div>
                </div>
              </div>

              {/* -------------Button------------- */}
              <div className="mb-6 flex justify-end gap-5">
                <div className="mr-5 flex justify-end">
                  <button
                    type="submit"
                    className="mb-4 mt-20 rounded border-2 border-cyan-500 bg-cyan-500 px-32 py-4 text-white hover:bg-white hover:text-cyan-500"
                  >
                    Save
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
AddExpense.propTypes = {
  setActive: PropTypes.func.isRequired,
  setShowTopSection: PropTypes.bool.isRequired,
};
