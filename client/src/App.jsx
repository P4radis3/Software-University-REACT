import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/authContext";

import Header from "./components/header/Header";
import Home from "./components/home/Home";

import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Logout from "./components/auth/logout/Logout";

import "./App.css";

import "./App.css";

function App() {
    return (
        <AuthProvider>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>

        </AuthProvider>
    )
}

export default App
