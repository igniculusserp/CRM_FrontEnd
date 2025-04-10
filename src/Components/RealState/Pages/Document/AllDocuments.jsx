import { useState, useRef } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

// ------------------------------ React Icon ---------------------
import { IoFolder } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { RiFileTextLine } from "react-icons/ri";

export default function AllDocuments() {
  //---------------------------------------- All States ---------------------------------
  const [selectedButton, setSelectedButton] = useState("All Documents");
  const [folderList, setFolderList] = useState(["folder 1", "folder 2"]);
  const [fileList, setFileList] = useState(["File 1", "File 2"]);
  const [newFolderName, setNewFolderName] = useState("");
  const [fileName, setFileName] = useState("");
  const [showFile, setShowFile] = useState(true);
  const fileInputRef = useRef(null);

  //---------------------------------------- Create Folder Handler ---------------------------------
  const handleCreateFolder = () => {
    if (newFolderName.trim() !== "") {
      setFolderList((prev) => [...prev, newFolderName.trim()]);
      setNewFolderName(""); // Clear input after adding
    }
  };

  //   ------------------------------------- Upload File Handler -----------------------------------

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileList((prev) => [...prev, file.name]);
    }
  };

  return (
    <div className="flex h-fit flex-col gap-8 bg-gray-200 p-6">
      {/* --------------------------------------- Heading --------------------------------- */}
      <Box className="relative flex w-full gap-3 rounded-md bg-white p-2">
        {["All Documents"].map((button) => (
          <>
            <Box
              key={button}
              sx={{ width: "fit-content" }}
              className={`cursor-pointer rounded-md px-3 py-1 text-sm transition-all ${
                selectedButton === button
                  ? "bg-cyan-500 text-white shadow-md"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setSelectedButton(button)}
            >
              {button}
              <Box></Box>
            </Box>
          </>
        ))}
      </Box>
      {/* -------------------------------------- Heading Title ----------------------------------------------------- */}
      <Box className="flex items-center justify-between gap-5">
        <Typography className="!text-xl !font-bold">All Documents</Typography>
        {showFile === true ? (
          ""
        ) : (
          <>
            <Button
              className="!gap-2 !whitespace-nowrap !rounded-lg !bg-cyan-500 !px-3 !font-medium !text-white"
              onClick={() => setShowFile(true)}
            >
              <IoMdArrowBack />
              Back
            </Button>
          </>
        )}
      </Box>

      {/* ------------------------------------------------------ Body ------------------------------------------- */}

      <div className="flex h-full w-full flex-col gap-6 rounded-lg bg-white p-4">
        {showFile === true ? (
          <>
            {/*----------------------------------------- Folder Section -------------------------------------------- */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-md">
                {/* -------------------------------------- New Folder Section -------------------------------------------- */}
                <div className="flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-md">
                  {/* Please Enter Folder Name */}
                  <div className="flex flex-col gap-1">
                    <Typography>Enter Folder Name</Typography>
                    <Box className="flex rounded-lg border bg-gray-200">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Enter Folder Name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        fullWidth
                        sx={{
                          borderRadius: "8px",
                          "& fieldset": { border: "none" }, // Remove border
                          "& .MuiOutlinedInput-input": {
                            padding: "12px 15px", // Set padding to 5px
                          },
                        }}
                        className="!w-full !rounded-lg !bg-gray-200"
                      />
                      <Button
                        onClick={handleCreateFolder}
                        className="!whitespace-nowrap !rounded-lg !bg-cyan-500 !px-6 !font-medium !text-white"
                      >
                        Create New Folder
                      </Button>
                    </Box>
                  </div>
                </div>
              </div>
              {/* ------------------------------------ Available Folder Section --------------------------------------- */}
              <div className="flex flex-wrap gap-4">
                {folderList.map((item, index) => (
                  <div
                    onClick={() => setShowFile(false)}
                    key={index}
                    className="flex flex-col items-center justify-center gap-1 rounded-md border p-3 cursor-pointer"
                  >
                    <IoFolder className="h-10 w-10 text-cyan-600" />
                    <Typography className="!text-base !font-medium">
                      {item}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* ---------------------------------------- File Section --------------------------------------- */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 rounded-lg border bg-white p-4 shadow-md">
                {/* ---------------------------------------- UpLoad Button Section ----------------------------------- */}
                <Box className="flex justify-end pb-8">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <Button
                    onClick={handleUploadClick}
                    className="!text-md !whitespace-nowrap !rounded-lg !bg-cyan-500 !px-6 !font-bold !text-white"
                  >
                    Upload
                  </Button>
                </Box>
                {/* -------------------------------------- New File Search Section -------------------------------------------- */}
                <div className="flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-md">
                  {/* Please Enter Folder Name */}
                  <div className="flex flex-col gap-1">
                    <Typography>Search by file name</Typography>
                    <Box className="flex rounded-lg border bg-gray-200">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="File Name"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        fullWidth
                        sx={{
                          borderRadius: "8px",
                          "& fieldset": { border: "none" }, // Remove border
                          "& .MuiOutlinedInput-input": {
                            padding: "12px 15px", // Set padding to 5px
                          },
                        }}
                        className="!w-full !rounded-lg !bg-gray-200"
                      />
                      <Button className="!whitespace-nowrap !rounded-lg !bg-cyan-500 !px-4 !font-medium !text-white">
                        Search
                      </Button>
                    </Box>
                  </div>
                </div>
                {/* ------------------------------------ Available File Section --------------------------------------- */}
                <div className="flex flex-wrap gap-4">
                  {fileList.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center gap-1 rounded-md border p-3"
                    >
                      <RiFileTextLine className="h-10 w-10 text-cyan-500" />
                      <Typography className="!text-base !font-medium">
                        {item}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
