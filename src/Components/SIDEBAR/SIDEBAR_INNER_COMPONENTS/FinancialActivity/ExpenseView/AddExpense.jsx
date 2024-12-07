//react
import { useState } from "react";
//reactIcon
import { FaAngleDown } from "react-icons/fa";

//external Packages
import axios from "axios";
import "react-quill/dist/quill.snow.css";

//file
import { tenant_base_url, protocal_url } from "../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";
import {
  showSuccessToast,
  showErrorToast,
} from "./../../../../utils/toastNotifications";

export default function AddExpense() {
  //IMP used as ${name} in an API
  const name = getHostnamePart();

  const [finance, setFinance] = useState({
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

      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/SalesOrder/salesOrder/add`,
        formData_POST,
        config
      );
      if (response.data.isSuccess) {
        showSuccessToast("Expense added successfully!");
      }
      // Redirect after a short delay
    } catch (error) {
      console.log(error);
      showErrorToast(error.data.message);
    }
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
              to="/sidebar/lead"
              className="px-6 py-1 rounded  border border-blue-500 text-blue-500 "
            >
              Cancel
            </div>
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
                Expense Details
              </h2>

          





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
        </form>
      </div>
    </>
  );
}
