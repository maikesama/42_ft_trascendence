import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const UserActions = (props: any) => {

    return(
    <Dialog open={props.status} onClose={props.closeStatus}>
        <DialogTitle>User Actions</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Do you want to block the user?
            </DialogContentText>
            <DialogActions>
                <Button variant="outlined" onClick={props.closeStatus}>Block</Button>
                <Button variant="contained" onClick={props.closeStatus}>Close</Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
    );
}