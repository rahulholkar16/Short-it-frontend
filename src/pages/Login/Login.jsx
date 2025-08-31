import './Login.css'
function Login() {
    return (
        <main className="container">
            <div className="card auth-card">
                <img src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png" alt="logo" className="form-logo" />
                    <h2>Login to Your Account</h2>
                    <p className="muted">Access your personalized dashboard.</p>


                    <div className="input-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" placeholder="hello@email.com" required />
                    </div>

                    <div className="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" required />
                    </div>

                    <div >
                        <button className="btn primary login">Login</button>
                    </div>


                    <div className="links">
                        <p>Don’t have an account? <a className="Signup">Sign Up</a></p>
                    </div>
            </div>
        </main>
    )
}

export default Login