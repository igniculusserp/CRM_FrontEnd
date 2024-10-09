import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

//Registration
import Registration           from './Components/REGISTRATION/Registration.jsx';
import Verifyotp              from './Components/REGISTRATION/Verifyotp.jsx';
import VerifyTenant           from './Components/REGISTRATION/VerifyTenant.jsx';
import TenantLogin            from './Components/REGISTRATION/TenantLogin.jsx';

//Forget Password
import ForgetPass             from './Components/REGISTRATION/ForgetPass.jsx';
import ForgetPassOTP          from './Components/REGISTRATION/ForgetPassOTP.jsx';
import ForgetResetPassword    from './Components/REGISTRATION/ForgetResetPassword';
import ForgetPassSuccess      from './Components/REGISTRATION/ForgetPassSuccess.jsx';


//SideBar
import SidebarBase            from './Components/SIDEBAR/SidebarBase.jsx'
import WelcomePage            from './Components/REGISTRATION/WelcomePage.jsx';

//SiderBar Inner-Components

import Client                 from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Client/Client.jsx';
import SalesOrder             from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SalesOrder/SalesOrder.jsx'
import Logs                   from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SideBar_Logs/Logs.jsx';


import MailBox                from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MailBox.jsx';
import SmsBox                 from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SmsBox.jsx';
import Analytics              from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Analytics.jsx'
import GroupChat              from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/GroupChat.jsx';


//Shivam ---> CreateTrial-->|-->|-->CreateVoice
import Home from "./Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Home/Home.jsx";

import CreateOrder            from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/CreateOrder.jsx';
import CreateMailBox          from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/CreateMailBox.jsx';
import CreateSms              from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/CreateSms.jsx';


// Inner Contact --> FollowUp
import FollowUp               from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FollowUp/FollowUp.jsx'
import CreateFollowUp         from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FollowUp/CreateFollowUp.jsx';

// Inner Contact --> FreeTrail
import FreeTrail              from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FreeTrial/FreeTrail.jsx';
import CreateTrial            from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/FreeTrial/CreateTrial.jsx';


//only for Testing
import Test from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Test.jsx';

//Inner Lead -> Component
import Lead       from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Lead/Leads.jsx'
import Createlead from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Lead/CreateLead.jsx';
 

// Inner Contact --> Component
import Contact                from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Contact/Contacts.jsx'
import CreateContact from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Contact/CreateContact.jsx';

//Sidebar-Header button Inner Components -> Setting
import Setting from './Components/SIDEBAR/SIDEBAR_SETTING/Setting.jsx'
import CreateSOLead from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Lead/CreateSOLead.jsx';

import CreateSOContact from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Contact/CreateSOContact.jsx';

// VOICEBOX - INNER VOICEBOX COMPONENTS
import VoiceBox from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/VoiceBox/VoiceBox.jsx';
import CreateVoice from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/VoiceBox/CreateVoice.jsx';
import CreateVoiceReports from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/VoiceBox/CreateVoiceReports.jsx';
import CreateVoiceDetails from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/VoiceBox/CreateVoiceDetails.jsx';
import CreateLogs from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SideBar_Logs/LogComponents/CreateLogs.jsx';
import CreateChats from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SideBar_Logs/LogComponents/CreateChats.jsx';
import CreateExtension from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/SideBar_Logs/LogComponents/CreateExtension.jsx';
// Reports - INNER Reports COMPONENTS
import Reports from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Report/Reports.jsx';
// Edit Client SO
import EditClientSO from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/Report/RepoComponents/EditClientSO.jsx';
import MISReports from './Components/SIDEBAR/SIDEBAR_INNER_COMPONENTS/MisReports/MISReports.jsx';
 


const router = createBrowserRouter([
  {path: '/',                           element: <App />,},
  {path: '/VerifyTenant',               element: <VerifyTenant />,},
  {path: '/tenantlogin',                element: <TenantLogin />,},
  {path: '/registration',               element: <Registration />,},
  {path: '/verifyotp/:userId',          element: <Verifyotp />,},
  {path: '/welcome/:tenantId',          element: <WelcomePage/>},
  {path: '*',                           element : <Test/> },

  
  {path: '/forgetpassword',             element: <ForgetPass/> },
  {path: '/forgetpasswordotp',          element: <ForgetPassOTP/> },
  {path: '/forgetresetpass',            element: <ForgetResetPassword/> },
  {path: '/forgetpasssucess',           element: <ForgetPassSuccess/> },
  {path: '/test',                       element: <Test/> },
  {
    path: '/sidebar', element: <SidebarBase />,children: 
    [
      { path: '/sidebar',                    element : <Home/> },
      
      //Lead->
      { path: '/sidebar/lead',               element : <Lead/> },
      { path: '/sidebar/editlead/:id',       element : <Createlead/> },
      { path: '/sidebar/createlead',         element : <Createlead/> },

      
      { path: '/sidebar/lead/create/so/:id',         element  : <CreateSOLead/> },

      //Contacts->
      { path: '/sidebar/contact',            element : <Contact/> },
      { path: '/sidebar/createcontact',      element : <CreateContact/> },
      { path: '/sidebar/editContact/:id',    element : <CreateContact/> },
      { path: '/sidebar/contact/create/so/:id',         element  : <CreateSOContact/> },

      
      //FreeTrail ->
      { path: '/sidebar/freeTrail',              element : <FreeTrail /> },
      { path: '/sidebar/createtrial/:id',        element : <CreateTrial/> },

       //FollowUp ->
      { path: '/sidebar/followup',               element : <FollowUp /> },
      { path: '/sidebar/createfollowup/:id',     element : <CreateFollowUp /> },

      // VoiceBox ->
      { path: '/sidebar/voicebox',           element : <VoiceBox/> },
      { path: '/sidebar/createvoice',        element : <CreateVoice/> },
      { path: '/sidebar/createvoicedetails', element : <CreateVoiceDetails/> },
      { path: '/sidebar/createreports',      element : <CreateVoiceReports/> },

          // LOGS
          { path: '/sidebar/logs',               element : <Logs/> },
          { path: '/sidebar/createlogs',         element : <CreateLogs/> },
          { path: '/sidebar/createchats',        element : <CreateChats/> },
          { path: '/sidebar/createextension',    element : <CreateExtension/> },


      
      { path: '/sidebar/client',             element : <Client/> },
      { path: '/sidebar/salesorder',         element : <SalesOrder/> },
      { path: '/sidebar/createorder',        element : <CreateOrder/> },
      { path: '/sidebar/mailBox',            element : <MailBox/> },
      { path: '/sidebar/createmail',         element : <CreateMailBox/> },
      { path: '/sidebar/smsBox',             element : <SmsBox/> },
      { path: '/sidebar/createsms',          element : <CreateSms/> },

      { path: '/sidebar/reports',            element : <Reports /> },
      { path: '/sidebar/Client_SO/:id',            element : <EditClientSO /> },
      { path: '/sidebar/analytics',          element : <Analytics /> },

      { path: '/sidebar/misreports',         element: <MISReports /> },


      { path: '/sidebar/groupChat',          element : <GroupChat/> },  
      {path: '/sidebar/setting',             element : <Setting/> },
      {path: '*',                            element : <Test/> },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);