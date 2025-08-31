import './Navbar.css'
function Navbar() {
    return (
        <header className="navbar">
            <div className="logo">Short<span>It</span></div>
            <nav>
                <a className="NavLogin">Login</a>
                <a className="btn signup">Signup</a>
            </nav>
        </header>
    )
}

export default Navbar