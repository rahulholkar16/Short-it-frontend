import { useState } from 'react'
import './Login.css'
import { useFetch } from '../../hook/useFetch';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
    const { loginData } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const nevigate = useNavigate();
    const { data, error, loading, executeFetch } = useFetch('api/v1/login', { method: "POST" }, false);

    async function login(e) {
        e.preventDefault(); // stop form reload
        const res = await executeFetch({ email, password });
        if (res.msg == "Loging successfully!") {
            loginData(res.token)
            nevigate('/dashboard');
        } else {
            alert(res.msg);
        }
    }

    return (
        <main className="container">
            <div className="card auth-card">
                <img src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png" alt="logo" className="form-logo" />
                <h2>Login to Your Account</h2>
                <p className="muted">Access your personalized dashboard.</p>

                <div className="input-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="hello@email.com" onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="show-password-container">
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(prev => !prev)}
                        />
                        <label htmlFor="showPassword">Show Password</label>
                    </div>
                </div>

                <div>
                    <button className="btn primary login" onClick={login}>{loading ? "Loging..." : "Login"}</button>
                </div>

                <div className="links">
                    <p>Don’t have an account? <a className="Signup" onClick={() => nevigate('/signup')}>Sign Up</a></p>
                </div>
            </div>
        </main>
    )
}

export default Login
