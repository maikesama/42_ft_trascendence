import React, { useState, useEffect, useRef } from 'react';
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
// import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
// import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import SettingsIcon from '@mui/icons-material/Settings';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdminSettings } from './AdminSettings';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Alert, manageError } from '../generic/Alert';
import { socket } from '../../App';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';


export const AdminGroupActions = (props: any) => {

    const partecipants = props.partecipants;
    const bantime = useRef<any>('');
    const mutetime = useRef<any>('');
    const [selectedName, setSelectedName] = React.useState('');
    const [selectedNamePower, setSelectedNamePower] = React.useState('');
    const [searchView, setSearchView] = useState('');
    const [mySelf, setMySelf] = useState({} as any);
    const [banned, setBanned] = useState({} as any);
    const [muted, setMuted] = useState({} as any);
    const [banButton, setBanButton] = useState(false);
    const [muteButton, setMuteButton] = useState(false);
    const [clickLists, setClickLists] = React.useState("");
    const [search, setSearch] = useState({} as any);
    const [userGroup, setUserGroup] = React.useState([] as any);
    const initials = useRef<any>('');
    const [promoted, setPromoted] = useState({} as any);
    const [openSettings, setOpenSettings] = React.useState(false);
    const [chan, setChan] = useState({} as any);
    const [alert, setAlert] = useState("");
    const { idIntra } = useAuth() ;

    const handleOpenSettings = () => {
        setOpenSettings(true);
    };

    const handleCloseSettings = (event:any, reason:any) => {
        if (reason && reason == "backdropClick")
            return;
        setOpenSettings(false);
    };

    const [idIntraUser, setIdIntraUser] = useState('');

    const handleChange = (event: any) => {
        if (event.target.value === selectedName)
            setSelectedName('');
        else {
            setSelectedName(event.target.value);

        }

        const user = partecipants.find((user: any) => user.idIntra === event.target.value);

        if (user) {
            setSelectedNamePower(user.admin ? 'admin' : 'user');
        }
    };

    async function searchUser() {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/searchUserToAdd`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ initials: initials.current.value, id: props.idChat }),
            });
            const json = await response.json();

            setSearch(json);
        } catch (error) {

        }
    }

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
            // const data = await response.json();



            manageError(null, response, null, setAlert);
            if (response.status === 200) {
                socket.emit('removeUser', { idChat: props.idChat, idIntra: idIntra});
            }
        } catch (error) {

        }

    }

    async function kick() {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/removeUser`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: props.idChat, idIntra: selectedName }),
            })
            //const data = await response.json();
            manageError(null, response, null, setAlert);
            if (response.status === 200) {
                socket.emit('removeUser', { idChat: props.idChat, idIntra: selectedName });
                props.setPartecipants(props.partecipants.filter((user: any) => user.idIntra !== selectedName));
                setSelectedName('');
            }

        } catch (error) {

        }

    }

    async function addUsers() {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/addUser`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: props.idChat, idIntra: userGroup }),
            })

            const data = await response.json();
            manageError(data, response, null, setAlert);

            //addUser dinamico da correggere
            if (response.status === 200) {
                socket.emit('addUser', { idChat: props.idChat, idIntra: userGroup });
                // props.setPartecipants(props.partecipants.concat(search.filter((user: any) => userGroup.includes(user.idIntra))));
                setSearch([]);
                setUserGroup([]);
                setSelectedName('');
                setClickLists('');
            }

        } catch (error) {

        }
        //window.location.reload();
    }

    async function ban() {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/banUser`;
        var data;
        if (bantime.current.value)
        {
            data = { id: props.idChat, idIntra: selectedName, time: bantime.current.value }
        }
        else
        {
            data = { id: props.idChat, idIntra: selectedName }
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const data2 = await response.json();
            manageError(data2, response, null, setAlert);
            if (response.status == 200)
            {
                setBanButton(false);
                setSelectedName('');
                // remove user from Partecipants
                props.setPartecipants(props.partecipants.filter((user: any) => user.idIntra !== selectedName));
                socket.emit('ban', { idIntra: selectedName, idChat: props.idChat, });
            }
        } catch (error) {

        }

    }

    async function mute() {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/muteUser`;
        var data;
        if (mutetime.current.value)
        {
            data = { id: props.idChat, idIntra: selectedName, time: mutetime.current.value }
        }
        else
        {
            data = { id: props.idChat, idIntra: selectedName }
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const data2 = await response.json();
            manageError(data2, response, null, setAlert);
            if (response.status == 200)
            {
                setMuteButton(false);
                setSelectedName('');
                // set partecipant muted partecipants[index]?.muted ? " [ muted ]" : ""
                props.setPartecipants(props.partecipants.map((user: any) => {
                    if (user.idIntra === selectedName)
                        user.muted = true;
                    return user;
                }));
                socket.emit('muteUser', { idIntra: selectedName, idChat: props.idChat, });
            }
        } catch (error) {

        }

    }

    async function getBanned() {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getBanned`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: props.idChat }),
            })

            const data = await response.json();

            setBanned(data);
        } catch (error) {

        }

    }

    async function getMuted() {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getMuted`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: props.idChat }),
            })
            const data = await response.json();

            setMuted(data);
        } catch (error) {

        }

    }

    async function getAdmin() {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getAdmin`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: props.idChat }),
            })
            const data = await response.json();

            setPromoted(data);
        } catch (error) {

        }

    }

    async function unBan(index: any) {
        const idIntra = await banned[index]?.idIntra;
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/unbanUser`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: props.idChat, idIntra: idIntra }),
            });
            // const data = await response.json();
            manageError(null, response, null, setAlert);
            if (response.status === 200)
            {
                setClickLists('');
                props.setPartecipants(partecipants.concat(banned[index]));
                socket.emit('unBan', { idIntra: idIntra, idChat: props.idChat, });
            }
        } catch (error) {

        }
    }

    async function unMute(index: any) {
        const idIntra = await muted[index]?.idIntra;
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/unmuteUser`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: props.idChat, idIntra: idIntra }),
            });
            //const data = await response.json();
            manageError(null, response, null, setAlert);
            if (response.status === 200)
            {
                setClickLists('');
                props.setPartecipants(props.partecipants.map((user: any) => {
                    if (user.idIntra === idIntra)
                        user.muted = false;
                    return user;
                }));
                socket.emit('unMuteUser', { idIntra: idIntra, idChat: props.idChat, });
            }
        } catch (error) {

        }
    }

    async function promote(index: any) {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/addAdmin`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: props.idChat, idIntra: selectedName }),
            });
            //const data = await response.json();
            manageError(null, response, null, setAlert);
            if (response.status === 200)
            {
                setClickLists('');
                setSelectedName('');
                props.setPartecipants(props.partecipants.map((user: any) => {
                    if (user.idIntra === selectedName)
                        user.admin = true;
                    return user;
                }));
                socket.emit('promoteUser', { idIntra: selectedName, idChat: props.idChat, });
            }
        } catch (error) {

        }
    }

    async function demote(index: any) {
        const idIntra = await promoted[index]?.idIntra;
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/removeAdmin`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: props.idChat, idIntra: idIntra }),
            });
            //const data = await response.json();
            manageError(null, response, null, setAlert);
            if (response.status === 200)
            {
                setClickLists('');
                setSelectedName('');
                props.setPartecipants(props.partecipants.map((user: any) => {
                    if (user.idIntra === idIntra)
                        user.admin = false;
                    return user;
                }));
                socket.emit('demoteUser', { idIntra: idIntra, idChat: props.idChat, });
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/me`;

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const json = await response.json();

                setMySelf(json);
            } catch (error) {

            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getChanInfo`;

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: props.idChat }),
                });
                const json = await response.json();

                setChan(json);
            } catch (error) {

            }
        };

        fetchData();
    }, []);

    function renderGroupRowAdmin(props: any) {
        const { index, style } = props;

        let isMuted = partecipants[index]?.muted ? " [ muted ]" : "";
        //let ci = partecipants[index]?.mutedUntil > Date.now() ? <VolumeOffIcon /> : <></>;
        return (
            <ListItem style={style} key={index} >
                <Avatar alt={partecipants[index]?.userName} src={partecipants[index]?.img} />
                <Divider variant='middle' />
                <ListItemText primary={partecipants[index]?.idIntra} secondary={partecipants[index]?.owner === true ? `Owner` : partecipants[index]?.admin === true ? `Admin` : `User ${isMuted}`} />
                <ListItemText primary={partecipants[index]?.userName} secondary="Username"/>
                <Divider />

                {partecipants[index]?.idIntra === mySelf.idIntra || partecipants[index]?.owner ? <>
                    <Radio
                        disabled
                        checked={selectedName === partecipants[index]?.idIntra}
                        onClick={handleChange}
                        value={partecipants[index]?.idIntra}
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                </> :
                    <Radio
                        checked={selectedName === partecipants[index]?.idIntra}
                        onClick={handleChange}
                        value={partecipants[index]?.idIntra}
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'A' }}
                    />
                }

            </ListItem>
        );
    }

    function BannedUserItem(props: any) {
        const { index, style } = props;

        let isMuted = muted[index]?.muted ? " [ muted ]" : "";
        //let ci = muted[index]?.mutedUntil > Date.now() ? <VolumeOffIcon /> : <></>;
        return (
            <ListItem style={style} key={index} >
                <Avatar src={banned[index]?.img} style={{ marginRight: 10 }} />
                <ListItemText id="idIntraBlock" primary={banned[index]?.idIntra} />
                <Divider variant="middle" />
                <IconButton aria-label="unMute" size="small" style={{ color: 'green' }} onClick={() => unBan(index)}><LockOpenIcon fontSize="large" /></IconButton>
            </ListItem>
        );
    }

    function MutedUserItem(props: any) {
        const { index, style } = props;

        let isMuted = muted[index]?.muted ? " [ muted ]" : "";
        //let ci = muted[index]?.mutedUntil > Date.now() ? <VolumeOffIcon /> : <></>;
        return (
            <ListItem style={style} key={index} >
                <Avatar src={muted[index]?.img} style={{ marginRight: 10 }} />
                <ListItemText id="idIntraBlock" primary={muted[index]?.idIntra} />
                <Divider variant="middle" />
                <IconButton aria-label="unMute" size="small" style={{ color: 'green' }}  onClick={() => unMute(index)}><VolumeUpIcon fontSize="large" /></IconButton>
            </ListItem>
        );
    }

    function PromotedUserItem(props: any) {
        const { index, style } = props;

        let isMuted = promoted[index]?.muted ? " [ muted ]" : "";
        //let ci = muted[index]?.mutedUntil > Date.now() ? <VolumeOffIcon /> : <></>;
        return (
            <ListItem style={style} key={index} >
                <Avatar src={promoted[index]?.img} style={{ marginRight: 10 }} />
                <ListItemText id="idIntraBlock" primary={promoted[index]?.idIntra} />
                <Divider variant="middle" />
                <IconButton aria-label="Demote" size="small" style={{ color: 'red' }} onClick={() => demote(index)}><PersonAddDisabledIcon fontSize="large" /></IconButton>
            </ListItem>
        );
    }

    const closeX = {
        backgroundColor: 'white', color: 'red', marginLeft: '50%', fontSize: 13, border: '2px solid red', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'
    }

    function closeFunction() {
        setClickLists("");
        setBanButton(false);
        props.closeStatus();
        setSelectedName('');
    }
    async function Lists(type: string) {
        setClickLists(type);
        if (type === "BannedList")
            await getBanned();
        else if (type === "MutedList")
            await getMuted();
        else if (type === "PromotedList")
            await getAdmin();
        else
            ;


    }

    function back() {
        setClickLists("");
        setBanButton(false);
        setMuteButton(false);
    }

    let navigate = useNavigate();

    const handleInvite = () => {
        socket.emit('notification', { type: 2, idIntra: selectedName });
        navigate('/games/1' + selectedName);
        // window.location.assign("/games/1" + props.idIntra);
    };

    const handleToggle = (index: number, init: boolean) => () => {
        let value;

        value = search[index]?.idIntra;
        const newGroup = [...userGroup];
        const exist = userGroup.includes(value);

        if (exist === false) {
            newGroup.push(value);
        } else {
            const index = newGroup.indexOf(value);
            newGroup.splice(index, 1);
        }
        setUserGroup(newGroup);

    };

    function searchRow(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <ListItem key={index}>

                <ListItemButton role={undefined} onClick={handleToggle(index, true)} dense style={{ minWidth: '100%' }}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={userGroup.find((e: string) => e === search[index]?.idIntra) !== undefined}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': '1' }}
                        />
                    </ListItemIcon>
                    <Avatar src={search[index]?.img} style={{ marginRight: 20 }} />
                    <ListItemText id={`${index}`} primary={`${search[index]?.idIntra} `} />

                </ListItemButton>
            </ListItem>
        );
    }

    return (
        <>
            <Dialog open={props.status}>
                <DialogTitle>Admin Actions<IconButton onClick={handleOpenSettings}><SettingsIcon /></IconButton><button style={closeX} onClick={closeFunction}>X</button> </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        You are {props.user}
                    </DialogContentText>
                    {clickLists === "" ? <>
                        <FixedSizeList
                            style={{ marginTop: 20 }}
                            height={partecipants?.length > 9 ? 450 : partecipants?.length <= 9 ? partecipants?.length * 70 : 70}
                            width={500}
                            itemSize={60}
                            itemCount={Object.values(partecipants).length}
                            overscanCount={5}
                        >

                            {renderGroupRowAdmin}
                        </FixedSizeList>
                    </> : clickLists === "BannedList" ? <>
                        <DialogContentText>
                            Banned List
                        </DialogContentText>
                        <FixedSizeList
                            style={{ marginTop: 20 }}
                            height={banned?.length > 9 ? 450 : banned?.length <= 9 ? banned?.length * 70 : 70}
                            width={500}
                            itemSize={60}
                            itemCount={Object.values(banned).length}
                            overscanCount={5}
                        >
                            {BannedUserItem}
                        </FixedSizeList>
                    </> : clickLists === "MutedList" ? <>
                        <DialogContentText>
                            Muted List
                        </DialogContentText>
                        <FixedSizeList
                            style={{ marginTop: 20 }}
                            height={muted?.length > 9 ? 450 : muted?.length <= 9 ? muted?.length * 70 : 70}
                            width={500}
                            itemSize={60}
                            itemCount={Object.values(muted).length}
                            overscanCount={5}
                        >
                            {MutedUserItem}
                        </FixedSizeList>
                    </> : clickLists === "AddUser" ? <>
                        <DialogContentText paddingTop={"10px"} paddingBottom={"5px"}>
                            Add members to your channel group:
                        </DialogContentText>
                        <TextField className="friendBar" id="outlined-basic-email" label="Add a member" fullWidth inputRef={initials} onChange={searchUser} />
                        <FixedSizeList
                            height={230}
                            width={500}
                            itemSize={46}
                            itemCount={Object.values(search).length}
                            overscanCount={5}
                        >
                            {searchRow}
                        </FixedSizeList>
                    </> : clickLists === "PromotedList" ? <>
                        <DialogContentText paddingTop={"10px"} paddingBottom={"5px"}>
                            Promoted List
                        </DialogContentText>
                        <FixedSizeList
                            height={230}
                            width={500}
                            itemSize={46}
                            itemCount={Object.values(promoted).length}
                            overscanCount={5}
                        >
                            {PromotedUserItem}
                        </FixedSizeList>
                    </> : null}
                    {banButton ? <>
                        <Typography>How many minutes would you like to ban him/her?</Typography>
                        <TextField style={{ width: 250 }} inputRef={bantime} type="number" InputProps={{ inputProps: { max: 100, min: 10 } }} label="Minutes" />
                        <Button onClick={() => setBanButton(false)}><CancelOutlinedIcon fontSize="large" /></Button>
                        <Button onClick={ban}><CheckCircleOutlinedIcon fontSize="large" /></Button>
                    </> :
                        muteButton ? <>
                            <Typography>How many minutes would you like to mute him/her?</Typography>
                            <TextField style={{ width: 250 }} inputRef={mutetime} type="number" InputProps={{ inputProps: { max: 100, min: 10 } }} label="Minutes" />
                            <Button onClick={() => setMuteButton(false)}><CancelOutlinedIcon fontSize="large" /></Button>
                            <Button onClick={mute}><CheckCircleOutlinedIcon fontSize="large" /></Button>
                        </> :
                            <>
                                <DialogActions>
                                    {selectedName === '' && clickLists === '' ?
                                        <>
                                            <Button onClick={() => Lists("AddUser")} style={{ padding: 5, border: '2px solid green', color: 'green', borderRadius: 5 }}>Add User</Button>
                                            <Button onClick={() => Lists("PromotedList")} style={{ padding: 5, border: '2px solid black', color: 'black', borderRadius: 5 }}>Promoted</Button>
                                            <Button onClick={() => Lists("MutedList")} style={{ padding: 5, border: '2px solid black', color: 'black', borderRadius: 5 }}>Muted</Button>
                                            <Button onClick={() => Lists("BannedList")} style={{ padding: 5, border: '2px solid black', color: 'black', borderRadius: 5 }}>Banned</Button>
                                            <Button onClick={leaveChannel} style={{ padding: 5, border: '2px solid red', color: 'red', borderRadius: 5 }}>Leave</Button>

                                        </> : clickLists === '' ?
                                            <>
                                                <Button onClick={handleInvite} style={{ padding: 5, border: '2px solid purple', color: 'purple', borderRadius: 5, right: 7 }}>Gioca</Button>
                                                <Link key={`/Profile/other`} component={RouterLink} to={`/Profile/${selectedName}`} underline="none" color="inherit" >
                                                    <Button /*onClick={() => window.location.replace("/profile/" + selectedName)}*/ style={{ padding: 5, border: '2px solid green', color: 'green', borderRadius: 5}}>Visit</Button>
                                                </Link>
                                                {selectedNamePower === "user" ? <>

                                                    <Button onClick={promote} style={{ padding: 5, border: '2px solid green', color: 'green', borderRadius: 5}}>Promote</Button>

                                                </> : null}
                                                <Button onClick={() => setMuteButton(true)} style={{ padding: 5, border: '2px solid blue', color: 'blue', borderRadius: 5}}>Mute</Button>
                                                <Button onClick={() => setBanButton(true)} style={{ padding: 5, border: '2px solid blue', color: 'blue', borderRadius: 5}}>Ban</Button>
                                                <Button onClick={kick} style={{ padding: 5, border: '2px solid blue', color: 'blue', borderRadius: 5}}>Kick</Button>
                                            </> : clickLists === "AddUser" ?
                                                <>
                                                    <Button onClick={addUsers} style={{ padding: 5, border: '2px solid green', color: 'green', borderRadius: 5}}>Add</Button>
                                                    <Button onClick={back} style={{ padding: 5, border: '2px solid green', color: 'green', borderRadius: 5}}>Back</Button>
                                                </>
                                                : clickLists !== "" ?
                                                    <>
                                                        <Button onClick={back} style={{ padding: 5, border: '2px solid green', color: 'green', borderRadius: 5}}>Back</Button>
                                                    </>
                                                    : null}

                                </DialogActions>
                            </>}
                </DialogContent>
            </Dialog>
            <AdminSettings status={openSettings} closeStatus={handleCloseSettings} channel={chan} type={props.type} idChat={props.idChat}/>
            <Alert status={alert != "" ? true : false} closeStatus={() => setAlert("")} error={alert} />
        </>
    );
}

//<Button onClick={props.closeStatus}>Promote</Button>
//<Button onClick={props.closeStatus}>Demote</Button>
