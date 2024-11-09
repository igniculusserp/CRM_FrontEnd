import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function EditSMS({setActiveComponent}) {
    const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  // APIServerName Type State
  const [APIServerName, setAPIServerName] = useState([]);
  const [
    defaultTextAPIServerNameTypeDropDown,
    setDefaultTextAPIServerNameTypeDropDown,
  ] = useState('Select API Server Name');
  const [
    isDropdownVisibleAPIServerNameType,
    setIsDropdownVisibleAPIServerNameType,
  ] = useState(false);

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

  // Plan Type Dropdown
  const toggleDropdownAPIServerNameType = () => {
    setIsDropdownVisibleAPIServerNameType(!isDropdownVisibleAPIServerNameType);
  };

  const handleDropdownPlanType = (APIServerName) => {
    setFormData((APIServerName) => ({
      ...APIServerName,
      APIServerName,
    }));
    setDefaultTextAPIServerNameTypeDropDown(APIServerName);
    setIsDropdownVisibleAPIServerNameType(false);
  };

  return (
    <div className="m-3 min-w-screen">
      <div className="flex min-w-screen justify-between items-center">
        <h1 className="text-3xl font-medium">
          {isEditMode ? 'Edit SMS Setting' : 'Add SMS Setting'}
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
                    API Server ID
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
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    API Key
                  </label>
                  <div
                    className="relative"
                    onClick={toggleDropdownAPIServerNameType}
                    onMouseLeave={() =>
                      setIsDropdownVisibleAPIServerNameType(false)
                    }
                  >
                    <button
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                      id="DropDown"
                      type="button"
                    >
                      {formData.APIKey || defaultTextAPIServerNameTypeDropDown}
                      <FaAngleDown className="ml-2 text-gray-400" />
                    </button>

                    {isDropdownVisibleAPIServerNameType && (
                      <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                        <ul className="py-2 text-sm text-gray-700">
                          {APIServerName.map((plan) => (
                            <li
                              key={plan.id}
                              className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                              onClick={() =>
                                handleDropdownPlanType(plan.APIServerName)
                              }
                            >
                              {plan.APIServerName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {errors.APIServerName && (
                    <span style={{ color: 'red' }}>{errors.APIServerName}</span>
                  )}
                </div>
              </div>

              {/* -------------2------------- */}
              <div className="flex space-x-4">
                {/* -------------UserCount------------- */}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="userCount"
                    className="text-sm font-medium text-gray-700"
                  >
                    Template
                  </label>
                  <input
                    type="text"
                    name="template"
                    value={formData.template}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md"
                  />
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