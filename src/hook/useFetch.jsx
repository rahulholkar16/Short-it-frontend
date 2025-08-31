import { useCallback, useEffect, useState } from "react"
import { API_CONNECTION } from "../utils/api";

export function useFetch(url, option, immediate = true) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(immediate);

    const fetchData = useCallback(async (url, option) => {
        setLoading(true);
        setError(null);

        try {
            const res = await API_CONNECTION(url, option);
            const json = await res.json();
            setData(json);
            return json;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [url, option]);

    useEffect(()=>{
        if(immediate && url) {
            fetchData();
        }
    }, [url, option, immediate, fetchData]);
    return { data, error, loading };
}
