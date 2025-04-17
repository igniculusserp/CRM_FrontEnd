import { useRef, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const expectedHeaders = [
  "user_id",
  "day",
  "start_hour",
  "start_minute",
  "end_hour",
  "end_minute",
  "availability",
  "fallback_user_ids",
];

const CallAvailabilities = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [isValidFile, setIsValidFile] = useState(true);

  const handleDownload = () => {
    const worksheet = XLSX.utils.aoa_to_sheet([expectedHeaders]);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "schedule_sample.csv");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file?.name || "");

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target.result;
        const rows = csvText.split("\n").map((row) => row.trim().split(","));
        const headers = rows[0] || [];
        const isMatch =
          JSON.stringify(headers) === JSON.stringify(expectedHeaders);
        setIsValidFile(isMatch);

        if (!isMatch) {
          alert("Invalid CSV file format. Please upload the correct file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUpload = () => {
    if (isValidFile && fileName) {
      alert("File uploaded successfully!");
      // Submit logic here
    }
  };

  return (
    <div className="flex h-full flex-col gap-8 bg-gray-200 p-6 max-[400px]:p-1 max-[400px]:py-4">
      {/* --------------------------------------- Heading --------------------------------- */}
      <Box className="flex w-full gap-3 rounded-md bg-white p-2">
        {["Call Availability"].map((button) => (
          <Box
            key={button}
            sx={{ width: "fit-content" }}
            className="whitespace-nowrap rounded-md bg-cyan-500 !px-3 !py-1 text-sm text-white shadow-md transition-all"
          >
            {button}
          </Box>
        ))}
      </Box>
      {/* --------------------------- Body Section ------------------------ */}
      <div>
        <div className=" space-y-4 p-4 bg-white w-full h-full rounded-xl">
          <Typography variant="body1">
            You can download a sample file from{" "}
            <span
              className="cursor-pointer text-blue-600 underline"
              onClick={handleDownload}
            >
              here
            </span>
            .
          </Typography>

          <div>
            <Typography variant="caption" className="mb-1 block">
              UPLOAD FILE
            </Typography>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {fileName && (
              <Typography variant="body2" className="mt-1">
                {fileName}
              </Typography>
            )}
          </div>

          <Button
            variant="contained"
            className="!bg-cyan-500 normal-case !text-white hover:!bg-cyan-700"
            onClick={handleUpload}
            disabled={!fileName || !isValidFile}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallAvailabilities;
