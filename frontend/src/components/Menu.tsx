import Nav from 'react-bootstrap/Nav';
import Text from 'react';
import './css/Navbar.css';
import { Navbar } from './Navbar';
import axios from 'axios'
import { Form } from "react-bootstrap";

export function Menu(props:any) {
  
    async function logoutFunction(evt: any) {
        evt.preventDefault();

        axios.post('/api/auth/logout')
    }

    const element = {
        transition: 'none',
        color: 'black',
        textDecoration: 'none'
    };

  const menuCss = {
    position: 'absolute' as 'absolute', //cast altrimenti da errore
    right: '2%',
    width: 115,
    height: 80,
    backgroundColor: 'white',
    display: 'none',
    borderRadius : 5,
    
  }
	return(
    <>
        <div id="menu" className="menu" style={menuCss}>
            <a style={element} href="/user">Profile</a><br/>
            <a style={element} href="/settings">Settings</a><br/>
            <a style={element} onClick={logoutFunction} href="/logout">Logout</a>
        </div>
    </>
	)
}
