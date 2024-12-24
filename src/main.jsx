import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

//-------------------------------------Microsoft Authentication----------------------------------------------------
import { MsalProvider } from "@azure/msal-react";
import msalInstance from "./Config/msalConfig.js";

//-------------------------------------Google Authentication----------------------------------------------------

import { GoogleOAuthProvider } from "@react-oauth/google";

import ProtectedRoute from "./ProtectedRoute.jsx";

//Registration
import Registration from "./Components/REGISTRATION/Registration.jsx";
import Verifyotp from "./Components/REGISTRATION/Verifyotp.jsx";
import VerifyTenant from "./Components/REGISTRATION/VerifyTenant.jsx";
import TenantLogin from "./Components/REGISTRATION/TenantLogin.jsx";
import TenantLoginOTP from "./Components/REGISTRATION/TenantLoginOTP.jsx";

//Forget Password
import ForgetPass from "./Components/REGISTRATION/ForgetPass.jsx";
import ForgetPassOTP from "./Components/REGISTRATION/ForgetPassOTP.jsx";
import ForgetResetPassword from "./Components/REGISTRATION/ForgetResetPassword";
import ForgetPassSuccess from "./Components/REGISTRATION/ForgetPassSuccess.jsx";

//SideBar
import SidebarBase from "./Components/SIDEBAR/SidebarBase.jsx";
import WelcomePage from "./Components/REGISTRATION/WelcomePage.jsx";

//SiderBar Inner-Components

import Client from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Client/Client.jsx";
import SalesOrder from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SalesOrder/SalesOrder.jsx";
import Logs from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SideBar_Logs/Logs.jsx";

import MailBox from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MailBox.jsx";
import GroupChat from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/GroupChat.jsx";

//Shivam ---> CreateTrial-->|-->|-->CreateVoice
import Home from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Home/Home.jsx";

import CreateOrder from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/CreateOrder.jsx";
import CreateMailBox from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/CreateMailBox.jsx";

// SMS BOX => INNER COMPONENT
import SmsBox from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SMSBox/SmsBox.jsx";
import CreateSendSms from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SMSBox/CreateSendSms.jsx";
import CreateSendEmail from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SMSBox/SMSComponents/CreateSendEmail.jsx";

// Financial Activity => INNER COMPONENT
import FinancialActivity from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FinancialActivity/FinancialActivity.jsx";

// Inner Contact --> FollowUp
import FollowUp from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FollowUp/FollowUp.jsx";
import CreateFollowUp from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FollowUp/CreateFollowUp.jsx";

// Inner Contact --> FreeTrail
import FreeTrail from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FreeTrial/FreeTrail.jsx";
import CreateTrial from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FreeTrial/CreateTrial.jsx";

//only for Testing
import Test from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Test.jsx";

//Inner Lead -> Component
import Lead from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Lead/Leads.jsx";
import Createlead from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Lead/CreateLead.jsx";

// Inner Contact --> Component
import Contact from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Contact/Contacts.jsx";
import CreateContact from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Contact/CreateContact.jsx";

//Sidebar-Header button Inner Components -> Setting
import Setting from "./Components/SIDEBAR/SIDEBAR_SETTING/Setting.jsx";
import CreateSOLead from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Lead/CreateSOLead.jsx";

import CreateSOContact from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Contact/CreateSOContact.jsx";

// VOICEBOX - INNER VOICEBOX COMPONENTS
import VoiceBox from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/VoiceBox/VoiceBox.jsx";
import CreateVoice from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/VoiceBox/VoiceComponent/CreateVoice.jsx";
import CreateVoiceReports from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/VoiceBox/VoiceComponent/CreateVoiceReports.jsx";
import CreateVoiceDetails from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/VoiceBox/VoiceComponent/CreateVoiceDetails.jsx";
import CreateLogs from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SideBar_Logs/LogComponents/CreateLogs.jsx";
import CreateChats from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SideBar_Logs/LogComponents/CreateChats.jsx";
import CreateExtension from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SideBar_Logs/LogComponents/CreateExtension.jsx";
import Reports from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Report/Reports.jsx";
// Edit Client SO
import EditClientSO from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Report/RepoComponents/EditClientSO.jsx";

import CreateLogin from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SideBar_Logs/LogComponents/CreateLogin.jsx";

import MISReports from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MisReports/MISReports.jsx";
import GeneralReport from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MisReports/MisComponents/GeneralReport.jsx";
import FtReport from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MisReports/MisComponents/FtReport.jsx";
import PaidClientReport from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MisReports/MisComponents/PaidClientReport.jsx";
import UserReport from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MisReports/MisComponents/UserReport.jsx";
import CallingReport from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MisReports/MisComponents/CallingReport.jsx";
import DNDReport from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MisReports/MisComponents/DNDReport.jsx";
import TrackSheet from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MisReports/MisComponents/TrackSheet.jsx";
import ResearchReport from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MisReports/MisComponents/ResearchReport.jsx";
import FollowUpNotificationProvider from "./FollowUpNotificationProvider.jsx";
import Analytics from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Analytics/Analytics.jsx";

