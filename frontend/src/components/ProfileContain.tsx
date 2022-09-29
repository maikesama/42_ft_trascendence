import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import profilePic from '../images/bg_room.jpg'
import Grid from '@material-ui/core/Grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@mui/material/TextField';
import { ProfileEdit } from "./ProfileEdit";


import "./css/ProfileEdit.css"

export const ProfileContain = (props: any) => {
  
    const colors = {
        color: 'black', backgroundColor: 'white'
    }
  
  return (
    <Grid container spacing={2} style={{marginTop: '50px'}}>
    <Grid item xs={4} style={colors}>
    General Rank
    </Grid>
    <Grid item xs={4} style={colors}>
    Victories
    </Grid>
    <Grid item xs={4} style={colors}>
    Ladder victories
    </Grid>
    {/* Punti row */}
    <Grid item xs={4} style={colors}>
    12
    </Grid>
    <Grid item xs={4} style={colors}>
    34
    </Grid>
    <Grid item xs={4} style={colors}>
    18
    </Grid>
    {/* Side edit profile */}
    <Grid item xs={6} style={colors}>
    <ProfileEdit/>
    </Grid>
    {/* Matches and Friends */}
    <Grid item xs={6} style={colors}>
    18
    </Grid>
    </Grid>
  );
}
