import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Typography from '@mui/material/Typography';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

export const TwofaOn = (props: any) => {

//   async function acceptInvite(index: any)
//   {
//     const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/acceptInvite`;
//     const idIntra = await invited[index]?.idIntra;

//     const fetchData = async () => {
//       try {
//         const response = await fetch(url, {
//           method: 'POST',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             idIntra: idIntra,
//           })
//         });
//         //const json = await response.json();
//         //console.log(json);
//         window.location.reload();
//         // setInvited(json);
//         //console.log(json.friends)
//       } catch (error) {
//         console.log("error", error);
//       }
//     };
//     fetchData();
//   }
  console.log('cia')
  return (
    <Dialog open={props.status} onClose={props.closeStatus}>
            <DialogTitle>2FA</DialogTitle>
            <DialogContent>
                
            </DialogContent>
        </Dialog>
  );
}
