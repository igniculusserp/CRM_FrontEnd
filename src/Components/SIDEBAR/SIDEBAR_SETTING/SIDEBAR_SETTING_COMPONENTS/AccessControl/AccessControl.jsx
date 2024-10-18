import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';

export default function AccessControl() {
  const [activeComponent, setActiveComponent] = useState('Table');

  const handleAdd = () => {
    setActiveComponent('Add');
  };

  const handleCancel = () => {
    setActiveComponent('Table');
  };

  const AccessControlTable = () => {
    const data = [
      {
        id: 1,
        title: 'Global Hunt',
        createdBy: '12/03/2023',
        modifiedOn: '12/03/2023',
      },
      {
        id: 2,
        title: 'Global Hunt',
        createdBy: '12/03/2023',
        modifiedOn: '12/03/2023',
      },
      {
        id: 3,
        title: 'Global Hunt',
        createdBy: '12/03/2023',
        modifiedOn: '12/03/2023',
      },
      {
        id: 4,
        title: 'Global Hunt',
        createdBy: '12/03/2023',
        modifiedOn: '12/03/2023',
      },
      {
        id: 5,
        title: 'Global Hunt',
        createdBy: '12/03/2023',
        modifiedOn: '12/03/2023',
      },
      {
        id: 6,
        title: 'Global Hunt',
        createdBy: '12/03/2023',
        modifiedOn: '12/03/2023',
      },
      {
        id: 7,
        title: 'Global Hunt',
        createdBy: '12/03/2023',
        modifiedOn: '12/03/2023',
      },
      {
        id: 8,
        title: 'Global Hunt',
        createdBy: '12/03/2023',
        modifiedOn: '12/03/2023',
      },
      {
        id: 9,
        title: 'Global Hunt',
        createdBy: '12/03/2023',
        modifiedOn: '12/03/2023',
      },
      {
        id: 10,
        title: 'Global Hunt',
        createdBy: '12/03/2023',
        modifiedOn: '12/03/2023',
      },
      {
        id: 11,
        title: 'Global Hunt',
        createdBy: '12/03/2023',
        modifiedOn: '12/03/2023',
      },
    ];

    return (
      <div className="m-3 min-w-screen">
        <div className="flex min-w-screen justify-between items-center">
          <h1 className="text-3xl font-medium">Access Control</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
          >
            Add Access Control
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
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Title</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Created By</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Modified On</span>
                      <FaBars />
                    </div>
                  </th>
                  <th className="px-2 py-3 text-left border-r font-medium">
                    <div className="flex justify-between items-center text-sm">
                      <span>Action</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((device) => (
                  <tr
                    key={device.id}
                    className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                  >
                    <td className="px-1 py-3 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {device.title}
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {device.createdBy}
                    </td>
                    <td className="px-2 py-4 text-sm max-w-24 break-words">
                      {device.modifiedOn}
                    </td>
                    <td className="px-2 py-4 flex gap-3 justify-center">
                      <MdEdit
                        size={25}
                        color="white"
                        className="bg-blue-500 rounded"
                      />
                      <RiDeleteBin6Fill size={25} color="red" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const AddAccessControl = () => {
    const [selectedId, setSelectedId] = useState(1);
    const [addAccess, setAddAccess] = useState({
      title: '',
      description: '',
      validFrom: '',
      validTo: '',
      risk: '',
      timeZone: '',
      fromHour: '', // DROPDOWN
      toHour: '', // DROPDOWN
      minutes: '',
      country: '', // DROPDOWN
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setAddAccess({
        ...addAccess,
        [name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    };

    const buttons = [
      { id: 1, text: 'Browse Restriction' },
      { id: 2, text: 'IP Restriction' },
      { id: 3, text: 'Time Restriction' },
      { id: 4, text: 'Device Restriction' },
      { id: 5, text: 'Geo Location' },
    ];

    const handleOptionClick = (id) => {
      setSelectedId(id);
    };

    return (
      <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
        <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
          <h1 className="text-xl">Access Control</h1>
          <div
            onClick={handleCancel}
            className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
          >
            Cancel
          </div>
        </div>
        <div className="overflow-hidden shadow-md">
          <div className="py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
            <h1 className="text-white">Access Control Details</h1>
          </div>
          {/* CREATE DLP FORM */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col py-2 px-4 bg-white rounded-b-xl">
              <div className="flex gap-4">
                <div className="grid gap-2 pb-3 w-full">
                  <div className="flex space-x-4">
                    {/* TITLE */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="title"
                        className="text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={addAccess.title}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      {/* DESCRIPTION */}
                      <label
                        htmlFor="description"
                        className="text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={addAccess.description}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                  </div>
                  {/* SECOND */}
                  <div className="flex space-x-4">
                    {/* Enabled */}
                    <div className="flex flex-col w1/2 gap-1 justify-start items-start">
                      <label
                        htmlFor="enabled"
                        className="text-sm font-medium text-gray-700"
                      >
                        Enabled
                      </label>
                      <input
                        type="checkbox"
                        name="enabled"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                    {/* Valid Always */}
                    <div className="flex flex-col w1/2 gap-1 justify-start items-start">
                      <label
                        htmlFor="enabled"
                        className="text-sm font-medium text-gray-700"
                      >
                        Valid Always
                      </label>
                      <input
                        type="checkbox"
                        name="enabled"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                  </div>
                  {/* THIRD */}
                  <div className="flex space-x-4">
                    {/* VALID FROM */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="validFrom"
                        className="text-sm font-medium text-gray-700"
                      >
                        Valid From
                      </label>
                      <input
                        type="text"
                        name="validFrom"
                        value={addAccess.validFrom}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                    <div className="flex flex-col w-1/2">
                      {/* VALID TO */}
                      <label
                        htmlFor="validTo"
                        className="text-sm font-medium text-gray-700"
                      >
                        Valid To
                      </label>
                      <input
                        type="text"
                        name="validTo"
                        value={addAccess.validTo}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                  </div>
                  {/* FOURTH */}
                  <div className="flex space-x-4">
                    {/* RISK */}
                    <div className="flex flex-col w-1/2">
                      <label
                        htmlFor="risk"
                        className="text-sm font-medium text-gray-700"
                      >
                        Risk
                      </label>
                      <input
                        type="text"
                        name="risk"
                        value={addAccess.risk}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                  </div>
                  {/* FIFTH */}
                  <h2 className="text-md font-medium">Category</h2>
                  <div className="flex space-x-4">
                    {/* Default */}
                    <div className="flex flex-col flex-1 w1/2 gap-1 justify-start items-start">
                      <label
                        htmlFor="default"
                        className="text-sm font-medium text-gray-700"
                      >
                        Default
                      </label>
                      <input
                        type="checkbox"
                        name="default"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                    {/* Apps */}
                    <div className="flex flex-col flex-1 w1/2 gap-1 justify-start items-start">
                      <label
                        htmlFor="apps"
                        className="text-sm font-medium text-gray-700"
                      >
                        Apps
                      </label>
                      <input
                        type="checkbox"
                        name="apps"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-5">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-32 py-4 mt-20 mb-4 bg-cyan-500 text-white hover:text-cyan-500 hover:bg-white border-2 border-cyan-500 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            {/* SECOND SECTION */}
            <div className="flex gap-3 mt-3">
              <h1 className="text-2xl font-medium">Events</h1>
              {buttons.map(({ id, text }) => (
                <button
                  key={id}
                  onClick={() => handleOptionClick(id)}
                  className={`px-3 py-2 rounded font-light text-md
                ${
                  selectedId === id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }
              `}
                >
                  {text}
                </button>
              ))}
            </div>
            {/* WEB SECTION */}
            {selectedId === 1 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Web Violation
                  </h1>
                  <div className="mb-6 py-3 flex flex-col gap-2">
                    {/* MAIN CART */}

                    <div className="flex justify-end gap-5 mr-3">
                      <div className="flex justify-end">
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
              </>
            )}

            {/* DLP SECTION */}
            {selectedId === 2 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    DLP Violation
                  </h1>
                  <div className="mb-6 py-3 flex flex-col gap-2">
                    {/* MAIN CART */}

                    <div className="flex justify-end gap-5 mr-3">
                      <div className="flex justify-end">
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
              </>
            )}
          </form>
        </div>
      </div>
    );
  };

  const UpdateAccessControl = () => {
    return <h1>Update</h1>;
  };

  return (
    <>
      {activeComponent === 'Table' ? (
        <AccessControlTable />
      ) : activeComponent === 'Add' ? (
        <AddAccessControl />
      ) : activeComponent === 'Update' ? (
        <UpdateAccessControl />
      ) : (
        ''
      )}
    </>
  );
}
