import Nav from 'react-bootstrap/Nav';
import Text from 'react';
import './css/Navbar.css';
import { Navbar } from './Navbar';
import { flexbox } from '@mui/system';
import { autocompleteClasses } from '@mui/material';

export function LeaderboardHeader(props:any) {
  
    const leaderboardItem = {
        width: '80%',
        color: 'white',
        borderRadius: 8,
        height: 50,
        margin: 'auto',
        marginTop: 25,
        marginBottom: -15,
        alignItems: 'space-between',
        padding: 5,
        fontWeight: 'bold'

    }

    const img = {
        width: '40px',
        borderRadius: '50%',
        marginLeft: '-12%',
    }
    
    /*const onstatus = props.status;
    let status;

    if (onstatus && onstatus === "online") {
        status = (
        <i style={{fontSize: 8, color: 'green'}} className="bi bi-circle-fill"></i>
      );
    } else if (onstatus === "offline") {
        status = (
        <i style={{fontSize: 8, color: 'red'}} className="bi bi-circle-fill"></i>
      );
    } else {
        status = (
        <i style={{fontSize: 8, color: 'grey'}} className="bi bi-circle-fill"></i>
        );
    }*/
      

	return(
    <>
        <div className='d-flex justify-content-evenly align-items-end' style={leaderboardItem}>
            <label style={{left:20}}>{props.id}</label>
            
            <label>{props.nickname}</label>
            <label>{props.guilds}</label>
            <label>{props.score}</label>
            <label> {props.status}</label>
        </div>
    </>
	)
}
