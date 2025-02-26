// ----------------------- MUI Components --------------------
import {
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

//----------------------Images------------------------------
import MessageImage from "../../../../assets/Message/Message.png";

const users = [
  { name: "Shreyash Jain", initials: "SJ", online: true },
  { name: "Jaya Gogwani", initials: "JG", online: false },
  { name: "Niranjan Trivedi", initials: "NT", online: true },
  { name: "Tarun Raikwar", initials: "TR", online: true },
];

const Messaging = () => {
  return (
    <>
      <div className="flex bg-gray-100 p-4 pb-0 pt-3">
        <div className="w-full rounded-lg bg-white p-2 shadow-md">
          <h2 className="mb-4 text-lg font-semibold">Messaging</h2>
        </div>
      </div>
      <div className="flex h-screen bg-gray-100 p-4">
        {/* Sidebar */}
        <div className="w-1/3 rounded-lg bg-white p-4 shadow-md">
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            className="mb-4"
          />
          <div>
            {users.map((user, index) => (
              <div
                key={index}
                className="mb-2 flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm hover:bg-gray-200"
              >
                <div className="flex items-center gap-2">
                  <Avatar>{user.initials}</Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${user.online ? "bg-green-500" : "bg-orange-500"}`}
                  ></span>
                  <IconButton size="small">
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="ml-4 flex flex-1 items-center justify-center rounded-lg bg-white shadow-md">
          <Box className="text-center">
            {/* <ChatBubbleOutlineIcon style={{ fontSize: 64, color: "#333" }} /> */}
            <img src={MessageImage} />
            <p className="mt-2 font-medium text-gray-600">
              No Chat has been selected
            </p>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Messaging;
