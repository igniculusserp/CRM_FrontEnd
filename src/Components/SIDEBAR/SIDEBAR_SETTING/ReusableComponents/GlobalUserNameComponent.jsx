import React, { useState, useEffect } from "react";
import axios from "axios";
import { tenant_base_url, protocal_url } from "../../../../Config/config";

export default function GlobalUserNameComponent({
  fieldName,
  selectedValue,
  setSelectedValue,
  selectedUserId,
  setSelectedUserId,
  setSelectedUser,
  name,
  className = "", // Default to an empty string if no className is passed
}) {
  const [users, setUsers] = useState([]);
  const fullURL = window.location.href;
  const url = new URL(fullURL);
  const names = url.hostname.split(".")[0];
  // Fetch ALL users from the API
  async function handleLead() {
    const bearer_token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${names}.${tenant_base_url}/Setting/users/byusertoken`,
        config,
      );
      setUsers(response.data?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    handleLead();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);

    // Find the selected user based on the selected field value
    const selectedUserObject = users.find((user) => user[fieldName] === value);
    if (selectedUserObject) {
      setSelectedUser(selectedUserObject); // Pass the full user object to the parent
      setSelectedUserId(selectedUserObject.userId); // Set the selected user ID
    } else {
      setSelectedUser(null); // Reset if no user is found
      setSelectedUserId(null); // Reset userId if no user found
    }
  };

  return (
    <select
      className={className}
      value={selectedValue}
      onChange={handleChange}
      name={name}
    >
      <option value="" disabled>
        Select
      </option>

      {users.map((user) => (
        <>
          <option key={user.userId} value={user[fieldName]}>
            {user[fieldName]}
          </option>
        </>
      ))}
    </select>
  );
}
