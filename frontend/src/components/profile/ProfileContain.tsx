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
import { ProfileEdit, SocialEdit } from "./ProfileEdit";
import Rank from '../images/rank.png'
import Victory from '../images/crown.png'
import Ladder from '../images/crowns.png'


import "../css/ProfileEdit.css"
import "../css/Navbar.css"


export const ProfileContain = (props: any) => {

  const colors = {
    fontFamily: 'MyWebFont',
    fontWeight: 'bold',
    fontSize: '23px',
    color: 'green',
    marginTop: -70,
     backgroundColor: 'white', rankCont: {  backgroundColor: 'white' },
    victoryCont: {  backgroundColor: 'white' },
    ladderCont: { backgroundColor: 'white'}
  }

  const MatchesFriends = {
    color: 'black', backgroundColor: 'white',
    display: 'flex', alignItems: 'center', justifyContents: 'center'
  }

  return (
    <Grid container spacing={4} style={{ paddingTop: 35, margin: 0, maxWidth: '100%', height: '1000px' }}>
      <Grid item xs={4} style={colors.rankCont} className='rank'>
        <Typography
          variant="h4"
          fontSize="25px"
          noWrap
          sx={{
            mt: 7,
            display: { xs: 'none', md: 'block' },
            flexGrow: 1,
            fontFamily: 'MyWebFont',
            fontWeight: 1000,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}>
          General Rank
        </Typography>
      </Grid>
      <Grid className='victory' item xs={4} style={colors.victoryCont}>
        <Typography
          variant="h4"
          fontSize="25px"
          noWrap
          sx={{
            mt: 7,
            display: { xs: 'none', md: 'block' },
            flexGrow: 1,
            fontFamily: 'MyWebFont',
            fontWeight: 1000,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}>
          Victories
        </Typography>
      </Grid>
      <Grid className='ladder' item xs={4} style={colors.ladderCont}>
        <Typography
          variant="h4"
          fontSize="25px"
          noWrap
          sx={{
            mt: 7,
            display: { xs: 'none', md: 'block' },
            flexGrow: 1,
            fontFamily: 'MyWebFont',
            fontWeight: 1000,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}>
          Ladder Victories
        </Typography>
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
      {/* Matches and Friends */}
      <Grid item xs={12} style={MatchesFriends} justifyContent='space-around'>
        <ProfileEdit />
        <SocialEdit title="FRIENDS" tot="12" matches={true} />
        <SocialEdit title="MATCHES" tot="122" matches={false} />
      </Grid>
    </Grid>
  );
}