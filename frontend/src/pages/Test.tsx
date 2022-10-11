
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Item from '@mui/material/ListItem';

import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

import {io} from 'socket.io-client';

export const Test = () => {

        const socket = io('ws://10.11.7.3:3333');

        // function createChannel()
        // {

        // }

        // function createDm()
        // {
          
        // }
        
        async function sendMessage()
        {
          const msg = await document.getElementById('box') as HTMLInputElement

          if (msg.value != "")
          {
            const body = {msg: msg.value, room: "test"}
            socket.emit("msgToServer", body);
          }
        }

        socket.on("msgToClient", (arg) => {
            // document.getElementById('printer') as HTMLInputElement
            console.log(arg)
        });

        // function joinChannel()
        // {

        // }

        // function leaveChannel()
        // {

        // }
        // //Admin channel functions

        // function addUser()
        // {

        // }


        // function removeUser()
        // {
          
        // }

        // function banUser()
        // {
          
        // }

        // function changeVisibility()
        // {
          
        // }

        // function addAdmin()
        // {

        // }

        // function removeAdmin()
        // {
          
        // }

        // function muteUser()
        // {
          
        // }

        // function blockUser()
        // {
          
        // }
        // socket.on("msgToClient", (arg) => {
        //   console.log(arg)
        // });
        // function ciao()
        // {

        // socket.emit("msgToServer", "stranger")
        // }

      
        return (
          <>
            <input type="text" name="box" id="box" />
            <button type="submit" onClick={sendMessage}>Invia</button>
            <br /><br />
            <div id="printer">
              -
            </div>
          </>
  );
}
