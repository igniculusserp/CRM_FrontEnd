import { useEffect } from 'react';
import VerifyTenant from './Components/REGISTRATION/VerifyTenant.jsx';
import { requestForToken } from './firebase';

function App() {
  useEffect(() => {
    // Request token when the component is mounted
    requestForToken().then((token) => {
      if (token) {
        console.log('Device token received:', token);
        // Save this token to your backend for sending push notifications
      }
    }).catch((err) => console.log('Error retrieving token:', err));
  }, []);  // Empty dependency array means this will run only once, when the component is mounted

  return (
    <>
    <VerifyTenant/>
    </>
  )
}

export default App
