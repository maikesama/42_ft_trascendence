import Nav from 'react-bootstrap/Nav';
import './css/Navbar.css';


export function Navbar(props:any) {
	return(
    <Nav defaultActiveKey="/home" className="flex-row  navbar navbar-dark bg-dark align-items-center">
      <Nav.Link className="navbar-brand" href="/home">Trascendence</Nav.Link>
      <Nav.Link style={{transition: 'none', color: 'white'}} href="/home">Home</Nav.Link>
      <Nav.Link style={{transition: 'none', color: 'white'}} href="/home">Tornei</Nav.Link>
      <Nav.Link style={{transition: 'none', color: 'white'}} href="/home">Gilde</Nav.Link>
      <Nav.Item className="ms-auto">
        <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FProfile-Avatar-PNG.png" style={{width: '45px', height: '45px', marginTop: 5, marginBottom: -10}} alt="" />
        <Nav.Link style={{transition: 'none', color: 'white', fontSize: 17}} href="/home">Impostazioni</Nav.Link>
      </Nav.Item>
    </Nav>
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