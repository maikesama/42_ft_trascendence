
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Item from '@mui/material/ListItem';

import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

import {io} from 'socket.io-client';

export const Test = () => {

        function ciao()
        {
        const socket = io('ws://localhost:3333');

        socket.on("msgToClient", (arg) => {
          console.log(arg);
        });

        socket.emit("msgToServer", "stranger")
        }

      
        return (
          <>
            <input type="text" name="box" id="" />
            <button type="submit" onClick={ciao}>Invia</button>
            <br /><br />
            <div id="printer">
              -
            </div>
          </>
  );
}
