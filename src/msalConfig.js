import { PublicClientApplication } from "@azure/msal-browser";
const tenantData = localStorage.getItem("tenantData");
const msalConfig = {
  auth: {
    clientId: "ccbafa39-beb4-4e2f-ada2-a965e88c418e", // Replace with your Application (client) ID
    authority: "d890b36f-e465-4f18-895f-27f05789df8f", // Replace with your Directory (tenant) ID
    redirectUri: `https://${tenantData}.igniculusscrm.com/sidebar`, // Replace with your redirect URI
  },
  cache: {
    cacheLocation: 'sessionStorage', // Or 'localStorage'
    storeAuthStateInCookie: true, // Set to true for cross-origin cookies
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;
