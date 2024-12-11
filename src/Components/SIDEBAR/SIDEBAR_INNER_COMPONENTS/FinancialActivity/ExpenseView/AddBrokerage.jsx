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
import { tenant_base_url, protocal_url } from "../../../../../Config/config";
import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastNotifications";

export default function AddBrokerage({ setActive, setShowTopSection }) {
  //IMP used as ${name} in an API
  const name = getHostnamePart();
  const today = new Date().toISOString().split('T')[0];

  const [finance, setFinance] = useState({
    userName : "",
    date: "",
    brokerageAmount: "",
    referenceno: "",
    remarks: "",
    lastmodifiedby: ""
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
        userName : finance.userName,
        brokerageAmount: finance.brokerageAmount,
        date: finance?.date || today,
        remarks: finance.remarks,
        referenceno: finance.referenceno,
        lastmodifiedby: null,
      };

     

      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/brokeragedetail/add`,
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
              {/* -------------HeadName------------- */}
              <div className="grid gap-2 p-2">

              <div className="flex space-x-4">

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
