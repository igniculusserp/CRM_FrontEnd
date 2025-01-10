import { useState, useEffect } from "react";
import axios from "axios";

export default function useManagedBy(url, bearer_token) {
    const [managedBy, setManagedBy] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchManagedBy = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${bearer_token}`,
                    },
                };
                const response = await axios.get(url, config);
                setManagedBy(response.data.data)
            } catch (err) {
                setError(err)
            }
        };

        fetchManagedBy();
    }, [url, bearer_token]);
    return { managedBy };
};