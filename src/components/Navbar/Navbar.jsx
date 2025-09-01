import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import "./Navbar.css";

function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="navbar">
            <div className="logo" onClick={() => navigate("/dashboard")}>
                Short<span>It</span>
            </div>
            <nav>
                {isLoggedIn ? (
                    <>
                        <a onClick={() => navigate("/dashboard")}>Dashboard</a>
                        <a onClick={() => navigate("/history")}>History</a>
                        <a onClick={logout}>Logout</a>
                    </>
                ) : (
                    <>
                        <a className="NavLogin" onClick={() => navigate("/login")}>
                            Login
                        </a>
                        <a className="btn signup" onClick={() => navigate("/signup")}>
                            Signup
                        </a>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Navbar;
