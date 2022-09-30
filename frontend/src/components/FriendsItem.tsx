import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import "./css/Header.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export function FriendsItem(props:any) {
    const friendsItem = {
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
        <div className='d-flex justify-content-evenly align-items-center' style={friendsItem}>
            
            <img src={props.image} style={img}/>
            <label>{props.nickname}</label>
            <label>{props.username}</label>
            <label>{props.score}</label>
            <label>{status} {props.status}</label>
        </div>
    </>
	)
}