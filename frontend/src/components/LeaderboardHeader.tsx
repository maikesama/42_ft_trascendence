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
        marginTop: 25,
        alignItems: 'space-between',
        padding: 5,


    }
    
	return(
    <>
    <Navbar/>
        <div className='d-flex justify-content-evenly' style={leaderboardItem}>
            <label>{props.id}</label>
            <img src={props.image} />
            <label>{props.nickname}</label>
            <label>{props.guilds}</label>
            <label>{props.score}</label>
            <label>{props.status}</label>
        </div>
    </>
	)
}
