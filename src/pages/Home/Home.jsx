import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hook/useFetch'
import './Home.css'

export default function Home() {
    const navigate = useNavigate();

    const { data, error } = useFetch('api/v1/dashboard', { method: "GET" }, true);

    function dashboardfun() {

        if (data.success == false || error) {
            navigate('/login')
        } else {
            navigate('/dashboard');
        }
    }
    return (
        <>
            <section className="hero">
                <div className="hero-text">
                    <h1>Shorten. Share. Track.</h1>
                    <p>Transform your long URLs into short, powerful links.
                        Manage everything with a simple dashboard.</p>
                    <div className="hero-buttons">
                        <a className="btn primary getStarted" onClick={dashboardfun}>Get Started</a>
                        <a className="btn secondary heroLogin" onClick={() => navigate('/login')}>Login</a>
                    </div>
                </div>

                <div className="hero-img">
                    <div className="dashboard-preview">
                        <h2>Dashboard Preview</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Original URL</th>
                                    <th>Short URL</th>
                                    <th>Clicks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>https://example.com/my-super-long-link...</td>
                                    <td>sho.rt/abc123</td>
                                    <td>120</td>
                                </tr>
                                <tr>
                                    <td>https://openai.com/chatgpt</td>
                                    <td>sho.rt/gpt45</td>
                                    <td>89</td>
                                </tr>
                                <tr>
                                    <td>https://github.com/yourrepo</td>
                                    <td>sho.rt/dev99</td>
                                    <td>45</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}
