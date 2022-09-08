import { React, useState } from 'react'
import {
    signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
// import logouticon from '..../Content/Images/logoutIcon.jpg'


export default function Logout() {
    const [showLoader, setShowLoader] = useState(false);
    let navigate = useNavigate();


    const logout = async () => {
        setShowLoader(true);
        try {
            const response = await signOut(auth);
            navigate('/login');
            setShowLoader(true);
        } catch (error) {
            setShowLoader(false);
            alert(error.message);

        }
    };


    return (
        <div style={{ cursor: "pointer" }} onClick={() => logout()}>
            Logout
        </div>
    )
}
