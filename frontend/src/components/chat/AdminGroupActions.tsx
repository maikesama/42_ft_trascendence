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


export const AdminGroupActions = (props: any) => {

    const partecipants = props.partecipants;

    function renderGroupRowAdmin(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} >
                <ListItemButton>
                    <Avatar alt={partecipants[index]?.userName} src={partecipants[index]?.img} />
                    <Divider variant='middle'/>
                    <ListItemText primary={partecipants[index]?.userName} secondary={partecipants[index]?.owner === true ? 'Owner' : partecipants[index]?.admin === true ? 'Admin' : 'User'}/>
                    <Divider />
                </ListItemButton>
            </ListItem>
        );
    }

    return (
        <Dialog open={props.status} onClose={props.closeStatus}>
            <DialogTitle>Admin Actions</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are {props.user}
                </DialogContentText>
                <FixedSizeList

                    height={230}
                    width={500}
                    itemSize={46}
                    itemCount={partecipants?.length}
                    overscanCount={5}
                >
                    {renderGroupRowAdmin}
                </FixedSizeList>
                <DialogActions>
                    <Button variant="outlined" onClick={props.closeStatus}>Muted</Button>
                    <Button variant="outlined" onClick={props.closeStatus}>Banned</Button>
                    <Button variant="contained" onClick={props.closeStatus}>Close</Button>
                    <Button variant="outlined" onClick={props.closeStatus} style={{ border: '2px solid red', color: 'red' }}>Leave</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

//<Button variant="outlined" onClick={props.closeStatus}>Promote</Button>
//<Button variant="outlined" onClick={props.closeStatus}>Demote</Button>