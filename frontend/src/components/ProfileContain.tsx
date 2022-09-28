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


import "./css/ProfileContain.css"

export const ProfileContain = (props: any) => {
  
  return (
    <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  style={{ minHeight: '100vh',marginTop:50 }}
 >

  <Grid item xs={3}>
        <Card sx={{ maxWidth: 550, height: 600 }}>
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
            <Typography gutterBottom variant="h5" component="div" sx={{height: '40px'}}>
            Liafigli{props.nickname}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{height: '80px'}}>
             Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            {/*Non cancellare altrimenti resize*/}
            </Typography>
        </CardContent>
        <CardActions sx={{justifyContent: 'center'}}>
            <Button>Save</Button>
        </CardActions>
        </Card>
        </Grid>
    </Grid>
  );
}
