import { React, useState } from 'react'
import './Register.css'
import { Form, Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth,db } from '../firebase-config'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Loader from '../Public_Component/Loader/Loader.js';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
  } from "firebase/firestore";


export default function Register() {
    let navigate = useNavigate();

    const [userTempName, setUserTempName] = useState("");
    const [userName, setUserName] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const usersCollectionRef = collection(db, "users");



    const register = async () => {
        setShowLoader(true);
        if (userName == "" || userTempName == "" || userPwd == "") {
            alert("Please fill all values");
        }
        else {

            try {
                const user = await createUserWithEmailAndPassword(
                    auth,
                    userName,
                    userPwd
                );
                addUserDetails(user.user.uid);
                console.log(user);
                
            } catch (error) {
                  setShowLoader(false);
                alert(error.message);
            }
        }
    };


    const addUserDetails = async (uid) =>{
        try{
        //  await   db
        //     .collection('users').doc(uid)
        //      .set({ 
        //          userid:uid,name: userTempName, emailId:userName, balance:1000 })
            //  await addDoc(uid, {userid:uid, name: userTempName, emailId:userName, balance:1000 });
           await setDoc(doc(db, "users", uid), {userid:uid, name: userTempName, emailId:userName, balance:1000,winnerList:[] });
            alert(userTempName +" Registered Successfully, Please Login!");
            navigate('/login');
            setShowLoader(false);
          }
          catch(error){
              setShowLoader(false);
              alert(error.message);
          }
    }

    const signInRedirect = () => {
        navigate('/login');
    }


    return (
        <>
            <Loader showLoader={showLoader} />
            <div className="loginContainer">
                <div className="loginParentDiv">
                    <div className="loginChildDiv">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" onChange={(event) => setUserTempName(event.target.value)} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(event) => setUserName(event.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(event) => setUserPwd(event.target.value)} />
                            </Form.Group>

                            <div className="FR registerBtn" onClick={() => register()}>
                                <a>   SIGNup</a>
                            </div>
                        </Form>
                    </div>

                    <div className="forgotPwd" onClick={() => signInRedirect()}>Already have account, Sign in </div>

                </div>
            </div>
        </>

    )
}
