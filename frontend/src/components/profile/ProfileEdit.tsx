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
import Dialog from '@mui/material/Dialog';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import BlockIcon from '@mui/icons-material/Block';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Switch from '@mui/material/Switch';
import UploadIcon from '@mui/icons-material/Upload';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';


import "../css/ProfileEdit.css"
import { SearchBar } from './SearchBar';
import { InvitedList } from './InvitedList';
import { BlockedList } from './BlockedList';
import { MatchesList } from './MatchesList';
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Alert, manageError } from '../generic/Alert';
import { Twofa } from '../../pages/Twofa';
import { TwofaOn } from './TwofaOn';
import { socket } from '../../App';



const fontColor = {
  style: { WebkitTextFillColor: "rgba(0,0,0)" }
}



export const SocialEdit = (props: any) => {

  const [openBlockedList, setOpenBlockedList] = React.useState(false);
  const [openMatchesList, setOpenMatchesList] = React.useState(false);
  const [openSearchBar, setOpenSearchBar] = React.useState(false);
  const [openInvited, setOpenInvited] = React.useState(false);

  let navigate = useNavigate();
  const isAddFriendNew = useRef(true);
  const isDelFriendNew = useRef(true);

  const [user, setUser] = useState({} as any);

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
        setUser(json);
      } catch (error) {
        //console.log("error", error);
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
          }
        });
        const json = await response.json();
        //console.log(json);
        setFriends(json);
      } catch (error) {
        //console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("friendStatus", (data: any) => {
      //console.log("friendStatus", data);
      //  edit status where idIntra = data.idIntra
      setFriends((friends: any) => {
        const newFriends = friends.map((friend: any) => {
          if (friend.idIntra === data.idIntra) {
            friend.status = data.status;
          }
          return friend;
        });
        return newFriends;
      });

    });

    if (isAddFriendNew.current) {
      socket.on("acceptFriend", (data: any) => {
        var isAlreadyFriend = false;
        if (friends.length > 0) {
          friends.forEach((friend: any) => {
            if (friend.idIntra === data.idIntra) {
              isAlreadyFriend = true;
            }
          });
        }
        if (!isAlreadyFriend) {
            setFriends((friends: any) => {
              const newFriends = [...friends, data];
              return newFriends;
            });
            isAlreadyFriend = false;
        }
      });
    }
    isAddFriendNew.current = false;
    // if (isDelFriendNew.current) {
    socket.on("removeFriend", (data: any) => {
      var isAlreadyFriend = false;
      if (friends.length > 0) {
        friends.forEach((friend: any) => {
          if (friend.idIntra === data.idIntra) {
            isAlreadyFriend = true;
          }
        });
      }
      if (isAlreadyFriend) {
        setFriends((friends: any) => {
          const newFriends = friends.filter((friend: any) => friend.idIntra !== data.idIntra);
          return newFriends;
        });
        isAlreadyFriend = false;
      }
    });

    // }
    // isDelFriendNew.current = false;

  });


  async function block(index: any) {
    const idIntra = await friends[index]?.idIntra;
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/block/${idIntra}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      //const json = await response.json();
      ////console.log(json);
      window.location.reload();
    } catch (error) {
      //console.log("error", error);
    }
  }

  async function unfriend(index: any) {
    const idIntra = await friends[index]?.idIntra;
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/removeFriend`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idIntra: idIntra
        })
      });
      if (response.status === 200) {
        socket.emit("removeFriend", { idIntra: idIntra });
        // window..reload();
      }
      //const json = await response.json();
      ////console.log(json);
      // window.location.reload();
    } catch (error) {
      //console.log("error", error);
    }
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
          }
        });
        const json = await response.json();
        setGames(json);
      } catch (error) {
        //console.log("error", error);
      }
    };

    fetchData();
  }, []);


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

  const handleClickOpenInvited = () => {
    setOpenInvited(true);
  };

  const handleClickCloseInvited = () => {
    setOpenInvited(false);
  };

  function renderMatchesRowPreview(props: any) {
    let { index,style, matches } = props;

    //console.log(style)

    var style2 = {
      ...style,
      display: 'flex',
      justifyContent: 'space-between',
    }

    // let style2 = {position:"absolute",left:0,top:0,height:90,width:"100%", display : 'flex', justifyContent: 'space-between'}


    // //console.log("vaffanc" + JSON.stringify(style2))

    return (
       <Link key={`/Profile/other`} component={RouterLink} to={`/Profile/${games[index]?.user1}`} underline="none" color="inherit" sx={{ display: "contents" }}>
        <ListItem key={index}  style={style2}>
          {games[index]?.user1 === user?.idIntra ? <>
            <Avatar src={games[index]?.img1} />
            <Typography sx={{color: 'black', textDecoration: 'none'}}>{games[index]?.user1}</Typography>
            <Typography>{games[index]?.scoreP1 + " - " + games[index]?.scoreP2}</Typography>
            <Typography>{games[index]?.user2}</Typography>
            <Avatar src={games[index]?.img2} />
          </> :
            <>

              <Avatar src={games[index]?.img2} />
              <Typography>{games[index]?.user2}</Typography>
              <Typography>{games[index]?.scoreP2 + " - " + games[index]?.scoreP1}</Typography>
              <Typography>{games[index]?.user1}</Typography>
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
          <Typography style={{paddingLeft: "0.25rem", width: '30%'}} id="idIntraFriend" >{(friends[index]?.idIntra)}</Typography>
          <div style={{paddingLeft: '0.75rem' ,width: '15%'}}>
          {friends[index]?.status === 0 ?  <><i style={{ fontSize: 8, color: 'red' }} className="bi bi-circle-fill" /></> : null}
          {friends[index]?.status === 1 ?  <><i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill" /></> : null}
          {friends[index]?.status === 2 ?  <>
          {/* <i style={{ fontSize: 8, color: 'grey' }} className="bi bi-circle-fill" /> */}
          <RemoveRedEyeIcon fontSize="large"  style={{cursor: 'pointer', color: 'grey'}} onClick={() => window.location.assign("/games/" + friends[index]?.idIntra)} />
          </> : null}
          
          </div>
        </Link>
        <div style={{paddingLeft: '0.75rem' ,width: '40%'}}>
        <IconButton aria-label="unfriend" size="small" style={{ color: '#f30000' }} onClick={() => unfriend(index)}><PersonRemoveOutlinedIcon fontSize="large" /></IconButton>
        <IconButton aria-label="block" size="small" style={{ color: '#f30000' }} onClick={() => block(index)}><BlockIcon fontSize="large" /></IconButton>
        </div>
      </ListItem>
    );
  }

  return (
    <div>
      <Card sx={{ minWidth: 400, height: 600, borderRadius: 10, boxShadow: '0px 0px 0px 1px #D0D0D0' }}>
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <Typography variant="h5" component="div" sx={{ marginTop: 1, marginRight: 1 }}>
              {props.title}
            </Typography>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlignLast: 'center' }}>

            <FixedSizeList

              height={460}
              width={'90%'}
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
          {props.matches ? <Button onClick={handleClickOpenSearchBar}>Add friend</Button> : null}
          {props.matches ? <Button onClick={handleClickOpenInvited}>Invites</Button> : null}
          {props.matches ? <Button onClick={handleClickOpenBlockedList}>Blocked</Button> : <Button onClick={handleClickOpenMatchesList}>Game History</Button>}
        </CardActions>
      </Card>
      <InvitedList status={openInvited} closeStatus={handleClickCloseInvited} />
      {/*Search Bar Modal*/}
      <SearchBar status={openSearchBar} closeStatus={handleCloseSearchBar} />
      {/*Blocked List Modal*/}
      <BlockedList status={openBlockedList} closeStatus={handleCloseBlockedList} />
      {/*matches List Modal*/}
      <MatchesList status={openMatchesList} closeStatus={handleCloseMatchesList} />
    </div>
  );
}

export const ProfileEdit = (props: any) => {

  const nick = useRef<any>('');
  const img = useRef<any>();
  const [images, setImages] = React.useState([]);
  const [alert, setAlert] = React.useState("");

  const clickSave = async () => {

    let url = `http://${process.env.REACT_APP_HOST_URI}/api/user/update/username`;
    const inputbox = document.getElementById('txtNick');
    inputbox?.setAttribute('disabled', 'true');
    inputbox?.removeAttribute('placeholder');

    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: nick.current.value })
      });
      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      }
      else
      {
        inputbox?.removeAttribute('disabled');
        inputbox?.removeAttribute('placeholder');
      }
      const data = await response.json();
      manageError(data, response, props.triggerUser, setAlert);
    } catch (error) {
    }

  }

  const onChange = (
    imageList: ImageListType,
  ) => {
    // data for submit
    setImages(imageList as never[]);
    uploadImage(imageList)
  };

  const uploadImage = async (imageList: ImageListType) => {
    //console.log(JSON.stringify(imageList[0].dataURL))
    try {
      const response = await fetch(`http://${process.env.REACT_APP_HOST_URI}/api/user/update/pp`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dataURL: imageList[0].dataURL }),
      });
      manageError({}, response, props.triggerUser, setAlert);
      // setAlert(c);
      ////console.log(json);
    } catch (error) {
      //console.log("error", error);
    }
    // window.location.reload()
  };

  function handleNick() {
    const inputbox = document.getElementById('txtNick');
    inputbox?.removeAttribute('disabled')
    inputbox?.setAttribute('placeholder', 'Inserisci Nickname');
    const save = document.getElementById('saveButton');
    save?.removeAttribute('hidden')
  }

  const fontColor = {
    style: { color: 'rgba(0, 0, 0, 0.38)' }
  }


  async function deleteImg() {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/delete/pp`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
      })
      //window.location.reload();
      manageError({}, response, props.triggerUser, setAlert);
    } catch (error) {
      //console.log("error", error);
    }

  }

  const [Qr, setQr] = React.useState('');

  React.useEffect(() => {
    async function generate2faQr() {
      const url = `http://${process.env.REACT_APP_HOST_URI}/api/auth/2fa/generate`;
      try {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
        })
        const json = await response.json();
        //console.log(json);
        setQr(json);
      } catch (error) {
        //console.log("error", error);
      }
    }
    generate2faQr();
  }, []);

  const [user, setUser] = useState({} as any);
  const [isCheck, setCheck] = React.useState(false);

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
        setUser(json);
        setCheck(json.twoFa);
      } catch (error) {
        //console.log("error", error);
      }
    };

    fetchData();
  }, []);

  //console.log(user.twoFa)
  const [open2FA, setOpen2FA] = React.useState(false);

  const close2FA = (event: any, reason: any) => {
    if (reason && reason == "backdropClick")
      return;
    setOpen2FA(false);
    setCheck(false)
  }

  const handleOpen2FA = () => {
    setOpen2FA(true);
  }

  async function turnOff2FA()
  {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/auth/2fa/turn-off`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
      })
      const json = await response.json();
      //console.log(json);
      setCheck(false);
    } catch (error) {
      //console.log("error", error);
    }
  }

  async function handleChange(e: any) {
    try {

      const bool = !isCheck;
      setCheck(!isCheck);

      if (bool === false) {
        await turnOff2FA();
      }
      else {
        // await generate2faQr()
        handleOpen2FA();
      }
    }
    catch (error) {
      //console.log("error", error);
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
        <Typography className="UploadImageTxt">Upload Image</Typography>

        <ImageUploading value={images} onChange={onChange}>
          {({
            onImageUpload,
          }) => (
            // write your building UI
            <button style={{ backgroundColor: 'transparent', border: '0px', marginTop: 10, marginBottom: -5 }} onClick={onImageUpload}><UploadIcon fontSize="large" /></button>
          )}
        </ImageUploading>
        <button style={{ backgroundColor: 'transparent', border: '0px', marginTop: 10, marginBottom: -5 }} onClick={deleteImg}><DisabledByDefaultIcon fontSize="large" /></button>

        <CardContent>
          <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'left' }}>

            <Typography variant="h5" component="div" sx={{ marginTop: 1, marginRight: 1 }}>
              Nickname:
            </Typography>
            <TextField inputProps={fontColor} inputRef={nick} id="txtNick" placeholder={props.username} variant="standard" disabled />
            <button style={{backgroundColor:'white',color: 'black', border: 0 }} onClick={handleNick}>
              <EditIcon />
            </button>
            <button hidden id="saveButton" style={{backgroundColor:'white', color: 'black', border: 0 }} onClick={clickSave}>
              <DoneIcon />
            </button>
          </div>

          <div style={{ width: '100%',display: 'flex', alignItems: 'center', justifyContent: 'left' }}>

            <Typography variant="h5" component="div" sx={{ marginTop: 1, marginRight: 1 }}>
              Username:
            </Typography>
            <TextField id="txtNick" placeholder={props.idIntra} variant="standard" disabled />
          </div>

          <div style={{  display: 'flex', alignItems: 'center', justifyContent: 'left' }}>

            <Typography variant="h5" component="div" sx={{ marginTop: 1, marginRight: 1 }}>
              Score:
            </Typography>
            <TextField inputProps={fontColor} id="txtScore" style={{width: '62%'}} placeholder={String(props.score)} variant="standard" disabled />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <Typography variant="h5" component="div" sx={{ marginTop: 1, marginRight: 1 }}>
              2FA:
            </Typography>

            <Switch
              checked={isCheck}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />

          </div>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button onClick={clickSave}>Save</Button>
        </CardActions>
      </Card >
      <Alert status={alert != "" ? true : false} closeStatus={() => setAlert("")} error={alert} />
      <TwofaOn status={open2FA} closeStatus={close2FA} qr={Qr} />
    </>
  );
}
