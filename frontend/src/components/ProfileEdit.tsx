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


import "./css/ProfileEdit.css"

export const ProfileEdit = (props: any) => {
  
  function handleNick(){
    const inputbox = document.getElementById('txtNick');
    inputbox?.removeAttribute('disabled')
    inputbox?.setAttribute('placeholder', 'Inserisci Nickname');
  }

  return (
    <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  style={{ marginTop:50 }}
 >

  <Grid item xs={3}>
        <Card sx={{ minWidth: 400, height: 600 }}>
        <Button className="UploadImageBtn" component="label" sx={{width: '100%', height: '380px', padding: 0}}>
        <CardMedia
            component="img"
            height="380"
            image="https://cdn.intra.42.fr/users/liafigli.jpeg"
            alt=""
        />
        <Typography className="UploadImageTxt">Upload Image</Typography>
        <input type="file" hidden/>
        </Button>
        
        <CardContent>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            <Typography variant="h5" component="div" sx={{marginTop: 2, marginRight: 2}}>
            Nickname: 
            </Typography>
            <TextField id="txtNick" placeholder="liafigli" variant="standard" disabled />
            <Button sx={{color: 'black'}} onClick={handleNick}>
            <EditIcon/>
            </Button>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            <Typography variant="h5" component="div" sx={{marginTop: 2, marginRight: 2}}>
            Username: 
            </Typography>
            <TextField id="txtNick" placeholder="liafigli" variant="standard" disabled />
            <Button sx={{color: 'black', visibility: 'hidden'}} >
            <EditIcon/>
            </Button>
          </div>
            
        </CardContent>
        <CardActions sx={{justifyContent: 'center'}}>
            <Button>Save</Button>
        </CardActions>
        </Card>
        </Grid>
    </Grid>
  );
}
