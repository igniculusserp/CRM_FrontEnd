import {
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";

export default function AddTask() {
  return (
    <div className="flex h-screen w-full flex-col gap-6 pt-4">
      {/*----------------------------------------- Add Task Section -------------------------------------------- */}
      <div className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-md">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <Typography>Title</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
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

{/* Description */}
<div className="flex flex-col gap-1">
          <Typography>Description</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            sx={{
              borderRadius: "8px",
              background: "rgba(183, 183, 183, 0.32)",
              "& fieldset": { border: "none" }, // Remove border
              "& .MuiOutlinedInput-input": {
                padding: "10px 15px", // Set padding to 5px
              },
            }}
            className="w-full rounded-lg"
          />
        </div>

           {/* Due On */}
           <div className="flex flex-col gap-1">
            <Typography>Due On</Typography>

            <div className="flex gap-4">
              <TextField
              type="date"
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
           <TextField
           type="time"
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

{/* Assignee */}
<div className="flex flex-col gap-1">
          <Typography>Assignee</Typography>

          <TextField
            sx={{
              borderRadius: "8px",
              background: "rgba(183, 183, 183, 0.32)",
              "& fieldset": { border: "none" }, // Remove border
              "& .MuiOutlinedInput-input": {
                padding: "12px 15px", // Set padding to 5px
              },
            }}
            className="w-full rounded-lg"
            id="outlined-select-currency"
            select
            defaultValue="EUR"
            InputProps={{ readOnly: true }} // Makes input read-only
          >
            <MenuItem value="USD" disabled>
              USD - US Dollar
            </MenuItem>
            <MenuItem value="EUR" disabled>
              EUR - Euro
            </MenuItem>
            <MenuItem value="INR" disabled>
              INR - Indian Rupee
            </MenuItem>
          </TextField>
        </div>

        {/* Remark */}
        <div className="flex flex-col gap-1">
          <Typography>Remark</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
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

        {/* Priority */}
        <div className="flex flex-col gap-1">
          <Typography>Priority</Typography>

          <TextField
            sx={{
              borderRadius: "8px",
              background: "rgba(183, 183, 183, 0.32)",
              "& fieldset": { border: "none" }, // Remove border
              "& .MuiOutlinedInput-input": {
                padding: "12px 15px", // Set padding to 5px
              },
            }}
            className="w-full rounded-lg"
            id="outlined-select-currency"
            select
            defaultValue="EUR"
            InputProps={{ readOnly: true }} // Makes input read-only
          >
            <MenuItem value="USD" disabled>
              USD - US Dollar
            </MenuItem>
            <MenuItem value="EUR" disabled>
              EUR - Euro
            </MenuItem>
            <MenuItem value="INR" disabled>
              INR - Indian Rupee
            </MenuItem>
          </TextField>
        </div>

        

        
      </div>

      {/* Save Button */}
      <div className="text-right">
        <Button variant="contained" color="primary" className="!bg-cyan-500 !rounded-lg ">
          Save
        </Button>
      </div>
    </div>
  );
}
