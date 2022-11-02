import React, { useState, useEffect, useRef } from 'react';
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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "lightgrey",
    '&:hover': {
        backgroundColor: "grey",
    },
    marginRight: 0,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const JoinGroup = (props: any) => {

    const [chats, setChats] = React.useState({} as any);
    const [join, setJoin] = React.useState(-1);
    const pass = useRef<any>('');

    React.useEffect(() => {

        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getChannels`;

        const fetchData = async () => {
        try {
            const response = await fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            const json = await response.json();
            console.log(json);
            setChats(json);
        } catch (error) {
            console.log("error", error);
        }
        };
        fetchData();
    }, []);


    async function joinChannel(name : string) {
        let pwd = "";

        if (pass.current.value)
            pwd = pass.current.value;
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/joinChannel`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: name, password: pwd})
            });
            window.location.reload();
        } catch (error) {
            console.log("error", error);
        }
    }

    function handleJoin()
    {
        console.log("pass: " + pass.current.value )

    }

    function renderRow(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <>
            <ListItem style={style} key={index} >
                <ListItemButton>
                    <ListItemText primary={chats[index]?.name} secondary={chats[index]?.type === 'protected' ? 'Protected' : 'Public'} />
                </ListItemButton>
                <TextField onChange={handleJoin} inputRef={pass} style={{visibility: chats[index]?.type === 'protected' ? 'visible' : 'hidden'}} />
                <Button color="primary" onClick={() => joinChannel(chats[index]?.name)}>Join</Button>
            </ListItem>

            </>
        );
    }

    return (
        <Dialog open={props.status} onClose={props.closeStatus}>
            <DialogTitle>Join Group</DialogTitle>
            <DialogContent>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <div style={{ textAlignLast: 'center', border: '2px solid lightgrey', borderRadius: '3%', marginTop: '7px' }}>
                    <FixedSizeList

                        height={360}
                        width={500}
                        itemSize={70}
                        itemCount={Object.values(chats).length}
                        overscanCount={5}
                    >
                        {renderRow}
                    </FixedSizeList>
                </div>
            </DialogContent>
        </Dialog>
    );
}
