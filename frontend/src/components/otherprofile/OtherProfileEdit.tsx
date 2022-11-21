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
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/ProfileEdit.css"
import { SearchBar } from './SearchBar';
import { MatchesList } from './MatchesList';
import { Alert, manageError } from '../generic/Alert';
import { socket } from '../../App';

const fontColor = {
  style: { color: 'rgb(50, 50, 50)' }
}



export const SocialEdit = (props: any) => {
  // const history = useHistory();
  const [openBlockedList, setOpenBlockedList] = React.useState(false);
  const [openMatchesList, setOpenMatchesList] = React.useState(false);
  const [openSearchBar, setOpenSearchBar] = React.useState(false);
  const user = props.user;
  console.log(user);

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
    );
  }

  function renderSocialRow(props: any) {
    const { index, style, matches } = props;

    let date = friends[index]?.addedAt;
    
    // date = String(date.split("T"));
    // console.log(date[1].split("."));
    // let hour = String(date[1].split("."));
    let data;
    let hour;
  
    if (date !== undefined || date !== null)
    {
      data = date.split("T");
      hour = data[1].split(".");
    }
    else
    {
      data = ["stai zitto"];
      hour = [" ora "];
    }
    //date = date.split("-").reverse().join("/");
    return (
      <ListItem style={style} key={index} >
        <Link key={`/Profile/other`} component={RouterLink} to={`/Profile/${friends[index]?.idIntra}`} underline="none" color="inherit" sx={{ display: "contents" }}>
          <Avatar src={friends[index]?.img}/>
          <ListItemText id="idIntraFriend" primary={(friends[index]?.idIntra)} />
          <ListItemText id="rankFriend" secondary={` From ${String(data[0])} ${String(hour[0])}`}/>
          {/* <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill" /> */}
        </Link>
        {/* <IconButton aria-label="chat" size="small" style={{ color: 'green' }}><RemoveRedEyeIcon fontSize="large" /></IconButton> */}
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

  //retrigger

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
      <MatchesList user={user} status={openMatchesList} closeStatus={handleCloseMatchesList} />
    </div>
  );
}

export const ProfileEdit =  (props: any) => {
  let navigate = useNavigate();
  const nick = useRef<any>('');
  const img = useRef<any>('');
  //const [user, setUser] = useState({} as any);

  const fontColor = {
    style: { color: 'rgb(0, 0, 0)' }
  }

  const [isBlocked, setIsBlocked] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isPending, setIsPending] = useState(false);
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
  }, [props.idIntra]);

  useEffect(() => {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/isInvitedByMe`;

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
        console.log(json);
        setIsPending(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [props.idIntra]);

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
  }, [props.idIntra]);

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
      // const data = await response.json();
      manageError(null, response, props.triggerUser ,setAlert);
      if (response.status === 200) {
        socket.emit('notification', {type: 1, idIntra: props.idIntra});
      }
      // if (response.status === 400) {
      //   alert("You already have a pending request with this user");
      // }


      window.location.reload();
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

async function removeFriend(index: any) {
  //const idIntra = await search[index]?.idIntra;
  const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/removeFriend/`;

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

async function newDm(index: any) {
  //const idIntra = await search[index]?.idIntra;
  const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/newDm/`;

  try {
      console.log("newDm");
      const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({idIntra: props.idIntra}),
      });
      const json = await response.json();
      console.log(json);
      if (response.status === 200) {
        // console.log(json)
        socket.emit('newDm', json);
        // window.location.href = ;
        navigate(`/chat/${props.idIntra}`);
      }
      console.log(json);
      // window.location.reload();
  } catch (error) {
      console.log("error", error);
  }
}

async function toDm(index: any) {
  //const idIntra = await search[index]?.idIntra;
  const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getChatFromOtherProfile/`;

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
      console.log(json);
      if (response.status !== 200) {
        await newDm(index);
      }
      else {
      //  window.location.href = `/chat/${props.idIntra}`;
       navigate(`/chat/${props.idIntra}`);
      }

      console.log(json);
      // window.location.reload();
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
          <TextField inputProps={fontColor} id="txtScore" placeholder={String(props.score)} variant="standard" disabled />
        </div>

      </CardContent>
      <CardActions sx={{ justifyContent: 'center', paddingTop: '0px' }}>
        <IconButton aria-label="message" size="small" onClick={toDm}><MapsUgcOutlinedIcon fontSize="large" /></IconButton>
        {isFriend === false && isPending === false ? <IconButton aria-label="addfriend" size="small" onClick={addInviteFriend} style={{ color: '#00e200' }}><PersonAddOutlinedIcon fontSize="large" /></IconButton> : null}
        {isFriend === false && isPending === true ? <IconButton aria-label="removeinvite" size="small" onClick={removeInviteFriend} style={{ color: 'orange' }}><PersonRemoveIcon fontSize="large" /></IconButton> : null}
        {isFriend === true ? <IconButton aria-label="removefriend" size="small" onClick={removeFriend} style={{ color: '#f30000' }}><PersonRemoveIcon fontSize="large" /></IconButton> : null}
        {isBlocked === false ? <IconButton aria-label="block" size="small" onClick={block} style={{ color: '#f30000' }}><BlockIcon fontSize="large" /></IconButton> : null}
        {isBlocked === true ? <IconButton aria-label="unblock" size="small" onClick={unblock} style={{ color: '#00e200' }}><CancelIcon fontSize="large" /></IconButton> : null}
      </CardActions>
    </Card>
    <Alert status={alert != "" ? true : false} closeStatus={() => setAlert("")} error={alert} />
    </>
  );
}
