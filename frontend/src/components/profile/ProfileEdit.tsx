import React,{useRef, useState, useEffect} from 'react';
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
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import StepLabel from '@mui/material/StepLabel';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import BlockIcon from '@mui/icons-material/Block';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import { Route, Routes } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";

import "../css/ProfileEdit.css"
import { Input } from '@mui/material';
import { match } from 'assert';
import { render } from 'react-dom';
import { blue } from '@material-ui/core/colors';
import { SearchBar } from './SearchBar';
import { BlockedList } from './BlockedList';
import { MatchesList } from './MatchesList';
import { Link } from 'react-router-dom';
import { upload } from "@testing-library/user-event/dist/upload";
import ImageUploading, { ImageListType } from "react-images-uploading";


const fontColor = {
  style: { WebkitTextFillColor: "rgba(0,0,0)" }
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
        <ListItemText  primary={`Friend`}  />
        <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill" />
        <IconButton aria-label="chat" size="small" style={{ color: 'green' }}><RemoveRedEyeIcon fontSize="large" /></IconButton>
        <IconButton aria-label="unfriend" size="small" style={{ color: '#f30000' }}><PersonRemoveOutlinedIcon fontSize="large" /></IconButton>
        <IconButton aria-label="block" size="small" style={{ color: '#f30000' }}><BlockIcon fontSize="large" /></IconButton>
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
          {props.matches ? <Button onClick={handleClickOpenSearchBar}>Add friend</Button> : null}
          {props.matches ? <Button onClick={handleClickOpenBlockedList}>Blocked</Button> : <Button onClick={handleClickOpenMatchesList}>Game History</Button>}
        </CardActions>
      </Card>
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

  //const [user, setUser] = useState({} as any);

  const clickSave = async () => {
    //return console.log(nick.current.value)
    
    let url = "http://10.11.10.4:3333/user/update/username";

    
    try {
            const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers:{
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({userName: nick.current.value})
    });
            // const json = await response.json();
            // console.log(json);
            // setUser(json);
    } catch (error) {
            console.log("error", error);
    }
    window.location.reload()
  }

  const onChange = (
    imageList: ImageListType,
  ) => {
    // data for submit
    setImages(imageList as never[]);
    uploadImage(imageList)
  };

  const uploadImage = async (imageList: ImageListType) => {
    console.log(JSON.stringify(imageList[0].dataURL))
    try {
      const response = await fetch('http://10.11.10.4:3333/user/update/pp', {
        method: "POST",
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({dataURL: imageList[0].dataURL}),
    });
      const json = await response.json();
      //console.log(json);
    } catch (error) {
      console.log("error", error);
    }
    window.location.reload()
  };

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
              <button onClick={onImageUpload}>Upload Image</button>
          )}
        </ImageUploading>

      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            Nickname:
          </Typography>
          <TextField inputProps={fontColor} onBlur={clickSave} inputRef={nick} id="txtNick" placeholder={props.username} variant="standard" disabled/>
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
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button onClick={clickSave}>Save</Button>
      </CardActions>
    </Card>
  );
}
