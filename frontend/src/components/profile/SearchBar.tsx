import React, { useState, useEffect, useRef } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import BlockIcon from '@mui/icons-material/Block';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

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

export const SearchBar = (props: any) => {

    const [search, setSearch] = useState({} as any);
    const initials = useRef<any>('');

    async function searchUser() {
        const url = `http://10.11.11.3:3333/chat/searchUser`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ initials: initials.current.value }),
            });
            const json = await response.json();
            console.log(json);
            setSearch(json);
        } catch (error) {
            console.log("error", error);
        }
    }

    function renderSearchRow(props: any) {

        const { index, style, matches } = props;

        async function block(index: any) {
            const idIntra = await search[index]?.idIntra;
            const url = `http://10.11.11.3:3333/user/block/${idIntra}`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                window.location.reload();
            } catch (error) {
                console.log("error", error);
            }
        }

        async function addInviteFriend(index: any) {
            const idIntra = await search[index]?.idIntra;
            const url = `http://10.11.11.3:3333/friend/inviteFriend`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({idIntra: idIntra}),
                }).then((response) => {
                    if (response.status === 400) {
                        alert("You already have a pending request with this user");
                    }
                });
                window.location.reload();
            } catch (error) {
                console.log("error", error);
            }
        }

        async function removeInviteFriend(index: any) {
            const idIntra = await search[index]?.idIntra;
            const url = `http://10.11.11.3:3333/friend/removeInvite/`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({idIntra: idIntra}),
                });
                window.location.reload();
            } catch (error) {
                console.log("error", error);
            }
        }

        const test = true;

        return (
            <ListItem style={style} key={index} >
                {search[index]?.img ? <><Avatar src={search[index]?.img} />
                <ListItemText id="idIntraSearch" primary={search[index]?.idIntra} />
                <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill" />
                <Divider variant="middle" />
                <IconButton aria-label="watch" size="small" style={{ color: 'lightrey' }} ><MapsUgcOutlinedIcon fontSize="large" /></IconButton>
                { !(search[index]?.invited) ? <IconButton aria-label="addfriend" size="small" style={{ color: 'green' }} onClick={() => addInviteFriend(index)}><PersonAddOutlinedIcon fontSize="large" /></IconButton> :
                 <IconButton aria-label="removefriend" size="small" style={{ color: 'green' }} onClick={() => removeInviteFriend(index)}><PersonRemoveOutlinedIcon fontSize="large" /></IconButton>}
                <IconButton aria-label="block" size="small" style={{ color: '#f30000' }} onClick={() => block(index)}><BlockIcon fontSize="large" /></IconButton> </>: null}
                
            </ListItem>
        );
    }

    return (
        <Dialog open={props.status} onClose={props.closeStatus}>
            <DialogTitle textAlign="center">Search Friends</DialogTitle>
            <DialogContent>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        inputRef={initials}
                        onChange={searchUser}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <div style={{ textAlignLast: 'center', border: '2px solid lightgrey', borderRadius: '3%', marginTop: '7px' }}>
                    <FixedSizeList
                        height={400}
                        width={400}
                        itemSize={80}
                        itemCount={Object.values(search).length % 5} /*Qui deve essere restituito il numero di amici nella lista*/
                        overscanCount={5}
                    >
                        {renderSearchRow}
                    </FixedSizeList>
                </div>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant="contained" onClick={props.closeStatus}>Close</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}