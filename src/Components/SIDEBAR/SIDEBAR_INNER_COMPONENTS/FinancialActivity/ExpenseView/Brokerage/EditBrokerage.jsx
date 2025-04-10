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

export default function EditBrokerage({
  setActive,
  setShowTopSection,
  editBrokerageId,
}) {
  //IMP used as ${name} in an API
  const name = getHostnamePart();
  const today = new Date().toISOString().split("T")[0];

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
    if (editBrokerageId) {
      fetchDataById();
      console.log("Fetching data for ID:", editBrokerageId);
    }
  }, [editBrokerageId]);

  const fetchDataById = async () => {
    // setLoading(true);
    try {
      const bearer_token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${bearer_token}` } };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/brokeragedetail/get/${editBrokerageId}`,
        config,
      );

      if (response.status === 200 && response.data.isSuccess) {
        const finance = response.data.data;
        setFinance({
          id: finance.id,
          userName: finance.userName,
          date: finance?.date || today,
          brokerageAmount: finance.brokerageAmount,
          referenceno: finance.referenceno,
          remarks: finance.remarks,
          lastmodifiedby: finance.lastmodifiedby,
        });
      }
      console.log(finance);
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

      const formData_PUT = {
        id: finance.id,
        userName: finance.userName,
        date: finance?.date.split("T")[0] || today,
        brokerageAmount: finance?.brokerageAmount,
        referenceno: finance?.referenceno,
        remarks: finance?.remarks,
        lastmodifiedby: finance?.lastmodifiedby,
      };

      const response = await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/brokeragedetail/edit/${editBrokerageId}`,
        formData_PUT,
        config,
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
              Edit Expense
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
                      value={finance.date.split("T")[0] || today}
                      className="mt-1 rounded-md border border-gray-300 p-2"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* -------------2------------- */}
                {/* -------------brokerageAmount------------- */}
                <div className="flex space-x-4">
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
