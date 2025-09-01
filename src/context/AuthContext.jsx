import { createContext, useContext, useState, useEffect } from "react";
import { useFetch } from "../hook/useFetch";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check token on mount
    const { executeFetch: checkAuth } = useFetch("api/v1/isLog", { method: "POST" }, false);
    const { executeFetch: doLogout } = useFetch("api/v1/logout", { method: "POST" }, false);

    useEffect(() => {
        const verifyAuth = async () => {
            const res = await checkAuth();
            if (res?.success) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };
        verifyAuth();
    }, [checkAuth]);

    // Login function (you’d normally pass credentials here)
    const loginData = async () => {
        const res = await checkAuth();
        if (res?.success) {
            setIsLoggedIn(true);
        }
    };

    // Logout function
    const logout = async () => {
        const res = await doLogout();
        if (res?.success) {
            setIsLoggedIn(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, loginData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
