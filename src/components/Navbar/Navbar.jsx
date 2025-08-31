import { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const [isLoggedin, setIsloggedin] = useState(false);
    const nevigate = useNavigate();
    return (
        <header className="navbar">
            <div className="logo">Short<span>It</span></div>
            <nav>
                {isLoggedin ? <>
                        <a id="dashboardnav">Dashboard</a>
                        <a id="navHistory">History</a>
                    </> :
                    <>
                        <a className = "NavLogin" onClick={() => nevigate('/login')}>Login</a>
                        <a className="btn signup" onClick={() => nevigate('/signup')}>Signup</a>
                    </>}  
            </nav>
        </header>
    )
}

export default Navbar