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
  filteredData,
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
          config,
        );
        setAllFollowUpToData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching FollowUp users:", error);
      }
    };

    fetchFollowUpUsers();
  }, [name, followUpBy]);

  function handleFollowUpBySelection(followUpByValue) {
    setFollowUpBy(followUpByValue);
    let filtered = filteredData;
    if (followUpByValue !== "Follow Up By") {
      filtered = filtered.filter(
        (lead) => lead.segments && lead.segments.includes(followUpByValue),
      );
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
        className="flex items-center justify-between px-4 py-2 border rounded-md min-w-36"
        type="button"
        onClick={toggleMenuFollowUpTo}
      >
        {followUpBy}
        <FaAngleDown className="ml-2 text-gray-900" />
      </button>
      {allFollowUpToDropdown && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-md top-10">
          <ul className="py-2 text-sm text-gray-700">
            {allFollowUpToData.map((item) => (
              <li
                key={item.id}
                className="block w-56 px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
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
  setFollowUpBy: PropTypes.func.isRequired,
  setFilteredData: PropTypes.func.isRequired,
  filteredData: PropTypes.array.isRequired,
};
