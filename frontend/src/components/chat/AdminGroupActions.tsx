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
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import SettingsIcon from '@mui/icons-material/Settings';


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

    const handleChange = (event: any) => {
        if (event.target.value === selectedName)
            setSelectedName('');
        else
            setSelectedName(event.target.value);

        const user = partecipants.find((user: any) => user.idIntra === event.target.value);

        if (user) {
            setSelectedNamePower(user.admin ? 'admin' : 'user');
        }
    };

    async function searchUser() {
        const url = `http://localhost:3333/chat/searchUserToAdd`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ initials: initials.current.value, name: props.channelName }),
            });
            const json = await response.json();
            console.log(json);
            setSearch(json);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function leaveChannel() {
        const url = `http://localhost:3333/chat/leaveChannel`;
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
        const url = `http://localhost:3333/chat/removeUser`;
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

    async function addUsers() {
        const url = `http://localhost:3333/chat/addUser`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: props.channelName, idIntra: userGroup }),
            })
            window.location.reload();
        } catch (error) {
            console.log("error", error);
        }

    }

    async function ban() {
        const url = `http://localhost:3333/chat/banUser`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: props.channelName, idIntra: selectedName, time: bantime.current.value }),
            })
            window.location.reload();
        } catch (error) {
            console.log("error", error);
        }

    }

    async function mute() {
        const url = `http://localhost:3333/chat/muteUser`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: props.channelName, idIntra: selectedName, time: mutetime.current.value }),
            })
            window.location.reload();
        } catch (error) {
            console.log("error", error);
        }

    }

    async function getBanned() {
        const url = `http://localhost:3333/chat/getBanned`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: props.channelName }),
            })

            const data = await response.json();
            console.log(data)
            setBanned(data);
        } catch (error) {
            console.log("error", error);
        }

    }

    async function getMuted() {
        const url = `http://localhost:3333/chat/getMuted`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: props.channelName }),
            })
            const data = await response.json();
            console.log(data)
            setMuted(data);
        } catch (error) {
            console.log("error", error);
        }

    }

    async function getAdmin() {
        const url = `http://localhost:3333/chat/getAdmin`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: props.channelName }),
            })
            const data = await response.json();
            console.log(data)
            setPromoted(data);
        } catch (error) {
            console.log("error", error);
        }

    }

    async function unBan(index: any) {
        const idIntra = await banned[index]?.idIntra;
        const url = `http://localhost:3333/chat/unbanUser`;
    
        try {
          const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: props.channelName, idIntra: idIntra }),
          });
          window.location.reload();
        } catch (error) {
          console.log("error", error);
        }
      }

      async function unMute(index: any) {
        const idIntra = await muted[index]?.idIntra;
        const url = `http://localhost:3333/chat/unmuteUser`;
    
        try {
          const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: props.channelName, idIntra: idIntra }),
          });
          window.location.reload();
        } catch (error) {
          console.log("error", error);
        }
      }

      async function promote(index: any) {
        const idIntra = await muted[index]?.idIntra;
        const url = `http://localhost:3333/chat/addAdmin`;
    
        try {
          const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: props.channelName, idIntra: selectedName }),
          });
          window.location.reload();
        } catch (error) {
          console.log("error", error);
        }
      }

      async function demote(index: any) {
        const idIntra = await promoted[index]?.idIntra;
        const url = `http://localhost:3333/chat/removeAdmin`;
    
        try {
          const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: props.channelName, idIntra: idIntra }),
          });
          window.location.reload();
        } catch (error) {
          console.log("error", error);
        }
      }

    useEffect(() => {
        const url = "http://localhost:3333/user/me";

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

        let isMuted = partecipants[index]?.muted ? " [ muted ]" : "";
        //let ci = partecipants[index]?.mutedUntil > Date.now() ? <VolumeOffIcon /> : <></>;
        return (
            <ListItem style={style} key={index} >
                <Avatar alt={partecipants[index]?.userName} src={partecipants[index]?.img} />
                <Divider variant='middle' />
                <ListItemText primary={partecipants[index]?.userName} secondary={partecipants[index]?.owner === true ? `Owner` : partecipants[index]?.admin === true ? `Admin` : `User ${isMuted}`} />
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
        const { index, style} = props;

        let isMuted = muted[index]?.muted ? " [ muted ]" : "";
        //let ci = muted[index]?.mutedUntil > Date.now() ? <VolumeOffIcon /> : <></>;
        return (
            <ListItem style={style} key={index} >
                <Avatar src={banned[index]?.img} style={{marginRight: 10}}/>
                <ListItemText id="idIntraBlock" primary={banned[index]?.idIntra} />
                <Divider variant="middle" />
                <IconButton aria-label="unMute" size="small" style={{ color: 'green' }} ><HowToRegOutlinedIcon onClick={() => unBan(index)} fontSize="large" /></IconButton>
            </ListItem>
        );
    }

    function MutedUserItem(props: any) {
        const { index, style} = props;

        let isMuted = muted[index]?.muted ? " [ muted ]" : "";
        //let ci = muted[index]?.mutedUntil > Date.now() ? <VolumeOffIcon /> : <></>;
        return (
            <ListItem style={style} key={index} >
                <Avatar src={muted[index]?.img} style={{marginRight: 10}}/>
                <ListItemText id="idIntraBlock" primary={muted[index]?.idIntra} />
                <Divider variant="middle" />
                <IconButton aria-label="unMute" size="small" style={{ color: 'green' }} ><HowToRegOutlinedIcon onClick={() => unMute(index)} fontSize="large" /></IconButton>
            </ListItem>
        );
    }

    function PromotedUserItem(props: any) {
        const { index, style} = props;
        console.log('promoted', promoted);
        let isMuted = promoted[index]?.muted ? " [ muted ]" : "";
        //let ci = muted[index]?.mutedUntil > Date.now() ? <VolumeOffIcon /> : <></>;
        return (
            <ListItem style={style} key={index} >
                <Avatar src={promoted[index]?.img} style={{marginRight: 10}}/>
                <ListItemText id="idIntraBlock" primary={promoted[index]?.idIntra} />
                <Divider variant="middle" />
                <IconButton aria-label="Demote" size="small" style={{ color: 'green' }} ><HowToRegOutlinedIcon onClick={() => demote(index)} fontSize="large" /></IconButton>
            </ListItem>
        );
    }

    const closeX = {
        backgroundColor: 'white', color: 'red', marginLeft: '67%', fontSize: 13, border: '2px solid red', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer'
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
        console.log('newGroup', newGroup);
    };

    function searchRow(props: ListChildComponentProps) {
        const { index, style } = props;
        console.log('search', search);
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
        <Dialog open={props.status} onClose={props.closeStatus}>
            <DialogTitle>Admin Actions<button style={closeX} onClick={closeFunction}>X</button> </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    You are {props.user}
                </DialogContentText>
                {clickLists === "" ? <>
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
                </> : clickLists === "BannedList" ? <>
                <DialogContentText>
                    Banned List
                </DialogContentText>
                <FixedSizeList
                    style={{ marginTop: 20 }}
                    height={banned?.length > 9 ? 450 : banned?.length * 70}
                    width={500}
                    itemSize={60}
                    itemCount={banned?.length}
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
                    height={muted?.length > 9 ? 450 : muted?.length * 70}
                    width={500}
                    itemSize={60}
                    itemCount={muted?.length}
                    overscanCount={5}
                >
                    {MutedUserItem}
                </FixedSizeList>
                </> : clickLists === "AddUser" ? <>
                <DialogContentText paddingTop={"10px"} paddingBottom={"5px"}>
                    Add members to your channel group:
                </DialogContentText>
                <TextField className="friendBar" id="outlined-basic-email" label="Add a member" variant="outlined" fullWidth inputRef={initials} onChange={searchUser}/>
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
                <Typography>Quanti minuti vuoi bannarlo?</Typography>
                <TextField style={{width:250}} inputRef={bantime} type="number" InputProps={{inputProps: { max: 100, min: 10 }}} label="Minutes"/>
                <Button variant="outlined" onClick={() => setBanButton(false)}><CancelOutlinedIcon fontSize="large" /></Button>
                <Button variant="outlined" onClick={ban}><CheckCircleOutlinedIcon fontSize="large" /></Button>
                </> : 
                muteButton ? <>
                <Typography>Quanti minuti vuoi mutarlo?</Typography>
                <TextField style={{width:250}} inputRef={mutetime} type="number" InputProps={{inputProps: { max: 100, min: 10 }}} label="Minutes"/>
                <Button variant="outlined" onClick={() => setMuteButton(false)}><CancelOutlinedIcon fontSize="large" /></Button>
                <Button variant="outlined" onClick={mute}><CheckCircleOutlinedIcon fontSize="large" /></Button>
                </> :
                <>
                <DialogActions>
                    {selectedName === '' && clickLists === '' ?
                        <>
                            <Button variant="outlined" onClick={() => Lists("AddUser")} style={{ border: '2px solid green', color: 'green' }}>Add User</Button>
                            <Button variant="outlined" onClick={() => Lists("PromotedList")}>Promoted</Button>
                            <Button variant="outlined" onClick={() => Lists("MutedList")}>Muted</Button>
                            <Button variant="outlined" onClick={() => Lists("BannedList")}>Banned</Button>
                            <Button variant="outlined" onClick={leaveChannel} style={{ border: '2px solid red', color: 'red' }}>Leave</Button>
                        </> : clickLists === '' ?
                        <>
                            <Button variant="outlined" /*onClick={() => window.location.replace("/profile/" + selectedName)}*/ style={{ border: '2px solid green', color: 'green' }}>Visit</Button>
                            {selectedNamePower === "user" ?  <>

                            <Button variant="outlined" onClick={promote} style={{ border: '2px solid green', color: 'green' }}>Promote</Button>
                            
                            </>: null}
                            <Button variant="outlined" onClick={() => setMuteButton(true)}>Mute</Button>
                            <Button variant="outlined" onClick={() => setBanButton(true)}>Ban</Button>
                            <Button variant="outlined" onClick={kick}>Kick</Button>
                        </> : clickLists === "AddUser" ?
                        <>
                            <Button variant="outlined" onClick={addUsers} style={{ border: '2px solid green', color: 'green' }}>Add</Button>
                            <Button variant="outlined" onClick={back} style={{ border: '2px solid green', color: 'green' }}>Back</Button>
                        </> 
                        : clickLists !== "" ?
                        <>
                            <Button variant="outlined" onClick={back} style={{ border: '2px solid green', color: 'green' }}>Back</Button>
                        </> 
                        : null}

                </DialogActions>
                </>}
            </DialogContent>
        </Dialog>
    );
}

//<Button variant="outlined" onClick={props.closeStatus}>Promote</Button>
//<Button variant="outlined" onClick={props.closeStatus}>Demote</Button>