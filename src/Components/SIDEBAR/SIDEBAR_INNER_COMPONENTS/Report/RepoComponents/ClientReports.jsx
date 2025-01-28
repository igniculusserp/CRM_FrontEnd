import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

export default function ClientReports({ currentReports }) {
  const columns = [
    { field: "id", headerName: "Client ID", minWidth: 120, flex: 1 },
    { field: "clientName", headerName: "Client Name", minWidth: 150, flex: 1 },
    { field: "mobileNo", headerName: "Mobile", minWidth: 150, flex: 1 },
    { field: "saleS_ODR_NO", headerName: "View SO", minWidth: 130, flex: 1 },
    { field: "assigned_To", headerName: "Managed By", minWidth: 150, flex: 1 },
    { field: "manager", headerName: "Manager", minWidth: 150, flex: 1 },
    {
      field: "amount_paid",
      headerName: "Total Amount Taken",
      minWidth: 180,
      flex: 1,
    },
    { field: "remarks", headerName: "Last Remarks", minWidth: 200, flex: 1 },
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

ClientReports.propTypes = {
  currentReports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      clientName: PropTypes.string.isRequired,
      mobileNo: PropTypes.string,
      saleS_ODR_NO: PropTypes.string,
      assigned_To: PropTypes.string,
      manager: PropTypes.string,
      amount_paid: PropTypes.number,
      remarks: PropTypes.string,
    }),
  ).isRequired,
};
