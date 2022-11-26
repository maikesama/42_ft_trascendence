import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

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
  
  //         window.location.reload();
  //         // setInvited(json);
  
  //       } catch (error) {
  
  //       }
  //     };
  //     fetchData();
  //   }
  let code = useRef<any>('');

  async function verifyCode() {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/auth/2fa/turn-on`;


    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            totp: code.current.value,
          })
        });
        const json = await response.json();
        
        window.location.reload();
        // setInvited(json);
        
      } catch (error) {
        
      }
    };
    fetchData();
  }
  
  return (
    <Dialog open={props.status} onClose={props.closeStatus}>
        <DialogTitle style={{fontSize: 18}}>Use Google Authenticator</DialogTitle>
        <DialogTitle><img style={{width: '100%'}} src={props.qr?.QRcode} /></DialogTitle>
        <DialogContent>
          <TextField style={{width: '100%'}} placeholder='insert code' variant='standard' inputRef={code} />
        </DialogContent>
        <DialogContent >
          <Button style={{width: '50%'}} variant="outlined" onClick={props.closeStatus}>Cancel</Button>
          <Button style={{width: '50%'}} variant="contained" onClick={verifyCode}>Submit</Button>
        </DialogContent>
    </Dialog>
  );
}
