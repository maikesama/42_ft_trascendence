{/* <div style={{position: 'absolute', marginTop: '-25%', marginLeft: '30%'}} class="alert alert-primary" role="alert">
  This is a primary alert—check it out!
</div>
            <Alert severity="error" style={{position: "fixed", width: '30%', justifyContent: 'center', alignItems: 'center', marginLeft: '35%', marginTop: '15%'}}>This is an error alert — check it out!</Alert> */}


import React, { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "../css/Message.css";
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button/Button';
import DialogActions from '@mui/material/DialogActions/DialogActions';


export const Alert = (props: any) => {

    return (
        <>
            <Dialog open={props.status} onClose={props.closeStatus}>
            <div style={{backgroundColor: '#bc3945' , border: '2px solid #f5c6cb', color: 'white'}}>
            <DialogTitle style={{textAlign: 'center', fontSize: 24}}>Errore!</DialogTitle>
            <DialogContent >
                <Typography variant="h6" color="initial">L'errore é stato il seguente:</Typography>
                <Typography variant="h6" color="initial">Connenction error{props.error}</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" onClick={props.closeStatus}>Ok</Button>
            </DialogActions>
            </div>
        </Dialog>
        </>
    );
}


