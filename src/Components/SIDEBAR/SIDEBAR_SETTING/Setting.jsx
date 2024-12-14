import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ButtonGroup from './ButtonGroup';
import UserSetting from './SIDEBAR_SETTING_COMPONENTS/User_Setting/UserSetting';
import UserOperation from './SIDEBAR_SETTING_COMPONENTS/User_Operation/UserOperation';
import Group from './SIDEBAR_SETTING_COMPONENTS/Group/Group';
import Department from './SIDEBAR_SETTING_COMPONENTS/Department/Department';
import Designation from './SIDEBAR_SETTING_COMPONENTS/Designation/Designation';
import Qualification from './SIDEBAR_SETTING_COMPONENTS/Qualification/Qualification';
import LeadStatus from './SIDEBAR_SETTING_COMPONENTS/LeadStatus/LeadStatus';
import Pools from './SIDEBAR_SETTING_COMPONENTS/Pools/Pools';
import Segments from './SIDEBAR_SETTING_COMPONENTS/Segments/Segments';
import SMSTemplate from './SIDEBAR_SETTING_COMPONENTS/SMSTemplate/SMSTemplate';
import EmailTemplate from './SIDEBAR_SETTING_COMPONENTS/EmailTemplate/EmailTemplate';
import CallTemplate from './SIDEBAR_SETTING_COMPONENTS/CallTemplate/CallTemplate';
import Plan from './SIDEBAR_SETTING_COMPONENTS/Plan/Plan';
// import Calendar from './Calendar';
import Promotion from './SIDEBAR_SETTING_COMPONENTS/Promotion/Promotion';
import SMSSetting from './SIDEBAR_SETTING_COMPONENTS/SMSSetting/SMSSetting';
import EmailSetting from './SIDEBAR_SETTING_COMPONENTS/EmailSetting/EmailSetting';
import BranchTarget from './SIDEBAR_SETTING_COMPONENTS/BranchTarget/BranchTarget';
import NotificationPopup from './SIDEBAR_SETTING_COMPONENTS/NotificationPopup/NotificationPopup';
import CallingExtension from './SIDEBAR_SETTING_COMPONENTS/CallingExtension/CallingExtension';
import AccessDevice from "./SIDEBAR_SETTING_COMPONENTS/AccessDevice/AccessDevice";
import Dlp from './SIDEBAR_SETTING_COMPONENTS/DLP/Dlp';
import Alert from './SIDEBAR_SETTING_COMPONENTS/Alert/Alert';
import AccessControl from './SIDEBAR_SETTING_COMPONENTS/AccessControl/AccessControl';
import PasswordPolicy from './SIDEBAR_SETTING_COMPONENTS/PasswordPolicy/PasswordPolicy';
import ExpenseHead from './SIDEBAR_SETTING_COMPONENTS/ExpenseHead/ExpenseHead';

export default function Setting() {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(
    () => parseInt(localStorage.getItem('activeTab')) || 1
  );

  const buttons = [
    { key: 1, value: "User Setting" },
    { key: 2, value: "User Operation" },
    { key: 3, value: "Groups" },
    { key: 4, value: "Department" },
    { key: 5, value: "Designation" },
    { key: 6, value: "Qualification" },
    { key: 7, value: "Lead Status" },
    { key: 8, value: "Pools" },
    { key: 9, value: "Segments" },
    { key: 26, value: "Expense Head" },
    { key: 10, value: "SMS Template" },
    { key: 11, value: "Email Template" },
    { key: 20, value: "Call Template" },
    { key: 12, value: "Plan" },
    { key: 13, value: "Calendar" },
    { key: 14, value: "Promotion" },
    { key: 15, value: "SMS Setting" },
    { key: 16, value: "Email Setting" },
    { key: 17, value: "Branch Target" },
    { key: 18, value: "Notification Popup" },
    { key: 19, value: "Calling Extension" },
    { key: 21, value: "Access Device" },
    { key: 22, value: "DLP" },
    { key: 23, value: "Alerts" },
    { key: 24, value: "Access Control" },
    { key: 25, value: "Password Policy" },
  ];

  const componentMap = {
    1: UserSetting,
    2: UserOperation,
    3: Group,
    4: Department,
    5: Designation,
    6: Qualification,
    7: LeadStatus,
    8: Pools,
    9: Segments,
    10: SMSTemplate,
    11: EmailTemplate,
    20: CallTemplate,
    12: Plan,
    // 13: Calendar,
    14: Promotion,
    15: SMSSetting,
    16: EmailSetting,
    17: BranchTarget,
    18: NotificationPopup,
    19: CallingExtension,
    21: AccessDevice,
    22: Dlp,
    23: Alert,
    24: AccessControl,
    25: PasswordPolicy,
    26: ExpenseHead,
  };

  const handleButtonClick = (key) => {
    setActiveTab(key);
    localStorage.setItem("activeTab", key);
  };

  useEffect(() => {
    return () => {
      // This will run when the component unmounts
      localStorage.removeItem("activeTab");
    };
  }, [location]);

  const ActiveComponent = componentMap[activeTab];

  return (
    <>
      <div className="flex flex-col m-3">
        <div className="flex justify-between px-3 bg-white border rounded py-3">
          <div className="flex items-center justify-center">
            <h1 className="text-xl py-1">Setting Dashboard</h1>
          </div>
          <div>
          </div>
        </div>
      </div>

      <ButtonGroup
        buttons={buttons}
        active={activeTab}
        onButtonClick={handleButtonClick}
      />

      <div>{ActiveComponent && <ActiveComponent />}</div>
    </>
  );
}
