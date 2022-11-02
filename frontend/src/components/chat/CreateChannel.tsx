import React, { useState, useRef, useEffect } from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { FriendsCheckList } from './FriendsCheckList';

export const CreateChannel = (props: any) => {

    const name = useRef<any>('');
    const pass = useRef<any>('');
    const [type, setType] = useState('Public');

    async function createChannel() {
        let pwd = "";

        if (pass.current.value)
            pwd = pass.current.value;
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/newChannel`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.current.value,
                    type: type.toLowerCase(),
                    password: pwd,
                    partecipants: userGroup
                }),
            });
            window.location.reload()
            //const json = await response.json();
            //console.log(json);
        } catch (error) {
            console.log("error", error);
        }
    }

    const [friends, setFriends] = useState({} as any);

    React.useEffect(() => {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/getFriends`;

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
            setFriends(json);
        } catch (error) {
            console.log("error", error);
        }
        };
        fetchData();
    }, []);


    const handleChangePass = (e: { target: { value: React.SetStateAction<string>; }; }) => setType(e.target.value)

    const [userGroup, setUserGroup] = React.useState([] as any);

    const handleToggle = (index: number, init: boolean) => () => {
        let value;

        if (!init)
            value = friends[index]?.idIntra;
        else
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

    function friendsRow(props: ListChildComponentProps) {
        const { index, style } = props;
        return (
            <ListItem key={index}>

                <ListItemButton role={undefined} onClick={handleToggle(index, false)} dense style={{ minWidth: '100%' }}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={userGroup.find((e: string) => e === friends[index]?.idIntra) !== undefined}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': '1' }}
                        />
                    </ListItemIcon>
                    <Avatar src={friends[index]?.img} style={{ marginRight: 20 }} />
                    <ListItemText id={`${index}`} primary={`${friends[index]?.idIntra} `} />

                </ListItemButton>
            </ListItem>
        );
    }

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

    const [search, setSearch] = useState({} as any);
    const initials = useRef<any>('');

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
            console.log(json);
            setSearch(json);
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <Dialog open={props.status} onClose={props.closeStatus}>
            <DialogTitle>Create Group</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To create a new group chat, please enter the name of the channel here:
                </DialogContentText>
                <TextField
                    inputRef={name}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Group Name"
                    fullWidth
                    variant="standard"
                    required
                />
                <DialogContentText paddingTop={"10px"}>
                    Choose the channel's visibility:
                </DialogContentText>
                <NativeSelect
                    defaultValue={"Public"}
                    inputProps={{
                        name: 'visibility',
                        id: 'uncontrolled-native',
                    }}
                    onChange={handleChangePass}
                >
                    <option value={"Public"}>Public</option>
                    <option value={"Private"}>Private</option>
                    <option value={"Protected"}>Protected</option>
                </NativeSelect>
                {type === 'Protected' ? <>
                    <DialogContentText paddingTop={'10px'}>
                        Input password:
                    </DialogContentText>
                    <TextField
                        inputRef={pass}
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        fullWidth
                        variant="standard"
                        required
                    />
                </>
                    : <></>}
                <DialogContentText paddingTop={"10px"} paddingBottom={"5px"}>
                    Add members to your channel group:
                </DialogContentText>
                <TextField className="friendBar" id="outlined-basic-email" label="Add a member" variant="outlined" fullWidth inputRef={initials} onChange={searchUser}/>
                {initials.current.value == 0 || initials.current.value == null ? <>
                <FixedSizeList

                    height={Object.values(friends).length * 90}
                    width={500}
                    itemSize={60}
                    itemCount={Object.values(friends).length}
                    overscanCount={5}
                >
                    {friendsRow}
                </FixedSizeList></> : <>
                <FixedSizeList

                    height={Object.values(friends).length * 90}
                    width={500}
                    itemSize={46}
                    itemCount={Object.values(search).length}
                    overscanCount={5}
                >
                    {searchRow}
                </FixedSizeList>

                </>}
            </DialogContent>

            <DialogActions>
                <Button onClick={props.closeStatus}>Cancel</Button>
                <Button onClick={createChannel}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}
