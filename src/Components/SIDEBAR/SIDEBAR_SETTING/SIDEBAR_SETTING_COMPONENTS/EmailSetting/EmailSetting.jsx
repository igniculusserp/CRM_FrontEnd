import { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import axios from 'axios';
import { tenant_base_url, protocal_url } from './../../../../../Config/config';

// ------------------- CHILD COMPONENTS -------------------
import EditEmailSetting from './Edit_Page/EditEmailSetting';
import AddEmailSetting from './Add_Page/AddEmailSetting';

export default function EmailSetting() {
  const [activeComponent, setActiveComponent] = useState('Table');
  const [users, setUsers] = useState([
    {
      id: '1',
      senderEmail: '12a02',
      port: 'Vibarant',
      serverObligRelay: 'Font Share',
      key: 'dfadklfa',
      keyEmailTemplate: 'Targeted',
    },
    {
      id: '2',
      senderEmail: '12a02',
      port: 'Vibarant',
      serverObligRelay: 'Font Share',
      key: 'dfadklfa',
      keyEmailTemplate: 'Targeted',
    },
  ]);

  // Handle cancel form action
  const handleAdd = () => {
    setActiveComponent('Add');
  };

  const handleEdit = (id) => {
    setActiveComponent('Update');
    // setIdGet(id);
  };

  const handleCheckboxClick = (e, userId) => {
    e.stopPropagation();
    console.log(`Checkbox clicked for user: ${userId}`);
  };

  async function handleGroup() {
    const bearer_token = localStorage.getItem('token');

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${
          window.location.hostname.split('.')[0]
        }.${tenant_base_url}/Admin/leadstatus/getall`,
        config
      );
      setplanType(response.data.data);
      console.log('Plan data:', response.data.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  }

  useEffect(() => {
    handleGroup();
  }, []);

  //
  const EmailSettingTable = () => {
    return (
      <div className="m-3 min-w-screen">
        <>
          <div className="flex min-w-screen justify-between items-center">
            <h1 className="text-3xl font-medium">Email Setting</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
            >
              Add Email Setting
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
                        <span>Sender Email</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Port Number</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Relay Server Name</span>
                        <FaBars />
                      </div>
                    </th>

                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Email</span>
                        <FaBars />
                      </div>
                    </th>
                    <th className="px-2 py-3 text-left border-r font-medium">
                      <div className="flex justify-between items-center text-sm">
                        <span>Key</span>
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
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b"
                    >
                      <td className="px-1 py-3 text-center">
                        <input
                          type="checkbox"
                          onClick={(e) => handleCheckboxClick(e, user.id)}
                        />
                      </td>
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {user.senderEmail}
                      </td>
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {user.port}
                      </td>
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {user.serverObligRelay}
                      </td>
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {user.keyEmailTemplate}
                      </td>
                      <td className="px-2 py-4 text-sm max-w-24 break-words">
                        {user.key}
                      </td>
                      <td className="px-2 py-4 flex gap-3 justify-center">
                        <MdEdit
                          size={25}
                          color="white"
                          className="bg-blue-500 rounded"
                          onClick={() => handleEdit(user.id)}
                        />
                        <RiDeleteBin6Fill size={25} color="red" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      </div>
    );
  };

  return (
    <>
      {activeComponent === 'Table' ? (
        <EmailSettingTable />
      ) : activeComponent === 'Add' ? (
        <EditEmailSetting setActiveComponent={setActiveComponent} />
      ) : activeComponent === 'Update' ? (
        <AddEmailSetting setActiveComponent={setActiveComponent} />
      ) : (
        ''
      )}
    </>
  );
}