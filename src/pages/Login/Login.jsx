import { useState } from 'react'
import './Login.css'
import { useFetch } from '../../hook/useFetch';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const nevigate = useNavigate();
    const { data, error, loading, executeFetch } = useFetch('api/v1/login', { method: "POST" }, false);

    async function login(e) {
        e.preventDefault(); // stop form reload
        const res = await executeFetch({ email, password });
        console.log("Signup response:", res);
        if (res.msg == "Loging successfully!"){
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
                        <label for="email">Email Address</label>
                        <input type="email" id="email" placeholder="hello@email.com" onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div >
                        <button className="btn primary login" onClick={login}>Login</button>
                    </div>


                    <div className="links">
                        <p>Don’t have an account? <a className="Signup" onClick={() => nevigate('/signup')}>Sign Up</a></p>
                    </div>
            </div>
        </main>
    )
}

export default Login