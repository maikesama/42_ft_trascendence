import React, { useState, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import { Alert, manageError } from '../generic/Alert';
import { socket } from '../../App';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { FixedSizeList} from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import BlockIcon from '@mui/icons-material/Block';
import { styled } from '@mui/material/styles';
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
    const [alert, setAlert] = useState("");
    let navigate = useNavigate();
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

            setSearch(json);
        } catch (error) {

        }
    }

    React.useEffect(() => {
            socket.off('blockUserSearchBar').on('blockUserSearchBar', (data: any) => {
                searchUser();
            });
    });

    React.useEffect(() => {
            socket.off('unBlockUserSearchBar').on('unBlockUserSearchBar', (data: any) => {
                searchUser();
            });
    });

    React.useEffect(() => {
            socket.off('friendHandlerSearchBar').on('friendHandlerSearchBar', (data: any) => {
                console.log("friendHandler");
                searchUser();
            });
    });

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
                if (response.status === 201) {
                    // setAlert("User blocked");
                    socket.emit("blockUser", { idIntra: idIntra });
                }
                // window.location.reload();
            } catch (error) {

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
                    socket.emit('friendHandler', { type: 1, idIntra: idIntra });
                }
            } catch (error) {

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

                if (response.status === 200) {
                    socket.emit('friendHandler', {type: 4, idIntra: idIntra});
                }
            } catch (error) {

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
                if (response.status === 200) {
                    socket.emit("removeFriend", { idIntra: idIntra });
                    socket.emit("friendHandler", { idIntra: idIntra, type: 5});
                    // window..reload();
                  }
            } catch (error) {

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

        //             setIsFriend(json);
        //             //window.location.reload();

        //         } catch (error) {

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

        //             setIsPending(json);
        //         } catch (error) {

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

        //             setIsBlocked(json);
        //             //window.location.reload();

        //         } catch (error) {

        //         }
        //         fetchData();
        //     };
        // }, [search[index]?.idIntra]);


        async function newDm(index: any) {
            const idIntra = await search[index]?.idIntra;
            const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/newDm/`;

            try {

                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({idIntra: idIntra}),
                });
                const json = await response.json();
                if (response.status === 200) {

                  socket.emit('newDm', json);
                  // window.location.href = ;
                  navigate(`/chat/${idIntra}`);
                }
                // window.location.reload();
            } catch (error) {

            }
          }

          async function toDm(index: any) {
            const idIntra = await search[index]?.idIntra;
            const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getChatFromOtherProfile/`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({idIntra: idIntra}),
                });
                const json = await response.json();
                if (response.status !== 200) {
                  await newDm(index);
                }
                else {

                    //  window.location.href = `/chat/${props.idIntra}`;
                 navigate(`/chat/${idIntra}`);
                }

                // window.location.reload();
            } catch (error) {

            }
          }

        return (
            <>
                <ListItem style={style} key={index} >
                    {search[index]?.img ? <><Avatar src={search[index]?.img} />
                        <ListItemText id="idIntraSearch" primary={search[index]?.userName} />
                        { search[index]?.status === 0 ? <i style={{ fontSize: 8, color: 'red' }} className="bi bi-circle-fill" /> : search[index]?.status === 1 ? <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill" /> : search[index]?.status === 2 ? <i style={{ fontSize: 8, color: 'gray' }} className="bi bi-circle-fill" /> : null }

                        <Divider variant="middle" />
                        <IconButton aria-label="watch" size="small" style={{ color: 'lightrey' }} onClick={() => toDm(index)}><MapsUgcOutlinedIcon fontSize="large" /></IconButton>
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
