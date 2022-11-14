import React, { useRef, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import BlockIcon from '@mui/icons-material/Block';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import CancelIcon from '@mui/icons-material/Cancel';

import "../css/ProfileEdit.css"
import { SearchBar } from './SearchBar';
import { MatchesList } from './MatchesList';
import { Alert, manageError } from '../generic/Alert';

const fontColor = {
  style: { color: 'rgb(50, 50, 50)' }
}



export const SocialEdit = (props: any) => {

  const [openBlockedList, setOpenBlockedList] = React.useState(false);
  const [openMatchesList, setOpenMatchesList] = React.useState(false);
  const [openSearchBar, setOpenSearchBar] = React.useState(false);
  const user = props.user;

  const handleClickOpenBlockedList = () => {
    setOpenBlockedList(true);
  };

  const handleCloseBlockedList = () => {
    setOpenBlockedList(false);
  };

  const handleClickOpenMatchesList = () => {
    setOpenMatchesList(true);
  };

  const handleCloseMatchesList = () => {
    setOpenMatchesList(false);
  };

  const handleClickOpenSearchBar = () => {
    setOpenSearchBar(true);
  };

  const handleCloseSearchBar = () => {
    setOpenSearchBar(false);
  };

  function renderMatchesRowPreview(props: any) {
    const { index, style, matches } = props;

    return (
      <Link key={`/Profile/other`} component={RouterLink} to={`/Profile/${games[index]?.user2}`} underline="none" color="inherit" sx={{ display: "contents" }}>
        <ListItem button style={style} key={index} >
          {games[index]?.user1 === user?.idIntra ? <>
            <Avatar src={games[index]?.img1} />
            <ListItemText primary={games[index]?.user1} />
            <ListItemText primary={games[index]?.scoreP1 + " - " + games[index]?.scoreP2} />
            <ListItemText primary={games[index]?.user2} />
            <Avatar src={games[index]?.img2} /> </> :
            <>
              <Avatar src={games[index]?.img2} />
              <ListItemText primary={games[index]?.user2} />
              <ListItemText primary={games[index]?.scoreP2 + " - " + games[index]?.scoreP1} />
              <ListItemText primary={games[index]?.user1} />
              <Avatar src={games[index]?.img1} />
            </>
          }

        </ListItem>
      </Link>
    );
  }

  function renderSocialRow(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem style={style} key={index} >
        <Link key={`/Profile/other`} component={RouterLink} to={`/Profile/${friends[index]?.idIntra}`} underline="none" color="inherit" sx={{ display: "contents" }}>
          <Avatar src={friends[index]?.img} />
          <ListItemText id="idIntraFriend" primary={(friends[index]?.idIntra)} />
          <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill" />
        </Link>
        <IconButton aria-label="chat" size="small" style={{ color: 'green' }}><RemoveRedEyeIcon fontSize="large" /></IconButton>
      </ListItem>
    );
  }

  const [games, setGames] = useState({} as any);

  useEffect(() => {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/games/getHistory`;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idIntra: user.idUser }),
        });
        const json = await response.json();
        setGames(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const [friends, setFriends] = useState({} as any);

  useEffect(() => {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/getFriends`;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idIntra: user.idUser }),
        });
        const json = await response.json();
        console.log(json);
        setFriends(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Card sx={{ minWidth: 400, height: 600, borderRadius: 10, boxShadow: '0px 0px 0px 1px #D0D0D0' }}>
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
              {props.title}
            </Typography>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlignLast: 'center' }}>

            <FixedSizeList

              height={460}
              width={310}
              itemSize={90}
              itemCount={props.matches ? Object.values(friends).length : (Object.values(games).length < 5) ? Object.values(games).length : 5}
              overscanCount={5}
            >
              {props.matches ? renderSocialRow : renderMatchesRowPreview}
            </FixedSizeList>
          </div>
          <Divider />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          {props.matches ? null : <Button onClick={handleClickOpenMatchesList}>Game History</Button>}
        </CardActions>
      </Card>
      {/*Search Bar Modal*/}
      <SearchBar status={openSearchBar} closeStatus={handleCloseSearchBar} />
      {/*matches List Modal*/}
      <MatchesList status={openMatchesList} closeStatus={handleCloseMatchesList} />
    </div>
  );
}

