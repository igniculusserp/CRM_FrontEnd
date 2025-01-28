import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

export default function LeadsReport({ currentReports }) {
  const columns = [
    { field: "id", headerName: "Lead ID", minWidth: 100, flex: 1 },
    { field: "name", headerName: "Lead Name", minWidth: 150, flex: 1 },
    { field: "mobileNo", headerName: "Mobile", minWidth: 130, flex: 1 },
    { field: "assigned_To", headerName: "Managed By", minWidth: 150, flex: 1 },
    {
      field: "leadesStatus",
      headerName: "Lead Status",
      minWidth: 150,
      flex: 1,
    },
    { field: "leadsSource", headerName: "Lead Source", minWidth: 150, flex: 1 },
    {
      field: "segments",
      headerName: "Segments",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => (
        <div className="grid grid-cols-2 gap-1 items-center">
          {params.value &&
            params.value.map(
              (segment, index) =>
                segment.length > 1 && <span key={index}>{segment}</span>,
            )}
        </div>
      ),
    },
    {
      field: "description",
      headerName: "Last Remarks",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <div dangerouslySetInnerHTML={{ __html: params.value }} />
      ),
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
          pagination: { paginationModel: { pageSize: 10 } },
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

LeadsReport.propTypes = {
  currentReports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      mobileNo: PropTypes.string.isRequired,
      assigned_To: PropTypes.string.isRequired,
      leadesStatus: PropTypes.string.isRequired,
      leadsSource: PropTypes.string.isRequired,
      segments: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
