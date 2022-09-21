
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import {Header} from '../components/Header';
import { Grid } from '@mui/material';
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
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdminItem } from "../components/AdminItem";
import { AdminHeader } from "../components/AdminHeader";
import '../font/font.css';

let logged = false;

export const Admin = () => {
    const modality = {
        color : 'white',
        fontFamily: 'MyWebFont'
    }
    const linkModality = {
        transform: 'none',
        color : 'trasparent',
        textDecoration: 'none'
    }
    
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#1976d2',
          },
        },
      });

	return (
        <>
        <Header />
        <AppBar position="static" style={{backgroundColor: 'transparent', border: 0, /*boxShadow: 'none',*/ height: 180, justifyContent: 'center', alignItems: 'left'}}>
        <Container maxWidth="xl">
        <Grid style={{marginTop: '15%'}} container spacing={2}>
            <Grid item md={12}>
                <TextField sx={{backgroundColor: 'white', borderRadius: 15, width: '20%'}} id="filled-helperText" label="Search..." type="search" variant="filled" />
            </Grid>
            <Grid item md={12} style={{marginTop: '3%'}}>
            <AdminHeader elem1="ID" elem2="Nickname" elem3="Banned" elem4="Admin" elem5="Status"/>
            </Grid>
            <Grid item md={12}>
            <AdminItem id="1" nickname="liafigli" username="DaBaby" score="1123" banned="false" admin="true" status="online"/>
            </Grid>
        </Grid>
      </Container>
    </AppBar>
    </>
	);
}