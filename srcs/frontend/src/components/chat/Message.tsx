import Nav from 'react-bootstrap/Nav';
import Text from 'react';
import '../css/Navbar.css';
//import icon from 'bootstrap-icons';
import axios from 'axios'
import "./css/Message.css"

export function MessageSent(props:any) {


    return (
    <>
    <div style={{marginLeft: '20%'}} className="container-message">
    <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" style={{width: "30px", height: "30px"}}/>
        
    <p>{props.message}</p>
    <span className="time-right">{props.time}</span>
    </div>
    </>
	);
}

export function MessageReceived(props:any) {


    return (
    <>
    <div style={{marginLeft: '0%'}} className="container-message darker">
    <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar" className="right" style={{width: "30px", height: "30px"}}/>
    <p>{props.message}</p>
    <span className="time-left">{props.time}</span>
    </div>
    </>
	);
}