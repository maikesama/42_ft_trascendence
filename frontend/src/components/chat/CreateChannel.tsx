import React, { useState, useRef } from 'react';
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

export const CreateChannel = (props: any) => {
    
    const name = useRef<any>('');
    const [type, setType] = useState('Public');
    const pass = useRef<any>('');

    async function createChannel() {
        console.log(name.current.value);
        console.log(type.toLowerCase())
        console.log(pass.current.value);
        const url = `http://10.11.11.3:3333/chat/newChannel`;
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
                    pass: pass.current.value, }),
            });
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.log("error", error);
        }
    }

    // const [openCreateGroup, setopenCreateGroup] = React.useState(false);
    
    // const handleCloseCreateGroup = () => {
    //     setopenCreateGroup(false);
    // };

    const handleChangePass = (e: { target: { value: React.SetStateAction<string>; }; }) => setType(e.target.value)

    function renderRow(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} >
                <ListItemButton>
                    <ListItemText primary={`Item ${index + 1}`} />
                </ListItemButton>
            </ListItem>
        );
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
                <TextField className="friendBar" id="outlined-basic-email" label="Add a member" variant="outlined" fullWidth />
                <FixedSizeList

                    height={230}
                    width={500}
                    itemSize={46}
                    itemCount={10}
                    overscanCount={5}
                >
                    {renderRow}
                </FixedSizeList>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeStatus}>Cancel</Button>
                <Button onClick={createChannel}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}