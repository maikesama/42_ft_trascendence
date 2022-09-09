import Nav from 'react-bootstrap/Nav';
import Text from 'react';
import './css/Navbar.css';
import { Navbar } from './Navbar';

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
    <div className="container-fluid" style={{border: 5}}>
            <div className="row" style={{border: '1px red'}}>
                <div className="col-10"></div>
                <div id="menu" className="col-2 menu" style={menuCss}>
                    <a style={element} href="/user:user">Profile</a><br/>
                    <a style={element} href="/settings">Settings</a><br/>
                    <a style={element} href="/logout">Logout</a>
                </div>
            </div>
        </div>
    </>
	)
}


/*

<nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
    <div className={"container-fluid"}>
    
    <a className={"navbar-brand"} href="#">Trascendence</a>
    <ul className={"navbar-nav"}>
        <div style={{textAlign: 'center',float:'left',display: 'inline-block'}}>
        <li className={"nav-item"}>
        <a className={"nav-link active"} aria-current="page" href="#">Home</a>
        </li>
        <li className={"nav-item"}>
        <a className={"nav-link"} href="#">Tornei</a>
        </li>
        <li className={"nav-item"}>
        <a className={"nav-link"} href="#">Gilde</a>
        </li>
        </div>
        <li className={"nav-item"}>
        <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FProfile-Avatar-PNG.png" style={{width: '40px', height: '40px'}} alt="" />
        <a className={"nav-link"} style={{font: '10px'}} href="#">Impostazioni</a>
        </li>
    </ul>
    
    </div>
</nav>


*/