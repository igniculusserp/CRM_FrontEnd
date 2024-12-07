import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import axios from 'axios';
import PropTypes from 'prop-types';
import { tenant_base_url, protocal_url } from './../../../../../Config/config';
import { getHostnamePart } from '../../ReusableComponents/GlobalHostUrl';

import { ToastContainer } from 'react-toastify';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../../../utils/toastNotifications';

export default function ExpenseHead() {
  const name = getHostnamePart();
  const bearer_token = localStorage.getItem('token');

  const [data, setData] = useState([]);
  const [active, setActive] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch all  data
  // GET BY ID

  //-------------------get-------------------get-------------------get-------------------get-------------------
  async function handleLead() {
    const bearer_token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/expensedetail/getall`,
        config
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  }

  useEffect(() => {
    handleLead(); // Fetch the  list on initial load
  }, []);

  // Delete  by ID
  const handleDelete = async (id) => {
    const bearer_token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/expensedetail/delete/${id}`,
        config
      );
      setData((prevData) => prevData.filter((item) => item.id !== id));
      showSuccessToast('Deleted successfully');
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  // Handle switching to the form for adding or editing
  const handleEdit = (data) => {
    setSelectedData(data);
    setActive(false);
    setIsEditMode(true);
  };

  const handleAdd = () => {
    setSelectedData({ departmentName: '' });
    setActive(false);
    setIsEditMode(false);
  };

  // Handle form submission callback
  const handleFormSubmit = async (formData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      if (isEditMode) {
        // if (!formData.departmentName) {
        //   showErrorToast('Please enter department name');
        //   return;
        // }
        await axios.put(
          `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/expensedetail/edit/${formData.id}`,
          formData,
          config
        );
        showSuccessToast('Updated successfully');
      } else {
        // if (!formData.departmentName) {
        //   showErrorToast('Please enter department name');
        //   return;
        // }
        await axios.post(
          `${protocal_url}${name}.${tenant_base_url}/FinancialActivity/expensedetail/add`,
          formData,
          config
        );
        showSuccessToast('Created Successfully');
      }

      handleLead(); // Refresh the list
      setActive(true); // Switch back to the list view
      setSelectedData(null); // Reset the selected
      setIsEditMode(false); // Reset edit mode
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  // Handle cancel form action
  const handleCancel = () => {
    setActive(true);
    setSelectedData(null);
    setIsEditMode(false);
  };

  // Form Component for Adding/Updating
  const EditForm = ({ data, isEditMode }) => {
    const [formData, setFormData] = useState({
      id: '',
      headName: '',
      date: '',
      amount: '',
      refaranceNo: '',
      remarks: '',
      lastmodifiedby: '',
    });

    useEffect(() => {
      setFormData(data || { id: '', departmentName: '' });
    }, [data]);

    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleFormSubmit(formData);
    };

    return (
      <>
        <ToastContainer />
        <div className="flex min-w-screen justify-between items-center">
          <h1 className="text-3xl font-medium">
            {isEditMode ? 'Edit' : 'Add'}
          </h1>
          <button
            onClick={handleCancel}
            className="border border-blue-600 bg-white text-blue-600 px-4 py-2 min-w-10 text-sm rounded"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex">
          <div className="w-full">
            <div className="mt-3 bg-white rounded-xl shadow-md flex-grow">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Expense Head Information
              </h2>
              <div className="py-2 px-4 min-h-screen relative">
                <div className="flex space-x-4">
                  {/* HEAD NAME */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="headName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Expense Head
                    </label>
                    <input
                      type="text"
                      name="headName"
                      value={formData.headName || ''}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {/* Date */}
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
                      value={formData.headName || ''}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                {/* SECOND */}
                <div className="flex space-x-4">
                  {/* AMOUNT */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="amount"
                      className="text-sm font-medium text-gray-700"
                    >
                      Amount
                    </label>
                    <input
                      type="text"
                      name="amount"
                      value={formData.amount || ''}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {/* Date */}
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
                      value={formData.refaranceNo || ''}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                {/* THIRD */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="remarks"
                      className="text-sm font-medium text-gray-700"
                    >
                      Remarks
                    </label>
                    <input
                      type="text"
                      name="remarks"
                      value={formData.remarks || ''}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {/* Date */}
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
                      value={formData.lastmodifiedby || ''}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-4 py-4 rounded-md absolute top-[200px]"
                >
                  {isEditMode ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  };

  EditForm.propTypes = {
    data: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      departmentName: PropTypes.string,
    }),
    isEditMode: PropTypes.bool.isRequired,
  };

  return (
    <div className="m-3 min-w-screen">
      {active ? (
        <>
          <div className="flex min-w-screen justify-between items-center">
            <h1 className="text-3xl font-medium">Expense Detail</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
            >
              Add Expense Head
            </button>
          </div>
          <div className="overflow-x-auto mt-3">
            <div className="min-w-full overflow-hidden rounded-md">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="border-gray-300 border-b-2">
                    <th className="px-1 py-3">
                      <input type="checkbox" />
                    </th>
                    {/* HEAD NAME */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Head Name</span>
                      </div>
                    </th>
                    {/* DATE */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Date</span>
                      </div>
                    </th>
                    {/* AMOUNT */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Amount</span>
                      </div>
                    </th>
                    {/* REFERENCE NUMBER */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Reference Number</span>
                      </div>
                    </th>
                    {/* REMARKS */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Remarks</span>
                      </div>
                    </th>
                    {/* LAST MODIFIED BY */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Last Modified By</span>
                      </div>
                    </th>
                    {/* ACTION */}
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Action</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data) => (
                    <tr
                      key={data.id}
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                    >
                      <td className="px-1 py-3 text-center">
                        <input type="checkbox" />
                      </td>
                      {/* HEAD NAME */}
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {data.headName}
                      </td>
                      {/* DATE */}
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {data.date.split('T')[0]}
                      </td>
                      {/* AMOUNT */}
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {data.amount}
                      </td>
                      {/* REFERENCE NUMBER */}
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {data.refaranceNo}
                      </td>
                      {/* REMARKS */}
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {data.remarks}
                      </td>
                      {/* LAST MODIFIED BY */}
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {data.lastmodifiedby}
                      </td>
                      <td className="px-2 py-4 flex gap-3 justify-left">
                        <MdEdit
                          size={25}
                          color="white"
                          className="bg-blue-500 rounded"
                          onClick={() => handleEdit(data)}
                        />
                        <RiDeleteBin6Fill
                          size={25}
                          color="red"
                          onClick={() => handleDelete(data.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <EditForm data={selectedData} isEditMode={isEditMode} />
      )}
    </div>
  );
}
