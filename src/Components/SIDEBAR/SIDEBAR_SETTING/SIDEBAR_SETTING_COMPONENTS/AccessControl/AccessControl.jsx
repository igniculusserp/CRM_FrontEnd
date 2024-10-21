import { useState } from 'react';
import { FaAngleDown, FaBars } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';

export default function AccessControl() {
  const [activeComponent, setActiveComponent] = useState('Table');
  const [isEditMode, setIsEditMode] = useState(false);

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
      latitude: '',
      longitude: '',
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

    const tableData = ['Fire Fox', 'Internet Explorer', 'Chrome'];

    const ipTableData = [
      { id: 1, name: 'Rahul', range: 12, ipRangeFrom: 120, ipRangeTo: 120 },
    ];

    // COUNTRY DROPDOWN
    const [countryDropdown, setCountryDropdown] = useState(false);
    const [defaultCountryText, setDefaultCountryText] = useState('Country');
    const [fromHourDropdown, setFromHourDropdown] = useState(false);
    const [defaultFromHourText, setDefaultFromHourText] = useState('From');
    const [toHourDropdown, setToHourDropdown] = useState(false);
    const [defaultToHourText, setDefaultToHourText] = useState('To');
    const [minuteDropdown, setMinuteDropdown] = useState(false);
    const [defaultMinuteText, setDefaultMinuteText] = useState('Minute');
    const [latitudeDropdown, setLatitudeDropdown] = useState(false);
    const [defaultLatitudeText, setDefaultLatitudeText] = useState('Latitude');
    const [longitudeDropdown, setLongitudeDropdown] = useState(false);
    const [defaultLongitudeText, setDefaultLongitudeText] =
      useState('Longitude');
    const [radiusDropdown, setRadiusDropdown] = useState(false);
    const [defaultRadiusText, setDefaultRadiusText] = useState('Radius');

    // FOR CHECKBOX CONTENT
    const [checked, setChecked] = useState(false);

    // TOGGLE COUNTRY
    const toggleDropdownCountry = () => {
      setCountryDropdown(!countryDropdown);
    };

    // DUMMY COUNTRIES
    const countries = [
      { id: 1, name: 'India' },
      { id: 2, name: 'America' },
      { id: 3, name: 'England' },
      { id: 4, name: 'Russia' },
      { id: 5, name: 'Japan' },
    ];

    const handleDropdownCountry = (name) => {
      setDefaultCountryText(name);
      setCountryDropdown(!countryDropdown);
      setAddAccess((prev) => ({
        ...prev,
        name: name,
      }));
    };

    // FROM HOUR TOGGLE
    const toggleDropdownFrom = () => {
      setFromHourDropdown(!fromHourDropdown);
    };

    // FROM HOUR DUMMY
    const fromHour = [
      { id: 1, name: '12' },
      { id: 2, name: '1' },
      { id: 3, name: '10' },
    ];

    const handleDropdownFrom = (name) => {
      setDefaultFromHourText(name);
      setFromHourDropdown(!fromHourDropdown);
      setAddAccess((prev) => ({
        ...prev,
        name: name,
      }));
    };

    //   TO HOUR TOGGLE
    const toggleDropdownTo = () => {
      setToHourDropdown(!toHourDropdown);
    };

    // TO HOUR DUMMY
    const toHour = [
      { id: 1, name: '12' },
      { id: 2, name: '1' },
      { id: 3, name: '10' },
    ];

    const handleDropdownTo = (name) => {
      setDefaultToHourText(name);
      setToHourDropdown(!toHourDropdown);
      setAddAccess((prev) => ({
        ...prev,
        name: name,
      }));
    };

    //   MINUTE TOGGLE
    const toggleDropdownMinute = () => {
      setMinuteDropdown(!minuteDropdown);
    };

    // MINUTE DUMMY
    const minute = [
      { id: 1, name: 15 },
      { id: 2, name: 30 },
      { id: 3, name: 45 },
    ];

    const handleDropdownMinute = (name) => {
      setDefaultMinuteText(name);
      setMinuteDropdown(!minuteDropdown);
      setAddAccess((prev) => ({
        ...prev,
        name: name,
      }));
    };

    // LATITUDE TOGGLE
    const toggleDropdownLatitude = () => {
      setLatitudeDropdown(!latitudeDropdown);
    };

    // LATITUDE DUMMY
    const latitude = [
      { id: 1, name: 'latitude' },
      { id: 2, name: 'latitude' },
      { id: 3, name: 'latitude' },
      { id: 4, name: 'latitude' },
    ];

    const handleDropdownLatitude = (name) => {
      setDefaultLatitudeText(name);
      setLatitudeDropdown(!latitudeDropdown);
      setAddAccess((prev) => ({
        ...prev,
        name: name,
      }));
    };

    //   LONGITUDE
    const toggleDropdownLongitude = () => {
      setLongitudeDropdown(!longitudeDropdown);
    };

    // LONGITUDE DUMMY
    const longitude = [
      { id: 1, name: 'longitude' },
      { id: 2, name: 'longitude' },
      { id: 3, name: 'longitude' },
    ];

    const handleDropdownLongitude = (name) => {
      setDefaultLongitudeText(name);
      setLongitudeDropdown(!longitudeDropdown);
      setAddAccess((prev) => ({
        ...prev,
        name: name,
      }));
    };

    // TOGGLE RADIUS
    const toggleDropdownRadius = () => {
      setRadiusDropdown(!radiusDropdown);
    };

    // RADIUS DUMMY
    const radius = [
      { id: 1, name: 'radius' },
      { id: 2, name: 'radius' },
      { id: 3, name: 'radius' },
    ];

    const handleDropdownRadius = (name) => {
      setDefaultRadiusText(name);
      setRadiusDropdown(!radiusDropdown);
      setAddAccess((prev) => ({
        ...prev,
        name: name,
      }));
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
            <div className="flex gap-3 my-3 items-center">
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
            {/* BROWSE RESTRICTION */}
            {selectedId === 1 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
                    Browse Restriction
                  </h1>

                  <div className="grid gap-2 py-3 px-3">
                    {/* FIRST */}
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
                    </div>
                    {/* SECOND */}
                    <div className="flex space-x-4">
                      {/* Valid Always */}
                      <div className="flex flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="blockAccess"
                          className="text-sm font-medium text-gray-700"
                        >
                          Block Access from mobile browser
                        </label>
                        <input
                          type="checkbox"
                          name="blockAccess"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mx-6 py-3">
                    {/* MAIN CART */}
                    <div className="overflow-x-auto rounded-t-xl rounded-b-md">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="bg-cyan-500 rounded-t-xl">
                            <th className="px-4 py-2 text-white font-light">
                              Browser
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Enabled
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Version
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((item, idx) => (
                            <tr key={idx} className="bg-gray-100 border-b">
                              <td className="px-8 py-2">{item}</td>
                              <td className="py-2 text-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox"
                                />
                              </td>
                              <td className="px-3 py-2 text-center">
                                <input
                                  type="text"
                                  className="py-1 border border-gray-300 px-6"
                                  placeholder="Enter browser version"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

            {/* IP RESTRICTION */}
            {selectedId === 2 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    IP Restriction
                  </h1>

                  <div className="grid gap-2 py-3 px-3">
                    {/* FIRST */}
                    <div className="flex space-x-4">
                      {/* Enabled */}
                      <div className="flex flex-col w1/2 gap-1 justify-start items-start">
                        <label
                          htmlFor="enable"
                          className="text-sm font-medium text-gray-700"
                        >
                          Enable
                        </label>
                        <input
                          type="checkbox"
                          name="enable"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 py-3 flex flex-col gap-2">
                    {/* MAIN CART */}
                    <div className="overflow-x-auto rounded-t-xl rounded-b-md">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="bg-cyan-500 rounded-t-xl">
                            <th className="px-4 py-2 text-white font-light">
                              Name
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Range
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              IP Range From
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              IP Range To
                            </th>
                            <th className="px-4 py-2 text-white font-light">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {ipTableData.map((item) => (
                            <tr key={item.id} className="bg-gray-100 border-b">
                              <td className="py-2 text-center">{item.name}</td>
                              <td className="px-3 py-2 text-center">
                                {item.range}
                              </td>
                              <td className="px-3 py-2 text-center">
                                {item.ipRangeFrom}
                              </td>
                              <td className="px-3 py-2 text-center">
                                {item.ipRangeTo}
                              </td>
                              <td className="px-3 py-2 text-center"></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
            {/* TIME RESTRICTION */}
            {selectedId === 3 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Time Restriction
                  </h1>

                  <div className="grid gap-2 pb-3 w-full px-3">
                    <div className="flex space-x-4">
                      {/* ENABLE TIME RESTRICTION */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="enableTimeRestriction"
                          className="text-sm font-medium text-gray-700"
                        >
                          Enable Time Restriction
                        </label>
                        <input
                          type="checkbox"
                          name="enableTimeRestriction"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                    {/* SECOND */}
                    <div className="flex space-x-4">
                      {/* TIME ZONE */}
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="timeZone"
                          className="text-sm font-medium text-gray-700"
                        >
                          Time Zone
                        </label>
                        <input
                          type="text"
                          name="timeZone"
                          value={addAccess.timeZone}
                          className="mt-1 p-2 border border-gray-300 rounded-md"
                          onChange={handleChange}
                          placeholder="Enter device type"
                        />
                      </div>
                    </div>
                    {/* THIRD */}
                    <div className="flex space-x-4 w-full">
                      {/* FROM (Hours) DROPDOWN */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="fromHour"
                          className="text-sm font-medium text-gray-700"
                        >
                          From(Hour)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownFrom}
                          onMouseLeave={() => setFromHourDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="fromHour"
                            type="button"
                          >
                            {isEditMode
                              ? addAccess.fromHour
                              : defaultFromHourText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {fromHourDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {fromHour.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() => handleDropdownFrom(name)}
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
                          htmlFor="minutes"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minutes
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinute}
                          onMouseLeave={() => setMinuteDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minutes"
                            type="button"
                          >
                            {isEditMode ? addAccess.minutes : defaultMinuteText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minuteDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minute.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() => handleDropdownMinute(name)}
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
                    {/* FOURTH */}
                    <div className="flex space-x-4 w-full">
                      {/* TO (Hours) */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="toHour"
                          className="text-sm font-medium text-gray-700"
                        >
                          To(Hour)
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownTo}
                          onMouseLeave={() => setToHourDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="toHour"
                            type="button"
                          >
                            {isEditMode ? addAccess.toHour : defaultToHourText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {toHourDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {toHour.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() => handleDropdownTo(name)}
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
                      {/* Minutes */}
                      <div className="flex flex-col w-1/2 relative">
                        <label
                          htmlFor="minutes"
                          className="text-sm font-medium text-gray-700"
                        >
                          Minutes
                        </label>
                        <div
                          className="relative"
                          onClick={toggleDropdownMinute}
                          onMouseLeave={() => setMinuteDropdown(false)}
                        >
                          <button
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                            id="minutes"
                            type="button"
                          >
                            {isEditMode ? addAccess.minutes : defaultMinuteText}
                            <FaAngleDown className="ml-2 text-gray-400" />
                          </button>
                          {minuteDropdown && (
                            <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                              <ul className="py-2 text-sm text-gray-700">
                                {minute.map(({ key, name }) => (
                                  <li
                                    key={key}
                                    onClick={() => handleDropdownMinute(name)}
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
                    {/* FIFTH */}
                    <div className="flex space-x-4 w-full">
                      {/* NEXT DAY */}
                      <div className="flex flex-col w1/2 w-full">
                        <label
                          htmlFor="nextDay"
                          className="text-sm font-medium text-gray-700"
                        >
                          Next Day
                        </label>
                        <input
                          type="checkbox"
                          name="nextDay"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                      {/* Minutes */}
                      <div className="flex flex-col w1/2 w-full">
                        <label
                          htmlFor="forceLogout"
                          className="text-sm font-medium text-gray-700"
                        >
                          Force Logout
                        </label>
                        <input
                          type="checkbox"
                          name="forceLogout"
                          className="flex justify-start py-1 px-1 h-5 w-5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col p-3">
                    <h1 className="font-light text-lg">Select Days Of Week</h1>
                    <div className="flex items-center gap-6">
                      {/* SUNDAY */}
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-5 h-5" />
                        <p className="text-md font-light">Sunday</p>
                      </div>
                      {/* MONDAY */}
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-5 h-5" />
                        <p className="text-md font-light">Monday</p>
                      </div>
                      {/* TUESDAY */}
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-5 h-5" />
                        <p className="text-md font-light">Tuesday</p>
                      </div>
                      {/* WEDNESDAY */}
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-5 h-5" />
                        <p className="text-md font-light">Wednesday</p>
                      </div>
                      {/* THURSDAY */}
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-5 h-5" />
                        <p className="text-md font-light">Thursday</p>
                      </div>
                      {/* FRIDAY */}
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-5 h-5" />
                        <p className="text-md font-light">Friday</p>
                      </div>
                      {/* SATURDAY */}
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-5 h-5" />
                        <p className="text-md font-light">Saturday</p>
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
            {/* DEVICE RESTRICTION */}
            {selectedId === 4 && (
              <>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-6 bg-cyan-500 rounded-t-xl mt-3">
                    Device Restriction
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
                            Enable
                          </label>
                          <input
                            type="checkbox"
                            name="enable"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                        {/* ENABLE MAC BINDING */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="enableMacBinding"
                            className="text-sm font-medium text-gray-700"
                          >
                            Enable Mac Binding
                          </label>
                          <input
                            type="checkbox"
                            name="enableMacBinding"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                      </div>
                      {/* FIFTH */}
                      <div className="flex space-x-4 w-full">
                        {/* Certificate Based Device Restriction */}
                        <div className="flex flex-col w1/2 w-full">
                          <label
                            htmlFor="certificate"
                            className="text-sm font-medium text-gray-700"
                          >
                            Certificate Based Device Restriction
                          </label>
                          <input
                            type="checkbox"
                            name="certificate"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                        {/* Minutes */}
                        <div className="flex flex-col w1/2 w-full">
                          <label
                            htmlFor="enableWindow"
                            className="text-sm font-medium text-gray-700"
                          >
                            Enable Windows Login Id Binding
                          </label>
                          <input
                            type="checkbox"
                            name="enableWindow"
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
            {/* GEO LOCATION */}
            {selectedId === 5 && (
              <div className='bg-white rounded-xl'>
                <div className="bg-white rounded-xl">
                  <h1 className="text-white py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
                    Geo Location
                  </h1>
                  <div className="py-3 flex flex-col gap-2">
                    {/* MAIN CART */}
                    <div className="grid gap-2 pb-3 w-full px-3">
                      {/* FIRST */}
                      <div className="flex space-x-4">
                        {/* ENABLE */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="enable"
                            className="text-sm font-medium text-gray-700"
                          >
                            Enable
                          </label>
                          <input
                            type="checkbox"
                            name="enable"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex space-x-4">
                        {/* COUNTRY */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="country"
                            className="text-sm font-medium text-gray-700"
                          >
                            Country
                          </label>
                          <input
                            type="checkbox"
                            name="country"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                          />
                        </div>
                        {/* CUSTOM */}
                        <div className="flex flex-col w-1/2">
                          <label
                            htmlFor="custom"
                            className="text-sm font-medium text-gray-700"
                          >
                            Custom
                          </label>
                          <input
                            type="checkbox"
                            name="custom"
                            className="flex justify-start py-1 px-1 h-5 w-5"
                            onClick={() => setChecked(!checked)}
                          />
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex space-x-4 w-[49%]">
                        {/* COUNTRY DROPDOWN */}
                        {/* -------------Country------------- */}
                        <div className="flex flex-col flex-1 relative">
                          <label
                            htmlFor="country"
                            className="text-sm font-medium text-gray-700"
                          >
                            Country
                          </label>
                          <div
                            className="relative"
                            onClick={toggleDropdownCountry}
                            onMouseLeave={() => setCountryDropdown(false)}
                          >
                            <button
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                              id="country"
                              type="button"
                            >
                              {isEditMode
                                ? addAccess.country
                                : defaultCountryText}
                              <FaAngleDown className="ml-2 text-gray-400" />
                            </button>
                            {countryDropdown && (
                              <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                                <ul className="py-2 text-sm text-gray-700">
                                  {countries.map(({ key, name }) => (
                                    <li
                                      key={key}
                                      onClick={() =>
                                        handleDropdownCountry(name)
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
                      {/* FOURTH AND CHECKBOX CONDITIONALING */}
                      <div className="flex flex-col">
                        {checked && (
                          <>
                            {/* FIRST */}
                            <div className="flex space-x-4 w-full">
                                {/* LATITUDE DROPDOWN */}
                              <div className="flex flex-col flex-1 relative w-[49%]">
                                <label
                                  htmlFor="latitude"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Latitude
                                </label>
                                <div
                                  className="relative"
                                  onClick={toggleDropdownLatitude}
                                  onMouseLeave={() => setLatitudeDropdown(false)}
                                >
                                  <button
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                                    id="latitude"
                                    type="button"
                                  >
                                    {isEditMode
                                      ? addAccess.latitude
                                      : defaultLatitudeText}
                                    <FaAngleDown className="ml-2 text-gray-400" />
                                  </button>
                                  {latitudeDropdown && (
                                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                                      <ul className="py-2 text-sm text-gray-700">
                                        {latitude.map(({ key, name }) => (
                                          <li
                                            key={key}
                                            onClick={() =>
                                              handleDropdownLatitude(name)
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
                              {/* LONGITUDE DROPDOWN */}
                              <div className="flex flex-col flex-1 w-1/2 relative">
                                <label
                                  htmlFor="longitude"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Longitude
                                </label>
                                <div
                                  className="relative"
                                  onClick={toggleDropdownLongitude}
                                  onMouseLeave={() => setLongitudeDropdown(false)}
                                >
                                  <button
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                                    id="longitude"
                                    type="button"
                                  >
                                    {isEditMode
                                      ? addAccess.longitude
                                      : defaultLongitudeText}
                                    <FaAngleDown className="ml-2 text-gray-400" />
                                  </button>
                                  {longitudeDropdown && (
                                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                                      <ul className="py-2 text-sm text-gray-700">
                                        {longitude.map(({ key, name }) => (
                                          <li
                                            key={key}
                                            onClick={() =>
                                              handleDropdownLongitude(name)
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
                            <div className="flex-1 w-[49%]">
                                {/* RADIUS DROPDOWN */}
                              <div className="flex flex-col flex-1 relative">
                                <label
                                  htmlFor="radius"
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Radius
                                </label>
                                <div
                                  className="relative"
                                  onClick={toggleDropdownRadius}
                                  onMouseLeave={() => setRadiusDropdown(false)}
                                >
                                  <button
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                                    id="radius"
                                    type="button"
                                  >
                                    {isEditMode
                                      ? addAccess.radius
                                      : defaultRadiusText}
                                    <FaAngleDown className="ml-2 text-gray-400" />
                                  </button>
                                  {radiusDropdown && (
                                    <div className="absolute w-full bg-white border border-gray-300 rounded-md top-10.5 z-10">
                                      <ul className="py-2 text-sm text-gray-700">
                                        {radius.map(({ key, name }) => (
                                          <li
                                            key={key}
                                            onClick={() =>
                                              handleDropdownRadius(name)
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
                          </>
                        )}
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
              </div>
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
