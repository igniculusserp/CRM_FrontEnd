import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

export default function AddSMS({ setActiveComponent }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle cancel form action
  const handleCancel = () => {
    setActiveComponent('Table');
  };

  const [formData, setFormData] = useState({
    id: '',
    APISenderID: '',
    APIServerName: '',
    template: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.APISenderID || formData.APISenderID.trim() === '') {
      errors.APISenderID = 'API Server is required';
    } else if (!formData.APIKey || formData.APIKey.trim() === '') {
      errors.APIKey = 'API Key is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    if (isEditMode) {
      console.log('Edit User:', formData);
      // Add logic to submit the edited user data
    } else {
      console.log('Add User:', formData);

      // Add logic to add a new user
    }
  };

  return (
    <div className="m-3 min-w-screen">
      <div className="flex min-w-screen justify-between items-center">
        <h1 className="text-3xl font-medium">
          {isEditMode ? 'Edit SMS Setting' : 'Add SMS Setting'}
        </h1>
        <button
          className="border border-blue-600 bg-white text-blue-600 px-4 py-2 min-w-10 text-sm rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex">
        <div className="w-full">
          <div className="mt-3 bg-white rounded-xl shadow-md flex-grow">
            <h2 className="font-medium text-3xl py-2 px-4 rounded-t-xl text-white bg-cyan-500">
              SMS Setting
            </h2>
            {/* -------------1------------- */}
            <div className="py-2 px-4 grid gap-2">
              {/* -------------API Server ID------------- */}
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="APISenderID"
                    className="text-sm font-medium text-gray-700"
                  >
                    Sender ID
                  </label>
                  <input
                    type="text"
                    name="APISenderID"
                    value={formData.APISenderID}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Enter API Sender ID"
                  />
                  {errors.APISenderID && (
                    <span style={{ color: 'red' }}>{errors.APISenderID}</span>
                  )}
                </div>
                {/* -------------API Server Name------------- */}
                <div className="flex flex-col w-1/2 relative">
                  <label
                    htmlFor="APIKey"
                    className="text-sm font-medium text-gray-700"
                  >
                    API Key
                  </label>
                  <input
                    type="text"
                    name="APIKey"
                    value={formData.APIKey}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                    placeholder="Enter API Key"
                  />
                  {errors.APIServerName && (
                    <span style={{ color: 'red' }}>{errors.APIServerName}</span>
                  )}
                </div>
              </div>

              {/* -------------Button------------- */}
              <div className="mb-3 flex items-center justify-start max-w-full">
                <button
                  type="submit"
                  className="mt-4 hover:bg-cyan-500 border border-cyan-500 text-cyan-500 hover:text-white px-6 py-4 rounded-md w-max"
                >
                  {isEditMode ? 'Update User' : 'Save User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
