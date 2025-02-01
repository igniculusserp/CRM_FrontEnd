import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FaAngleDown } from "react-icons/fa";
import { getHostnamePart } from "../../Components/SIDEBAR/SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { protocal_url, tenant_base_url } from "../../Config/config";

export default function ManagedByFilter({ assignedTo, onAssignedToSelect }) {
  const name = getHostnamePart();
  const [allAssigned_To_DROPDOWN, setallAssigned_To_DROPDOWN] = useState(false);
  const [allAssigned_To_Data, setallAssigned_To_Data] = useState([]);

  const toggleMenuAssigned_To = () => {
    setallAssigned_To_DROPDOWN(!allAssigned_To_DROPDOWN);
  };

  async function fetchAssignedUsers() {
    const bearer_token = localStorage.getItem("token");

    try {
      const config = { headers: { Authorization: `Bearer ${bearer_token}` } };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Setting/users/byusertoken`,
        config,
      );
      setallAssigned_To_Data(response.data.data);
    } catch (error) {
      console.error("Error fetching assigned users:", error);
    }
  }

  useEffect(() => {
    fetchAssignedUsers();
  }, []);

  return (
    <div
      className="contact_Dropdown_Container relative whitespace-nowrap"
      onClick={toggleMenuAssigned_To}
      onMouseLeave={() => setallAssigned_To_DROPDOWN(false)}
    >
      <button
        className="contact_Dropdown_Button flex min-w-36 items-center justify-between rounded-md border px-4 py-2"
        type="button"
      >
        {assignedTo}
        <FaAngleDown className="ml-2 text-gray-900" />
      </button>
      {allAssigned_To_DROPDOWN && (
        <div className="absolute top-10 z-10 rounded-md border border-gray-300 bg-white">
          <ul className="py-2 text-sm text-gray-700">
            {allAssigned_To_Data.map((item) => (
              <li
                key={item.id}
                className="block w-56 cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                onClick={() => onAssignedToSelect(item.userName)}
              >
                {item.userName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

ManagedByFilter.propTypes = {
  assignedTo: PropTypes.string.isRequired,
  onAssignedToSelect: PropTypes.func.isRequired,
};
