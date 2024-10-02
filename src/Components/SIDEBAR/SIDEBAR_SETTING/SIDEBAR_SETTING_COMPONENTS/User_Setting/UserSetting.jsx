import axios from "axios";
import { useState, useEffect } from "react";
import UserSettingForm from "./UserSettingForm";
import UserSettingTable from "./UserSettingTable";
import { tenant_base_url, protocal_url } from "../../../../../Config/config";

export default function UserSetting() {
  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const name = url.hostname.split(".")[0];

  const [active, setActive] = useState(true); // Toggle between form and table
  const [isEditMode, setIsEditMode] = useState(false); // Track if we're in edit mode
  const [users, setUsers] = useState([]); // User data state
  const [editUser, setEditUser] = useState([]); // Data for the user being edited
  const [reloadData, setReloadData] = useState(false); // Trigger data reload

  //-----------------Fetch ALL users from the API-----------------
  async function handleLead() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/users/byusertoken`,
        config
      );
      setUsers(response?.data?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    handleLead(); // Fetch the user list whenever reloadData changes
  }, [reloadData]); // Add reloadData as a dependency

  // Toggle active state to switch between form and table
  const handleActiveState = () => {
    setActive(!active);
    setIsEditMode(false); // Reset edit mode when switching views
  };

  // Delete user function with improved error handling
  const handleClickDelete = async (userId) => {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.delete(
        `${protocal_url}${name}.${tenant_base_url}/Setting/${userId}`,
        config
      );

      if (response.status === 200) {
        // Trigger data reload after successful deletion
        setReloadData((prev) => !prev);
        alert("User deleted successfully.");
      } else {
        alert("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error occurred while trying to delete the user. Please try again.");
    }
  };

  // Edit user function
  const handleClickEdit = async (userId) => {
    handleActiveState(); // Switch to form view
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/${userId}`,
        config
      );

      if (response.status === 200) {
        const userData = response.data; // Get the user data
        setEditUser(userData); // Set the user data for editing
        setIsEditMode(true); // Set edit mode to true
        // alert("Switched to edit mode");
      } else {
        alert("Failed to switch to edit mode. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching user for edit:", error);
      alert("Error occurred while trying to switch to edit mode.");
    }
  };

  const triggerReload = () => {
    setReloadData((prev) => !prev);
  };


  return (
    <div className="m-3 min-w-screen">
      {active ? (
        <>
          <UserSettingTable
            users={users}
            handleActiveState={handleActiveState}
            handleClickDelete={handleClickDelete}
            handleClickEdit={handleClickEdit}
          />
        </>
      ) : (
        <>
          <UserSettingForm
            handleActiveState={handleActiveState}
            editUser={editUser}
            isEditMode={isEditMode}
            onSave={triggerReload}
            isAddUserActive={isEditMode}
          />
        </>
      )}
    </div>
  );
}
