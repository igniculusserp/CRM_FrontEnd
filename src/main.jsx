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

//Protected route for disabling OTP By Pass
import ProtectedRoute from "./ProtectedRoute.jsx";

//Login: -->
import TenantLogin from "./Components/REGISTRATION/TenantLogin.jsx";
import TenantLoginOTP from "./Components/REGISTRATION/TenantLoginOTP.jsx";

//Registration: -->
import Registration from "./Components/REGISTRATION/Registration.jsx";
import Verifyotp from "./Components/REGISTRATION/Verifyotp.jsx";
import VerifyTenant from "./Components/REGISTRATION/VerifyTenant.jsx";
import WelcomePage from "./Components/REGISTRATION/WelcomePage.jsx";

//Forget Password: -->
import ForgetPass from "./Components/REGISTRATION/ForgetPass.jsx";
import ForgetPassOTP from "./Components/REGISTRATION/ForgetPassOTP.jsx";
import ForgetResetPassword from "./Components/REGISTRATION/ForgetResetPassword";
import ForgetPassSuccess from "./Components/REGISTRATION/ForgetPassSuccess.jsx";

//SideBar
import SidebarBase from "./Components/SIDEBAR/SidebarBase.jsx";


//SiderBar Modules
//Home
import Home from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Home/Home.jsx";

//Leads ->
import Lead from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Lead/Leads.jsx";
import Createlead from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Lead/CreateLead.jsx";

import Client from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Client/Client.jsx";
import SalesOrder from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SalesOrder/SalesOrder.jsx";
import Logs from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SideBar_Logs/Logs.jsx";

import MailBox from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MailBox.jsx";
import GroupChat from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/GroupChat.jsx";

import CreateOrder from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/CreateOrder.jsx";
import CreateMailBox from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/CreateMailBox.jsx";

// SMS BOX => INNER COMPONENT
import ServiceBox from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/ServiceBox/ServiceBox.jsx";
import CreateSendSms from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/ServiceBox/CreateSendSms.jsx";
import CreateSendEmail from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/ServiceBox/SMSComponents/CreateSendEmail.jsx";

// Financial Activity => INNER COMPONENT
import FinancialActivity from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FinancialActivity/FinancialActivity.jsx";

// Inner Contact --> FollowUp
import FollowUp from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FollowUp/FollowUp.jsx";
import CreateFollowUp from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FollowUp/CreateFollowUp.jsx";

// Inner Contact --> FreeTrail
import FreeTrail from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FreeTrial/FreeTrail.jsx";
import CreateTrial from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FreeTrial/CreateTrial.jsx";

// Inner Contact --> FollowUp
import Messaging from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Messaging/Messaging.jsx";

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

//Notification Provider -->--> -->--> #Firebase
import NotificationProvider from "./NotificationProvider";

//only for Testing
import ErrorRoute from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/ErrorRoute.jsx";

//roles and permissions
import UserSetting from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/User_Setting/UserSetting.jsx";
import UserOperation from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/User_Operation/UserOperation.jsx";
import Department from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/Department/Department.jsx";
import Designation from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/Designation/Designation.jsx";
import Qualification from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/Qualification/Qualification.jsx";
import LeadStatus from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/LeadStatus/LeadStatus.jsx";
import Pool from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/Pools/Pools.jsx";
import Segments from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/Segments/Segments.jsx";
import ExpenseHead from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/ExpenseHead/ExpenseHead.jsx";
import SMSTemplate from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/SMSTemplate/SMSTemplate.jsx";
import EmailTemplate from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/EmailTemplate/EmailTemplate.jsx";
import SMSSetting from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/SMSSetting/SMSSetting.jsx";
import EmailSetting from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/EmailSetting/EmailSetting.jsx";
import AccessDevice from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/AccessDevice/AccessDevice.jsx";
import AccessControl from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/AccessControl/AccessControl.jsx";
import Permissions from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/Permissions/Permissions.jsx";
import Group from "./Components/SIDEBAR/SIDEBAR_SETTING/SIDEBAR_SETTING_COMPONENTS/Group/Group.jsx";

