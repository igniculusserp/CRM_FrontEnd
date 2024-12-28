import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { tenant_base_url, protocal_url } from "./../../../../../Config/config";

import { getHostnamePart } from "../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

import { ToastContainer } from "react-toastify";


export default function EditPermission({ onCancel, id }) {
  const name = getHostnamePart();

  //----------------------------------------------Get by ID------------------------------------------------

  //----------------------------------------------Get by ID------------------------------------------------

  const [defaultGroupModuleText, setDefaultGroupModuleText] = useState("");
  const [defaultTextLeadStatusDropDown, setdefaultTextLeadStatusDropDown] =
    useState("");

  const handleGetById = async () => {
    const bearer_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    try {
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/Security/rolesandpermissions/get/${id}`,
        config
      );

      if (response.status === 200 && response.data.isSuccess) {
        const data = response.data.data;
        setdefaultTextLeadStatusDropDown(data.groupName);
        setDefaultGroupModuleText(data.moduleName);
        const permissionsArray = data.permissions.split(",");
        setPermissions(permissionsArray);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    handleGetById();
  }, []);

  // ------------------------------------------ Handle checkbox change -------------------------------------------

  const [permissions, setPermissions] = useState([]);

   const handleCheckboxChange = (permission) => {
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((item) => item !== permission) // Remove if already selected
        : [...prevPermissions, permission] // Add if not selected
    );
  };

  // Log updated permissions whenever they change
  useEffect(() => {
    console.log("Updated permissions: ", permissions);
  }, [permissions]);

  return (
    <div className="flex min-h-screen flex-col m-3 overflow-x-auto overflow-y-hidden">
      <ToastContainer />
      <div className="flex py-2 px-2 items-center justify-between bg-white rounded-md shadow-md">
        <h1 className="text-xl">Add Roles & Permissions</h1>
        {/*------------------------------------------------- Cancel Button--------------------------------------------- */}
        <button
          onClick={onCancel}
          className="px-4 py-1 rounded mx-3 border border-blue-500 text-blue-500"
        >
          Cancel
        </button>
      </div>
      {/*  */}
      <div className="overflow-hidden shadow-md">
        <div className="py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
          <h1 className="text-white">Roles & Permissions Details</h1>
        </div>
        {/* ----------- FORMS START FROM HERE ----------- */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col min-h-screen py-2 px-4 bg-white rounded-b-xl">
            <div className="flex gap-4">
              <div className="grid gap-2 pb-3 w-full ">
                {/* ----------Lead CHECK BOXES ---------- */}
                {defaultGroupModuleText === "Leads" ? (
                  <div className="p-3 bg-white rounded-sm w-full shadow-md mt-2 ">
                    <h1 className="font-normal mb-2 text-xl">Leads</h1>
                    {/* ---------- LEAD BOXES ---------- */}
                    <div className="flex gap-12 justify-between">
                      {/* FIRST */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            id="create-lead"
                            onChange={() => handleCheckboxChange("Create Lead")}
                          />
                          <p className="text-sm font-md">Create Lead</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Upload Leads")
                            }
                          />
                          <p className="text-sm font-md">Upload Leads</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Lead Operation")
                            }
                          />
                          <p className="text-sm font-md">Lead operation</p>
                        </div>
                        {/* FOURTH ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Lead Action")}
                          />
                          <p className="text-sm font-md">Lead Action</p>
                        </div>
                      </div>
                      {/* SECOND */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("View Leads")}
                          />
                          <p className="text-sm font-md">View Leads</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Fetch Leads")}
                          />
                          <p className="text-sm font-md">Fetch Leads</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Edit Lead")}
                          />
                          <p className="text-sm font-md">Edit Lead</p>
                        </div>
                        {/* Fourth ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass Delete")}
                          />
                          <p className="text-sm font-md">Mass Delete</p>
                        </div>
                      </div>
                      {/* THIRD */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Approve Leads")
                            }
                          />
                          <p className="text-sm font-md">Approve Leads</p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to Excel")
                            }
                          />
                          <p className="text-sm font-md">Export to Excel</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Export to PDF")
                            }
                          />
                          <p className="text-sm font-md">Export to PDF</p>
                        </div>
                      </div>
                      {/* FOURTH */}
                      <div className="flex flex-col gap-3">
                        {/* FIRST ROW */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Convert Lead to Contact")
                            }
                          />
                          <p className="text-sm font-md">
                            Convert Lead to Contact
                          </p>
                        </div>
                        {/* SECOND ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() =>
                              handleCheckboxChange("Create Sales Order")
                            }
                          />
                          <p className="text-sm font-md">Create sales order</p>
                        </div>
                        {/* THIRD ITEM */}
                        <div className="flex gap-3 items-center font-light">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange("Mass E-Mail")}
                          />
                          <p className="text-sm font-md">Mass E-Mail</p>
                        </div>
                      </div>
                      {/* FIFTH */}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* BUTTONS */}
            <div className="flex justify-end px-2 gap-2">
              <button
                type="submit"
                className="px-10 py-4 mt-20 mb-3 bg-cyan-500 text-white border-2 border-cyan-500 rounded hover:text-cyan-500 hover:bg-white w-max "
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

EditPermission.propTypes = {
  onCancel: PropTypes.func.isRequired,
  id: PropTypes.number,
};
