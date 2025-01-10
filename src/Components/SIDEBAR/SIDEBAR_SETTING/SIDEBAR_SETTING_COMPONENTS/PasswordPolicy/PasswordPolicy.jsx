import { useState } from 'react';
import { FaAngleDown, FaBars } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';

export default function PasswordPolicy() {
  const [activeComponent, setActiveComponent] = useState('Table');
  const [idGet, setIdGet] = useState('');

  const handleAdd = () => {
    setActiveComponent('Add');
  };

  const handleCancel = () => {
    setActiveComponent('Table');
  };

  const PasswordPolicyTable = () => {
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

    const handleEdit = (id) => {
      setActiveComponent('Update');
      setIdGet(id);
    };

    return (
      <div className="m-3 min-w-screen">
        <div className="flex min-w-screen justify-between items-center flex-wrap gap-5">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-medium">Password Policy</h1>
            <h2 className='text-xl font-medium text-red-500 text-center'>(This feature is coming soon...)</h2>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
          >
            Add Password Policy
          </button>
        </div>
        <div className="overflow-x-auto mt-3 shadow-md leads_Table_Main_Container">
          <div className="min-w-full rounded-md leads_Table_Container">
            <table className="min-w-full bg-white leads_Table">
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
                        onClick={() => handleEdit(device.id)}
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

  const AddPasswordPolicy = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [addPassword, setAddPassword] = useState({
      title: '',
      description: '',
      validFrom: '',
      validTo: '',
      maxPassAge: '', // DROPDOWN
      minPassAge: '',
      minPassLen: '',
      minCharClass: '',
      minUpperChar: '',
      minLowerChar: '',
      minNumericChar: '',
      minSpeChar: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setAddPassword({
        ...addPassword,
        [name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    };

    const [selectedId, setSelectedId] = useState(1);

    const buttons = [
      { id: 1, text: 'Expiration' },
      { id: 2, text: 'Compleocity' },
      { id: 3, text: 'Restriction' },
      { id: 4, text: 'Historic Password' },
      { id: 5, text: 'Account Lock' },
      { id: 6, text: 'Preferences' },
    ];

    const handleOptionClick = (id) => {
      setSelectedId(id);
    };

    // DROPDOWNS
    const [maxPasswordAgeDropdown, setMaxPasswordAgeDropdown] = useState(false);
    const [defaultMaxPasswordText, setDefaultMaxPasswordText] = useState(
      'Max Password Age(Days)'
    );
    const [minPasswordAgeDropdown, setMinPasswordAgeDropdown] = useState(false);
    const [defaultMinPasswordText, setDefaultMinPasswordText] = useState(
      'Min Password Age(Days)'
    );
    const [minPasswordLengthDropdown, setMinPasswordLengthDropdown] =
      useState(false);
    const [defaultMinLengthPasswordText, setDefaultMinLengthPasswordText] =
      useState('Minimum Password Length');
    const [minCharClassDropdown, setMinCharClassDropdown] = useState(false);
    const [defaultMinCharClassText, setDefaultMinCharClassText] = useState(
      'Minimum Character Classes'
    );
    const [minUppCaseCharDropdown, setMinUppCaseCharDropdown] = useState(false);
    const [defaultMinUppCaseText, setDefaultMinUppCaseText] = useState(
      'Minimum Uppercase Character'
    );
    const [minLowCaseCharDropdown, setMinLowCaseCharDropdown] = useState(false);
    const [defaultMinLowCaseText, setDefaultMinLowCaseText] = useState(
      'Minimum Lowercase Character'
    );
    const [minNumericCharDropdown, setMinNumericCharDropdown] = useState(false);
    const [defaultNumericCharText, setDefaultNumericCharText] = useState(
      'Minimum Numeric Character'
    );
    const [minSpecialCharDropdown, setMinSpecialCharDropdown] = useState(false);
    const [defaultSpecialCharText, setDefaultSpecialCharText] = useState(
      'Minimum Special Characters'
    );

    // DUMMY DATA
    const minPassword = [
      { id: 1, name: 'Min Password' },
      { id: 2, name: 'Min Password' },
      { id: 3, name: 'Min Password' },
      { id: 4, name: 'Min Password' },
    ];

    const maxPassword = [
      { id: 1, name: 'Max Password' },
      { id: 2, name: 'Max Password' },
      { id: 3, name: 'Max Password' },
      { id: 4, name: 'Max Password' },
    ];

    const minPwdLen = [
      { id: 1, name: 8 },
      { id: 2, name: 8 },
      { id: 3, name: 8 },
      { id: 4, name: 8 },
    ];

    const minCharClass = [
      { id: 1, name: 8 },
      { id: 2, name: 8 },
      { id: 3, name: 8 },
      { id: 4, name: 8 },
    ];

    const minUpper = [
      { id: 1, name: 8 },
      { id: 2, name: 8 },
      { id: 3, name: 8 },
      { id: 4, name: 8 },
    ];

    const minLower = [
      { id: 1, name: 8 },
      { id: 2, name: 8 },
      { id: 3, name: 8 },
      { id: 4, name: 8 },
    ];

    const minNumeric = [
      { id: 1, name: 8 },
      { id: 2, name: 8 },
      { id: 3, name: 8 },
      { id: 4, name: 8 },
    ];

    const minSpecial = [
      { id: 1, name: 8 },
      { id: 2, name: 8 },
      { id: 3, name: 8 },
      { id: 4, name: 8 },
    ];

    // TOGGLE DROPDOWNS
    const toggleDropdownMaxPassword = () => {
      setMaxPasswordAgeDropdown(!maxPasswordAgeDropdown);
    };

    const toggleDropdownMinPassword = () => {
      setMinPasswordAgeDropdown(!minPasswordAgeDropdown);
    };

    const toggleDropdownMinPassLen = () => {
      setMinPasswordLengthDropdown(!minPasswordLengthDropdown);
    };

    const toggleDropdownMinCharClass = () => {
      setMinCharClassDropdown(!minCharClassDropdown);
    };

    const toggleDropdownMinUpper = () => {
      setMinUppCaseCharDropdown(!minUppCaseCharDropdown);
    };

    const toggleDropdownMinLower = () => {
      setMinLowCaseCharDropdown(!minLowCaseCharDropdown);
    };

    const toggleDropdownMinNumeric = () => {
      setMinNumericCharDropdown(!minNumericCharDropdown);
    };

    const toggleDropdownMinSpecial = () => {
      setMinSpecialCharDropdown(!minSpecialCharDropdown);
    };

    const handleDropdownMaxPassword = (name) => {
      setDefaultMaxPasswordText(name);
      setMaxPasswordAgeDropdown(!maxPasswordAgeDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinPassword = (name) => {
      setDefaultMinPasswordText(name);
      setMinPasswordAgeDropdown(!minPasswordAgeDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinPassLen = (name) => {
      setDefaultMinLengthPasswordText(name);
      setMinPasswordLengthDropdown(!minPasswordLengthDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinCharClass = (name) => {
      setDefaultMinCharClassText(name);
      setMinCharClassDropdown(!minCharClassDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinUpper = (name) => {
      setDefaultMinUppCaseText(name);
      setMinUppCaseCharDropdown(!minUppCaseCharDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinLower = (name) => {
      setDefaultMinLowCaseText(name);
      setMinLowCaseCharDropdown(!minLowCaseCharDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinNumeric = (name) => {
      setDefaultNumericCharText(name);
      setMinNumericCharDropdown(!minLowCaseCharDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinSpecial = (name) => {
      setDefaultSpecialCharText(name);
      setMinSpecialCharDropdown(!minSpecialCharDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    return (
      <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
        <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
          <h1 className="text-xl">Add Password Policy</h1>
          <div
            onClick={handleCancel}
            className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
          >
            Cancel
          </div>
        </div>
        <div className="overflow-hidden shadow-md">
          <div className="py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
            <h1 className="text-white">Password Policy Details</h1>
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
                        value={addPassword.title}
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
                        value={addPassword.description}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                  </div>
                  {/* SECOND */}
                  <div className="flex space-x-4">
                    {/* Enabled */}
                    <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
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
                    <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                      <label
                        htmlFor="granted"
                        className="text-sm font-medium text-gray-700"
                      >
                        Granted
                      </label>
                      <input
                        type="checkbox"
                        name="granted"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                  </div>
                  {/* THIRD */}
                  <div className="flex space-x-4">
                    {/* Valid Always */}
                    <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                      <label
                        htmlFor="validAlways"
                        className="text-sm font-medium text-gray-700"
                      >
                        Valid Always
                      </label>
                      <input
                        type="checkbox"
                        name="validAlways"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                  </div>
                  {/* FOURTH */}
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
                        value={addPassword.validFrom}
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
                        value={addPassword.validTo}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
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
            {/* EXPIRATION */}
            {selectedId === 1 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
                    Expiration
                  </h1>

                  <div className="grid gap-2 py-3 px-3">
                    {/* FIRST */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="validAlways"
                          className="text-sm font-medium text-gray-700"
                        >
                          Valid Always
                        </label>
                        <input
                          type="checkbox"
                          name="validAlways"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                    {/* SECOND */}
                    <div className="flex space-x-4 w-full">
                      {/* FROM (Hours) DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="maxPassAge"
                          className="text-sm font-medium text-gray-700"
                        >
                          Max Password Age(Days)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMaxPassword}
                          onMouseLeave={() => setMaxPasswordAgeDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="maxPassAge"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.maxPassAge
                              : defaultMaxPasswordText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {maxPasswordAgeDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {maxPassword.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownMaxPassword(name)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Minutes DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minPassAge"
                          className="text-sm font-medium text-gray-700"
                        >
                          Min Password Age(Days)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinPassword}
                          onMouseLeave={() => setMinPasswordAgeDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minPassAge"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minPassAge
                              : defaultMinPasswordText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minPasswordAgeDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minPassword.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownMinPassword(name)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* THIRD */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="passwordNeverExp"
                          className="text-sm font-medium text-gray-700"
                        >
                          Password Never Expires
                        </label>
                        <input
                          type="checkbox"
                          name="passwordNeverExp"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                          defaultChecked
                        />
                      </div>
                    </div>
                    {/* FOURTH */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 w1/2 gap-2">
                        <input
                          type="checkbox"
                          name="passwordNeverExp"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                        <label
                          htmlFor="passwordNeverExp"
                          className="text-sm font-medium text-gray-700"
                        >
                          Force User To Change Password at next Login.
                        </label>
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
              </>
            )}

            {/* COMPLEOCITY */}
            {selectedId === 2 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Compleocity
                  </h1>

                  <div className="grid gap-2 py-3 px-3">
                    {/* FIRST */}
                    <div className="flex space-x-4 w-full">
                      {/* FROM (Hours) DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minPassLen"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minimum Password Length
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinPassLen}
                          onMouseLeave={() =>
                            setMinPasswordLengthDropdown(false)
                          }
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minPassLen"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minPassLen
                              : defaultMinLengthPasswordText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minPasswordLengthDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minPwdLen.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownMinPassLen(name)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Minutes DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minCharClass"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minimum Character Classes from the following four
                          Categories
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinCharClass}
                          onMouseLeave={() => setMinCharClassDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minCharClass"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minCharClass
                              : defaultMinCharClassText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minCharClassDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minCharClass.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownMinCharClass(name)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* SECOND */}
                    <h1 className="text-md font-medium text-gray-700 mt-2">
                      Required Alpha Character
                    </h1>
                    <div className="flex space-x-4 w-full">
                      {/* FROM (Hours) DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minUpperChar"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minimum Uppercase character (A-Z)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinUpper}
                          onMouseLeave={() => setMinUppCaseCharDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minUpperChar"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minUpperChar
                              : defaultMinUppCaseText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minUppCaseCharDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minUpper.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() => handleDropdownMinUpper(name)}
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Minutes DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minLowerChar"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minimum Lowercase Characters (A-Z)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinLower}
                          onMouseLeave={() => setMinLowCaseCharDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minLowerChar"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minLowerChar
                              : defaultMinLowCaseText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minLowCaseCharDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minLower.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() => handleDropdownMinLower(name)}
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* THIRD */}
                    <h1 className="text-md font-medium text-gray-700 mt-2">
                      Required Non Alpha Characters
                    </h1>
                    <div className="flex space-x-4 w-full">
                      {/* FROM (Hours) DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minNumericChar"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minimum Numeric character (0-9)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinNumeric}
                          onMouseLeave={() => setMinNumericCharDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minNumericChar"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minNumericChar
                              : defaultNumericCharText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minNumericCharDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minNumeric.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownMinNumeric(name)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Minimum Special Characters (A-Z) */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minSpeChar"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minimum Special Characters (A-Z)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinSpecial}
                          onMouseLeave={() => setMinSpecialCharDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minSpeChar"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minSpeChar
                              : defaultSpecialCharText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minSpecialCharDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minSpecial.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownMinSpecial(name)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

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
            {/* RESTRICTION */}
            {selectedId === 3 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Restriction
                  </h1>

                  <div className="grid gap-3 pb-3 w-full px-3 mt-3">
                    {/* FIRST */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="validAlways"
                          className="text-sm font-medium text-gray-700"
                        >
                          Disallow username in password
                        </label>
                        <input
                          type="checkbox"
                          name="validAlways"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                    {/* SECOND */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="validAlways"
                          className="text-sm font-medium text-gray-700"
                        >
                          Disallow digit as first character in password
                        </label>
                        <input
                          type="checkbox"
                          name="validAlways"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                    {/* THIRD */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="validAlways"
                          className="text-sm font-medium text-gray-700"
                        >
                          Disallow parts of the user’s full name that exceed two
                          consecutive character in the password
                        </label>
                        <input
                          type="checkbox"
                          name="validAlways"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                    {/* FOURTH */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="validAlways"
                          className="text-sm font-medium text-gray-700"
                        >
                          Exclude Keywords in password
                        </label>
                        <input
                          type="checkbox"
                          name="validAlways"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                  </div>

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
              </>
            )}
            {/* HISTORIC PASSWORD */}
            {selectedId === 4 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Historic Password
                  </h1>
                  <div className="mb-6 py-3 flex flex-col gap-2">
                    {/* MAIN CART */}
                    <div className="grid gap-2 pb-3 w-full px-3">
                      <div className="flex space-x-4">
                        {/* ENABLE */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="enable"
                            className="text-sm font-medium text-gray-700"
                          >
                            Enable Save Historic Password
                          </label>
                          <input
                            type="checkbox"
                            name="enable"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                      </div>
                    </div>

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
            {/* ACCOUNT LOCK */}
            {selectedId === 5 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Account Lock
                  </h1>
                  <div className="mb-6 py-3 flex flex-col gap-2">
                    {/* MAIN CART */}
                    <div className="grid gap-2 pb-3 w-full px-3">
                      <div className="flex space-x-4">
                        {/* ENABLE */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="enable"
                            className="text-sm font-medium text-gray-700"
                          >
                            Enable Account Lock
                          </label>
                          <input
                            type="checkbox"
                            name="enable"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                      </div>
                    </div>

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
            {/* PREFERENCES */}
            {selectedId === 6 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Preferences
                  </h1>
                  <div className="mb-6 py-3 flex flex-col gap-2">
                    {/* MAIN CART */}
                    <div className="grid gap-2 pb-3 w-full px-3">
                      <div className="flex space-x-4">
                        {/* ENABLE */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="enable"
                            className="text-sm font-medium text-gray-700"
                          >
                            Enable Notification on password chenged
                          </label>
                          <input
                            type="checkbox"
                            name="enable"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col w-1/2">
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="enable"
                            className="text-sm font-medium text-gray-700"
                          >
                            Logout user on password changed
                          </label>
                          <input
                            type="checkbox"
                            name="enable"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                      </div>
                    </div>

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

  const UpdatePasswordPolicy = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [addPassword, setAddPassword] = useState({
      id: '',
      title: '',
      description: '',
      validFrom: '',
      validTo: '',
      maxPassAge: '', // DROPDOWN
      minPassAge: '',
      minPassLen: '',
      minCharClass: '',
      minUpperChar: '',
      minLowerChar: '',
      minNumericChar: '',
      minSpeChar: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setAddPassword({
        ...addPassword,
        [name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    };

    const [selectedId, setSelectedId] = useState(1);

    const buttons = [
      { id: 1, text: 'Expiration' },
      { id: 2, text: 'Compleocity' },
      { id: 3, text: 'Restriction' },
      { id: 4, text: 'Historic Password' },
      { id: 5, text: 'Account Lock' },
      { id: 6, text: 'Preferences' },
    ];

    const handleOptionClick = (id) => {
      setSelectedId(id);
    };

    // DROPDOWNS
    const [maxPasswordAgeDropdown, setMaxPasswordAgeDropdown] = useState(false);
    const [defaultMaxPasswordText, setDefaultMaxPasswordText] = useState(
      'Max Password Age(Days)'
    );
    const [minPasswordAgeDropdown, setMinPasswordAgeDropdown] = useState(false);
    const [defaultMinPasswordText, setDefaultMinPasswordText] = useState(
      'Min Password Age(Days)'
    );
    const [minPasswordLengthDropdown, setMinPasswordLengthDropdown] =
      useState(false);
    const [defaultMinLengthPasswordText, setDefaultMinLengthPasswordText] =
      useState('Minimum Password Length');
    const [minCharClassDropdown, setMinCharClassDropdown] = useState(false);
    const [defaultMinCharClassText, setDefaultMinCharClassText] = useState(
      'Minimum Character Classes'
    );
    const [minUppCaseCharDropdown, setMinUppCaseCharDropdown] = useState(false);
    const [defaultMinUppCaseText, setDefaultMinUppCaseText] = useState(
      'Minimum Uppercase Character'
    );
    const [minLowCaseCharDropdown, setMinLowCaseCharDropdown] = useState(false);
    const [defaultMinLowCaseText, setDefaultMinLowCaseText] = useState(
      'Minimum Lowercase Character'
    );
    const [minNumericCharDropdown, setMinNumericCharDropdown] = useState(false);
    const [defaultNumericCharText, setDefaultNumericCharText] = useState(
      'Minimum Numeric Character'
    );
    const [minSpecialCharDropdown, setMinSpecialCharDropdown] = useState(false);
    const [defaultSpecialCharText, setDefaultSpecialCharText] = useState(
      'Minimum Special Characters'
    );

    // DUMMY DATA
    const minPassword = [
      { id: 1, name: 'Min Password' },
      { id: 2, name: 'Min Password' },
      { id: 3, name: 'Min Password' },
      { id: 4, name: 'Min Password' },
    ];

    const maxPassword = [
      { id: 1, name: 'Max Password' },
      { id: 2, name: 'Max Password' },
      { id: 3, name: 'Max Password' },
      { id: 4, name: 'Max Password' },
    ];

    const minPwdLen = [
      { id: 1, name: 8 },
      { id: 2, name: 8 },
      { id: 3, name: 8 },
      { id: 4, name: 8 },
    ];

    const minCharClass = [
      { id: 1, name: 8 },
      { id: 2, name: 8 },
      { id: 3, name: 8 },
      { id: 4, name: 8 },
    ];

    const minUpper = [
      { id: 1, name: 8 },
      { id: 2, name: 8 },
      { id: 3, name: 8 },
      { id: 4, name: 8 },
    ];

    const minLower = [
      { id: 1, name: 8 },
      { id: 2, name: 8 },
      { id: 3, name: 8 },
      { id: 4, name: 8 },
    ];

    const minNumeric = [
      { id: 1, name: 8 },
      { id: 2, name: 8 },
      { id: 3, name: 8 },
      { id: 4, name: 8 },
    ];

    const minSpecial = [
      { id: 1, name: 8 },
      { id: 2, name: 8 },
      { id: 3, name: 8 },
      { id: 4, name: 8 },
    ];

    // TOGGLE DROPDOWNS
    const toggleDropdownMaxPassword = () => {
      setMaxPasswordAgeDropdown(!maxPasswordAgeDropdown);
    };

    const toggleDropdownMinPassword = () => {
      setMinPasswordAgeDropdown(!minPasswordAgeDropdown);
    };

    const toggleDropdownMinPassLen = () => {
      setMinPasswordLengthDropdown(!minPasswordLengthDropdown);
    };

    const toggleDropdownMinCharClass = () => {
      setMinCharClassDropdown(!minCharClassDropdown);
    };

    const toggleDropdownMinUpper = () => {
      setMinUppCaseCharDropdown(!minUppCaseCharDropdown);
    };

    const toggleDropdownMinLower = () => {
      setMinLowCaseCharDropdown(!minLowCaseCharDropdown);
    };

    const toggleDropdownMinNumeric = () => {
      setMinNumericCharDropdown(!minNumericCharDropdown);
    };

    const toggleDropdownMinSpecial = () => {
      setMinSpecialCharDropdown(!minSpecialCharDropdown);
    };

    const handleDropdownMaxPassword = (name) => {
      setDefaultMaxPasswordText(name);
      setMaxPasswordAgeDropdown(!maxPasswordAgeDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinPassword = (name) => {
      setDefaultMinPasswordText(name);
      setMinPasswordAgeDropdown(!minPasswordAgeDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinPassLen = (name) => {
      setDefaultMinLengthPasswordText(name);
      setMinPasswordLengthDropdown(!minPasswordLengthDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinCharClass = (name) => {
      setDefaultMinCharClassText(name);
      setMinCharClassDropdown(!minCharClassDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinUpper = (name) => {
      setDefaultMinUppCaseText(name);
      setMinUppCaseCharDropdown(!minUppCaseCharDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinLower = (name) => {
      setDefaultMinLowCaseText(name);
      setMinLowCaseCharDropdown(!minLowCaseCharDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinNumeric = (name) => {
      setDefaultNumericCharText(name);
      setMinNumericCharDropdown(!minLowCaseCharDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    const handleDropdownMinSpecial = (name) => {
      setDefaultSpecialCharText(name);
      setMinSpecialCharDropdown(!minSpecialCharDropdown);
      setAddPassword((prev) => ({
        ...prev,
        name: name,
      }));
    };

    return (
      <div className="flex flex-col m-3 overflow-x-auto overflow-y-hidden">
        <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
          <h1 className="text-xl">Add Password Policy</h1>
          <div
            onClick={handleCancel}
            className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
          >
            Cancel
          </div>
        </div>
        <div className="overflow-hidden shadow-md">
          <div className="py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
            <h1 className="text-white">Password Policy Details</h1>
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
                        value={addPassword.title}
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
                        value={addPassword.description}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
                      />
                    </div>
                  </div>
                  {/* SECOND */}
                  <div className="flex space-x-4">
                    {/* Enabled */}
                    <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
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
                    <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                      <label
                        htmlFor="granted"
                        className="text-sm font-medium text-gray-700"
                      >
                        Granted
                      </label>
                      <input
                        type="checkbox"
                        name="granted"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                  </div>
                  {/* THIRD */}
                  <div className="flex space-x-4">
                    {/* Valid Always */}
                    <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                      <label
                        htmlFor="validAlways"
                        className="text-sm font-medium text-gray-700"
                      >
                        Valid Always
                      </label>
                      <input
                        type="checkbox"
                        name="validAlways"
                        className="flex justify-start py-1 px-1 h-5 w-5"
                      />
                    </div>
                  </div>
                  {/* FOURTH */}
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
                        value={addPassword.validFrom}
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
                        value={addPassword.validTo}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        placeholder="Enter device type"
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
            {/* EXPIRATION */}
            {selectedId === 1 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
                    Expiration
                  </h1>

                  <div className="grid gap-2 py-3 px-3">
                    {/* FIRST */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="validAlways"
                          className="text-sm font-medium text-gray-700"
                        >
                          Valid Always
                        </label>
                        <input
                          type="checkbox"
                          name="validAlways"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                    {/* SECOND */}
                    <div className="flex space-x-4 w-full">
                      {/* FROM (Hours) DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="maxPassAge"
                          className="text-sm font-medium text-gray-700"
                        >
                          Max Password Age(Days)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMaxPassword}
                          onMouseLeave={() => setMaxPasswordAgeDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="maxPassAge"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.maxPassAge
                              : defaultMaxPasswordText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {maxPasswordAgeDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {maxPassword.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownMaxPassword(name)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Minutes DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minPassAge"
                          className="text-sm font-medium text-gray-700"
                        >
                          Min Password Age(Days)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinPassword}
                          onMouseLeave={() => setMinPasswordAgeDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minPassAge"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minPassAge
                              : defaultMinPasswordText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minPasswordAgeDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minPassword.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownMinPassword(name)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* THIRD */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="passwordNeverExp"
                          className="text-sm font-medium text-gray-700"
                        >
                          Password Never Expires
                        </label>
                        <input
                          type="checkbox"
                          name="passwordNeverExp"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                          defaultChecked
                        />
                      </div>
                    </div>
                    {/* FOURTH */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 w1/2 gap-2">
                        <input
                          type="checkbox"
                          name="passwordNeverExp"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                        <label
                          htmlFor="passwordNeverExp"
                          className="text-sm font-medium text-gray-700"
                        >
                          Force User To Change Password at next Login.
                        </label>
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
              </>
            )}

            {/* COMPLEOCITY */}
            {selectedId === 2 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Compleocity
                  </h1>

                  <div className="grid gap-2 py-3 px-3">
                    {/* FIRST */}
                    <div className="flex space-x-4 w-full">
                      {/* FROM (Hours) DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minPassLen"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minimum Password Length
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinPassLen}
                          onMouseLeave={() =>
                            setMinPasswordLengthDropdown(false)
                          }
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minPassLen"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minPassLen
                              : defaultMinLengthPasswordText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minPasswordLengthDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minPwdLen.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownMinPassLen(name)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Minutes DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minCharClass"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minimum Character Classes from the following four
                          Categories
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinCharClass}
                          onMouseLeave={() => setMinCharClassDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minCharClass"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minCharClass
                              : defaultMinCharClassText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minCharClassDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minCharClass.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownMinCharClass(name)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* SECOND */}
                    <h1 className="text-md font-medium text-gray-700 mt-2">
                      Required Alpha Character
                    </h1>
                    <div className="flex space-x-4 w-full">
                      {/* FROM (Hours) DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minUpperChar"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minimum Uppercase character (A-Z)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinUpper}
                          onMouseLeave={() => setMinUppCaseCharDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minUpperChar"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minUpperChar
                              : defaultMinUppCaseText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minUppCaseCharDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minUpper.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() => handleDropdownMinUpper(name)}
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Minutes DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minLowerChar"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minimum Lowercase Characters (A-Z)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinLower}
                          onMouseLeave={() => setMinLowCaseCharDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minLowerChar"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minLowerChar
                              : defaultMinLowCaseText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minLowCaseCharDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minLower.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() => handleDropdownMinLower(name)}
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* THIRD */}
                    <h1 className="text-md font-medium text-gray-700 mt-2">
                      Required Non Alpha Characters
                    </h1>
                    <div className="flex space-x-4 w-full">
                      {/* FROM (Hours) DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minNumericChar"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minimum Numeric character (0-9)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinNumeric}
                          onMouseLeave={() => setMinNumericCharDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minNumericChar"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minNumericChar
                              : defaultNumericCharText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minNumericCharDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minNumeric.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownMinNumeric(name)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Minimum Special Characters (A-Z) */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minSpeChar"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minimum Special Characters (A-Z)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinSpecial}
                          onMouseLeave={() => setMinSpecialCharDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minSpeChar"
                            type="button"
                          >
                            {isEditMode
                              ? addPassword.minSpeChar
                              : defaultSpecialCharText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minSpecialCharDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minSpecial.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() =>
                                      handleDropdownMinSpecial(name)
                                    }
                                    className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

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
            {/* RESTRICTION */}
            {selectedId === 3 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Restriction
                  </h1>

                  <div className="grid gap-3 pb-3 w-full px-3 mt-3">
                    {/* FIRST */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="validAlways"
                          className="text-sm font-medium text-gray-700"
                        >
                          Disallow username in password
                        </label>
                        <input
                          type="checkbox"
                          name="validAlways"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                    {/* SECOND */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="validAlways"
                          className="text-sm font-medium text-gray-700"
                        >
                          Disallow digit as first character in password
                        </label>
                        <input
                          type="checkbox"
                          name="validAlways"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                    {/* THIRD */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="validAlways"
                          className="text-sm font-medium text-gray-700"
                        >
                          Disallow parts of the user’s full name that exceed two
                          consecutive character in the password
                        </label>
                        <input
                          type="checkbox"
                          name="validAlways"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                    {/* FOURTH */}
                    <div className="flex space-x-4">
                      <div className="flex flex-1 flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="validAlways"
                          className="text-sm font-medium text-gray-700"
                        >
                          Exclude Keywords in password
                        </label>
                        <input
                          type="checkbox"
                          name="validAlways"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                  </div>

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
              </>
            )}
            {/* HISTORIC PASSWORD */}
            {selectedId === 4 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Historic Password
                  </h1>
                  <div className="mb-6 py-3 flex flex-col gap-2">
                    {/* MAIN CART */}
                    <div className="grid gap-2 pb-3 w-full px-3">
                      <div className="flex space-x-4">
                        {/* ENABLE */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="enable"
                            className="text-sm font-medium text-gray-700"
                          >
                            Enable Save Historic Password
                          </label>
                          <input
                            type="checkbox"
                            name="enable"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                      </div>
                    </div>

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
            {/* ACCOUNT LOCK */}
            {selectedId === 5 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Account Lock
                  </h1>
                  <div className="mb-6 py-3 flex flex-col gap-2">
                    {/* MAIN CART */}
                    <div className="grid gap-2 pb-3 w-full px-3">
                      <div className="flex space-x-4">
                        {/* ENABLE */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="enable"
                            className="text-sm font-medium text-gray-700"
                          >
                            Enable Account Lock
                          </label>
                          <input
                            type="checkbox"
                            name="enable"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                      </div>
                    </div>

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
            {/* PREFERENCES */}
            {selectedId === 6 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Preferences
                  </h1>
                  <div className="mb-6 py-3 flex flex-col gap-2">
                    {/* MAIN CART */}
                    <div className="grid gap-2 pb-3 w-full px-3">
                      <div className="flex space-x-4">
                        {/* ENABLE */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="enable"
                            className="text-sm font-medium text-gray-700"
                          >
                            Enable Notification on password chenged
                          </label>
                          <input
                            type="checkbox"
                            name="enable"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col w-1/2">
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="enable"
                            className="text-sm font-medium text-gray-700"
                          >
                            Logout user on password changed
                          </label>
                          <input
                            type="checkbox"
                            name="enable"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                      </div>
                    </div>

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

  return (
    <>
      {activeComponent === 'Table' ? (
        <PasswordPolicyTable />
      ) : activeComponent === 'Add' ? (
        <AddPasswordPolicy />
      ) : activeComponent === 'Update' ? (
        <UpdatePasswordPolicy />
      ) : (
        ''
      )}
    </>
  );
}
