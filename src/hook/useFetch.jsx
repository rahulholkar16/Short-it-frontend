import { useEffect, useState } from "react"

export const useFetch = (url, immediate = true) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const BASE_URL = "http://localhost:3000/"

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await fetch(BASE_URL + url, { 
                    method: "GET",
                    credentials: "include",
                });
                const json = await res.json();
                setData(json);
            } catch (err) {
                if (err.name !== 'AbortError') setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Proper cleanup function
        
    }, [url]);


    return { data, loading, error };
}