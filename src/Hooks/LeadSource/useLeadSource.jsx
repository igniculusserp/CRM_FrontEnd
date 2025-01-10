import { useState, useEffect } from "react";
import axios from "axios";

export default function useLeadSource(url, bearer_token){
  const [leadSource, setleadSource] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchLeadStatus = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${bearer_token}`,
          },
        };
        const response = await axios.get(url, config);
        setleadSource(response.data.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchLeadStatus();
  }, [url, bearer_token]);

  return { leadSource };
};