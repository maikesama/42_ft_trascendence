import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Item from '@mui/material/ListItem';

import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

export const Test = () => {
        return (
          <Grid container spacing={3}>
          <Grid item xs="auto">
            <Item>variable width content</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>xs=6</Item>
          </Grid>
          <Grid item xs>
            <Item>xs</Item>
          </Grid>
        </Grid>
  );
}
