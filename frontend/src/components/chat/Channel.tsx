import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Button from '@mui/material/Button';
import { FormatAlignJustify } from '@material-ui/icons';
import { AlignHorizontalLeft } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import ListItemButton from '@mui/material/ListItemButton';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { CreateChannel } from './CreateChannel';
import { GroupInfo } from './GroupInfo';
import { AdminGroupActions } from './AdminGroupActions';
import { JoinGroup } from './JoinGroup';
import { UserActions } from './UserActions';
import { socket } from '../../App';

const useStyles = makeStyles({
    messageArea: {
        height: '70vh',
        overflowY: 'auto',
    },
});

//Array di testing
// const messaggi: string[] = [];

export const Channel = (props: any) => {

    const classes = useStyles();

    const [openGroupInfo, setopenGroupInfo] = React.useState(false);
    const partecipants = props.partecipants;
    const permission = props.permission;
    const setPartecipants = props.setPartecipants;
    const [openAdminActions, setopenAdminActions] = React.useState(false);
    const isSecondRender = React.useRef(false);

    React.useEffect(() => {
        if (isSecondRender.current) {
            socket.on('refreshPartecipants', (data: any) => {
                if (props.id === data.idChat) {
                    setPartecipants(data.partecipants);
                }
            });
        }
        isSecondRender.current = true;
    });
    // const [message, setMessage] = useState('Haloa');

    // function MessageSent(props: any) {
    //     return (
    //         <>
    //             <div className="container-message lighter">
    //                 {/* <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" /> */}
    //                 <Typography className="userSending">You</Typography>
    //                 <Typography>{props.message}</Typography>
    //                 <span className="time-right">{props.time}</span>
    //             </div>
    //         </>
    //     );
    // }

    // function MessageReceived(props: any) {
    //     return (
    //         <>
    //             <div className="container-message darker">
    //                 {/* <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar" className="right" /> */}
    //                 <Typography className="userSending">{props.friend}</Typography>
    //                 <Typography className="message">{props.message}</Typography>
    //                 <span className="time-right">{props.time}</span>
    //             </div>
    //         </>
    //     );
    // }

    // const handleMessage = (event: any) => {
    //     if (event.target.value !== '') {
    //         setMessage(event.target.value);
    //     }
    //     else {
    //         setMessage('Messaggio vuoto');
    //     }
    // }

    // const sendMessage = () => {
    //     messaggi.push(message);
    //     for (var i in messaggi) {
    //         console.log(messaggi[i]);
    //     }
    // }



    const handleClickOpenGroupInfo = () => {
        setopenGroupInfo(true);
    };

    const handleCloseGroupInfo = () => {
        setopenGroupInfo(false);
    };

    const handleClickOpenAdminActions = () => {
        setopenAdminActions(true);
    };

    const handleCloseAdminActions = () => {
        setopenAdminActions(false);
    };


    async function chanInfo() {
        if (permission?.owner || permission?.admin)
            handleClickOpenAdminActions();
        else
            handleClickOpenGroupInfo();
    }

    return (
        <>
            {/* <List className={classes.messageArea}> */}
                <ListItem button key="" onClick={chanInfo}>
                    <ListItemIcon>
                        <Avatar src={props.img} style={{ width: '51px', height: '51px' }}/>
                    </ListItemIcon>
                    <Typography variant='h5' className="groupNameChat" style={{ width: '150px', marginLeft: '50px' }}>{props.name}</Typography>
                </ListItem>
            {/* </List>
            <Divider />
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={11}>
                    <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={handleMessage} />
                </Grid>
                <Grid xs={1} >
                    <Fab color="primary" aria-label="add" onClick={sendMessage}><SendIcon /></Fab>
                </Grid>
            </Grid> */}
            {/*MODAL GROUP INFO */}
            <GroupInfo status={openGroupInfo} user={permission?.owner ? 'Owner' : permission?.admin ? 'Admin' : 'User'} partecipants={partecipants} closeStatus={handleCloseGroupInfo} idChat={props.idChat} channelName={props.name} />
            {/*MODAL ADMIN INFO */}
            <AdminGroupActions status={openAdminActions} user={permission?.owner ? 'Owner' : permission?.admin ? 'Admin' : 'User'} setPartecipants={setPartecipants} partecipants={partecipants} closeStatus={handleCloseAdminActions} idChat={props.idChat} channelName={props.name} type={props.type}/>
        </>
    );
}
