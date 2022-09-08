import {React,useState} from 'react'
import { Form , Button } from 'react-bootstrap';
import './Login.css';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
  import {auth} from '../firebase-config';
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from "react-router-dom";
// import Loader from '../public_component/Loader/Loader.js';
import Loader from '../Public_Component/Loader/Loader.js';



export default function Login() {
    let navigate = useNavigate();


    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [showLoader, setShowLoader] = useState(false);

    const login = async () => {
        setShowLoader(true);
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            userEmail,
            userPwd
          );
          navigate('/home');
          setShowLoader(false);
                   
        } catch (error) {
          setShowLoader(false);
          alert(error.message);

        }
      };

      const forgotPwd=()=>{
          alert("Work in progress")
      }

      const signUpRedirect=()=>{
        navigate('/signup');
        

    }

    return (
        <>
        <Loader showLoader={showLoader}/>
            <div className="loginContainer">
                <div className="loginParentDiv">
                    <div className="loginChildDiv">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setUserEmail(event.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(event) =>setUserPwd(event.target.value)} />
                            </Form.Group>

                            <div className="FR loginBtn" onClick={() => login()}><a>LOGin</a>
                            </div>
                        </Form>
                    </div>
                    <div className="forgotPwd" onClick={() =>forgotPwd()}>Forgot Password? </div>
                    <div className="forgotPwd" onClick={() =>signUpRedirect()}>Don't have account, Sign up </div>
                    
                </div>
            </div>
        </>
    )
}