// SUBSCRIPTION
import Subscription from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Subscription/Subscription.jsx";
import Chat from "./Components/SIDEBAR/SIDEBAR_SETTING/ChatWindow.jsx";


import NotificationProvider from "./NotificationProvider";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/VerifyTenant", element: <VerifyTenant /> },
  { path: "/tenantlogin", element: <TenantLogin /> },
  { path: "/tenantloginOTP", element: <TenantLoginOTP /> },
  { path: "/registration", element: <Registration /> },
  { path: "/verifyotp/:userId", element: <Verifyotp /> },
  { path: "/welcome/:tenantId", element: <WelcomePage /> },
  { path: "*", element: <Test /> },

  { path: "/forgetpassword", element: <ForgetPass /> },
  { path: "/forgetpasswordotp", element: <ForgetPassOTP /> },
  { path: "/forgetresetpass", element: <ForgetResetPassword /> },
  { path: "/forgetpasssucess", element: <ForgetPassSuccess /> },
  { path: "/test", element: <Test /> },
  {
    path: "/panel",
    element: (
      <ProtectedRoute>
        <SidebarBase />
      </ProtectedRoute>
    ),
    children: [
      { path: "/panel", element: <Home /> },

      //Lead->
      { path: "/panel/dashboard", element: <Home /> },
      { path: "/panel/lead", element: <Lead /> },
      { path: "/panel/editlead/:id", element: <Createlead /> },
      { path: "/panel/createlead", element: <Createlead /> },

      { path: "/panel/lead/create/so/:id", element: <CreateSOLead /> },

      //Contacts->
      { path: "/panel/contact", element: <Contact /> },
      { path: "/panel/createcontact", element: <CreateContact /> },
      { path: "/panel/editContact/:id", element: <CreateContact /> },
      { path: "/panel/contact/create/so/:id", element: <CreateSOContact /> },

      //FreeTrail ->
      { path: "/panel/freeTrail", element: <FreeTrail /> },
      { path: "/panel/createtrial/:id", element: <CreateTrial /> },

      //FollowUp ->
      { path: "/panel/followup", element: <FollowUp /> },
      { path: "/panel/createfollowup/:id", element: <CreateFollowUp /> },

      // VoiceBox ->
      { path: "/panel/voicebox", element: <VoiceBox /> },
      { path: "/panel/createvoice", element: <CreateVoice /> },
      { path: "/panel/createvoicedetails", element: <CreateVoiceDetails /> },
      { path: "/panel/createreports", element: <CreateVoiceReports /> },

      // LOGS
      { path: "/panel/logs", element: <Logs /> },
      { path: "/panel/createlogs", element: <CreateLogs /> },
      { path: "/panel/createchats", element: <CreateChats /> },
      { path: "/panel/createextension", element: <CreateExtension /> },
      { path: "/panel/createlogin", element: <CreateLogin /> },

      // CLIENT => INNER COMPONENT
      { path: "/panel/client", element: <Client /> },

      { path: "/panel/salesorder", element: <SalesOrder /> },
      { path: "/panel/createorder", element: <CreateOrder /> },
      { path: "/panel/mailBox", element: <MailBox /> },
      { path: "/panel/createmail", element: <CreateMailBox /> },

      // SMS BOX => INNER COMPONENT
      { path: "/panel/smsBox", element: <SmsBox /> },
      { path: "/panel/sendsms", element: <CreateSendSms /> },
      { path: "/panel/sendemail", element: <CreateSendEmail /> },

      // SMS BOX => INNER COMPONENT
      { path: "/panel/FinancialActivity", element: <FinancialActivity /> },
      // Report => INNER COMPONENT
      { path: "/panel/reports", element: <Reports /> },
      { path: "/panel/clientso/:id", element: <EditClientSO /> },
      { path: "/panel/analytics", element: <Analytics /> },

      // MIS REPORT => INNER COMPONENT
      { path: "/panel/misreports", element: <MISReports /> },
      { path: "/panel/creategeneral", element: <GeneralReport /> },
      { path: "/panel/createft", element: <FtReport /> },
      { path: "/panel/createpaid", element: <PaidClientReport /> },
      { path: "/panel/createuser", element: <UserReport /> },
      { path: "/panel/createcalling", element: <CallingReport /> },
      { path: "/panel/creatednd", element: <DNDReport /> },
      { path: "/panel/createtrack", element: <TrackSheet /> },
      { path: "/panel/createresearch", element: <ResearchReport /> },

      { path: "/panel/groupChat", element: <GroupChat /> },
      { path: "/panel/setting", element: <Setting /> },

      { path: "/panel/subscription", element: <Subscription /> },
      { path: "/panel/chat", element: <Chat /> },

      { path: "*", element: <Test /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <MsalProvider instance={msalInstance}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <FollowUpNotificationProvider>
        <NotificationProvider>
          {/* <ToastContainer /> */}
          <RouterProvider router={router} />
        </NotificationProvider>
      </FollowUpNotificationProvider>
    </GoogleOAuthProvider>
  </MsalProvider>
);
