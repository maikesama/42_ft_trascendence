import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useParams } from 'react-router';

export const MatchesList = (props: any) => {

    const [games, setGames] = useState({} as any);
    const params = useParams()

    useEffect(() => {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/games/getHistory`;

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idIntra: props.user.idUser }),
                });
                const json = await response.json();
                
                setGames(json);
            } catch (error) {
                
            }
        };

        fetchData();
    }, [params]);

    const [user, setUser] = useState({} as any);

    useEffect(() => {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/user/me`;

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const json = await response.json();
                
                setUser(json);
            } catch (error) {
                
            }
        };

        fetchData();
    }, []);

    function renderMatchesRow(props: any) {
        const { index, style, matches } = props;

        var style2 = {
            ...style,
            display: 'flex',
            justifyContent: 'space-between',
          }

        return (
            <>
            {games[index]?.user1 === params.idUser ? <>
                <Link key={`/Profile/other`} component={RouterLink} to={`/Profile/${games[index]?.user2}`} underline="none" color="inherit" sx={{ display: "contents" }}>
                  <ListItem key={index} style={style2}>
                    <Avatar src={games[index]?.img1} />
                    <Typography sx={{ color: 'black', textDecoration: 'none' }}>{games[index]?.userName1}</Typography>
                    <Typography>{games[index]?.scoreP1 + " - " + games[index]?.scoreP2}</Typography>
                    <Typography>{games[index]?.userName2}</Typography>
                    <Avatar src={games[index]?.img2} />
                  </ListItem>
                </Link>
              </> :
                <>
      
                  <Link key={`/Profile/other`} component={RouterLink} to={`/Profile/${games[index]?.user1}`} underline="none" color="inherit" sx={{ display: "contents" }}>
                    <ListItem key={index} style={style2}>
                      <Avatar src={games[index]?.img2} />
                      <Typography>{games[index]?.userName2}</Typography>
                      <Typography>{games[index]?.scoreP2 + " - " + games[index]?.scoreP1}</Typography>
                      <Typography>{games[index]?.userName1}</Typography>
                      <Avatar src={games[index]?.img1} />
                    </ListItem>
                  </Link>
                </>
              }
              </>
        );
    }

    return (
        <Dialog open={props.status} onClose={props.closeStatus}>
            <DialogTitle textAlign="center">Matches List</DialogTitle>
            <DialogContent>
                <div style={{ textAlignLast: 'center' }}>
                    <FixedSizeList
                        height={400}
                        width={400}
                        itemSize={80}
                        itemCount={Object.values(games).length} /*Qui deve essere restituito il numero di match completati*/
                        overscanCount={5}
                    >
                        {renderMatchesRow}
                    </FixedSizeList>
                </div>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant="contained" onClick={props.closeStatus}>Close</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}
