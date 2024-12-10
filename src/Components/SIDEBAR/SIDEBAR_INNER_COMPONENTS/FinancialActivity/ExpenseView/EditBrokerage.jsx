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
import { tenant_base_url, protocal_url } from "../../../../../Config/config";
import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastNotifications";

export default function EditBrokerage({
  setActive,
  setShowTopSection,
  editExpenseId,
}) {
  //IMP used as ${name} in an API
  const name = getHostnamePart();
  const [finance, setFinance] = useState({
    id: "",
    headName: "",
    date: "",
    amount: 0,
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

  //--------------------------------------------------------- Get Data By ID -----------------------------------------------

  useEffect(() => {
    if (editExpenseId) {
      fetchDataById();
      console.log("Fetching data for ID:", editExpenseId);
    }
  }, [editExpenseId]);

  const fetchDataById = async () => {
    // setLoading(true);
    try {
      const bearer_token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${bearer_token}` } };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/expensedetail/edit/${editExpenseId}`,
        config
      );

      if (response.status === 200 && response.data.isSuccess) {
        const finance = response.data.data;
        setFinance({
          id: finance.id,
          headName: finance.headName,
          date: finance.date,
          amount: finance.amount,
          refaranceNo: finance.refaranceNo,
          remarks: finance.remarks,
          lastmodifiedby: finance.lastmodifiedby,
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      showErrorToast("Failed to fetch expense details.");
    } finally {
      //   setLoading(false);
    }
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
        id: finance.id,
        headName: finance.headName,
        date: finance.date,
        amount: finance.amount,
        refaranceNo: finance.refaranceNo,
        remarks: finance.remarks,
        lastmodifiedby: finance.lastmodifiedby,
      };

      //------------------------------------------------------------------------------------> Validations//--> Validations//--> Validations//--> Validations//--> Validations
      //   if (!formData_POST.clientName) {
      //     showErrorToast("Please enter name")
      //     return;
      //   }

      //Date Logic Validation
      //   const today = new Date().toISOString().split('T')[0];

      const response = await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/expensedetail/edit/${editExpenseId}`,
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
      showErrorToast(error.data.message);
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
        <div className="flex justify-between mx-3 px-3 bg-white border rounded py-3">
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
              <div className="px-4 grid gap-2 py-2">
                <div className="flex flex-col w-1/2 relative">
                  <label
                    htmlFor="leadesStatus"
                    className="text-sm font-medium text-gray-700"
                  >
                    Select Head
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
                            leadStatus.map(({ key, headDescription }) => (
                              <li
                                key={key}
                                onClick={() =>
                                  handleDropdownLeadStatus(headDescription)
                                }
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

                <div className="grid gap-2">
                  <div className="flex space-x-4">
                    {/* Date */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="date"
                        className="text-sm font-medium text-gray-700"
                      >
                        Date
                      </label>
                      <input
                        type="datetime-local"
                        name="date"
                        id="date"
                        value={finance.call_bck_DateTime}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        min={new Date().toISOString().slice(0, 16)}
                      />
                    </div>

                    {/* reportedTo Dropdown */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="amount"
                        className="text-sm font-medium text-gray-700"
                      >
                        Expense Amount
                      </label>
                      <input
                        type="text"
                        name="amount"
                        value={finance?.amount}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    {/* Group Dropdown */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="refaranceNo"
                        className="text-sm font-medium text-gray-700"
                      >
                        Reference No. / Voucher No.
                      </label>
                      <input
                        type="text"
                        name="refaranceNo"
                        value={finance?.refaranceNo}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    {/* target */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="lastmodifiedby"
                        className="text-sm font-medium text-gray-700"
                      >
                        Last Modified By
                      </label>
                      <input
                        type="text"
                        name="lastmodifiedby"
                        value={finance?.lastmodifiedby}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    {/* target */}
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="teamMember"
                        className="text-sm font-medium text-gray-700"
                      >
                        Remark
                      </label>
                      <input
                        type="text"
                        name="remarks"
                        value={finance?.remarks}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      />
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
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
EditBrokerage.propTypes = {
  setActive: PropTypes.func.isRequired,
  setShowTopSection: PropTypes.bool.isRequired,
  editExpenseId: PropTypes.string,
};
