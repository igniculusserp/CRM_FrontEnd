import { Card, CardContent, Typography, Box } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";

const ListSiteVist = () => {
  const data = [
    {
      title: "XYZ",
      status: "Incoming",
      time: "Pending 10:00 AM to 12:00 PM (By Abc)",
    },
    {
      title: "XYZ",
      status: "Incoming",
      time: "Pending 10:00 AM to 12:00 PM (By Abc)",
    },
    {
      title: "XYZ",
      status: "Incoming",
      time: "Pending 10:00 AM to 12:00 PM (By Abc)",
    },
  ];

  return (
    <Box className="py-2">
      {data.map((item, index) => (
        <Card key={index} sx={{border:"none", borderRadius:"0px"}}>
          <CardContent className="flex items-start justify-between">
            <Box>
              <Typography className="font-bold"> {item.title} </Typography>
              <Typography className="text-sm text-gray-500">
                {item.time}
              </Typography>
              <Typography className="text-sm text-gray-500">
                {item.status}
              </Typography>
            </Box>
            <CalendarToday className="text-2xl text-gray-500" />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ListSiteVist;
