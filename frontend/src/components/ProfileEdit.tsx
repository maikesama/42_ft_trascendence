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


import "./css/ProfileEdit.css"
import { Input } from '@mui/material';
import { match } from 'assert';

const fontColor = {
  style: { color: 'rgb(50, 50, 50)' }
}



export const SocialEdit = (props: any) => {

  function renderMatchesRow(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem style={style} key={index} >
        <Avatar />
        <ListItemText primary={`Item ${index + 1}`} />
        <ListItemText primary={`VS`} />
        <ListItemText primary={`Item ${index + 1}`} />
        <Avatar />
      </ListItem>
    );
  }

  function renderSocialRow(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem style={style} key={index} >
        <Avatar />
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItem>
    );
  }
  return (

    <Card sx={{ minWidth: 400, height: 600, borderRadius: 10, boxShadow: '0px 0px 0px 1px #D0D0D0' }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Typography variant="h5" component="div" sx={{ marginTop: 2, marginRight: 2 }}>
            {props.title}
          </Typography>
          <label style={{ color: "#fff", backgroundColor: 'black', borderRadius: '35px 35px', padding: 6 }}>{props.tot}</label>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <FixedSizeList

            height={400}
            width={300}
            itemSize={80}
            itemCount={5}
            overscanCount={5}
          >
            {props.matches ? renderSocialRow : renderMatchesRow}
          </FixedSizeList>
        </div>

      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button>Explore</Button>
      </CardActions>
    </Card>
  );
}

export const ProfileEdit = (props: any) => {

  function handleNick() {
    const inputbox = document.getElementById('txtNick');
    inputbox?.removeAttribute('disabled')
    inputbox?.setAttribute('placeholder', 'Inserisci Nickname');
  }

  return (

    <Card sx={{ minWidth: 400, height: 600, borderRadius: 10, boxShadow: '0px 0px 0px 1px #D0D0D0' }}>
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