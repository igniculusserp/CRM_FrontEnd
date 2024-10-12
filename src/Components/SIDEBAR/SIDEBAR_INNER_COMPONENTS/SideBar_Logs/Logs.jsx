import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Chat from './LogComponents/Chat';
import Extension from './LogComponents/Extension';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import LoginTable from './LogComponents/LoginTable';

export default function Logs() {
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  //   LOGS DATA
  const logsData = [
    {
      id: 1,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 2,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 3,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 4,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 5,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 6,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 7,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 8,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 9,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 10,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 11,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 12,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 13,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 14,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
    {
      id: 15,
      mobNo: 9326766137,
      clientName: 'Shubham Mishra',
      createdBy: 'Admin',
      operation: 'Global View',
      createdTime: '12:03 Time',
      fromUsername: 1234567890,
      toUsername: 'Rahul Sharma',
      message: 'Hello dude! how are you',
      created: '12:03 Am',
      username: 'Vikas Koli',
      extensionNumber: 123456,
      givenTime: '12:03 Am',
      ipAddress: '45.117.73.26',
      macAddress: '98-43-FA-28-3C-34',
      loginTime: '1 hr ago.'
    },
  ];

  const paginate = (page) => setCurrentPage(page);
  const [getLogs, setGetLogs] = useState(logsData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = getLogs.slice(indexOfFirstItem, indexOfLastItem);

  //   Stripe Bar
  const stripeBar = [
    { key: 1, value: 'Table View' },
    { key: 2, value: 'Grid View' },
  ];

  const [selectedViewValue, setSelectedViewValue] = useState(
    stripeBar[0].value
  );

  //   THREE BUTTONS
  // Object containing the options
  const dynamicButtons = {
    Clients: { text: 'Add Client Logs', href: '/sidebar/createlogs' },
    'SMS Logs': {},
    Chat: {
      text: 'Add Chat Logs',
      href: '/sidebar/createchats',
    },
    Login: { text: 'Add Login Logs', href: '/sidebar/createlogin' },
    Extension: { text: 'Add Extension Logs', href: '/sidebar/createextension' },
  };

  const [selectedButton, setSelectedButton] = useState('Clients');

  // State to manage the button text
  const [buttonText, setButtonText] = useState({
    text: 'Add Clients Log',
    href: '/sidebar/createlogs',
  });

  const handleClick = (key) => {
    setButtonText(dynamicButtons[key]);
    setSelectedButton(key);
  };

  return (
    <div className="min-h-screen flex flex-col mx-3 mt-3">
      {/* BUTTONS */}
      {/* MIDDLE */}
      <div className="py-2 px-1 bg-white flex items-center justify-between rounded-md">
        <div className="flex gap-4">
          {Object.keys(dynamicButtons).map((key) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className={`px-6 py-1.5 rounded font-light text-md
                ${
                  selectedButton === key
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }
              `}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* CREATE CLIENT LOGS */}
      <div className="flex py-3 px-1 items-center justify-between">
        <h1 className="text-3xl font-medium">View Client Logs</h1>
        <div className="flex gap-2">
          <Link to={buttonText.href}>
            <button className="px-4 py-2 bg-blue-600 text-center text-md text-white rounded-md">
              {buttonText.text}
            </button>
          </Link>
        </div>
        {/* END */}
      </div>

      {/* TABLE VIEW */}
      <div className="overflow-x-auto">
        {/* CLIENTS TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {/*-------Table-------*/}
          {selectedViewValue === 'Table View' &&
            selectedButton === 'Clients' && (
              <table className="min-w-full bg-white">
                {/* -------------- TABLE HEAD START -------------- */}
                <thead>
                  <tr className="border-gray-300 border-b-2">
                    {/* CHECKBOX */}
                    <th className="pl-3 py-3  text-left font-medium ">
                      <input type="checkbox" />
                    </th>
                    {/* MOBILE NUMBER */}
                    <th className="px-1 py-3  text-left  border-r font-medium ">
                      <div className="flex items-center justify-between">
                        <span className="text-left align-baseline">
                          Mobile Number
                        </span>
                        <FaBars />
                      </div>
                    </th>
                    {/* CLIENT NAME */}
                    <th className="px-3 py-3  text-left  border-r font-medium ">
                      <div className="flex items-center justify-between">
                        <span>Client Name</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* CREATED BY */}
                    <th className="px-6 py-3  text-left  border-r font-medium ">
                      <div className="flex items-center justify-between">
                        <span>Created By</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* OPERATIONS */}
                    <th className="px-6 py-3  text-left  border-r font-medium ">
                      <div className="flex items-center justify-between">
                        <span>Operation</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* CREATED TIME */}
                    <th className="px-6 py-3  text-left  border-r font-medium ">
                      <div className="flex items-center justify-between">
                        <span>Created Time</span>
                        <FaBars />
                      </div>
                    </th>
                    {/* ACTION */}
                    <th className="px-6 py-3  text-left  border-r font-medium ">
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                {/* -------------- TABLE HEAD END -------------- */}
                <tbody></tbody>
                {/* -------------- TABLE BODY START -------------- */}
                <tbody>
                  {currentLogs.map((log, i) => (
                    <tr
                      key={i}
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                    >
                      {/*   CHECKBOX */}
                      <td className="pl-3 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <input type="checkbox" />
                      </td>
                      {/*   MOBILE NUMBER */}
                      <td className="px-1 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex gap-2 items-center">
                          {log.mobNo}
                        </div>
                      </td>
                      {/*   CLIENT NAME */}
                      <td className="px-6 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex gap-2 items-center">
                          {log.username}
                        </div>
                      </td>
                      {/*   CREATED BY */}
                      <td className="px-6 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex gap-2 items-center text-blue-600">
                          {log.createdBy}
                        </div>
                      </td>
                      {/*   OPERATION */}
                      <td className="px-6 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex gap-2 items-center">
                          {log.operation}
                        </div>
                      </td>
                      {/*   CREATED TIME */}
                      <td className="px-6 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex gap-2 items-center text-blue-600">
                          {log.createdTime}
                        </div>
                      </td>
                      {/*   ACTIONS */}
                      <td className="px-6 py-4 border-b border-gray-300 text-sm leading-5 text-gray-600">
                        <div className="flex gap-2 items-center text-blue-600">
                          <MdEdit
                            size={25}
                            color="white"
                            className="bg-blue-500 rounded"
                          />
                          <RiDeleteBin6Fill size={25} color="red" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* -------------- TABLE BODY END -------------- */}
              </table>
            )}
        </div>
        {/* CHAT TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {/*-------Table-------*/}
          {selectedViewValue === 'Table View' && selectedButton === 'Chat' && (
            <Chat currentLogs={currentLogs} />
          )}
        </div>
        {/* LOGIN TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {/*-------Table-------*/}
          {selectedViewValue === 'Table View' &&
            selectedButton === 'Login' && (
              <LoginTable currentLogs={currentLogs} />
            )}
        </div>
        {/* EXTENSION TABLE */}
        <div className="min-w-full overflow-hidden rounded-md">
          {/*-------Table-------*/}
          {selectedViewValue === 'Table View' &&
            selectedButton === 'Extension' && (
              <Extension currentLogs={currentLogs} />
            )}
        </div>
      </div>

      {selectedViewValue === 'Table View' && (
        <>
          <div className="flex justify-end m-4">
            <nav>
              <ul className="inline-flex items-center">
                {Array.from(
                  { length: Math.ceil(getLogs.length / itemsPerPage) },
                  (_, i) => (
                    <li key={i + 1}>
                      <button
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 mx-1 ${
                          currentPage === i + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 border'
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
