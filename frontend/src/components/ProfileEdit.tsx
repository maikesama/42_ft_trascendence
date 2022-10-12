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

import "./css/ProfileEdit.css"
import { Input } from '@mui/material';
import { match } from 'assert';
import { render } from 'react-dom';
import { blue } from '@material-ui/core/colors';

const fontColor = {
  style: { color: 'rgb(50, 50, 50)' }
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "lightgrey",
  '&:hover': {
    backgroundColor: "grey",
  },
  marginRight: 0,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const SocialEdit = (props: any) => {

  const [openFriendsList, setOpenFriendsList] = React.useState(false);
  const [openMatchesList, setOpenMatchesList] = React.useState(false);
  const [openSearchBar, setOpenSearchBar] = React.useState(false);
  
  const handleClickOpenFriendsList = () => {
    setOpenFriendsList(true);
  };

  const handleCloseFriendsList = () => {
    setOpenFriendsList(false);
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

  function renderSocialRowPreview(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem style={style} key={index}>
        <Avatar />
        <ListItemText primary={`Friend`} />
        <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill"></i>
      </ListItem>
    );
  }

  function renderMatchesRow(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem button className="matchResult" style={style} key={index}>
        <Avatar sx={{ width: 56, height: 56 }} />
        <ListItemText className="matchLossResult" primary={`You`} />
        <ListItemText className="matchLossResult" primary={`3 - 5`} />
        <ListItemText className="matchLossResult" primary={`Adversary`} />
        <Avatar sx={{ width: 56, height: 56 }} />
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
        <Divider variant="middle" />
        <IconButton aria-label="chat" size="small" style={{ color: 'green' }}><RemoveRedEyeIcon fontSize="large" /></IconButton>
        <IconButton aria-label="unfriend" size="small" style={{ color: '#f30000' }}><PersonRemoveOutlinedIcon fontSize="large" /></IconButton>
        <IconButton aria-label="block" size="small" style={{ color: '#f30000' }}><BlockIcon fontSize="large" /></IconButton>
      </ListItem>
    );
  }

  function renderSearchRow(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem style={style} key={index} >
        <Avatar />
        <ListItemText primary={`Friend`} />
        <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill" />
        <Divider variant="middle" />
        <IconButton aria-label="watch" size="small" style={{ color: 'lightrey' }}><MapsUgcOutlinedIcon fontSize="large" /></IconButton>
        <IconButton aria-label="unfriend" size="small" style={{ color: 'green' }}><PersonAddOutlinedIcon fontSize="large" /></IconButton>
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
              width={300}
              itemSize={90}
              itemCount={5}
              overscanCount={5}
            >
              {props.matches ? renderSocialRowPreview : renderMatchesRowPreview}
            </FixedSizeList>
          </div>
          <Divider />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          {props.matches ? <Button onClick={handleClickOpenSearchBar}>Add friend</Button> : null}
          <Button onClick={props.matches ? handleClickOpenFriendsList : handleClickOpenMatchesList}>Explore</Button>
        </CardActions>
      </Card>
      {/*Search Bar Modal*/}
      <Dialog open={openSearchBar} onClose={handleCloseSearchBar}>
        <DialogTitle textAlign="center">Search Friends</DialogTitle>
        <DialogContent>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <div style={{ textAlignLast: 'center', border: '2px solid lightgrey', borderRadius: '3%', marginTop: '7px' }}>
            <FixedSizeList
              height={400}
              width={400}
              itemSize={80}
              itemCount={5} /*Qui deve essere restituito il numero di amici nella lista*/
              overscanCount={5}
            >
              {renderSearchRow}
            </FixedSizeList>
          </div>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button variant="outlined">Refresh</Button>
            <Button variant="contained" onClick={handleCloseSearchBar}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/*Friends List Modal*/}
      <Dialog open={openFriendsList} onClose={handleCloseFriendsList}>
        <DialogTitle textAlign="center">Friends List</DialogTitle>
        <DialogContent>
          <div style={{ textAlignLast: 'center' }}>
            <FixedSizeList
              height={400}
              width={400}
              itemSize={80}
              itemCount={5} /*Qui deve essere restituito il numero di amici nella lista*/
              overscanCount={5}
            >
              {renderSocialRow}
            </FixedSizeList>
          </div>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button variant="outlined">Refresh</Button>
            <Button variant="contained" onClick={handleCloseFriendsList}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/*matches List Modal*/}
      <Dialog open={openMatchesList} onClose={handleCloseMatchesList}>
        <DialogTitle textAlign="center">Matches List</DialogTitle>
        <DialogContent>
          <div style={{ textAlignLast: 'center' }}>
            <FixedSizeList
              height={400}
              width={400}
              itemSize={80}
              itemCount={5} /*Qui deve essere restituito il numero di match completati*/
              overscanCount={5}
            >
              {renderMatchesRow}
            </FixedSizeList>
          </div>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button variant="outlined">Refresh</Button>
            <Button variant="contained" onClick={handleCloseMatchesList}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const ProfileEdit = (props: any) => {

  function handleNick() {
    const inputbox = document.getElementById('txtNick');
    inputbox?.removeAttribute('disabled')
    inputbox?.setAttribute('placeholder', 'Inserisci Nickname');
  }

  return (

    <Card sx={{ maxWidth: 400, height: 600, borderRadius: 10, boxShadow: '0px 0px 0px 1px #D0D0D0' }}>
      <Button className="UploadImageBtn" component="label" sx={{ width: '100%', height: '380px', padding: 0 }}>
        <CardMedia
          component="img"
          height="380"
          image="https://cdn.intra.42.fr/users/liafigli.jpeg"
          alt=""
        />
        <Typography className="UploadImageTxt">Upload Image</Typography>
        <input type="file" hidden />
      </Button>

      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            Nickname:
          </Typography>
          <TextField id="txtNick" placeholder="liafigli" variant="standard" disabled />
          <Button sx={{ color: 'black' }} onClick={handleNick}>
            <EditIcon />
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            Username:
          </Typography>
          <TextField id="txtNick" placeholder="liafigli" variant="standard" disabled />
          <Button sx={{ color: 'black', visibility: 'hidden' }} >
            <EditIcon />
          </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            Score:
          </Typography>
          <TextField id="txtNick" placeholder="224" variant="standard" disabled />
          <Button sx={{ color: 'black', visibility: 'hidden' }} >
            <EditIcon />
          </Button>
        </div>

      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button>Save</Button>
      </CardActions>
    </Card>
  );
}
