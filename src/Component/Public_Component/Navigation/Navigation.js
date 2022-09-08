import React, { useState } from 'react'
import { Button, Navbar, Container, Nav, NavDropdown, Alert } from 'react-bootstrap';
import './Navigation.css';
import Logout from '../../Logout/Logout.js';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";



export default function Navigation(props) {
    function AlertDismissibleExample() {
        const [show, setShow] = useState(true);

        if (show) {
            return (
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        Change this and that and try again. Duis mollis, est non commodo
                        luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                        Cras mattis consectetur purus sit amet fermentum.
                    </p>
                </Alert>
            );
        }
        return <Button onClick={() => setShow(true)}>Show Alert</Button>;
    }
    return (
        <>
            <div className="navContainer" >
                <div style={{ width: "33.3%" }} className={props.isHomeActive ? "middleNavContainer navBtn navActive"
                    : "middleNavContainer navBtn navNotActive"}><Link to='/home'>Home</Link></div>
                <div style={{ width: "33.3%" }} className={props.isProfileActive ? "middleNavContainer navBtn navActive" : "middlemiddleNavContainer navBtn navNotActive"}><Link to='/profile'>Profile</Link></div>

                <div style={{ width: "33.4%" }} className={props.isLogoutActive ? "middleNavContainer navBtn navActive" :
                    "middlemiddleNavContainer navBtn navNotActive"}><Link to='/login'><Logout /></Link></div>


                {/* <div style={{width:"20%",justifyContent:"space-around"}} className={props.isHomeActive 
                    ? "middleNavContainer navBtn navActive" : "middleNavContainer navBtn navNotActive" } ><Link to='/home'>OOooOOooO</Link></div>
                <div style={{width:"60%",display:"inline-flex",justifyContent:"space-around"}} className="leftNavContainer navBtn">
                    <div style={{width:"33%"}} className={props.isRuleActive ? "middleNavContainer navBtn navActive" 
                    : "middlemiddleNavContainer navBtn navNotActive"}><Link to='/loader'>Rules</Link></div>
                    <div style={{width:"33%"}} className={props.isHomeActive ? "middleNavContainer navBtn navActive" 
                    : "middleNavContainer navBtn navNotActive"}><Link to='/home'>Home</Link></div>

                    <div style={{width:"33%"}} className={props.isAboutActive ? "middleNavContainer navBtn navActive" : 
                    "middlemiddleNavContainer navBtn navNotActive"}><Link to='/about'>About</Link></div>

                </div>
                <div style={{width:"20%",display:"inline-flex",justifyContent:"space-around"}} className="rightNavContainer navBtn">
                    <div style={{width:"49.5%"}} className={props.isProfileActive ? "middleNavContainer navBtn navActive" : "middlemiddleNavContainer navBtn navNotActive"}><Link to='/profile'>Profile</Link></div>
                    <div style={{width:"49.%"}} className={props.isLogoutActive ? "middleNavContainer navBtn navActive" : 
                    "middlemiddleNavContainer navBtn navNotActive"}><Link to='/login'><Logout/></Link></div>
                </div> */}
            </div>


        </>
        //     <Navbar fill bg="dark" variant="dark" style={{padding: 0,height:"4vw"}}>
        //     <Container style={{marginLeft:"10vh"}}>
        //     <Navbar.Brand style={{width:"20%"}} href="#home">OOooOOooO</Navbar.Brand>
        //     <Nav className="me-auto wd100">
        //       <Link to="/home" className="headerClass1 single-header">Home</Link>
        //       <Nav.Link href="https://www.republicworld.com/technology-news/gaming/how-to-play-teen-patti.html" target="_blank" className="headerClass single-header">Rules</Nav.Link>
        //       {/* <Nav.Link href="#unknown" className="headerClass single-header">UNKNOWN</Nav.Link> */}

        //     </Nav>
        //     <Logout/>

        //     </Container>
        //   </Navbar>


    )
}
