import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FaAngleDown } from "react-icons/fa";

// Folder Imports
import { getHostnamePart } from "../../Components/SIDEBAR/SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import { protocal_url, tenant_base_url } from "../../Config/config";
import MassEmail from "../../Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MassEmail/MassEmail";

export default function UseAction({
  originalData,
  getApiData,
  screenName,
  selectedRowsId,
  selectedRowEmails,
  actions,
}) {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  // States

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(false);
  const [permissions, setPermissions] = useState([]);

  // ------------------- Handle Action Click -------------------
  const handleActionButton = async (value) => {
    if (!selectedRowsId.length) {
      alert("No records selected.");
      return;
    }

    switch (value) {
      case "Mass Delete":
        if (confirm("Are you sure you want to delete the selected data?")) {
          handleMassTrailDelete(selectedRowsId);
        }
        break;

      case "Mass E-Mail":
        if (
          confirm(
            "Are you sure you want to send an email to the selected contacts?",
          )
        ) {
          openMassEmailModal();
        }
        break;

      case "Sheet View":
        exportToTrailExcel();
        break;

      case "Print View":
        exportToTrailPDF();
        break;

      default:
        break;
    }
  };

  // ------------------- Mass Delete Function -------------------
  const handleMassTrailDelete = async (ids) => {
    try {
      const config = { headers: { Authorization: `Bearer ${bearer_token}` } };
      const deleteRequests = ids.map((id) =>
        axios.delete(
          `${protocal_url}${name}.${tenant_base_url}/FollowUp/delete/${id}`,
          config,
        ),
      );

      await Promise.all(deleteRequests);
      getApiData();
      alert(`${ids.length} items successfully deleted.`);
    } catch (error) {
      console.error("Error deleting follow-ups:", error);
    }
  };

  // ------------------- Mass Email Modal -------------------
  const openMassEmailModal = () => {
    if (selectedRowEmails.length > 0) {
      setIsModalOpen(true); // Open the modal
    } else {
      alert("Selected Entity dose not have E-Mail Address.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // ------------------- Export to Excel -------------------
  const exportToTrailExcel = () => {
    const leadsToExport = originalData.filter((lead) =>
      selectedRowsId.includes(lead.id),
    );
    if (!leadsToExport.length) {
      alert("No leads selected to export.");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(leadsToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Selected FollowUp");
    XLSX.writeFile(wb, "SelectedData.xlsx");
  };

  // ------------------- Export to PDF -------------------
  const exportToTrailPDF = () => {
    const leadsToExport = originalData.filter((lead) =>
      selectedRowsId.includes(lead.id),
    );
    if (!leadsToExport.length) {
      alert("No leads selected to export.");
      return;
    }

    const doc = new jsPDF();
    const tableColumn = ["ID", "Name", "Email", "Phone No.", "Assigned To"];
    const tableRows = leadsToExport.map((lead) => [
      lead.id,
      lead.name,
      lead.email || "N/A",
      lead.phoneNo || "N/A",
      lead.assigned_To || "N/A",
    ]);

    doc.text("Selected Leads Data", 14, 16);
    autoTable(doc, { head: [tableColumn], body: tableRows, startY: 22 });
    doc.save("Data.pdf");
  };

  // ------------------- Permissions Handling -------------------
  const businessRole = localStorage.getItem("businessRole");

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${bearer_token}` } };
        const response = await axios.get(
          `${protocal_url}${name}.${tenant_base_url}/Security/rolesandpermissions/getgroupwise/${businessRole}`,
          config,
        );

        const screenPermissions = response.data?.data?.find(
          (item) => item.moduleName === screenName,
        );
        if (screenPermissions) {
          setPermissions(screenPermissions.permissions.split(","));
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchPermissions();
  }, [businessRole, name, screenName]);

  return (
    <>
      {isModalOpen && (
        <MassEmail
          emails={selectedRowEmails}
          onClose={closeModal} // Pass function to close modal
        />
      )}

      <div
        className="action_Button_Container relative"
        onMouseLeave={() => setActionDropdown(false)}
      >
        <button
          className="flex items-center justify-between gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg button_MaxWidth"
          onClick={() => setActionDropdown(!actionDropdown)}
        >
          Actions
          <FaAngleDown className="text-gray-900" />
        </button>

        {actionDropdown && (
          <div className="absolute right-0 z-10 w-56 bg-white border border-gray-300 rounded-md top-10">
            <ul className="text-sm text-gray-700">
              {actions.map(({ key, value }) =>
                permissions.includes(value) || businessRole === "Admin" ? (
                  <li
                    key={key}
                    className="block px-4 py-2 border-b cursor-pointer hover:bg-cyan-500 hover:text-white"
                    onClick={() => handleActionButton(value)}
                  >
                    {value}
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

UseAction.propTypes = {
  originalData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phoneNo: PropTypes.string,
      assigned_To: PropTypes.string,
    }),
  ).isRequired,
  getApiData: PropTypes.func.isRequired,
  screenName: PropTypes.string.isRequired,
  selectedRowsId: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  selectedRowEmails: PropTypes.arrayOf(PropTypes.string).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
