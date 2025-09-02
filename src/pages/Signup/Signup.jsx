import { useState } from 'react'
import { useFetch } from '../../hook/useFetch'
import './Signup.css'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { loading, executeFetch } = useFetch('api/v1/signup', {
        method: "POST",
    }, false);

    function validatePassword(pwd) {
        const lengthCheck = /.{8,}/;
        const uppercaseCheck = /[A-Z]/;
        const lowercaseCheck = /[a-z]/;
        const numberCheck = /[0-9]/;
        const specialCharCheck = /[@$!%*?&#]/;

        if (!lengthCheck.test(pwd)) {
            return "Password must be at least 8 characters long.";
        }
        if (!uppercaseCheck.test(pwd)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!lowercaseCheck.test(pwd)) {
            return "Password must contain at least one lowercase letter.";
        }
        if (!numberCheck.test(pwd)) {
            return "Password must contain at least one number.";
        }
        if (!specialCharCheck.test(pwd)) {
            return "Password must contain at least one special character (@, $, !, %, *, ?, &, #).";
        }
        return "";
    }

    async function signup(e) {
        e.preventDefault(); // stop form reload

        const pwdError = validatePassword(password);
        if (pwdError) {
            setPasswordError(pwdError);
            return;
        } else {
            setPasswordError("");
        }

        const response = await executeFetch({ name, email, password });
        console.log("Signup response:", response);
        if (response.msg === "User added Successfully!") {
            navigate('/login');
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
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="John Doe" onChange={(e) => setName(e.target.value)} required />
                    </div>

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
                        {passwordError && <p className="error-message">{passwordError}</p>}
                        <small>Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character (@, $, !, %, *, ?, &, #).</small>
                    </div>

                    <div>
                        <button className="btn primary signup" onClick={signup}>{loading ? "Wait...":"Create Account"}</button>
                    </div>
                </form>

                <div className="links">
                    <p>Already have an account? <a className="login" onClick={() => navigate('/login')}>Login here</a></p>
                </div>
            </div>
        </main>
    )
}
