import { useState } from 'react';

export default function EditEmail({ setActiveComponent }) {
  const [formData, setFormData] = useState({
    id: '',
    senderEmail: '',
    port: '',
    serverObligRelay: '',
    key: 'dfadklfa',
    keyEmailTemplate: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // Handle cancel form action
  const handleCancel = () => {
    setActiveComponent('Table');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="m-3 min-w-screen">
      <>
        <div className="flex min-w-screen justify-between items-center">
          <h1 className="text-3xl font-medium">
            {isEditMode ? 'Edit Email Setting' : 'Add Email Setting'}
          </h1>
          <div
            onClick={handleCancel}
            className="px-4 py-1.5 rounded mx-3 border border-blue-500 text-blue-500 cursor-pointer bg-white"
          >
            Cancel
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex">
          <div className="w-full">
            <div className="mt-3 bg-white rounded-xl shadow-md flex-grow">
              <h2 className="font-medium py-2 px-4 rounded-t-xl text-white bg-cyan-500">
                Email Setting
              </h2>
              {/* -------------1------------- */}
              <div className="py-1 px-3 grid gap-2">
                {/* -------------Sender Email------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="senderEmail"
                      className="text-sm font-medium text-gray-700"
                    >
                      Sender Email
                    </label>
                    <input
                      type="text"
                      name="senderEmail"
                      value={formData.senderEmail}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                      placeholder="Enter Sender Email"
                    />
                  </div>
                  {/* -------------Port------------- */}
                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor="port"
                      className="text-sm font-medium text-gray-700"
                    >
                      Port Number
                    </label>
                    <input
                      type="number"
                      name="port"
                      value={formData.port}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* -------------2------------- */}
                <div className="flex space-x-4">
                  {/* -------------Server Oblig Relay------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="userCount"
                      className="text-sm font-medium text-gray-700"
                    >
                      Relay Server Name / Host Name
                    </label>
                    <input
                      type="text"
                      name="serverObligRelay"
                      value={formData.serverObligRelay}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* -------------Key Email Template------------- */}
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="KeyEmailTemplate"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      name="keyEmailTemplate"
                      value={formData.keyEmailTemplate}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* -------------3------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label
                      htmlFor="key"
                      className="text-sm font-medium text-gray-700"
                    >
                      Key
                    </label>
                    <input
                      type="text"
                      name="key"
                      value={formData.key}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* -------------Button------------- */}
                <div className="mb-3 flex items-center justify-start max-w-full mb-8">
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
      </>
    </div>
  );
}