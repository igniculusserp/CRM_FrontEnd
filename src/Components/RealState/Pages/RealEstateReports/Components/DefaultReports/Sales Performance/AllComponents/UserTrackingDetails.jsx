import  { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 18.7062,
  lng: 73.9002,
};

const mapData = [
  {
    id: 1,
    name: 'Amar Kumar',
    team: 'Sales Team | Sales',
    syncedAt: '01 Apr 2025 11:19 AM',
    location: {
      lat: 18.7062,
      lng: 73.9002,
      address: 'WING-C, 9th Heaven, Dighi, Pune, Pimpri-Chinchwad, Maharashtra 412047, India',
    },
  },
  // Add more if needed
];

const UserTrackingDetails = () => {

    const [showDetails, setShowDetails] = useState(false);

    const handleViewHistory = () => {
      setShowDetails(true);
    };
  
    const handleBack = () => {
      setShowDetails(false);
    };


  return (
    <div className="p-4 space-y-4">
      {/* Map */}
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          {mapData.map((entry) => (
            <Marker
              key={entry.id}
              position={{ lat: entry.location.lat, lng: entry.location.lng }}
              title={entry.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Side - Simple Cards */}
        <div className="space-y-4">
          {mapData.map((entry) => (
            <Card key={entry.id} className="shadow-md">
              <CardContent>
                <div className="flex items-center justify-between">
                  <Typography fontWeight="bold">{entry.name}</Typography>
                  <CheckCircleIcon className="text-green-500" />
                </div>
                <Typography className="text-sm text-gray-600">{entry.team}</Typography>
                <Typography className="text-sm text-gray-500">
                  Synced At: {entry.syncedAt}
                </Typography>
                <Button onClick={handleViewHistory} size="small" className="mt-2 text-blue-600">View History</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Side - Detailed Card */}
        {showDetails && (
        <div className="w-full">
          <Card className="shadow-md">
            <CardContent>
              <div className="flex items-center justify-between">
                <Typography fontWeight="bold">{mapData[0].name}</Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="info"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </div>
              <Typography className="text-sm text-gray-600">{mapData[0].team}</Typography>

              {Array(3)
                .fill(mapData[0])
                .map((entry, index) => (
                  <div key={index} className="mt-3 border-t pt-3">
                    <Typography className="text-sm">{entry.location.address}</Typography>
                    <Typography className="text-sm text-gray-500">
                      Lat: {entry.location.lat}, Long: {entry.location.lng}
                    </Typography>
                    <div className="flex justify-between items-center mt-1">
                      <Typography className="text-sm text-gray-500">
                        Synced At: {entry.syncedAt}
                      </Typography>
                      <CheckCircleIcon className="text-green-500" />
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      )}
      </div>
    </div>
  );
};

export default UserTrackingDetails;
