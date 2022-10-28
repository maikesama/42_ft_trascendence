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

import "../css/ProfileEdit.css"
import { SearchBar } from './SearchBar';
import { MatchesList } from './MatchesList';

const fontColor = {
  style: { color: 'rgb(50, 50, 50)' }
}



export const SocialEdit = (props: any) => {

  const [openBlockedList, setOpenBlockedList] = React.useState(false);
  const [openMatchesList, setOpenMatchesList] = React.useState(false);
  const [openSearchBar, setOpenSearchBar] = React.useState(false);

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
        <Avatar />
        <ListItemText className="matchLossResult" primary={`You`} />
        <ListItemText className="matchLossResult" primary={`3 - 5`} />
        <ListItemText className="matchLossResult" primary={`Adversary`} />
        <Avatar />
      </ListItem>
    );
  }

  function renderSocialRow(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem style={style} key={index} >
        <Avatar />
        <ListItemText primary={`Friend`} />
        <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill" />
        <Divider variant="middle"/>
        <IconButton aria-label="chat" size="small" style={{ color: 'green' }}><RemoveRedEyeIcon fontSize="large" /></IconButton>
      </ListItem>
    );
  }

  return (
    <div>
      <Card sx={{ minWidth: 400, height: 600, borderRadius: 10, boxShadow: '0px 0px 0px 1px #D0D0D0' }}>
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
              {props.title}
            </Typography>
            <label style={{ color: "#fff", backgroundColor: 'black', borderRadius: '35px 35px', padding: 6 }}>{props.tot}</label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlignLast: 'center' }}>

            <FixedSizeList

              height={460}
              width={310}
              itemSize={90}
              itemCount={props.matches ? 12 : 5}
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

  const clickSave = async () => {
    //return console.log(nick.current.value)

    let url = "http://10.11.11.3:3333/user/update/username";


    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: nick.current.value })
      });
      // const json = await response.json();
      // console.log(json);
      // setUser(json);
    } catch (error) {
      console.log("error", error);
    }
    console.log(img.current.value)
    url = "http://10.11.11.3:3333/user/update/pp";


    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ img: img.current.value })
      });
      // const json = await response.json();
      // console.log(json);
      // setUser(json);
    } catch (error) {
      console.log("error", error);
    }

  }

  function handleNick() {
    const inputbox = document.getElementById('txtNick');
    inputbox?.removeAttribute('disabled')
    inputbox?.setAttribute('placeholder', 'Inserisci Nickname');
  }

  const fontColor = {
    style: { color: 'rgb(0, 0, 0)' }
  }

  return (

    <Card sx={{ maxWidth: 400, height: 600, borderRadius: 10, boxShadow: '0px 0px 0px 1px #D0D0D0' }}>
      <Button className="UploadImageBtn" component="label" sx={{ width: '100%', height: '380px', padding: 0 }}>
        <CardMedia
          component="img"
          height="380"
          image={props.img}
          alt=""
        />
        <Typography className="UploadImageTxt">Upload Image</Typography>
        <TextField type="file" hidden inputRef={img} />
      </Button>

      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            Nickname:
          </Typography>
          <TextField inputProps={fontColor} inputRef={nick} id="txtNick" placeholder={props.username} variant="standard" disabled />
          <Button sx={{ color: 'black' }} onClick={handleNick}>
            <EditIcon />
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            Username:
          </Typography>
          <TextField id="txtNick" placeholder={props.idIntra} variant="standard" disabled />
          <Button sx={{ color: 'black', visibility: 'hidden' }} >
            <EditIcon />
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            Score:
          </Typography>
          <TextField inputProps={fontColor} id="txtScore" placeholder="224" variant="standard" disabled />
          <Button sx={{ color: 'black', visibility: 'hidden' }} >
            <EditIcon />
          </Button>
        </div>

      </CardContent>
      <CardActions sx={{ justifyContent: 'center', paddingTop: '0px' }}>
        <IconButton aria-label="message" size="small" ><MapsUgcOutlinedIcon fontSize="large" /></IconButton>
        <IconButton aria-label="addfriend" size="small" style={{ color: '#00e200' }}><PersonAddOutlinedIcon fontSize="large" /></IconButton>
        <IconButton aria-label="block" size="small" style={{ color: '#f30000' }}><BlockIcon fontSize="large" /></IconButton>
      </CardActions>
    </Card>
  );
}