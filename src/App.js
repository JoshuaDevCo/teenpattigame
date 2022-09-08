import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from './Component/firebase-config'
import Home from './Component/Home/Home.js'
import Login from './Component/Login/Login.js'
import Register from './Component/Register/Register.js'
import Loader from "./Component/Public_Component/Loader/Loader"
import About from "./Component/About/About.js"
import Profile from "./Component/Profile/Profile.js"




function App() {
  const [isLoggedin, setISLoggedin] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {

    onAuthStateChanged(auth, (currentUser) => {
      setShowLoadingScreen(false);
      if (currentUser != null) {
        setISLoggedin(true);
        setShowLoader(false);
      }
      else {
        setISLoggedin(false);
      }
    });

  })

  return (
    <Router>
      <Routes>
        <Route path="/" element={showLoadingScreen ? <Loader showLoader={true}/> : isLoggedin ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/about" element={<About />} />   
        <Route path="/profile" element={<Profile />} />   


        <Route path="/rules" element={<Loader showLoader={true}/>} />
        

        {/* <Route path="*" element={<Home />} /> */}

        <Route path="*" element={showLoadingScreen ? <Loader showLoader={true}/> : isLoggedin ? <Home /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
