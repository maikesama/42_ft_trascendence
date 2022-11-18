
import React, { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "../css/Message.css";
import Typography from '@material-ui/core/Typography';
import DialogActions from '@mui/material/DialogActions/DialogActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export const manageError = (data: any, response: any, success:any, error:any) => {
    if ((data !== undefined && data !== null && data.statusCode  && data.statusCode !== 200 && data.statusCode !== 201)
         || (response !== undefined && response !== null && response.status && response.status !== 200 && response.status !== 201)){
        console.log("error", data);
        console.log("error2", response);
        let message = "Error";
        if (data !== undefined && data !== null && data.message)
            message = data.message;
        else
            message = response.statusText;

        if (error)
            error(message);
    }
    else
    {
        if (success)
            success(true);
    }

  }

export const Alert = (props: any) => {

    return (
        <>
            <Dialog open={props.status} onClose={props.closeStatus}>
            <div style={{backgroundColor: '#bc3945' , border: '2px solid #f5c6cb', color: 'white'}}>
            <DialogTitle style={{textAlign: 'center', fontSize: 24}}>Errore!</DialogTitle>
            <DialogContent >
                <Typography variant="h6" color="initial">L'errore é stato il seguente:</Typography>
                <Typography variant="h6" color="initial">{props.error}</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" onClick={props.closeStatus}>Ok</Button>
            </DialogActions>
            </div>
        </Dialog>
        </>
    );
}

export const Notify = (props: any) => {
    return (
        <Alert action={
            <>
            <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            // onClick={() => {
            //   setOpen(false);
            // }}
          >
            <CheckIcon fontSize="inherit" />
          </IconButton>

          <IconButton
              aria-label="close"
              color="inherit"
              size="small"
            //   onClick={() => {
            //     setOpen(false);
            //   }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </>
          }
          sx={{ mb: 2 }}
         style={{position: 'absolute', width: 500, right: 5, top: 185}} severity="info">This is a warning alert — check it out!</Alert>
    );
}


