import { useState, useEffect } from 'react';
import { useFetch } from '../../hook/useFetch';
import './History.css';

export default function History() {
    const [history, setHistory] = useState([]);
    const { data, loading, error } = useFetch('api/v1/history', { method: "GET" }, true);

    // Update history when data changes
    useEffect(() => {
        if (data && data.history) {
            setHistory(data.history);
        }
    }, [data]);
    
    return (
        <main className="container">
            <div className="history-card">
                <h2>Your Link History</h2>

                <div className="table-wrapper">
                    {loading && <p>Loading...</p>}
                    {error && <p className="error">{error}</p>}

                    {history.length > 0 ? (
                        history.map((item, i) => (
                            <div key={i} className="history-row">
                                <div className="field">
                                    <label>Original Link</label>
                                    <span className="original">{item.origenalUrl}</span>
                                </div>
                                <div className="field">
                                    <label>Short Link</label>
                                    <a href={`https://sh-it.vercel.app/url/${item.sortUrl}`} target="_blank" className="short-link">https://sh-it.vercel.app/url/{item.sortUrl}</a>
                                </div>
                                <div className="field">
                                    <label>Date</label>
                                    <span className="date">{new Date(item.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        !loading && <p>No history found</p>
                    )}
                </div>
            </div>
        </main>
    );
}
