import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Radio from '@mui/material/Radio';


export const AdminGroupActions = (props: any) => {

    const partecipants = props.partecipants;
    const [selectedName, setSelectedName] = React.useState('');
    const [searchView, setSearchView] = useState('');
    const [mySelf, setMySelf] = useState({} as any);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName(event.target.value);
    };

    async function leaveChannel() {
        const url = `http://10.11.11.3:3333/chat/leaveChannel`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: props.channelName }),
            })
            window.location.reload();
        } catch (error) {
            console.log("error", error);
        }

    }

    async function kick() {
        const url = `http://10.11.11.3:3333/chat/removeUser`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: props.channelName, idIntra: selectedName }),
            })
            window.location.reload();
        } catch (error) {
            console.log("error", error);
        }

    }

    useEffect(() => {
        const url = "http://10.11.11.3:3333/user/me";

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
                setMySelf(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    function renderGroupRowAdmin(props: any) {
        const { index, style} = props;
        
        return (
            <ListItem style={style} key={index} >
                <Avatar alt={partecipants[index]?.userName} src={partecipants[index]?.img} />
                <Divider variant='middle' />
                <ListItemText primary={partecipants[index]?.userName} secondary={partecipants[index]?.owner === true ? 'Owner' : partecipants[index]?.admin === true ? 'Admin' : 'User'} />
                <Divider />
                
                {partecipants[index]?.idIntra === mySelf.idIntra || partecipants[index]?.owner ? <>
                <Radio
                    disabled
                    checked={selectedName === partecipants[index]?.userName}
                    onChange={handleChange}
                    value={partecipants[index]?.idIntra}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                />
                </> : 
                <Radio
                    checked={selectedName === partecipants[index]?.userName}
                    onChange={handleChange}
                    value={partecipants[index]?.idIntra}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                />
                }
                
            </ListItem>
        );
    }

    const closeX = {
        backgroundColor: 'white', color: 'red', marginLeft: '67%', fontSize: 13, border: '2px solid red', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'
    }

    function closeFunction() {
        props.closeStatus();
        setSelectedName('');
    }

    

    return (
        <Dialog open={props.status} onClose={props.closeStatus}>
            <DialogTitle>Admin Actions<button style={closeX} onClick={closeFunction}>X</button> </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    You are {props.user}
                </DialogContentText>
                <FixedSizeList
                    style={{ marginTop: 20 }}
                    height={partecipants?.length > 9 ? 450 : partecipants?.length * 70}
                    width={500}
                    itemSize={60}
                    itemCount={partecipants?.length}
                    overscanCount={5}
                >
                    {renderGroupRowAdmin}
                </FixedSizeList>
                <DialogActions>
                    {selectedName === '' ?
                        <>
                            <Button variant="outlined" onClick={props.closeStatus} style={{ border: '2px solid green', color: 'green' }}>Add User</Button>
                            <Button variant="outlined" onClick={props.closeStatus}>Muted</Button>
                            <Button variant="outlined" onClick={props.closeStatus}>Banned</Button>
                            <Button variant="outlined" onClick={leaveChannel} style={{ border: '2px solid red', color: 'red' }}>Leave</Button>
                        </> :
                        <>
                            <Button variant="outlined" onClick={props.closeStatus} style={{ border: '2px solid green', color: 'green' }}>Promote</Button>
                            <Button variant="outlined" onClick={props.closeStatus}>Mute</Button>
                            <Button variant="outlined" onClick={props.closeStatus}>Ban</Button>
                            <Button variant="outlined" onClick={kick}>Kick</Button>
                        </>}
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

//<Button variant="outlined" onClick={props.closeStatus}>Promote</Button>
//<Button variant="outlined" onClick={props.closeStatus}>Demote</Button>