import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';

export const AdminSettings = (props: any) => {
    

    const [type, setType] = useState(props.type)
    const [realType, setRealType] = useState(props.type)
    const [id, setId] = useState(props.idChat)
    
    const pass = useRef<any>('');
    const handleChangeType = (e: { target: { value: React.SetStateAction<string>; }; }) => {setType(e.target.value)}
    useEffect(() => {
        if (realType !== props.type || id !== props.idChat)
        {
            setType(props.type);
            setRealType(props.type)
            setId(props.idChat)
        }
    }, [props.type]);
    
    function handleCancel()
    {
        setRealType(undefined);
        props.closeStatus();
    }
    
    async function changeSettings() {
        let pwd = "";
        
        if (realType === "protected" && type !== "protected")
        pwd = ""
        else
        pwd = pass.current.value;
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/changeVisibility`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: props.idChat, type: type, password: pwd})
            });
            //const json = await response.json();
            
            window.location.reload();
        } catch (error) {
            
        }
    }
    
    return (
        <>
            <Dialog open={props.status} onClose={props.closeStatus}>
                <DialogTitle>Change settings</DialogTitle>
                <DialogContent>
                    <DialogContentText paddingTop={"10px"}>
                        Change channel's visibility:
                    </DialogContentText>
                    <NativeSelect
                        id="selectType"
                        defaultValue={props.type === "protected" ? "protected" : props.type === "public" ? "public" : props.type === "private" ? "private" : "private"}
                        inputProps={{
                            name: 'visibility',
                            id: 'uncontrolled-native',
                        }}
                        onChange={handleChangeType}
                    >
                        <option value={"public"}>Public</option>
                        <option value={"private"}>Private</option>
                        <option value={"protected"}>Protected</option>
                    </NativeSelect>
                    { type === "protected" ? <>
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
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={changeSettings}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}