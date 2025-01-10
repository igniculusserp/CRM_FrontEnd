import { useState, useEffect } from "react";
import axios from "axios";

export default function useSegment(url, bearer_token) {
    const [segments, setsegments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSegments = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${bearer_token}`,
                    },
                };
                const response = await axios.get(url, config);
                setsegments(response.data.data);
                console.log(segments)
            } catch (err) {
                setError(err);
            }
        };

        fetchSegments();
    },
        [url, bearer_token]);
    return { segments };

}