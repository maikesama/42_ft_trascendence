import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
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
import "../css/Header.css"

import 'bootstrap/dist/css/bootstrap.min.css';

export function FriendsHeader(props:any){
    
    const friendsItem = {
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



    return(
        <>
            <div className='d-flex justify-content-evenly align-items-end' style={friendsItem}>
            <label style={{marginRight:20}}>{props.id}</label>
            
            <label>{props.nickname}</label>
            <label>{props.username}</label>
            <label>{props.score}</label>
            <label>{props.status}</label>
        </div>
        </>
    )
}