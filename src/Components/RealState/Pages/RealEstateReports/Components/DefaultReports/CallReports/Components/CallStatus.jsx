import { useState } from "react";
import { Radio, FormControlLabel, RadioGroup } from "@mui/material";
import { Box, MenuItem, Typography, Select } from "@mui/material";

export default function CallStatus() {
  const [selected, setSelected] = useState("Teams");

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex w-full flex-col gap-6 pt-4 rounded-lg border bg-white p-4 shadow-md">
      <div className="flex flex-col gap-4 ">
      {/*----------------------------------------- Radio Button Section -------------------------------------------- */}
        <div>
          <RadioGroup row value={selected} onChange={handleChange}>
            {["Teams", "Sales"].map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={
                  <Radio
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "#06b6d4", // cyan-500
                      },
                    }}
                  />
                }
                label={
                  <span
                    className={
                      selected === option ? "text-cyan-500" : "text-gray-700"
                    }
                  >
                    {option}
                  </span>
                }
              />
            ))}
          </RadioGroup>
        </div>
        {/* ------------------------------------------- Body ------------------------------------------- */}
        <div className="flex w-full flex-col gap-6 pt-4 rounded-lg border bg-white p-4 shadow-md">
        {/*----------------------------- Teams -------------------------------*/}
        {selected === "Teams" && (
          <>
          {/* ------------------------------------- Total Incoming Calls ------------------------- */}
          <div className="flex flex-col gap-1">
            <Typography>Total Incoming Calls</Typography>
            <Select
              renderValue={() => "Total Incoming Calls"}
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
          {/* ------------------------------------- Teams Drop Down ------------------------- */}
          <div className="flex flex-col gap-1">
            <Typography>Teams</Typography>
            <Select
              renderValue={() => "Teams"}
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
          </>
        )}

        {/*----------------------------- Sales -------------------------------*/}
        {selected === "Sales" && (
          <>
          {/* ------------------------------------- Total Incoming Calls ------------------------- */}
          <div className="flex flex-col gap-1">
            <Typography>Total Incoming Calls</Typography>
            <Select
              renderValue={() => "Total Incoming Calls"}
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
          {/* ------------------------------------- Sales Drop Down ------------------------- */}
          <div className="flex flex-col gap-1">
            <Typography>Sales</Typography>
            <Select
              renderValue={() => "Teams"}
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
          </>
        )}

        </div>
      </div>
      {/* ---------------------------------------- View Profile Button ----------------------------------------- */}
      <Box className="flex flex-wrap justify-between gap-5">
        {/* New Invoice Button */}
        <button className="flex w-full items-center justify-center gap-2 rounded-md bg-cyan-500 px-4 py-2 text-white shadow-md hover:bg-cyan-600 md:w-auto">
          <span>View Profile</span>
        </button>
      </Box>
    </div>
  );
}
