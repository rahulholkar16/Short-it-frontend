import { useState, useEffect, useCallback } from "react";

export const useFetch = (url, options = {}, immediate = true) => {
    const BASE_URL = "https://sh-it.vercel.app/";

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(immediate);

    // Core fetch function
    const executeFetch = useCallback(
        async (bodyData = null) => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(BASE_URL + url, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        ...(options.headers || {}),
                        credentials: "include"
                    },
                    body: bodyData ? JSON.stringify(bodyData) : options.body,
                    credentials: "include", // for cookies / sessions
                });

                const json = await res.json();
                setData(json);
                return json;
            } catch (err) {
                console.error("❌ useFetch error:", err);
                setError(err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [url, JSON.stringify(options)]
    );

    // Run immediately if true
    useEffect(() => {
        if (immediate) {
            executeFetch();
        }
    }, [executeFetch, immediate]);

    return { data, error, loading, executeFetch };
};
