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
import { manageError, Alert } from '../generic/Alert';
import { socket } from '../../App';
import { useAuth } from '../../hooks/useAuth';

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
    const [password, setPassword] = React.useState([] as any);
    const [alert, setAlert] = useState("");
    const isSecondRender = useRef(false);
    const { idIntra } = useAuth();


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
        if (isSecondRender.current) {
            socket.on('newChannel', (data: any) => {
                fetchData();
            });  
            socket.on('removeUser', (data: any) => {
                fetchData();
            });  
            socket.on('addUser', (data: any) => {
                fetchData();
            });  
            socket.on('newJoin', (data: any) => {
                fetchData();
            });  
        }
        isSecondRender.current = true;
    }, []);


        


    async function joinChannel(id : number, index: any) {
        let pwd = "";

        
        // pwd = pass.current[index].value;
        console.log(pwd);
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/joinChannel`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: id, password: password[index]}),
            });
            const data = await response.json();
            manageError(data, response , null, setAlert);

            if (response.status === 200) 
            {
                
                socket.emit('addUser', { idChat: id, idIntra: [idIntra] });
                props.closeStatus();
            }
            
        } catch (error) {
            console.log("error", error);
        }
    }

    function handleJoin(index: any)
    {
        var pass = document.getElementById(String(index)) as HTMLInputElement | null;
        console.log(pass?.value);
        var newPassArray = password;
        newPassArray[index] = pass?.value;
        setPassword(newPassArray);
    }
    console.log(password);

    function renderRow(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <>
            <ListItem style={style} key={index} >
                <ListItemButton>
                    <img width="50px" height="50px" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8AAAD29vahoaGQkJBra2sqKioFBQWqqqrv7+/c3NxcXFzFxcVlZWX6+vpoaGgkJCQ8PDzk5OQ3NzcvLy/W1taDg4MdHR2JiYkWFhZRUVHe3t58fHxZWVlPT0+ampro6OgQEBDKysrhb0krAAADGklEQVR4nO3c21YaQRBA0QGVqKgkRBOiMSb+/0dGQHRm+lZOXynPeWOt6l6zH/SFYrqOiIiIiIiIiIiIiIiIiIjI11zSxXzSsZdzom5yAq9nkr4azyA6NjuXjT1VB34zDy4k5/6uZcKTBoEi4bq7rC2cDpQI1111YQRQIHwB1hbGAMPCLbCyMAoYFO6AdYVxwJBwD6wqjAQGhK/AmsJYoF94AFYURgO9woe3qWrCeKBP+A6sJpQBv3vvcAt7wFrCFEC3sA+sJEwCdAoHwDrCNECXcAisIkwEdAhHwBrCVEC7cAysIEwGtAoNYHlhOqBNeGlOlRYmBFqEFmBpYUqgKbQBCwtlwFvhbWOhFVhWmBY4FtqBRYWJgSOhA1hSmBo4FLqABYXJgQOhE1hOmB7YF965p0oJV+mBPaEHWEqYA/gu9AELCbMA34ReYBlhHuBB6AcWEcqAiw/fu5AASwhl/0U/DtwLQ8ACwmzAnTAIzC/MB9wKw8Dswlx/g9sWEmBuoRA4bRFCBOwesgqzAjsRsLuTCc8nPUJeoKwLGfD3pMsB7jIXgVIGEKAngO0Af0y6HCDA+AAC9CQD/gQYE8BPAtxMuhwgwPgAAvQEcNcvgDEBBOhJCDR+ApoyIfB00uUAAcYHMD/wH8CYAAL0dAbwUwCn7clIywoUvk7j8Sxd11fjhxC9F2N2LxM9jz6fyIRJMzZeZMKlCLgcv9tEm3Bl7EQpE67MrS9dwu3+pGrhbkFUs3C/AatY+Lriq1d42GFWK3xb0tYqfN9CVyrsrdnrFC57YyqFfaBK4QCoUTgEKhSOgPqEY6A6oQHUJjSByoSPljFVQhtQldAK1CS0AxUJHUA9QhdQjdAJ1CK8d4/pEHqAOoQ+oAqhF2gInzen6doUEfqBOd8633XzEsI/gbGsQuF3uVHCEPDohUHgsQvDwCMXCoDHLZQA2xTezr6Emy2XorEmhccTQoTthxBh+yFE2H4IEbYfQoTthxBh+yFE2H4IEbYfQoTth/DTCLN+/5W3mytR6/BNRERERERERERERERERERERERENOg/dzVckyodV/gAAAAASUVORK5CYII="} />
                    <ListItemText primary={chats[index]?.name} secondary={chats[index]?.type === 'protected' ? 'Protected' : 'Public'} />
                </ListItemButton>
                <input type="text" id={String(index)} onChange={() => handleJoin(index)} style={{visibility: chats[index]?.type === 'protected' ? 'visible' : 'hidden'}} />
                <Button color="primary" onClick={() => joinChannel(chats[index]?.id, index)}>Join</Button>
            </ListItem>

            </>
        );
    }

    const closeX = {
        backgroundColor: 'white', color: 'red', marginLeft: '65%',fontSize: 13, border: '2px solid red', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'
     }

    return (
        <>
        <Dialog open={props.status} >
            <DialogTitle>Join Group <button style={closeX} onClick={props.closeStatus}>X</button></DialogTitle>
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
        <Alert status={alert != "" ? true : false} closeStatus={() => setAlert("")} error={alert} />
        </>
    );
}
