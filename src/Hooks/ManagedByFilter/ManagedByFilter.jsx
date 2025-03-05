import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FaAngleDown } from "react-icons/fa";
import { getHostnamePart } from "../../Components/SIDEBAR/SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { protocal_url, tenant_base_url } from "../../Config/config";

export default function ManagedByFilter({
  assignedTo,
  setAssignedTo,
  setFilteredData,
  filteredData
}) {
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

  // ---------------------------------------------------------- Handle Filter  --------------------------------------------
  function handleAssignedToSelection(assignedToValue) {
    setAssignedTo(assignedToValue); // Update state in FollowUp
    let filtered = filteredData;
      if (assignedToValue !== "Managed By") {
        filtered = filtered.filter(
          (lead) => lead.assigned_To === assignedToValue,
        );
      }
      setFilteredData(filtered);
    }  
  

  return (
    <div
      className="relative contact_Dropdown_Container whitespace-nowrap"
      onClick={toggleMenuAssigned_To}
      onMouseLeave={() => setallAssigned_To_DROPDOWN(false)}
    >
      <button
        className="flex items-center justify-between px-4 py-2 border rounded-md contact_Dropdown_Button min-w-36"
        type="button"
      >
        {assignedTo}
        <FaAngleDown className="ml-2 text-gray-900" />
      </button>
      {allAssigned_To_DROPDOWN && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-md top-10">
          <ul className="py-2 text-sm text-gray-700">
            {allAssigned_To_Data.map((item) => (
              <li
                key={item.id}
                className="block w-56 px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
                onClick={() => handleAssignedToSelection(item.userName)}
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
  followUpBy: PropTypes.string.isRequired,
  setAssignedTo: PropTypes.func.isRequired,
  setFilteredData: PropTypes.func.isRequired,
  setFinalData: PropTypes.func.isRequired,
  finalData: PropTypes.array.isRequired,
  originalData: PropTypes.array.isRequired,
  filteredData : PropTypes.array.isRequired,
};
