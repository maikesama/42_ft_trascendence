import React, {useState} from 'react';
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

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto',
    },
});


export const ChatContain = (props: any) => {
    const classes = useStyles();
    const onstatus = props.status;
    let status;
 
    if (onstatus && onstatus === "online") {
        status = (
            <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill"></i>
        );
    } else if (onstatus === "offline") {
        status = (
            <i style={{ fontSize: 8, color: 'red' }} className="bi bi-circle-fill"></i>
        );
    } else {
        status = (
            <i style={{ fontSize: 8, color: 'grey' }} className="bi bi-circle-fill"></i>
        );
    }

    const [openCreateGroup, setopenCreateGroup] = React.useState(false);
    const [openJoinGroup, setopenJoinGroup] = React.useState(false);
    const [openGroupInfo, setopenGroupInfo] = React.useState(false);
    const [openAdminActions, setopenAdminActions] = React.useState(false);
    const [openUserActions, setopenUserActions] = React.useState(false);

    const handleClickOpenCreateGroup = () => {
        setopenCreateGroup(true);
    };

    const handleCloseCreateGroup = () => {
        setopenCreateGroup(false);
    };

    const handleClickOpenJoineGroup = () => {
        setopenJoinGroup(true);
    };

    const handleCloseJoinGroup = () => {
        setopenJoinGroup(false);
    };

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

    const handleClickOpenUserActions = () => {
        setopenUserActions(true);
    };

    const handleCloseUserActions = () => {
        setopenUserActions(false);
    };

    return (
        <div>
            <Grid container style={{ top: 20 }} component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <Grid item xs={12} style={{ padding: '10px', display: 'flex', justifyContent: 'flex-start' }}>
                        <TextField className="searchBar" id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                        <IconButton aria-label="delete" style={{ marginTop: '10px' }} size="small" onClick={handleClickOpenCreateGroup}><GroupAddSharpIcon fontSize="large" /></IconButton>
                        <IconButton aria-label="delete" style={{ marginTop: '10px' }} size="small" onClick={handleClickOpenJoineGroup}><Diversity3OutlinedIcon fontSize="large" /></IconButton>
                    </Grid>
                    <Divider />
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                            <ListItemText secondary="online" ></ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button key="Alice">
                            <ListItemIcon>
                                <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Alice">Alice</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button key="CindyBaker">
                            <ListItemIcon>
                                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                        </ListItem>
                        <Divider />
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        <ListItem button key="" onClick={handleClickOpenGroupInfo}>
                            <ListItemIcon>
                                <Avatar alt="Lorenzo" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText className="userNameChat" primary="Lorenzo"></ListItemText>
                            <ListItem>{status}</ListItem>
                        </ListItem>
                        <Divider />
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText secondary="09:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText primary="Hey, Iam Good! What about you ?" ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText secondary="09:31"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText secondary="10:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                        </Grid>
                        <Grid xs={1} >
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/*MODAL JOIN GROUP */}
            <JoinGroup status={openJoinGroup} closeStatus={handleCloseJoinGroup}/>
            {/*MODAL ADMIN IN GROUP ACTIONS */}
            <AdminGroupActions status={openAdminActions} closeStatus={handleCloseAdminActions}/>   
            {/*MODAL GROUP INFO */}
            <GroupInfo status={openGroupInfo} closeStatus={handleCloseGroupInfo}/>
            {/*MODAL CREATE CHANNEL */}
            <CreateChannel status={openCreateGroup} closeStatus={handleCloseCreateGroup}/>
            {/*MODAL USER ACTIONS */}
            <UserActions status={openUserActions} closeStatus={handleCloseUserActions}/>
            {/*MODAL BLOCK USER */}
            {/*<Dialog open={openGroupInfo} onClose={handleCloseGroupInfo}>
                <DialogTitle>Blocca</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sei sicuro di voler bloccare questo utente?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseGroupInfo}>Cancel</Button>
                    <Button onClick={handleCloseGroupInfo}>Blocca</Button>
                </DialogActions>
            </Dialog>*/}
        </div >
    );
}