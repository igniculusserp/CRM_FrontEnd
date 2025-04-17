// ------------------------------------------ MUI Imports -------------------------------
import { Box, InputBase, Typography } from "@mui/material";
import { useState } from "react";

export default function CustomFields() {
  const [formValues, setFormValues] = useState({
    linkedinUrl: "",
    designation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For designation, allow only alphabets and space
    if (name === "designation" && !/^[a-zA-Z\s]*$/.test(value)) {
      return;
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box className="flex w-full flex-col gap-4">
      {/* ------------------------------ Linkedin Url -------------------------------- */}
      <label className="text-xs font-medium text-gray-700">
        <div className="mb-1 flex items-center gap-1">
          <Typography className="text-sm font-medium text-gray-800">
            Linkedin Url
          </Typography>
        </div>

        <Box className="mt-1 flex items-center overflow-hidden rounded-md border border-gray-300">
          <InputBase
            name="linkedinUrl"
            placeholder="Enter Linkedin URL"
            value={formValues.linkedinUrl}
            onChange={handleChange}
            className="flex-1 px-3 py-2 text-sm"
          />
        </Box>
      </label>

      {/* ------------------------------ Designation -------------------------------- */}
      <label className="text-xs font-medium text-gray-700">
        <div className="mb-1 flex items-center gap-1">
          <Typography className="text-sm font-medium text-gray-800">
            Designation
          </Typography>
        </div>

        <Box className="mt-1 flex items-center overflow-hidden rounded-md border border-gray-300">
          <InputBase
            name="designation"
            placeholder="Enter Designation"
            value={formValues.designation}
            onChange={handleChange}
            className="flex-1 px-3 py-2 text-sm"
          />
        </Box>
      </label>
    </Box>
  );
}
