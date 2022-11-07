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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PropaneSharp } from '@mui/icons-material';
import NativeSelect from '@mui/material/NativeSelect';

export const AdminSettings = (props: any) => {
    const [type, setType] = useState(props.channel.type)
    const pass = useRef<any>('');
    const handleChangePass = (e: { target: { value: React.SetStateAction<string>; }; }) => setType(e.target.value)
    return (
        <>
            <Dialog open={props.status} onClose={props.closeStatus}>
                <DialogTitle>Change settings</DialogTitle>
                <DialogContent>
                    <DialogContentText paddingTop={"10px"}>
                        Change channel's visibility:
                    </DialogContentText>
                    <NativeSelect
                        defaultValue={props.channel.type === "protected" ? "Protected" : props.channel.type === "public" ? "Public" : "Private"}
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
                    {type === "Protected" ? <>
                        <DialogContentText paddingTop={'10px'}>
                            Change password:
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.closeStatus}>Cancel</Button>
                    <Button onClick={props.closeStatus}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}