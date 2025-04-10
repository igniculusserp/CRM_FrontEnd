import { useState } from "react";
import { Button, Typography } from "@mui/material";

export default function ModifyLeadsStage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // const handleUpload = () => {
  //   if (file) {
  //     console.log("Uploading file:", file.name);
  //     // Add upload logic here
  //   } else {
  //     alert("Please select a file to upload.");
  //   }
  // };

  return (
    <div className="w-full bg-white">
      <Typography variant="h6" className="font-bold text-gray-900">
        Modify leads stage
      </Typography>
      <br />
      <Typography variant="body2" className="text-gray-700 mt-2">
        Upload an Excel file to map each stage to its group of leads for better
        organization and tracking.
      </Typography>
      <br />
      <Typography variant="body2" className="text-gray-700 ">
        Ensure your Excel file has column headings for accurate mapping of leads
        to their respective stages.
      </Typography>
      <br />
      <Typography variant="body2" className="text-gray-700 ">
        To learn more about the stages and Lost/Unqualified reasons,{" "}
        <span className="text-blue-500 hover:underline">
          click here
        </span>.
      </Typography>

      {/* File Upload Section */}
      <div className="mt-6 border-t pt-4">
      <br />
        <Typography variant="body2" className="text-gray-500">
          Upload a single Excel file with your leads to get started.
        </Typography>

        <div className="flex items-center mt-4 gap-4">
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              className="!bg-cyan-500 !hover:bg-cyan-600 text-white"
              component="span"
            >
              Upload
            </Button>
          </label>
          {file && (
            <Typography variant="body2" className="text-gray-600">
              {file.name}
            </Typography>
          )}
        </div>
      </div>

    </div>
  );
}
