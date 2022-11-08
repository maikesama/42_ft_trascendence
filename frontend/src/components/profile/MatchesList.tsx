import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export const MatchesList = (props: any) => {

    const [games, setGames] = useState({} as any);

    useEffect(() => {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/games/getHistory`;

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const json = await response.json();
                console.log(json);
                setGames(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

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
                console.log(json);
                setUser(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    function renderMatchesRow(props: any) {
        const { index, style, matches } = props;

        return (
            <ListItem button style={style} key={index} >
                {games[index]?.user1 === user?.idIntra ? <>
                    <Avatar src={games[index]?.img1} />
                    <ListItemText primary={games[index]?.user1} />
                    <ListItemText primary={games[index]?.scoreP1 + " - " + games[index]?.scoreP2} />
                    <ListItemText primary={games[index]?.user2} />
                    <Avatar src={games[index]?.img2} /> </> :
                    <>
                        <Avatar src={games[index]?.img2} />
                        <ListItemText primary={games[index]?.user2} />
                        <ListItemText primary={games[index]?.scoreP2 + " - " + games[index]?.scoreP1} />
                        <ListItemText primary={games[index]?.user1} />
                        <Avatar src={games[index]?.img1} />
                    </>
                }

            </ListItem>
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
