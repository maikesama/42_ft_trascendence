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
import { Alert, manageError } from '../generic/Alert';
import { socket } from '../../App';

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
    const [alert, setAlert] = useState("");
    // const [isBlocked, setIsBlocked] = useState(false);
    // const [isFriend, setIsFriend] = useState(false);
    // const [isPending, setIsPending] = useState(false);

    async function searchUser() {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/searchUser`;
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
            console.log("ciao :" + JSON.stringify(json));
            setSearch(json);
        } catch (error) {
            console.log("error", error);
        }
    }

    function renderSearchRow(props: any) {

        const { index, style, matches } = props;

        async function block(index: any) {
            const idIntra = await search[index]?.idIntra;
            const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/block/${idIntra}`;

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
            const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/inviteFriend`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idIntra: idIntra }),
                })
                // const data = await response.json();
                //window.location.reload(); or null
                manageError(null, response, null, setAlert);
                if (response.status === 200) {
                    socket.emit('notification', { type: 1, idIntra: idIntra });
                }
            } catch (error) {
                console.log("error", error);
            }
        }

        async function removeInviteFriend(index: any) {
            const idIntra = await search[index]?.idIntra;
            const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/removeInvite/`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idIntra: idIntra }),
                });
                window.location.reload();
            } catch (error) {
                console.log("error", error);
            }
        }


        async function removeFriend(index: any) {
            const idIntra = await search[index]?.idIntra;
            const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/removeFriend/`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idIntra: idIntra }),
                });
                window.location.reload();
            } catch (error) {
                console.log("error", error);
            }
        }
        // useEffect(() => {
        //     const fetchData = async () => {
        //         const idIntra = await search[index]?.idIntra;
        //         const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/isFriend`;
        //         try {
        //             const response = await fetch(url, {
        //                 method: 'POST',
        //                 credentials: 'include',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify({ idIntra: idIntra }),
        //             });
        //             const json = await response.json();
        //             console.log("isF" + json);
        //             setIsFriend(json);
        //             //window.location.reload();
        //             //console.log(json.friends)
        //         } catch (error) {
        //             console.log("error", error);
        //         }
        //         fetchData();
        //     };
        // }, [search[index]?.idIntra]);


        // useEffect(() => {
        //     const fetchData = async () => {
        //         const idIntra = await search[index]?.idIntra;
        //         const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/isInvitedByMe`;
        //         try {
        //             const response = await fetch(url, {
        //                 method: 'POST',
        //                 credentials: 'include',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify({ idIntra: idIntra }),
        //             });
        //             const json = await response.json();
        //             console.log(json);
        //             setIsPending(json);
        //         } catch (error) {
        //             console.log("error", error);
        //         }
        //         fetchData();
        //     };
        // }, [search[index]?.idIntra]);



        // useEffect(() => {
        //     const fetchData = async () => {
        //         const idIntra = await search[index]?.idIntra;
        //         const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/isBlocked`;
        //         try {
        //             const response = await fetch(url, {
        //                 method: 'POST',
        //                 credentials: 'include',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify({ idIntra: idIntra }),
        //             });
        //             const json = await response.json();
        //             console.log("isB" + json);
        //             setIsBlocked(json);
        //             //window.location.reload();
        //             //console.log(json.friends)
        //         } catch (error) {
        //             console.log("error", error);
        //         }
        //         fetchData();
        //     };
        // }, [search[index]?.idIntra]);

        return (
            <>
                <ListItem style={style} key={index} >
                    {search[index]?.img ? <><Avatar src={search[index]?.img} />
                        <ListItemText id="idIntraSearch" primary={search[index]?.idIntra} />
                        <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill" />
                        <Divider variant="middle" />
                        {console.log('Invitati??????????')}
                        {console.log('Invitati??????????')}
                        {console.log('Invitati??????????')}
                        {console.log('Invitati??????????')}
                        {console.log('Invitati??????????')}
                        {console.log('Invitati??????????')}
                        {console.log('Invitati??????????')}

                        {console.log(search[index]?.invited)}
                        {console.log(search[index]?.friend)}
                        <IconButton aria-label="watch" size="small" style={{ color: 'lightrey' }} ><MapsUgcOutlinedIcon fontSize="large" /></IconButton>
                        {(!(search[index]?.friend) && !search[index]?.invited) ? <IconButton aria-label="addfriend" size="small" style={{ color: 'green' }} onClick={() => addInviteFriend(index)}><PersonAddOutlinedIcon fontSize="large" /></IconButton> : null}
                        {(!(search[index]?.friend) && search[index]?.invited) ?    <IconButton aria-label="removefriend" size="small" style={{ color: 'orange' }} onClick={() => removeInviteFriend(index)}><PersonRemoveOutlinedIcon fontSize="large" /></IconButton> : null}
                        {(search[index]?.friend) ?    <IconButton aria-label="removefriend" size="small" style={{ color: 'red' }} onClick={() => removeFriend(index)}><PersonRemoveOutlinedIcon fontSize="large" /></IconButton> : null}
                        <IconButton aria-label="block" size="small" style={{ color: '#f30000' }} onClick={() => block(index)}><BlockIcon fontSize="large" /></IconButton> </> : null}

                </ListItem>
            </>
        );
    }

    return (
        <>
            <Dialog open={props.status} onClose={props.closeStatus}>
                <DialogTitle textAlign="center">Search Friends</DialogTitle>
                <DialogContent>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputRef={initials}
                            onChange={searchUser}
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
            <Alert status={alert != "" ? true : false} closeStatus={() => setAlert("")} error={alert} />
        </>
    );
}
