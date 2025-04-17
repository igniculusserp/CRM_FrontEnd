import { TextField, MenuItem, Button, Typography } from "@mui/material";

//--------------------- React Icon ----------------------
import { CgAsterisk } from "react-icons/cg";

export default function UpdateCall() {
  return (
    <div className="flex w-full flex-col gap-6 pt-4">
      {/*----------------------------------------- Add Task Section -------------------------------------------- */}
      <div className="flex flex-col gap-3 rounded-lg bg-white p-4">
        {/* Select Day */}
        <div className="flex flex-col gap-1">
          <div className="mb-1 flex items-center gap-1">
            <Typography className="text-sm font-medium text-gray-800">
              Select Day
            </Typography>
            <CgAsterisk className="mt-0.5 text-xs text-red-500" />
          </div>

          <TextField
            sx={{
              borderRadius: "8px",
              background: "rgba(183, 183, 183, 0.32)",
              "& fieldset": { border: "none" },
              "& .MuiOutlinedInput-input": {
                padding: "12px 15px",
              },
            }}
            className="w-full rounded-lg"
            id="outlined-select-days"
            select
            SelectProps={{
              renderValue: (value) => value || "Select day",
            }}
            // defaultValue="Tuesday"
          >
            <MenuItem value="Monday">Monday</MenuItem>
            <MenuItem value="Tuesday">Tuesday</MenuItem>
            <MenuItem value="Wednesday">Wednesday</MenuItem>
            <MenuItem value="Thursday">Thursday</MenuItem>
            <MenuItem value="Friday">Friday</MenuItem>
            <MenuItem value="Saturday">Saturday</MenuItem>
            <MenuItem value="Sunday">Sunday</MenuItem>
          </TextField>
        </div>

        {/* Users */}
        <div className="flex flex-col gap-1">
          <div className="mb-1 flex items-center gap-1">
            <Typography className="text-sm font-medium text-gray-800">
              Users
            </Typography>
            <CgAsterisk className="mt-0.5 text-xs text-red-500" />
          </div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Select User to Mark Unavailable"
            fullWidth
            sx={{
              borderRadius: "8px",
              background: "rgba(183, 183, 183, 0.32)",
              "& fieldset": { border: "none" }, // Remove border
              "& .MuiOutlinedInput-input": {
                padding: "12px 15px", // Set padding to 5px
              },
            }}
            className="w-full rounded-lg"
          />
        </div>

        {/* Fallback user ids */}
        <div className="flex flex-col gap-1">
          <div className="mb-1 flex items-center gap-1">
            <Typography className="text-sm font-medium text-gray-800">
              Fallback user ids
            </Typography>
            <CgAsterisk className="mt-0.5 text-xs text-red-500" />
          </div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Select Fallback Users"
            fullWidth
            sx={{
              borderRadius: "8px",
              background: "rgba(183, 183, 183, 0.32)",
              "& fieldset": { border: "none" }, // Remove border
              "& .MuiOutlinedInput-input": {
                padding: "12px 15px", // Set padding to 5px
              },
            }}
            className="w-full rounded-lg"
          />
        </div>

        {/* Replace the fallback with */}
        <div className="flex flex-col gap-1">
          <div className="mb-1 flex items-center gap-1">
            <Typography className="text-sm font-medium text-gray-800">
              Replace the fallback with
            </Typography>
            <CgAsterisk className="mt-0.5 text-xs text-red-500" />
          </div>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Replace the fallback with"
            fullWidth
            sx={{
              borderRadius: "8px",
              background: "rgba(183, 183, 183, 0.32)",
              "& fieldset": { border: "none" }, // Remove border
              "& .MuiOutlinedInput-input": {
                padding: "12px 15px", // Set padding to 5px
              },
            }}
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="text-right">
        <Button
          variant="contained"
          color="primary"
          className="!rounded-lg !bg-cyan-500"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
