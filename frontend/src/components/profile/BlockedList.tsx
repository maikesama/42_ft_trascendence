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
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';

export const BlockedList = (props: any) => {

  const [blocked, setBlocked] = useState({} as any);

  useEffect(() => {
    const url = `http://10.11.11.3:3333/user/getBlocked`;

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
        setBlocked(json);
        //window.location.reload();
        //console.log(json.friends)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  async function unblock(index: any) {
    const idIntra = await blocked[index]?.idIntra;
    const url = `http://10.11.11.3:3333/user/unblock/${idIntra}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  }

  function renderBlockedRow(props: any) {
    const { index, style, matches } = props;

    return (
      <ListItem style={style} key={index} >
        <Avatar src={blocked[index]?.img} />
        <ListItemText id="idIntraBlock" primary={blocked[index]?.idIntra} />
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