const router = createBrowserRouter([
  //Login
  { path: "/", element: <App /> },
  { path: "/VerifyTenant", element: <VerifyTenant /> },
  { path: "/tenantlogin", element: <TenantLogin /> },
  { path: "/tenantloginOTP", element: <TenantLoginOTP /> },

  //Registration
  { path: "/registration", element: <Registration /> },
  { path: "/verifyotp/:userId", element: <Verifyotp /> },
  { path: "/welcome/:tenantId", element: <WelcomePage /> },

  //Forget Password
  { path: "/forgetpassword", element: <ForgetPass /> },
  { path: "/forgetpasswordotp", element: <ForgetPassOTP /> },
  { path: "/forgetresetpass", element: <ForgetResetPassword /> },
  { path: "/forgetpasssucess", element: <ForgetPassSuccess /> },

  { path: "*", element: <ErrorRoute /> },
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

      //VoiceBox ->
      { path: "/panel/voicebox", element: <VoiceBox /> },
      { path: "/panel/createvoice", element: <CreateVoice /> },
      { path: "/panel/createvoicedetails", element: <CreateVoiceDetails /> },
      { path: "/panel/createvoicereports", element: <CreateVoiceReports /> },

      //LOGS
      { path: "/panel/logs", element: <Logs /> },
      { path: "/panel/createlogs", element: <CreateLogs /> },
      { path: "/panel/createchats", element: <CreateChats /> },
      { path: "/panel/createextension", element: <CreateExtension /> },
      { path: "/panel/createlogin", element: <CreateLogin /> },

      //CLIENT
      { path: "/panel/client", element: <Client /> },

      //SALESORDER
      { path: "/panel/salesorder", element: <SalesOrder /> },
      { path: "/panel/createorder", element: <CreateOrder /> },

      //MAILBOX
      { path: "/panel/mailBox", element: <MailBox /> },
      { path: "/panel/createmail", element: <CreateMailBox /> },

      // SERVICE BOX
      { path: "/panel/servicebox", element: <ServiceBox /> },
      { path: "/panel/sendsms", element: <CreateSendSms /> },
      { path: "/panel/sendemail", element: <CreateSendEmail /> },

      // Financial Activity
      { path: "/panel/FinancialActivity", element: <FinancialActivity /> },

      // Report
      { path: "/panel/reports", element: <Reports /> },
      { path: "/panel/clientso/:id", element: <EditClientSO /> },

      // ANALYTICS
      { path: "/panel/analytics", element: <Analytics /> },

      //Messaging
      { path: "/panel/messaging", element: <Messaging /> },

      // MIS REPORT
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

      { path: "*", element: <ErrorRoute /> },

      // --------------------------------  Settings ------------------------------
      { path: "/panel/setting/user-settings", element: <UserSetting /> },
      { path: "/panel/setting/user-Operation", element: <UserOperation /> },
      { path: "/panel/setting/group", element: <Group /> },
      { path: "/panel/setting/department", element: <Department /> },
      { path: "/panel/setting/designation", element: <Designation /> },
      { path: "/panel/setting/qualification", element: <Qualification /> },
      { path: "/panel/setting/lead_status", element: <LeadStatus /> },
      { path: "/panel/setting/pools", element: <Pool /> },
      { path: "/panel/setting/segments", element: <Segments /> },
      { path: "/panel/setting/expensehead", element: <ExpenseHead /> },
      { path: "/panel/setting/sms-template", element: <SMSTemplate /> },
      { path: "/panel/setting/email-template", element: <EmailTemplate /> },
      { path: "/panel/setting/sms-Settings", element: <SMSSetting /> },
      { path: "/panel/setting/email-Settings", element: <EmailSetting /> },
      { path: "/panel/setting/access-device", element: <AccessDevice /> },
      {
        path: "/panel/settings/access-control",
        element: <AccessControl />,
      },
      { path: "/panel/settings/roles-permissions", element: <Permissions /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <MsalProvider instance={msalInstance}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <FollowUpNotificationProvider>
        <NotificationProvider>
          <RouterProvider future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true
          }} router={router} />
        </NotificationProvider>
      </FollowUpNotificationProvider>
    </GoogleOAuthProvider>
  </MsalProvider>,
);
