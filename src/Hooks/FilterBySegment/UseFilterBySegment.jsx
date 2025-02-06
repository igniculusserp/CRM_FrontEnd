import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FaAngleDown } from "react-icons/fa";
import { getHostnamePart } from "../../Components/SIDEBAR/SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { protocal_url, tenant_base_url } from "../../Config/config";

export default function UseFilterBySegment({
  followUpBy,
  setFollowUpBy,
  setFilteredData,
  originalData,
  assignedTo,
  setFinalData,
  finalData,
}) {
  const name = getHostnamePart();
  const [allFollowUpToDropdown, setAllFollowUpToDropdown] = useState(false);
  const [allFollowUpToData, setAllFollowUpToData] = useState([]);

  const toggleMenuFollowUpTo = () => {
    setAllFollowUpToDropdown((prev) => !prev);
  };

  useEffect(() => {
    const fetchFollowUpUsers = async () => {
      try {
        const bearer_token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${bearer_token}` } };
        const response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/Admin/segment/getall`,
          config
        );
        setAllFollowUpToData(response.data.data || []);
        console.log("@@@@@=======",response);
        
      } catch (error) {
        console.error("Error fetching FollowUp users:", error);
      }
    };

    fetchFollowUpUsers();
  }, [name]);
 // ---------------------------------------------------------- Handle Filter  --------------------------------------------

//   const handleFollowUpBySelection = (followUpByValue) => {
//     setFollowUpBy(followUpByValue);

//     const filtered = followUpByValue !== "Follow Up By"
//       ? filteredData.filter((lead) => lead.segments.includes(followUpByValue))
//       : filteredData;

//     setFilteredData(filtered);
//     setAllFollowUpToDropdown(false); // Close dropdown after selection
// };

function handleFollowUpBySelection(followUpByValue) {
  setFollowUpBy(followUpByValue); // Update state in FollowUp

  let filtered = originalData;

  if (assignedTo === "Managed By") {
    if (followUpByValue !== "Follow Up By") {
      filtered = originalData.filter(
        (lead) => lead.segments.includes(followUpByValue)
      );
      setFinalData(filtered);
    }
  } else {
    filtered = finalData;
      if (followUpByValue !== "Follow Up By") {
        filtered = filtered.filter(
          (lead) => lead.segments.includes(followUpByValue)
        );
    }
  }
  setAllFollowUpToDropdown(false); 
  setFilteredData(filtered);
}

  return (
    <div
      className="relative whitespace-nowrap"
      onMouseLeave={() => setAllFollowUpToDropdown(false)}
    >
      <button
        className="flex min-w-36 items-center justify-between rounded-md border px-4 py-2"
        type="button"
        onClick={toggleMenuFollowUpTo}
      >
        {followUpBy}
        <FaAngleDown className="ml-2 text-gray-900" />
      </button>
      {allFollowUpToDropdown && (
        <div className="absolute top-10 z-10 rounded-md border border-gray-300 bg-white">
          <ul className="py-2 text-sm text-gray-700">
            {allFollowUpToData.map((item) => (
              <li
                key={item.id}
                className="block w-56 cursor-pointer border-b px-4 py-2 hover:bg-cyan-500 hover:text-white"
                onClick={() => handleFollowUpBySelection(item.segment)}
              >
                {item.segment}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

UseFilterBySegment.propTypes = {
  followUpBy: PropTypes.string.isRequired,
  assignedTo: PropTypes.string.isRequired,
  setFollowUpBy: PropTypes.func.isRequired,
  setFilteredData: PropTypes.func.isRequired,
  filteredData: PropTypes.array.isRequired,
  setFinalData: PropTypes.func.isRequired,
    finalData: PropTypes.array.isRequired,
    originalData: PropTypes.array.isRequired,
};
