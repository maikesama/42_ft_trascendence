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
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { UserActions } from './UserActions';

export const GroupInfo = (props: any) => {

    const partecipants = props.partecipants;


    const [openUserActions, setopenUserActions] = React.useState(false);
    const handleClickOpenUserActions = () => {
        setopenUserActions(true);
    };

    const handleCloseUserActions = () => {
        setopenUserActions(false);
    };

    async function leaveChannel() {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/leaveChannel`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: props.idChat }),
            })
           window.location.reload();
        } catch (error) {
            console.log("error", error);
        }

    }

    function renderGroupRow(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} >
                <Link key={`/Profile/other`} component={RouterLink} to={`/Profile/${partecipants[index]?.idIntra}`} underline="none" color="inherit">
                <ListItemButton>
                    <Avatar alt={partecipants[index]?.userName} src={partecipants[index]?.img} />
                    <Divider variant='middle' />
                    <ListItemText primary={partecipants[index]?.userName} secondary={partecipants[index]?.owner === true ? 'Owner' : partecipants[index]?.admin === true ? 'Admin' : 'User'}/>
                    <Divider />
                </ListItemButton>
                </Link>
            </ListItem>
        );
    }

    const closeX = {
       backgroundColor: 'white', color: 'red', marginLeft: '85%',fontSize: 13, border: '2px solid red', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'
    }

    return (
        <>
            <Dialog open={props.status} onClose={props.closeStatus}>
                <DialogTitle>Info <button style={closeX} onClick={props.closeStatus}>X</button> </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your are {props.user}
                    </DialogContentText>
                    <Divider />

                    <FixedSizeList

                        style={{marginTop: 20}}
                        height={partecipants?.length > 9 ? 450 : partecipants?.length * 70}
                        width={500}
                        itemSize={60}
                        itemCount={partecipants?.length}
                        overscanCount={5}
                    >
                        {renderGroupRow}
                    </FixedSizeList>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={leaveChannel} style={{ border: '2px solid red', color: 'red', marginBottom: '3%', marginRight: '5%' }}>Leave</Button>
                </DialogActions>
            </Dialog>
            <UserActions status={openUserActions} closeStatus={handleCloseUserActions} />
        </>
    );
}
