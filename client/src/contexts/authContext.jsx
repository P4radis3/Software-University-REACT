import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../services/authService";

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({
    children,
}) => {

    const [auth, setAuth] = useState(() => {
        localStorage.removeItem("accessToken");

        return {};
    });
    const navigate = useNavigate();

    const loginSubmitHandler = async (values) => {
        try {
            const result = await authService.login(values.email, values.password);

            localStorage.setItem("accessToken", result.accessToken);
            setAuth(result);

            navigate("/");

            return { result: result, error: null }

        } catch (error) {
            return { result: null, error: error.message }
        }
    };

    const registerSubmitHandler = async (values) => {
        if (values.password !== values["repeat-password"]) {
            alert("Passwords do not match");
            return;
        }

        try {
            const result = await authService.register(values.email, values.password);

            localStorage.setItem("accessToken", result.accessToken);
            setAuth(result);

            navigate("/");

            return { result, error: null }

        } catch (error) {
            return { result: null, error: error.message }
        }

    };

    const logoutHandler = () => {
        localStorage.removeItem("accessToken");
        setAuth({});

        navigate("/");
    }

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.username || auth.email,
        email: auth.email,
        id: auth._id,
        isAuthenticated: !!auth.email,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;