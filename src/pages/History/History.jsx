import { useState, useEffect } from 'react';
import { useFetch } from '../../hook/useFetch'
import './History.css'

export default function History() {
    const [history, setHistory] = useState(null);
    const { data, loading, error} = useFetch('api/v1/history', { method: "GET" }, true);
    
    // Update history only when data changes
    useEffect(() => {
        if (data) {
            setHistory(data.history);
        }
    }, [data]);
    console.log(history);
    
    return (
        <main className="container">
            <div className="history-card">
                <h2>Your Link History</h2>

                <div className="table-wrapper">
                    <div className='history-row'>
                        <div className="field">
                            <label>Original Link</label>
                            <span className="original">https://www.youtube.com</span>
                        </div>
                        <div className="field">
                            <label>Short Link</label>
                            <a href="localhost" className="short-link">http://localhost:3000/url/xyeh</a>
                        </div>
                        <div className="field">
                            <label>Date</label>
                            <span className="date">25/06/3056</span>
                        </div>
                    </div>

                </div>
            </div>
        </main>

    )
}
