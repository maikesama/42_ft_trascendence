import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { socket } from '../../App';

export const BlockedList = (props: any) => {

  const [blocked, setBlocked] = useState({} as any);
  useEffect(() => {
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/getBlocked`;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const json = await response.json();
        
        setBlocked(json);
        //window.location.reload();
        
      } catch (error) {
        
      }
    };

    fetchData();
          socket.off('blockUser2').on('blockUser2', (data: any) => {
            fetchData();
          });
          socket.off('unBlockUser2').on('unBlockUser2', (data: any) => {
            fetchData();
          });
  }, []);

  async function unblock(index: any) {
    const idIntra = await blocked[index]?.idIntra;
    const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/unblock/${idIntra}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      
      if (response.status === 201) {
        // setAlert("User unblocked");
        // setIsBlocked(false);
        socket.emit("unBlockUser", {idIntra: idIntra});
        setBlocked(blocked.filter((_: any, i: any) => i !== index));
      }

    } catch (error) {
      
    }
  }

  function renderBlockedRow(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem style={style} key={index} >
        <Avatar src={blocked[index]?.img} />
        <ListItemText id="idIntraBlock" primary={blocked[index]?.userName} />
        <Divider variant="middle" />
        <IconButton aria-label="unblock" size="small" style={{ color: 'green' }} onClick={() => unblock(index)}><HowToRegOutlinedIcon fontSize="large" /></IconButton>
      </ListItem>
    );
  }

  return (
    <Dialog open={props.status} onClose={props.closeStatus}>
      <DialogTitle textAlign="center">Blocked Users</DialogTitle>
      <DialogContent>
        <div style={{ textAlignLast: 'center', border: '2px solid lightgrey', borderRadius: '3%', marginTop: '7px' }}>
          <FixedSizeList
            height={400}
            width={400}
            itemSize={80}
            itemCount={Object.values(blocked).length} /*Qui deve essere restituito il numero di bloccati nella lista*/
            overscanCount={5}
          >
            {renderBlockedRow}
          </FixedSizeList>
        </div>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={props.closeStatus}>Close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
