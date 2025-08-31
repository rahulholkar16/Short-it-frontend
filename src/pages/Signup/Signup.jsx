import { useState } from 'react'
import { useFetch } from '../../hook/useFetch'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nevigate = useNavigate();

    const { executeFetch } = useFetch('api/v1/signup', {
        method: "POST",
    }, false);

    async function signup (e) {
        e.preventDefault(); // stop form reload
        const response = await executeFetch({ name, email, password });
        console.log("Signup response:", response);
        if (response.msg === "User added Successfully!"){
            nevigate('/login');
        } else {
            alert(response.msg);
        }
    }
    return (
        <main className="container">
            <div className="card auth-card">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="logo" className="form-logo" />

                <h2>Create an Account</h2>
                <p className="muted">Join us and start shortening URLs today.</p>

                <form id="signupForm">
                    <div className="input-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" placeholder="John Doe" onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" placeholder="hello@email.com" onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div >
                        <button className="btn primary signup" onClick={signup}>Create Account</button>
                    </div>
                </form>

                <div className="links">
                    <p>Already have an account? <a className="login" onClick={() => nevigate('/login')}>Login here</a></p>
                </div>
            </div>
        </main>
    )
}
