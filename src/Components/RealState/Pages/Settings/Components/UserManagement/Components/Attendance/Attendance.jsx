import { useState } from "react";

//---------------------------- MUI Imports ----------------------------
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Stack, Pagination, Box, Tooltip } from "@mui/material";
import Switch, { switchClasses } from "@mui/joy/Switch";

//------------------------------------ React Icons ----------------------------
import { FaCircleInfo } from "react-icons/fa6";
import { Search } from "lucide-react";

//----------------------------- Dummy Data ----------------------------

// Days used as columns
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Mock user data
const initialUsers = [
  {
    id: 1,
    name: "Ankit Malpani",
    schedule: [true, true, false, true, true, true, true],
  },
  {
    id: 2,
    name: "Anand Kharate",
    schedule: [true, true, false, true, true, true, true],
  },
  {
    id: 3,
    name: "Aditya Shrotri",
    schedule: [true, false, true, true, true, true, true],
  },
  {
    id: 4,
    name: "Anuj Pathak",
    schedule: [true, false, true, true, true, true, true],
  },
];

export default function Attendance() {
  const [userData, setUserData] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = userData.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleScheduleToggle = (userId, dayIndex) => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user.id === userId
          ? {
              ...user,
              schedule: user.schedule.map((val, idx) =>
                idx === dayIndex ? !val : val,
              ),
            }
          : user,
      ),
    );
  };

  const columns = [
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      minWidth: 150,
    },
    ...days.map((day, idx) => ({
      field: day.toLowerCase(),
      headerName: day.toUpperCase(),
      flex: 1,
      minWidth: 130,
      display:"flex",

      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        const isChecked = row.schedule[idx];

        return (
          <div className="flex w-full items-center justify-center space-x-3">
            <Switch
              checked={isChecked}
              color={isChecked ? "success" : "danger"}
              onChange={() => handleScheduleToggle(row.id, idx)}
              sx={(theme) => ({
                "--Switch-thumbShadow": "0 3px 7px 0 rgba(0 0 0 / 0.12)",
                "--Switch-thumbSize": "22px",
                "--Switch-trackWidth": "48px",
                "--Switch-trackHeight": "25px",
                "--Switch-trackBackground": isChecked ? "green" : "red",
                [`& .${switchClasses.thumb}`]: {
                  transition: "width 0.2s, left 0.2s",
                },
                "&:hover": {
                  "--Switch-trackBackground":
                    theme.vars.palette.background.level3,
                },
                "&:active": {
                  "--Switch-thumbWidth": "32px",
                },
              })}
            />
            <Tooltip title="Info">
              <FaCircleInfo className="cursor-pointer text-lg" />
            </Tooltip>
          </div>
        );
      },
    })),
  ];

  return (
    <div className="flex h-full flex-col gap-8 bg-gray-200 p-6 max-[400px]:p-1 max-[400px]:py-4">
      {/* Heading */}
      <Box className="flex w-full gap-3 rounded-md bg-white p-2">
        {["Attendance & Availability"].map((button) => (
          <Box
            key={button}
            sx={{ width: "fit-content" }}
            className="whitespace-nowrap rounded-md bg-cyan-500 !px-3 !py-1 text-sm text-white shadow-md transition-all"
          >
            {button}
          </Box>
        ))}
      </Box>

      {/* Body */}
      <div className="flex min-h-screen flex-col gap-4 py-3">
        <>
          {/* Search */}
          <Box className="flex flex-wrap justify-between gap-5">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-gray-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </Box>

          {/* Table */}
          <Paper sx={{ width: "100%" }}>
            <DataGrid
              rows={paginatedUsers}
              columns={columns}
              pagination={false}
              getRowId={(row) => row.id}
              sx={{
                border: 0,
                width: "100%",
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-footerContainer": {
                  display: "none",
                },
              }}
            />
          </Paper>

          {/* Pagination */}
          <Stack spacing={2} className="mb-1 mt-4">
            <Pagination
              count={Math.ceil(userData.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                display: "flex",
                justifyContent: "center",
                "& .MuiPaginationItem-root": {
                  fontSize: "1.2rem",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "rgba(6, 182, 212, 1)",
                  color: "#fff",
                },
              }}
            />
          </Stack>
        </>
      </div>
    </div>
  );
}
