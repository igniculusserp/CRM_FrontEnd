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
      <div className="flex flex-col min-h-screen mt-3">
        <div className="flex justify-between px-3 py-3 bg-white border rounded">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-xl">
              {/*  {isEditMode? <h1>Edit Lead</h1>: <>Create Lead</> } */}
              Edit Expense
            </h1>
          </div>
          <div>
            <div
              onClick={handleCancel}
              className="px-6 py-1 text-blue-500 border border-blue-500 rounded cursor-pointer"
            >
              Cancel
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex">
          <div className="w-full">
            <div className="flex-grow mt-3 bg-white shadow-md rounded-xl">
              <h2 className="px-4 py-2 font-medium text-white rounded-t-xl bg-cyan-500">
                Lead Information
              </h2>


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
                      value={finance.date.split("T")[0] || today}
                      className="p-2 mt-1 border border-gray-300 rounded-md"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
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
                      className="p-2 mt-1 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter your Amount"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
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
                      className="p-2 mt-1 border border-gray-300 rounded-md"
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
                      className="p-2 mt-1 border border-gray-300 rounded-md"
                      onChange={handleChange}
                      placeholder="Enter Remark"
                    />
                  </div>
                </div>
              </div>


              <div className="flex justify-end gap-5 mb-6">
                <div className="flex justify-end mr-5">
                  <button
                    type="submit"
                    className="px-32 py-4 mt-20 mb-4 text-white border-2 rounded border-cyan-500 bg-cyan-500 hover:bg-white hover:text-cyan-500"
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
