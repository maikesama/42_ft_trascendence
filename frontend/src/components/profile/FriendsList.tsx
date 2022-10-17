import { useState, useRef } from 'react';
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
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';

export const BlockedList = (props: any) => {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      <li key={`blocked section`}>
        <ul>
          <ListSubheader style={{ fontSize: 20 }}>Blocked users</ListSubheader>
          {[0, 1, 2].map((item) => (
            <ListItem key={`blocked`}>
              <Avatar />
              <ListItemText primary={`Blocked ${item}`} />
              <IconButton aria-label="unblock" size="small" style={{ color: 'green' }}><HowToRegOutlinedIcon fontSize="large" /></IconButton>
            </ListItem>
          ))}
        </ul>
      </li>
    </List>
  );
}

export const FriendsList = (props: any) => {

  /*const inputRef = useRef(null);

  const [updated, setUpdated] = useState(null);

  const getUser = () => {
    //  "inputRef.current.value" is input value
    setUpdated(inputRef.current.value);
    console.log(updated);
  };*/
  
  function renderSocialRow(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem style={style} key={index} >
        <Avatar />
        <ListItemText  primary={`Friend`}  />
        <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill" />
        <Divider variant="middle" />
        <IconButton aria-label="chat" size="small" style={{ color: 'green' }}><RemoveRedEyeIcon fontSize="large" /></IconButton>
        <IconButton aria-label="unfriend" size="small" style={{ color: '#f30000' }}><PersonRemoveOutlinedIcon fontSize="large" /></IconButton>
        <IconButton aria-label="block" size="small" style={{ color: '#f30000' }}><BlockIcon fontSize="large" /></IconButton>
      </ListItem>
    );
  }

  
  return (
    <Dialog open={props.status} onClose={props.closeStatus}>
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
          {props.blocked ? <><BlockedList /></> : null}
        </div>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button variant="outlined">Refresh</Button>
          <Button variant="contained" onClick={props.closeStatus}>Close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}