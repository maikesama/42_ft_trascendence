import Nav from 'react-bootstrap/Nav';
import Text from 'react';
import './css/Navbar.css';
import { Navbar } from './Navbar';
import { flexbox } from '@mui/system';
import { autocompleteClasses } from '@mui/material';

export function LeaderboardItem(props:any) {
  
    const leaderboardItem = {
        width: '80%',
        backgroundColor: '#f5f4f2',
        borderRadius: 8,
        height: 50,
        margin: 'auto',
        marginTop: 15,
        alignItems: 'space-between',
        padding: 5,


    }

    const img = {
        width: '40px',
        borderRadius: '50%',
        marginLeft: '-13%',
    }
    
    const onstatus = props.status;
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
    }
      

	return(
    <>
        <div className='d-flex justify-content-evenly align-items-center' style={leaderboardItem}>
            <label>{props.id}</label>
            <img src={props.image} style={img}/>
            <label>{props.nickname}</label>
            <label>{props.guilds}</label>
            <label>{props.score}</label>
            <label>{status} {props.status}</label>
        </div>
    </>
	)
}