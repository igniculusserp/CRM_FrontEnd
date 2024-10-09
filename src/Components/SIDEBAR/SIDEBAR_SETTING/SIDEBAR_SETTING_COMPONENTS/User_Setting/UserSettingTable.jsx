import { FaBars } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { tenant_base_url, protocal_url } from "../../../../../Config/config";
import axios from "axios";
import { getHostnamePart } from "../../ReusableComponents/GlobalHostUrl";

export default function UserSettingTable({ users, handleActiveState, handleClickDelete, handleClickEdit }) {
  const name = getHostnamePart()
  const handleEdit = (userId) => {
    console.log(userId)
    handleClickEdit(userId)
  }

  const handleDelete = (userId) => {
    handleClickDelete(userId)
  }

  // Handle checkbox click
  const handleCheckboxClick = (e, userId) => {
    e.stopPropagation(); // Prevent row click event from firing
    console.log(`Checkbox clicked for user: ${userId}`);
  };

  //switching from admin to another users
  const handleLoginUser = async (user) => {
    const bearer_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };
    try {
      const response = await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Users/login`,
        {
          userName: user?.email,
          password: user?.dycriptedPassword,
          deviceType: "",
          deviceAddress: "",
        },
        config
      );

      // Log the response to verify the status code
      console.log("Response status:", response?.status);
      const logindetail = response.data.data
      if (response?.data?.data) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("userDetail", JSON.stringify(logindetail));
        alert("Login successful")
        refresh();
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const refresh = () => {
    // Force reload to avoid cache issues
    window.location.reload(true);
  };


  return (
    <>
      <div className="flex min-w-screen justify-between items-center">
        <h1 className="text-3xl font-medium">View Users</h1>
        <button
          onClick={handleActiveState} // Switch to form view to add a new user
          className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded"
        >
          Add User Setting
        </button>
      </div>
      <div className="overflow-x-auto mt-3">
        <div className="min-w-full overflow-hidden rounded-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-gray-300 border-b-2">
                <th className="p-22">
                  <input type="checkbox" />
                </th>
                <th className="px-2 py-2 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>First Name</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Last Name</span>
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
                    <span>Contact Number</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Country</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Reported To</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Role</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Created Date</span>
                    <FaBars />
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Direct Login</span>
                  </div>
                </th>
                <th className="px-2 py-3 text-left border-r font-medium">
                  <div className="flex justify-between items-center text-sm">
                    <span>Action</span>
                    <FaBars />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 &&
                <>
                  {users?.map((user) => (
                    <tr
                      key={user.userId}
                      className="cursor-pointer hover:bg-gray-200 border-gray-300 border-b "
                    >
                      <td className="px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          onClick={(e) => handleCheckboxClick(e, user.userId)}
                        />
                      </td>
                      <td className="px-1  text-sm min-w-20 max-w-20 break-words">
                        {user.firstName}
                      </td>
                      <td className="px-1 text-sm min-w-20 max-w-20 break-words">
                        {user.lastName}
                      </td>
                      <td className="px-1  text-sm min-w-20 max-w-28 break-words">
                        {user.email}
                      </td>
                      <td className="px-1  text-sm min-w-20 max-w-16 break-words">
                        {user.contactNo}
                      </td>
                      <td className="px-1  text-sm min-w-20 max-w-20 break-words">
                        {user.country}
                      </td>
                      <td className="px-1  text-sm min-w-20 max-w-20 break-words text-center">
                        {user.reportedTo}
                      </td>
                      <td className="px-1  text-sm min-w-16 max-w-20 break-words">
                        {user.role}
                      </td>
                      <td className="px-1  text-sm min-w-20 max-w-20 break-words text-center">
                        {user.createdDate.split('T')[0]}
                      </td>
                      <td className="text-center">
                        <button onClick={() => handleLoginUser(user)} className="bg-blue-600 text-white p-2 min-w-10 text-sm rounded ">
                          <p className="text-center">Login As</p>
                        </button>
                      </td>
                      <td className="px-1 py-4 flex gap-1 justify-center min-w-20 max-w-20 break-words mx-auto">
                        <MdEdit
                          size={25}
                          color="white"
                          className="bg-blue-500 rounded"
                          onClick={() => handleEdit(user.userId)}
                        />
                        <RiDeleteBin6Fill size={25} color="red"
                          onClick={() => handleDelete(user.userId)}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
