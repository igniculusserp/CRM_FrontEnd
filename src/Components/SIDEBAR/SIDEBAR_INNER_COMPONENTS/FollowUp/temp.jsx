import { useState, useEffect } from "react";
//external Packages
import axios from "axios";
//Folder Imported

import { tenant_base_url, protocal_url } from "./../../../../Config/config";
import { getHostnamePart } from "../../SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";
import UseDateFilter from "../../../../Hooks/DateFilter/UseDateFilter";

export default function FollowUp() {
  const bearer_token = localStorage.getItem("token");
  const name = getHostnamePart();

  //-------------------------------------------------- GET Data ----------------------------------------------------
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const getApiData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await axios.get(
        `${protocal_url}${name}.${tenant_base_url}/FollowUp/byusertoken`,
        config,
      );
      if (response.status === 200) {
        const followup = response.data;
        setOriginalData(followup?.data);
        setFilteredData(followup?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);

  //---------------------------------------------> Grid Pagination <-----------------------------------------------
  const currentData = filteredData;
 
 
  //------------------------------------------------------Filter Reset Settings ---------------------------------------------
 
  const handleResetFilter = () => {
    setFilteredData(originalData);
  };
 
  return (
    <>
      {/* -------- PARENT -------- */}
      <div className="m-3 flex min-h-screen flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-white px-3 py-2">
         
    
        </div>
        {/* MIDDLE SECTION */}
     
          {/* ------------------- Filter by date ----------------- */}
          <UseDateFilter
            onReset={handleResetFilter}
            originalData={originalData}
            setFilteredData={setFilteredData}
          />
        </div>
      
      
    </>
  );
}



