import Nav from 'react-bootstrap/Nav';
import Text from 'react';
import './css/Navbar.css';
import { Navbar } from './Navbar';
import { Menu } from './Menu';


export function Header(props:any) {

  function menu() {
    let menu = document.getElementById("menu");
    if (menu) {
      menu.style.display = "block";
    }
  }
  
  const element = {
    transition: 'none', color: 'black', textDecoration: 'none' ,
  };

  const profile = {
    width: '45px', height: '45px', marginTop: 5, marginBottom: -10
  }
  const menuCss = {
    backgroundColor: 'white',
    marginLeft:15,
    marginRight:5,
    width:'15%',
    height: '10%',
    display: 'none'
  }
	return(
    <>
    <Navbar/>
    <Menu />
    </>
	)
}