import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check token on mount
    useEffect(() => {
        const token = Cookies.get("token");
        setIsLoggedIn(!!token);
    }, []);

    // Login function
    const loginData = (token) => {
        Cookies.set("token", token, { expires: 7 }); // store for 7 days
        setIsLoggedIn(true);
    };

    // Logout function
    const logout = () => {
        Cookies.remove("token", { path: "/" });
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, loginData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
