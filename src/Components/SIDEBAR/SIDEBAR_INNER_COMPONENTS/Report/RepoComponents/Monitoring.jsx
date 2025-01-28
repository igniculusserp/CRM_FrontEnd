import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { GoDot } from "react-icons/go";

export default function Monitoring({ currentReports }) {
  //-------------------------------------------Table Headings--------------------------------
  const columns = [
    {
      field: "userName",
      headerName: "Username",
      minWidth: 150, // Adjust to fit content dynamically
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 130, // Ensure it fits date format
      flex: 1,
      renderCell: (params) => params.value?.split("T")[0] || "",
    },
    {
      field: "logInTime",
      headerName: "Login Time",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => params.value?.replace("T", " ") || "",
    },
    {
      field: "logoutTime",
      headerName: "Logout Time",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => params.value?.replace("T", " ") || "",
    },
    {
      field: "noOfLeadUpdate",
      headerName: "Total Leads Disposed",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center gap-1">
          <GoDot
            className={`rounded-full border ${
              params.value
                ? "bg-green-500 text-green-300 shadow-md shadow-green-300"
                : "bg-red-400 text-red-700 shadow-sm shadow-red-300"
            }`}
          />
          {params.value ? "Online" : "Offline"}
        </div>
      ),
    },
  ];

  //-------------------------------------------Table Data-------------------------------------

  const rows = currentReports.map((report, index) => ({
    id: index + 1, // Ensure unique ID
    ...report,
  }));

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        sx={{
          border: 0,
          width: "100%",
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />
    </Paper>
  );
}

Monitoring.propTypes = {
  currentReports: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string.isRequired,
      date: PropTypes.string,
      logInTime: PropTypes.string,
      logoutTime: PropTypes.string,
      noOfLeadUpdate: PropTypes.number,
      status: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
