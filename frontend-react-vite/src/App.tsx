import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "./view/pages/Login/Login.tsx";
import {DefaultLayout} from "./view/common/DefaultLayout/DefaultLayout.tsx";
import {useEffect} from "react";
import {isTokenExpired} from "./auth/auth.ts";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }, [navigate]);

    return (
            <Routes>
                <Route path="/*" element={<DefaultLayout />}/>
                <Route path="/login" element={<Login />}/>
            </Routes>
    );
}

export default App;