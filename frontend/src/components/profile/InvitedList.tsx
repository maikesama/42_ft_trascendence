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
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { socket } from '../../App';

export const InvitedList = (props: any) => {

  const [invited, setInvited] = useState({} as any);
  const isSecondRender = useRef(false);

  useEffect(() => {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/getInvite`;

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
        setInvited(json);
        // setInvited(json);
        
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    if (isSecondRender.current) {
      socket.off('friendHandler').on('friendHandler', (data: any) => {
        fetchData();
      });
  }
  isSecondRender.current = true;
  }, []);


  async function acceptInvite(index: any)
  {
    const idIntra = await invited[index]?.idIntra;
    const fetchData = async () => {
      console.log(idIntra);
        socket.emit('acceptFriend', {idIntra: idIntra});
        setInvited(invited.filter((_: any, i: any) => i !== index));
    };

    fetchData();
  }

  async function declineInvite(index: any)
  {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/declineInvite`;
    const idIntra = await invited[index]?.idIntra;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idIntra: idIntra,
          })
        });
        //const json = await response.json();
        
        if (response.status === 200){
          socket.emit("friendHandler", {idIntra: idIntra, type: 3});
         }
        // setInvited(json);
        
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }

  function renderInvitesRow(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem style={style} key={index} >
        <Avatar src={invited[index]?.img} />
        <ListItemText id="idIntraInvite" primary={invited[index]?.idIntra} />
        <Divider variant="middle" />
        <IconButton aria-label="acceptInvite" size="small" style={{ color: 'green' }} onClick={() => acceptInvite(index)}><CheckCircleOutlinedIcon fontSize="large" /></IconButton>
        <IconButton aria-label="declineInvite" size="small" style={{ color: 'red' }} onClick={() => declineInvite(index)}><CancelOutlinedIcon fontSize="large" /></IconButton>
      </ListItem>
    );
  }

  return (
    <Dialog open={props.status} onClose={props.closeStatus}>
      <DialogTitle textAlign="center">Invited Users</DialogTitle>
      <DialogContent>
        <div style={{ textAlignLast: 'center', border: '2px solid lightgrey', borderRadius: '3%', marginTop: '7px' }}>
          <FixedSizeList
            height={400}
            width={400}
            itemSize={80}
            itemCount={Object.values(invited).length} /*Qui deve essere restituito il numero di bloccati nella lista*/
            overscanCount={5}
          >
            {renderInvitesRow}
          </FixedSizeList>
        </div>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={props.closeStatus}>Close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
