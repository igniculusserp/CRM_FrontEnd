import { MenuItem, Typography, Select } from "@mui/material";

export default function LeadsReassigment() {
  return (
    <div className="flex w-full flex-col gap-6 pt-4">
      {/*----------------------------------------- Add Task Section -------------------------------------------- */}
      <div className="flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-md">
        {/* Please select target type */}
        <div className="flex flex-col gap-1">
          <Typography>
            Please select the field on which you want to generate report
          </Typography>

          <Select
            renderValue={() => "Select Type"}
            displayEmpty
            sx={{
              borderRadius: 2,
              backgroundColor: "rgba(183, 183, 183, 0.32)",
              "& fieldset": { border: "none" },
              "& .MuiOutlinedInput-input": {
                padding: "12px 15px",
              },
            }}
          >
            {/* <MenuItem value="Default Reports" disabled>
                    Default Reports
                  </MenuItem> */}
            <MenuItem value="Pipeline Analysis">Data 1</MenuItem>
            <MenuItem value="Sales Performance">Data 2</MenuItem>
            <MenuItem value="Report 3">Data 3 3</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
}
