import Nav from 'react-bootstrap/Nav';
import Text from 'react';
import './css/Navbar.css';
import { Navbar } from './Navbar';

export function Menu(props:any) {
  
  const element = {
    transition: 'none', color: 'black', textDecoration: 'none' ,
  };

  const menuCss = {
    position: 'absolute' as 'absolute', //cast altrimenti da errore
    right: '2%',
    width: 115,
    height: 80,
    backgroundColor: 'white',
    display: 'none',
    
  }
	return(
    <>
        <div id="menu" className="menu" style={menuCss}>
            <a style={element} href="/user:user">Profile</a><br/>
            <a style={element} href="/settings">Settings</a><br/>
            <a style={element} href="/logout">Logout</a>
        </div>
    </>
	)
}
