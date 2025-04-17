import { useState } from "react";
import {
  Box,
  InputBase,
  MenuItem,
  Select,
  FormControl,
  Typography,
} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import { CgAsterisk } from "react-icons/cg";

export default function ProfessionalDetails() {

  const [searchQueryZone, setSearchQueryZone] = useState("");

  const [formValues, setFormValues] = useState({
    project: "",
    campaign:"",
    timeZone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 


  return (
    <Box className="flex w-full flex-col gap-4">
      {/* MARK USER DEFAULT FOR PROJECT */}
      <label className="text-xs font-medium text-gray-700">
        <div className="mb-1 flex items-center gap-1">
          <Typography className="text-sm font-medium text-gray-800">
          Mark user default for Project
          </Typography>
          <CgAsterisk className="mt-0.5 text-xs text-red-500" />
        </div>
        <Box className="mt-1 flex items-center overflow-hidden rounded-md border border-gray-300">
          <InputBase
            name="firstName"
            placeholder="Enter First Name"
            value={formValues.project}
            onChange={(e) => { handleChange(e) }}
            className="flex-1 px-3 py-2 text-sm"
          />
        </Box>
      </label>

        {/* Mark user default for campaign */}
        <label className="text-xs font-medium text-gray-700">
        <div className="mb-1 flex items-center gap-1">
          <Typography className="text-sm font-medium text-gray-800">
          Mark user default for campaign
          </Typography>
          <CgAsterisk className="mt-0.5 text-xs text-red-500" />
        </div>
        <Box className="mt-1 flex items-center overflow-hidden rounded-md border border-gray-300">
          <InputBase
            name="firstName"
            placeholder="Enter First Name"
            value={formValues.campaign}
            onChange={(e) => { handleChange(e) }}
            className="flex-1 px-3 py-2 text-sm"
          />
        </Box>
      </label>


      {/* Time Zone */}
      <label className="text-xs font-medium text-gray-700">
        <div className="mb-1 flex items-center gap-1">
          <Typography className="text-sm font-medium text-gray-800">
            Time Zone
          </Typography>
          <CgAsterisk className="mt-0.5 text-xs text-red-500" />
        </div>
        <Box className="overflow-hidden rounded-md border border-gray-300 px-3 py-2">
          <FormControl fullWidth>
            <Select
              value={formValues.timeZone}
              onChange={handleChange}
              name="timeZone"
              displayEmpty
              variant="standard"
              disableUnderline
              renderValue={(selected) =>
                selected ? (
                  selected
                ) : (
                  <span className="text-gray-400">Select Time Zone</span>
                )
              }
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            >
              <ListSubheader disableSticky>
                <input
                  type="text"
                  placeholder="Search Time Zone"
                  value={searchQueryZone}
                  onChange={(e) => setSearchQueryZone(e.target.value)}
                  className="w-full rounded border px-2 py-1 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </ListSubheader>
           
                <MenuItem >
                  1
                </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </label>
    </Box>
  );
}
