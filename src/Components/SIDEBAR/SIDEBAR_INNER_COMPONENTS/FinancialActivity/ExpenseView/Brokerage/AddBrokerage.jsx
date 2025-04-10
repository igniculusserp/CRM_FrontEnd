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

export default function AddBrokerage({ setActive, setShowTopSection }) {
  //IMP used as ${name} in an API
  const name = getHostnamePart();
  const today = new Date().toISOString().split("T")[0];

  const [finance, setFinance] = useState({
    userName: "",
    date: "",
    brokerageAmount: "",
    referenceno: "",
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
        userName: finance.userName,
        brokerageAmount: finance.brokerageAmount,
        date: finance?.date || today,
        remarks: finance.remarks,
        referenceno: finance.referenceno,
        lastmodifiedby: null,
      };

      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/brokeragedetail/add`,
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
              Add Brokerage
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
              {/* -------------date------------- */}
              <div className="grid gap-2 p-2">
                <div className="flex space-x-4">
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

                  {/* -------------brokerageAmount------------- */}

                  <div className="flex w-1/2 flex-col">
                    <label
                      htmlFor="brokerageAmount"
                      className="text-sm font-medium text-gray-700"
                    >
                      Brokerage Amount
                    </label>
                    <input
                      type="number"
                      name="brokerageAmount"
                      value={finance.brokerageAmount}
                      maxLength="15"
                      className="mt-1 rounded-md border border-gray-300 p-2"
                      onChange={handleChange}
                      placeholder="Enter your Amount"
                    />
                  </div>
                </div>

                {/* -------------2------------- */}
                <div className="flex space-x-4">
                  {/* -------------Reference Number------------- */}
                  <div className="flex w-1/2 flex-col">
                    <label
                      htmlFor="referenceno"
                      className="text-sm font-medium text-gray-700"
                    >
                      Reference Number
                    </label>
                    <input
                      type="text"
                      name="referenceno"
                      value={finance.referenceno}
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
