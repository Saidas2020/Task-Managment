import { useState } from "react";

function useApi(apiCall) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async (...args) => {
        try {
            setLoading(true);
            const res = await apiCall(...args);
            setData(res.data);
        } catch (err) {
            setError(err.message || "Error");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, request };
}

export default useApi;