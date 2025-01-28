import { useState } from "react";
import axios from "axios";
import {
  tenant_base_url,
  protocal_url,
} from "./../../../../../../Config/config";
import { getHostnamePart } from "../../../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

export default function BrowserRestriction() {
  const name = getHostnamePart();

  // -------------------------------Browers Name -----------------------------
  const tableData = ["Firefox", "Internet Explorer", "Chrome"];

  // ------------------------------Browser Restriction  State ------------------------
  const [controlDetails, setControlDetails] = useState({
    browser: "",
    enabled: true,
    version: "",
  });

  // ------------------------------ Browser Restriction Handle Submit ------------------------

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const bearer_token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
      },
    };

    // Constructing the request body
    const requestBody = {
      browser: controlDetails.browser,
      enabled: controlDetails.enabled,
      version: controlDetails.version,
    };

    console.log("Request Body on Submit:", requestBody); // Log final form submission data

    try {
      await axios.post(
        `${protocal_url}${name}.${tenant_base_url}/Security/browserestriction/add`,
        requestBody,
        config,
      );
      alert("Successfully Added");
    } catch (error) {
      console.error("Error saving pool name", error);
      alert("Failed to save pool. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-t-xl">
      <h1 className="text-white py-2 px-3 bg-cyan-500 rounded-t-xl mt-3">
        Browser Restriction
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className="grid gap-2 py-2 px-3">
          {/* Enabled Checkbox */}
          <div className="flex space-x-4">
            <div className="flex flex-col w-1/2 gap-1">
              <label
                htmlFor="enabled"
                className="text-sm font-medium text-gray-700"
              >
                Enabled
              </label>
              <input
                type="checkbox"
                name="enabled"
                className="py-1 px-1 h-5 w-5"
                onChange={() =>
                  setControlDetails((prev) => ({
                    ...prev,
                    category: true,
                  }))
                }
              />
            </div>
          </div>
        </div>

        <div className="mx-6 py-3">
          {/* Browser Table */}
          <div className="overflow-x-auto rounded-t-xl rounded-b-md">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-cyan-500 rounded-t-xl">
                  <th className="px-4 py-2 text-white font-light">Browser</th>
                  <th className="px-4 py-2 text-white font-light">Version</th>
                  <th className="px-4 py-2 text-white font-light">Enabled</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, idx) => (
                  <tr key={idx} className="bg-gray-100 border-b">
                    <td className="px-8 py-2">{item}</td>
                    <td className="px-3 py-2 text-center">
                      <input
                        type="text"
                        value={controlDetails.version}
                        className="py-1 border border-gray-300 px-6"
                        placeholder="Enter browser version"
                        onChange={(event) =>
                          setControlDetails((prev) => ({
                            ...prev,
                            version: event.target.value,
                          }))
                        }
                      />
                    </td>
                    <td className="py-2 text-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={() =>
                          setControlDetails((prev) => ({
                            ...prev,
                            browser: item,
                          }))
                        }
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className="px-8 py-2">
                    <div className="flex items-center">
                      <label
                        htmlFor="blockAccess"
                        className="text-sm font-medium text-gray-700 mr-2"
                      >
                        Block Access from mobile browser
                      </label>
                      <input
                        type="checkbox"
                        name="blockAccess"
                        className="h-5 w-5"
                        onChange={() =>
                          setControlDetails((prev) => ({
                            ...prev,
                            browser: "Mobile Browser",
                          }))
                        }
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
}
