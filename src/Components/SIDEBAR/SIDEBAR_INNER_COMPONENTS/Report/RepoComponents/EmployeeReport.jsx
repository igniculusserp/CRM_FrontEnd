import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

export default function EmployeeReport({ currentReports }) {
  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "userName",
      headerName: "Username",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "target",
      headerName: "Target",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "targetAchieved",
      headerName: "Target Achieved",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "targetRemaining",
      headerName: "Target Remaining",
      minWidth: 160,
      flex: 1,
    },
  ];

  const rows = currentReports.map((report, index) => ({
    id: index + 1,
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

EmployeeReport.propTypes = {
  currentReports: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      target: PropTypes.number.isRequired,
      targetAchieved: PropTypes.number.isRequired,
      targetRemaining: PropTypes.number.isRequired,
    })
  ).isRequired,
};
