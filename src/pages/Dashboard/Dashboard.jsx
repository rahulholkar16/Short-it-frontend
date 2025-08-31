import './Dashboard.css'

export default function Dashboard() {
    return (
        <div className="dash_container">

            <header className="header">
                <h1 className="title">Sleek URL Shortener</h1>
                <p className="subtitle">Paste a long URL, get a tidy short link with one click.</p>
            </header>

            <section className="card">
                {/* CONFIG: Update these if your routes are mounted under a path (e.g., '/url') */}
                <div className="chip" title="Adjust for your backend">
                    <strong>Config</strong>
                    <span id="configInfo"></span>
                </div>

                <div className="input-wrap">
                    <label className="label" for="longUrl">Long URL</label>
                    <input id="longUrl" className="url-input" type="url" placeholder="https://example.com/some/very/long/path?with=query&and=tracking" />
                    <div id="errorBox" className="error"></div>
                    <p className="helper">Tip: You can press <kbd>Enter</kbd> to shorten quickly.</p>
                </div>

                <div className="actions" style={{marginTop: "8px"}}>
                    <button id="clearBtn" className="btn ghost" type="button">Clear</button>
                    <button id="shortenBtn" className="btn" type="button">Shorten URL</button>
                </div>

                <div id="result" className="result">
                    <div className="row" style={{marginTop: "12px"}}>
                        <div className="short-url" id="shortUrlDisplay">—</div>
                        <button id="copyBtn" className="btn ghost" type="button">Copy</button>
                        <a id="openBtn" className="btn" target="_blank" rel="noopener" href="#">Open</a>
                    </div>
                    <p className="helper" id="notes"></p>
                </div>

                <div className="footer">
                    <span>Built with ❤️ using your Node/Express backend.</span>
                    <span>Keyboard: <kbd>Enter</kbd> shorten • <kbd>Esc</kbd> clear</span>
                </div>
            </section>
        </div>
    )
}
