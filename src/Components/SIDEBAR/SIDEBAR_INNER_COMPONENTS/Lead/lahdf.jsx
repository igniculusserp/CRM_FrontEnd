//react
import { useState, useEffect } from "react";
//reactIcon
import { FaAngleDown } from "react-icons/fa";
//reactPackages
import { Link, useNavigate, useParams } from "react-router-dom";

//external Packages
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//file
import { tenant_base_url, protocal_url } from "../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

export default function CreateSO() {
  //to make id unique
  const { id, leadId } = useParams();
  const navigate = useNavigate();

  //form description is kept-out
  const [description, setdescription] = useState("Add Text Here");
  const [editLead, seteditLead] = useState({});

  //IMP used as ${name} in an API
  const name = getHostnamePart();

  //imp to identify mode
  const [isEditMode, setIsEditMode] = useState(false);



  //----------------------------------------------------------------------------------------
  //PooL / Lead Source ToDropDown
  const [poolToDropDown, setPoolToDropDown] = useState([]);
  const [defaultTextPool, setDefaultTextPool] = useState("Select Lead Source");
  const [isPoolDropdownOpen, setIsPoolDropdownOpen] = useState(false);
  const [error, setError] = useState(null); // New error state
  const [poolEdit, setPoolEdit] = useState("");

  const handlePool = async () => {
    const bearerToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Admin/pool/getall`,
        config
      );
      setPoolToDropDown(response.data.data);
      console.log("status:", response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setError("Failed to fetch pools."); // Set error message
    }
  };

  useEffect(() => {
    handlePool();
  }, []);

  const toggleDropdown = () => {
    setIsPoolDropdownOpen((prev) => !prev);
    // console.log("@@@===",isPoolDropdownOpen);
  };

  const handleDropdownSelection = (poolName) => {
    setIsPoolDropdownOpen(false);
    setDefaultTextPool(poolName);
    console.log("@@@===", isPoolDropdownOpen);
    seteditLead((prev) => ({
      ...prev,
      leadSource: poolName,
    }));
    setPoolEdit(poolName);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col mt-3">
        <form onSubmit={handleSubmit} className="flex">
          <div className="w-full">
            <div className="mx-3 my-3 bg-white rounded-xl shadow-md flex-grow">
              <div className="py-2 px-4">
                {/* -------------Lead Source------------- */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2 relative">
                    <label
                      htmlFor="Pool"
                      className="text-sm font-medium text-gray-700"
                    >
                      Lead Source
                    </label>
                    <div
                      className="relative"
                      onMouseLeave={() => setIsPoolDropdownOpen(false)}
                    >
                      <button
                        onClick={toggleDropdown}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full flex justify-between items-center"
                        id="LeadPoolDropDown"
                        type="button"
                      >
                        {poolEdit === ""
                          ? defaultTextPool
                          : editLead.leadSource}
                        <FaAngleDown className="ml-2 text-gray-400" />
                      </button>
                      {isPoolDropdownOpen && (
                        <div className="absolute w-full bg-white border border-gray-300 rounded-md top-11 z-10">
                          {error ? (
                            <div className="py-2 text-red-600">{error}</div>
                          ) : (
                            <ul className="py-2 text-sm text-gray-700">
                              {poolToDropDown.map(({ id, poolName }) => (
                                <li
                                  key={id}
                                  onClick={() =>
                                    handleDropdownSelection(poolName)
                                  }
                                  className="block px-4 py-2 hover:bg-cyan-500 hover:text-white border-b cursor-pointer"
                                >
                                  {poolName}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
