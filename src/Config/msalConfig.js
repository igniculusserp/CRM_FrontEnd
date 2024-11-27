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
  scopes: [
    "User.Read",
    "Mail.Read",
    "Calendars.Read",
    "Files.Read",
    "Team.ReadBasic.All",
  ],
};

export const tokenRequest = {
  scopes: ["User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me", // Profile
  graphMessagesEndpoint: "https://graph.microsoft.com/v1.0/me/messages", // Emails
  graphEventsEndpoint: "https://graph.microsoft.com/v1.0/me/events", // Calendar
  graphFilesEndpoint: "https://graph.microsoft.com/v1.0/me/drive/root/children", // Files
  graphTeamsEndpoint: "https://graph.microsoft.com/v1.0/me/joinedTeams", // Teams
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
