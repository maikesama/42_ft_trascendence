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
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import "../css/ProfileEdit.css"
import "../css/Navbar.css"
import { Achievements } from './Achievements';


export const ProfileContain = (props: any) => {

  const colors = {
    fontFamily: 'MyWebFont',
    fontWeight: 'bold',
    fontSize: '23px',
    color: 'green',
    marginTop: 0,
    padding: 0,
    backgroundColor: 'white', rankCont: { backgroundColor: 'white' },
    victoryCont: { backgroundColor: 'white' },
    ladderCont: { backgroundColor: 'white' },
    achievementCont: { backgroundColor: 'white', },
  }

  const MatchesFriends = {
    color: 'black', backgroundColor: 'white',
    display: 'flex', alignItems: 'center', justifyContents: 'center'
  }

  return (
    <Grid container spacing={4} style={{ paddingTop: 35, margin: 0, maxWidth: '100%', height: '1100px' }}>
      <Grid item xs={4} style={colors.rankCont} className='rank'>
        <Typography
          variant="h4"
          fontSize="25px"
          noWrap
          sx={{
            mt: 1,
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
            mt: 1,
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
            mt: 1,
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
      <Grid item xs={12} style={colors.rankCont} className='achievement'>
        <Typography
          variant="h4"
          fontSize="25px"
          noWrap
          sx={{
            mt: 1,
            display: { xs: 'none', md: 'block' },
            flexGrow: 1,
            fontFamily: 'MyWebFont',
            fontWeight: 1000,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}>
          Achievements
        </Typography>
      </Grid>
      <Grid item xs={2} style={colors.achievementCont} className='achievement'>
        <Achievements number={"1"} title={"Prince of the cluster"} explain={"Win 5 matches in a row"} />
      </Grid>
      <Grid item xs={2} style={colors.achievementCont} className='achievement'>
        <Achievements number={"2"} title={"King of the venue"} explain={"Win 10 matches in a row"} />
      </Grid>
      <Grid item xs={2} style={colors.achievementCont} className='achievement'>
        <Achievements number={"3"} title={"Legend of the 42"} explain={"Win 20 matches in a row"} />
      </Grid>
      <Grid item xs={2} style={colors.achievementCont} className='achievement'>
        <Achievements number={"4"} title={"ACE!"} explain={"Defeat an enemy that has scored 0 points"} />
      </Grid>
      <Grid item xs={2} style={colors.achievementCont} className='achievement'>
        <Achievements number={"5"} title={"Lucky Noob"} explain={"Win your first match"} />
      </Grid>
      <Grid item xs={2} style={colors.achievementCont} className='achievement'>
        <Achievements number={"6"} title={"Welcome to the underworld"} explain={"Reach a negative score"} />
      </Grid>
      {/* Side edit profile */}
      {/* Matches and Friends */}
      <Grid item xs={12} style={MatchesFriends} justifyContent='space-around'>
        <SocialEdit title="FRIENDS" tot="12" matches={true} />
        <ProfileEdit />
        <SocialEdit title="MATCHES" tot="122" matches={false} />
      </Grid>
    </Grid>
  );
}
