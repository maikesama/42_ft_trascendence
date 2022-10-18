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
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import BlockIcon from '@mui/icons-material/Block';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import "../css/ProfileEdit.css"
import { Input } from '@mui/material';
import { match } from 'assert';
import { render } from 'react-dom';

const fontColor = {
  style: { color: 'rgb(50, 50, 50)' }
}



export const SocialEdit = (props: any) => {

  const [openFriendsList, setOpenFriendsList] = React.useState(false);
  const [openMatchesList, setOpenMatchesList] = React.useState(false);

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

  function renderMatchesRowPreview(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem button style={style} key={index} >
        <Avatar />
        <ListItemText className="matchLossResult" primary={`User`} />
        <ListItemText className="matchLossResult" primary={`3 - 5`} />
        <ListItemText className="matchLossResult" primary={`Adversary`} />
        <Avatar />
      </ListItem>
    );
  }

  function renderSocialRowPreview(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem className="friendPreview" style={style} key={index}>
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
          <ListItemText className="matchLossResult" primary={`User`} />
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
        <ListItemText primary={`Friend`}/>
        <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill" />
        <Divider variant="middle" />
        <IconButton aria-label="watch" size="small" style={{ color: 'green' }}><RemoveRedEyeIcon fontSize="large" /></IconButton>
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
        <Divider/>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button onClick={props.matches ? handleClickOpenFriendsList : handleClickOpenMatchesList}>Explore</Button>
        </CardActions>
      </Card>
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
          image="https://cdn.intra.42.fr/users/taureli.jpeg"
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
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            Username:
          </Typography>
          <TextField id="txtNick" placeholder="liafigli" variant="standard" disabled />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            Score:
          </Typography>
          <TextField id="txtNick" placeholder="224" variant="standard" disabled />
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