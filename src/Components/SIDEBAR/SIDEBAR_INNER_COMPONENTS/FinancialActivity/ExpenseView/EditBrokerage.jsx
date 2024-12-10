//react
import { useState, useEffect } from "react";
//reactIcon
import { FaAngleDown } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";

//external Packages
import axios from "axios";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";

import { Link, useNavigate, useParams } from 'react-router-dom';


//file
import { tenant_base_url, protocal_url } from "../../../../../Config/config";
import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";
import {showSuccessToast, showErrorToast} from "../../../../../utils/toastNotifications";

export default function EditBrokerage({setActive, setShowTopSection, editExpenseId}) {
  //IMP used as ${name} in an API
  const name = getHostnamePart();

  const { id } = useParams();


  const [finance, setFinance] = useState({
    id: "",
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

  //--------------------------------------------------------- Get Data By ID -----------------------------------------------

  //auto search id-> if found isEditMode(true)
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchDataById(); // Fetch lead data for editing
    }
  }, [id]);

  const fetchDataById = async () => {
    // setLoading(true);
    try {
      const bearer_token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${bearer_token}` } };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/brokeragedetail/get/${id}`,
        config
      );

      if (response.status === 200 && response.data.isSuccess) {
        const finance = response.data.data;
        setFinance({
          id : finance.id || "",
          date: finance.date || "",
          brokerageAmount: finance.brokerageAmount || "",
          referenceno: finance.referenceno || "",
          remarks: finance.remarks || "",
          lastmodifiedby: "",
        });
        console.log(finance)
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
          'Content-Type': 'application/json',
        },
      };

      const formData_PUT = {
          id : finance.id,
          date: finance.date,
          brokerageAmount: finance.brokerageAmount,
          referenceno: finance.referenceno,
          remarks: finance.remarks,
          lastmodifiedby: "",
      };


      const response = await axios.put(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/brokeragedetail/edit/${id}`,
        formData_PUT,
        config
      );
      if (response.data.isSuccess) {
        showSuccessToast("Brokerage details modified successfully!");
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
      <div className="min-h-screen flex flex-col mt-3">
        <div className="flex justify-between mx-3 px-3 bg-white border rounded py-3">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-xl">
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
                        value={finance?.date}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                      />
                    </div>

                    {/* reportedTo Dropdown */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="brokerageAmount"
                        className="text-sm font-medium text-gray-700"
                      >
                        Brokerage Amount
                      </label>
                      <input
                        type="text"
                        name="brokerageAmount"
                        value={finance?.brokerageAmount}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    {/* Group Dropdown */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="referenceno"
                        className="text-sm font-medium text-gray-700"
                      >
                        Reference No. / Voucher No.
                      </label>
                      <input
                        type="text"
                        name="referenceno"
                        value={finance?.referenceno}
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
