import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid';
import { ProfileEdit, SocialEdit } from "./ProfileEdit";


import "../css/ProfileEdit.css"
import "../css/Navbar.css"
import { Achievements } from './Achievements';


export const ProfileContain = (props: any) => {

  
  const [user, setUser] = useState({} as any);
  const [triggerUser, setTriggerUser] = useState(false);

  useEffect(() => {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/me`;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const json = await response.json();
        console.log(json);
        setUser(json);
        setTriggerUser(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [triggerUser]);

  const [rank, setRank] = useState({} as any);

  useEffect(() => {

    const fetchRank = async () => {
      try {
        const response = await fetch(`http://${process.env.REACT_APP_HOST_URI}/api/games/getPlayerRank`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const json = await response.json();
        console.log(json);
        setRank(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchRank();
  }, []);

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
    display: 'flex', alignItems: 'center', justifyContents: 'center',justifyContent:'space-around'
  }

  return (
    <Grid container spacing={4} style={{ margin: 0, maxWidth: '100%', height: '1100px' }}>
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
          Win Streak
        </Typography>
      </Grid>
      {/* Punti row */}
      <Grid item xs={4} style={colors}>
        {JSON.stringify(rank)}
      </Grid>
      <Grid item xs={4} style={colors}>
        {user.win}
      </Grid>
      <Grid item xs={4} style={colors}>
        {user.winRow}
      </Grid>
      <Grid item xs={12} style={colors.rankCont} className='achievement'>
        <Typography
          variant="h4"
          fontSize="25px"
          noWrap
          sx={{
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
        <Achievements number={"1"} title={"Prince of the cluster"} explain={"Win 5 matches in a row"} unlocked={user.achFiveinRow} />
      </Grid>
      <Grid item xs={2} style={colors.achievementCont} className='achievement'>
        <Achievements number={"2"} title={"King of the venue"} explain={"Win 10 matches in a row"} unlocked={user.achTeninRow} />
      </Grid>
      <Grid item xs={2} style={colors.achievementCont} className='achievement'>
        <Achievements number={"3"} title={"Legend of the 42"} explain={"Win 20 matches in a row"} unlocked={user.achTwentyinRow} />
      </Grid>
      <Grid item xs={2} style={colors.achievementCont} className='achievement'>
        <Achievements number={"4"} title={"ACE!"} explain={"Defeat an enemy that has scored 0 points"} unlocked={user.achAce} />
      </Grid>
      <Grid item xs={2} style={colors.achievementCont} className='achievement'>
        <Achievements number={"5"} title={"Lucky Noob"} explain={"Win your first match"} unlocked={user.achFirstWin} />
      </Grid>
      <Grid item xs={2} style={colors.achievementCont} className='achievement'>
        <Achievements number={"6"} title={"Welcome to the underworld"} explain={"Reach a negative score"} unlocked={user.achRealLoser} />
      </Grid>
      {/* Side edit profile */}
      {/* Matches and Friends */}
      <Grid item xs={12} style={MatchesFriends} >
        <SocialEdit title="FRIENDS" tot="12" matches={true} />
        <ProfileEdit img={user.img} idIntra={user.idIntra} username={user.userName} score={user.rank} triggerUser={setTriggerUser}/>
        <SocialEdit title="LAST 5 MATCHES" tot="122" matches={false} />
      </Grid>
    </Grid>
  );
}
