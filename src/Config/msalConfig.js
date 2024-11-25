import { PublicClientApplication } from "@azure/msal-browser";

// Configuration for MSAL
export const msalConfig = {
  auth: {
    clientId: "f6e72c07-d272-4f8f-bea6-447352900ffc", // Application ID
    authority: "https://login.microsoftonline.com/d890b36f-e465-4f18-895f-27f05789df8f", // Tenant ID
    redirectUri: `https://${window.location.hostname}/sidebar`, // Your redirect URI
  },
  cache: {
    cacheLocation: "sessionStorage", // Cache location, or 'localStorage'
    storeAuthStateInCookie: true, // For cross-origin cookies
  },
};

export const loginRequest = {
  scopes: ["User.Read"], // Permission to read user's profile
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me", // Microsoft Graph API endpoint
};

let msalInstance = new PublicClientApplication(msalConfig);

// Check for an existing session after initialization
msalInstance
  .handleRedirectPromise()
  .then((response) => {
    if (response) {
      console.log("Redirect response:", response);
    }
  })
  .catch((error) => {
    console.error("Redirect promise error:", error);
  });

export default msalInstance; // Default export for MSAL instance
