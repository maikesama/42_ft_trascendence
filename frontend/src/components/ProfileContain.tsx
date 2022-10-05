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
import Divider from '@mui/material/Divider';
import { MatchEdit, ProfileEdit, SocialEdit } from "./ProfileEdit";


import "./css/ProfileEdit.css"

export const ProfileContain = (props: any) => {

  const colors = {
    color: 'black', backgroundColor: 'white'
  }

  const MatchesFriends = {
    color: 'black', backgroundColor: 'white',
    display: 'flex', alignItems: 'center', justifyContents: 'center'
  }

  return (
    <Grid container spacing={4} style={{marginTop: 25 }}>
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
        <Divider />
      </Grid>
      <Grid item xs={4} style={colors}>
        34
        <Divider />
      </Grid>
      <Grid item xs={4} style={colors}>
        18
        <Divider />
      </Grid>
      {/* Side edit profile */}
      <Grid item xs={4} style={colors} >
        <ProfileEdit />
      </Grid>
      {/* Matches and Friends */}
      <Grid item xs={8} style={MatchesFriends} justifyContent='space-around'>
        <SocialEdit />
        <MatchEdit />
      </Grid>
    </Grid>
  );
}
