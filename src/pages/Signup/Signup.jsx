import './Signup.css'
export default function Signup() {
    return (
        <main className="container">
            <div className="card auth-card">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="logo" className="form-logo" />

                <h2>Create an Account</h2>
                <p className="muted">Join us and start shortening URLs today.</p>

                <form id="signupForm">
                    <div className="input-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" placeholder="John Doe" required />
                    </div>

                    <div className="input-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" placeholder="hello@email.com" required />
                    </div>

                    <div className="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" required />
                    </div>

                    <div >
                        <button className="btn primary signup">Create Account</button>
                    </div>
                </form>

                <div className="links">
                    <p>Already have an account? <a className="login">Login here</a></p>
                </div>
            </div>
        </main>
    )
}
