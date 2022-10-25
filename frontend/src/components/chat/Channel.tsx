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

const useStyles = makeStyles({
    messageArea: {
        height: '70vh',
        overflowY: 'auto',
    },
});

export const Channel = (props: any) => {

    const classes = useStyles();

    const [openGroupInfo, setopenGroupInfo] = React.useState(false);
    const [permission, setPermission] = useState({} as any);
    const [openAdminActions, setopenAdminActions] = React.useState(false);

    const handleClickChannelInfo = (props: any) => {
        setChannelInfo(props);
    }

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


    async function clickChannelInfo(name: string) {
        const url = `http://10.11.11.3:3333/chat/getUserPrivilegeInfo`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name }),
            });
            const json = await response.json();
            console.log(json);
            setPermission(json);
        } catch (error) {
            console.log("error", error);
        }
        //permission === 'owner' || permission === '' ? handleClickOpenAdminActions : handleClickOpenGroupInfo
    }

    return (
        <>
            <List className={classes.messageArea}>
                <ListItem button key="" >
                    <ListItemIcon>
                        <Avatar alt="Lorenzo" src={props.img} />
                    </ListItemIcon>
                    <Typography variant='h5' className="groupNameChat" onClick={clickChannelInfo(props.name)} style={{width: '150px', marginLeft: '50px'}}>{props.name}</Typography>
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
            {/*MODAL GROUP INFO */}
            <GroupInfo status={openGroupInfo} closeStatus={handleCloseGroupInfo} />
            {/*MODAL ADMIN INFO */}
            <AdminGroupActions status={} closeStatus={}/>
        </>
    );
}