export const ProfileEdit = (props: any) => {

  const nick = useRef<any>('');
  const img = useRef<any>('');
  //const [user, setUser] = useState({} as any);

  const fontColor = {
    style: { color: 'rgb(0, 0, 0)' }
  }

  const [isBlocked, setIsBlocked] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/isFriend`;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({idIntra: props.idIntra}),
        });
        const json = await response.json();
        console.log("isF" +json);
        setIsFriend(json);
        //window.location.reload();
        //console.log(json.friends)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [isFriend]);

  useEffect(() => {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/isBlocked`;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({idIntra: props.idIntra}),
        });
        const json = await response.json();
        console.log("isB" +json);
        setIsBlocked(json);
        //window.location.reload();
        //console.log(json.friends)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [isBlocked]);

  async function block(index: any) {
    //const idIntra = await search[index]?.idIntra;
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/block/${props.idIntra}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({idIntra: props.idIntra}),
        });
        window.location.reload();
    } catch (error) {
        console.log("error", error);
    }
}

async function unblock(index: any) {
  const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/unblock/${props.idIntra}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    window.location.reload();
  } catch (error) {
    console.log("error", error);
  }
}

async function addInviteFriend(index: any) {

  //const idIntra = await search[index]?.idIntra;
  const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/inviteFriend`;

  try {
      const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({idIntra: props.idIntra}),
      })
      const data = await response.json();
      manageError(data, response,props.triggerUser ,setAlert);
      // if (response.status === 400) {
      //   alert("You already have a pending request with this user");
      // }
          
  
      //window.location.reload();
  } catch (error) {
      console.log("error", error);
  }
}

async function removeInviteFriend(index: any) {
  //const idIntra = await search[index]?.idIntra;
  const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/removeInvite/`;

  try {
      const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({idIntra: props.idIntra}),
      });
      window.location.reload();
  } catch (error) {
      console.log("error", error);
  }
}

  return (
    <>
    <Card sx={{ maxWidth: 400, height: 600, borderRadius: 10, boxShadow: '0px 0px 0px 1px #D0D0D0' }}>

      <CardMedia
        component="img"
        height="380"
        image={props.img}
        alt=""
      />

      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            Nickname:
          </Typography>
          <TextField inputProps={fontColor} inputRef={nick} id="txtNick" placeholder={props.username} variant="standard" disabled />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            Username:
          </Typography>
          <TextField id="txtNick" placeholder={props.idIntra} variant="standard" disabled />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            Score:
          </Typography>
          <TextField inputProps={fontColor} id="txtScore" placeholder={props.score} variant="standard" disabled />
        </div>

      </CardContent>
      <CardActions sx={{ justifyContent: 'center', paddingTop: '0px' }}>
        <IconButton aria-label="message" size="small" ><MapsUgcOutlinedIcon fontSize="large" /></IconButton>
        {isFriend === false ? <>
          <IconButton aria-label="addfriend" size="small" onClick={addInviteFriend} style={{ color: '#00e200' }}><PersonAddOutlinedIcon fontSize="large" /></IconButton>
        </> 

        : <>
          <IconButton aria-label="addfriend" size="small" onClick={removeInviteFriend} style={{ color: '#f30000' }}><PersonRemoveIcon fontSize="large" /></IconButton>
        </>}
        {isBlocked === false ? <>
          <IconButton aria-label="block" size="small" onClick={block} style={{ color: '#f30000' }}><BlockIcon fontSize="large" /></IconButton>
        </> 

        : <>
          <IconButton aria-label="block" size="small" onClick={unblock} style={{ color: '#00e200' }}><CancelIcon fontSize="large" /></IconButton>
        </>}
        
        
        
      </CardActions>
    </Card>
    <Alert status={alert != "" ? true : false} closeStatus={() => setAlert("")} error={alert} />
    </>
  );
}
