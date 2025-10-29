import { useRef, useState, useEffect } from 'react';
import { useFetch } from '../../hook/useFetch';
import './Dashboard.css';

export default function Dashboard() {
    const ref = useRef(); // Error box
    const shorturldivRef = useRef(); // Result div
    const copyBtn = useRef(); // Copy button
    const notesRef = useRef(); // Notes paragraph
    const configInfoRef = useRef(); // Config info span

    const [url, setUrl] = useState("");
    const [error, setError] = useState(null);
    const [shortUrl, setShorturl] = useState("");
    const { loading, executeFetch } = useFetch('api/v1/short', { method: "POST" }, false);

    const SHORT_PATH_PREFIX = "/url/";

    useEffect(() => {
        // Show config info
        if (configInfoRef.current) {
            configInfoRef.current.textContent = `POST: api/v1/short  •  GET: ${SHORT_PATH_PREFIX}:code`;
        }
    }, []);

    function showError(msg) {
        setError(msg);
        if (ref.current) {
            ref.current.style.display = 'block';
            ref.current.textContent = msg;
        }
    }

    function clearError() {
        setError(null);
        if (ref.current) {
            ref.current.style.display = 'none';
            ref.current.textContent = '';
        }
    }

    async function short(e) {
        e.preventDefault();
        clearError();
        if (!url.trim()) {
            showError('Please paste a URL.');
            return;
        }

        try {
            const res = await executeFetch({ url });
            if (!res) {
                showError('Network error. Is the backend running?');
                return;
            }

            if (res.msg === "Url shortened successfully!") {
                
                const code = res.data.sortUrl;
                const shortHref = `https://sh-it.vercel.app${SHORT_PATH_PREFIX}${code}`;
                setShorturl(shortHref);

                if (notesRef.current) {
                    notesRef.current.textContent = `This short link will redirect to: ${res.data.origenalUrl || url}`;
                }

                if (shorturldivRef.current) {
                    shorturldivRef.current.style.display = 'block';
                }
            } else {
                showError(res.msg || 'Something went wrong.');
            }
        } catch (err) {
            console.error(err);
            showError('Network error. Is the backend running?');
        }
    }

    async function copy() {
        if (!shortUrl) return;
        try {
            await navigator.clipboard.writeText(shortUrl);
            if (copyBtn.current) copyBtn.current.textContent = 'Copied!';
            setTimeout(() => {
                if (copyBtn.current) copyBtn.current.textContent = 'Copy';
            }, 1100);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    }

    function keyevent(e) {
        if (e.key === "Enter") short(e);
        if (e.key === "Escape") {
            setUrl("");
            clearError();
            if (shorturldivRef.current) shorturldivRef.current.style.display = 'none';
        }
    }

    function clearURL() {
        setUrl("");
        clearError();
        if (shorturldivRef.current) shorturldivRef.current.style.display = 'none';
    }

    return (
        <div className="dash_container">
            <header className="header">
                <h1 className="title">Sleek URL Shortener</h1>
                <p className="subtitle">Paste a long URL, get a tidy short link with one click.</p>
            </header>

            <section className="card">
                <div className="chip" title="Adjust for your backend">
                    <strong>Config</strong>
                    <span ref={configInfoRef}></span>
                </div>

                <div className="input-wrap">
                    <label className="label" htmlFor="longUrl">Long URL</label>
                    <input
                        id="longUrl"
                        className="url-input"
                        type="url"
                        placeholder="https://example.com/some/very/long/path?with=query&and=tracking"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={keyevent}
                    />
                    <div className="error" ref={ref}></div>
                    <p className="helper">Tip: Press <kbd>Enter</kbd> to shorten quickly, <kbd>Esc</kbd> to clear.</p>
                </div>

                <div className="actions" style={{ marginTop: "8px" }}>
                    <button className="btn ghost" type="button" onClick={clearURL}>Clear</button>
                    <button className="btn" type="button" onClick={short}>{loading ? "Shorting...":"Shorten URL"}</button>
                </div>

                <div className="result" ref={shorturldivRef} style={{ display: "none" }}>
                    <div className="row" style={{ marginTop: "12px" }}>
                        <div className="short-url">{shortUrl}</div>
                        <button className="btn ghost" ref={copyBtn} type="button" onClick={copy}>Copy</button>
                        <a className="btn" target="_blank" rel="noopener noreferrer" href={shortUrl}>Open</a>
                    </div>
                    <p className="helper" ref={notesRef}></p>
                </div>

                <div className="footer">
                    <span>Built with ❤️ using your Node/Express backend.</span>
                    <span>Keyboard: <kbd>Enter</kbd> shorten • <kbd>Esc</kbd> clear</span>
                </div>
            </section>
        </div>
    );
}
