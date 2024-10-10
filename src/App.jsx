//react
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

//toasts
import { showSuccessToast, showErrorToast } from './utils/toastNotifications.js'; 

//url
import { protocal_url, tenant_base_url } from './Config/config.js';
import { getHostnamePart } from './Components/SIDEBAR/SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl.jsx';

//components
import VerifyTenant from './Components/REGISTRATION/VerifyTenant.jsx';


function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const name = getHostnamePart(); 
    console.log("Hostname part:", name); 

    const apiUrl = `${protocal_url}${name}.${tenant_base_url}/Tenants/check`;
    console.log("Constructed API URL:", apiUrl); 

    const verifyTenant = async () => {
      try {
        const response = await axios.post(apiUrl, {
          tenantName: name, 
          tenanturl: apiUrl 
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log("API Response:", response); 
        const { isSuccess } = response.data;

        if (isSuccess) {
          console.log("Tenant verified successfully.");
          showSuccessToast("Tenant verified successfully");
          navigate('/tenantlogin');
        } else {
          console.log("Tenant verification failed.");
          showErrorToast("Tenant verification failed");
        }
      } catch (error) {
        console.error("Error checking tenant:", error); // Log the error

      }
    };

    verifyTenant();
  }, []);

  return (
    <>
      <ToastContainer />
      <VerifyTenant />
    </>
  );
}

export default App;
