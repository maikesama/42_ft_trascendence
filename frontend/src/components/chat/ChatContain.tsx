import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import { IconButton } from '@mui/material';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { CreateChannel } from './CreateChannel';
import { GroupInfo } from './GroupInfo';
import { AdminGroupActions } from './AdminGroupActions';
import { JoinGroup } from './JoinGroup';
import { UserActions } from './UserActions';
import { Blank } from './Blank';
import { DM } from './DM';
import { Channel } from './Channel';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto',
    },
});


export const ChatContain = (props: any) => {
    const classes = useStyles();
    const onstatus = props.status;
    let status;

    if (onstatus && onstatus === "online") {
        status = (
            <i style={{ fontSize: 8, color: 'green' }} className="bi bi-circle-fill"></i>
        );
    } else if (onstatus === "offline") {
        status = (
            <i style={{ fontSize: 8, color: 'red' }} className="bi bi-circle-fill"></i>
        );
    } else {
        status = (
            <i style={{ fontSize: 8, color: 'grey' }} className="bi bi-circle-fill"></i>
        );
    }

    const [openCreateGroup, setopenCreateGroup] = React.useState(false);
    const [openJoinGroup, setopenJoinGroup] = React.useState(false);
    const [openGroupInfo, setopenGroupInfo] = React.useState(false);
    const [openAdminActions, setopenAdminActions] = React.useState(false);
    const [openUserActions, setopenUserActions] = React.useState(false);
    const [chatView, setChatView] = useState('Blank');
    const [userNameIntra, setUserIntra] = useState('');
    const [userImg, setUserImg] = useState('');


    const handleClickOpenCreateGroup = () => {
        setopenCreateGroup(true);
    };

    const handleCloseCreateGroup = () => {
        setopenCreateGroup(false);
    };

    const handleClickOpenJoineGroup = () => {
        setopenJoinGroup(true);
    };

    const handleCloseJoinGroup = () => {
        setopenJoinGroup(false);
    };

    const handleClickOpenGroupInfo = () => {
        setopenGroupInfo(true);
    };

    const handleCloseGroupInfo = () => {
        setopenGroupInfo(false);
    };

    const handleClickOpenAdminActions = () => {
        setopenAdminActions(true);
    };

    const handleCloseAdminActions = () => {
        setopenAdminActions(false);
    };

    const handleClickOpenUserActions = () => {
        setopenUserActions(true);
    };

    const handleCloseUserActions = () => {
        setopenUserActions(false);
    };

    const changeChat = (param: React.SetStateAction<string>, name: React.SetStateAction<string>, img: React.SetStateAction<string>) => {
        if (param != 'Blank' && param != 'DM') {
            clickChannelInfo(String(name));
        }
        setChatView(param);
        setUserIntra(name);
        setUserImg(img);
    }

    const [friends, setFriends] = useState({} as any);

    React.useEffect(() => {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/getFriends`;

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
                setFriends(json);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);

    const [chats, setChats] = useState({} as any);

    React.useEffect(() => {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getChatUsers`;

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
                setChats(json);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);

    const [permission, setPermission] = useState({} as any);
    const [partecipants, setPartecipants] = useState({} as any);

    async function clickChannelInfo(name: string) {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getChanUsers`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name }),
            })
            const json = await response.json();

            setPermission(json.me);
            setPartecipants(json.partecipants);

        } catch (error) {
            console.log("error", error);
        }

    }

    const [search, setSearch] = useState({} as any);
    const initials = useRef<any>('');

    async function searchUser() {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/searchUser`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ initials: initials.current.value }),
            });
            const json = await response.json();
            console.log(json);
            setSearch(json);
        } catch (error) {
            console.log("error", error);
        }
    }

    function renderFriendRow(props: any) {
        const { index, style } = props;

        return (
            <ListItem button style={style} key={index} onClick={event => changeChat('DM', friends[index]?.userName, friends[index]?.img)}>
                <Avatar src={friends[index]?.img} />
                <Divider variant='middle' />
                <Typography variant='h6'>{(friends[index]?.userName)}</Typography>
            </ListItem>
        );
    }

    function renderChannelRow(props: any) {
        const { index, style } = props;

        return (
            <ListItem button style={style} key={index} onClick={event => changeChat('Channel', chats[index]?.name, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8AAAD29vahoaGQkJBra2sqKioFBQWqqqrv7+/c3NxcXFzFxcVlZWX6+vpoaGgkJCQ8PDzk5OQ3NzcvLy/W1taDg4MdHR2JiYkWFhZRUVHe3t58fHxZWVlPT0+ampro6OgQEBDKysrhb0krAAADGklEQVR4nO3c21YaQRBA0QGVqKgkRBOiMSb+/0dGQHRm+lZOXynPeWOt6l6zH/SFYrqOiIiIiIiIiIiIiIiIiIjI11zSxXzSsZdzom5yAq9nkr4azyA6NjuXjT1VB34zDy4k5/6uZcKTBoEi4bq7rC2cDpQI1111YQRQIHwB1hbGAMPCLbCyMAoYFO6AdYVxwJBwD6wqjAQGhK/AmsJYoF94AFYURgO9woe3qWrCeKBP+A6sJpQBv3vvcAt7wFrCFEC3sA+sJEwCdAoHwDrCNECXcAisIkwEdAhHwBrCVEC7cAysIEwGtAoNYHlhOqBNeGlOlRYmBFqEFmBpYUqgKbQBCwtlwFvhbWOhFVhWmBY4FtqBRYWJgSOhA1hSmBo4FLqABYXJgQOhE1hOmB7YF965p0oJV+mBPaEHWEqYA/gu9AELCbMA34ReYBlhHuBB6AcWEcqAiw/fu5AASwhl/0U/DtwLQ8ACwmzAnTAIzC/MB9wKw8Dswlx/g9sWEmBuoRA4bRFCBOwesgqzAjsRsLuTCc8nPUJeoKwLGfD3pMsB7jIXgVIGEKAngO0Af0y6HCDA+AAC9CQD/gQYE8BPAtxMuhwgwPgAAvQEcNcvgDEBBOhJCDR+ApoyIfB00uUAAcYHMD/wH8CYAAL0dAbwUwCn7clIywoUvk7j8Sxd11fjhxC9F2N2LxM9jz6fyIRJMzZeZMKlCLgcv9tEm3Bl7EQpE67MrS9dwu3+pGrhbkFUs3C/AatY+Lriq1d42GFWK3xb0tYqfN9CVyrsrdnrFC57YyqFfaBK4QCoUTgEKhSOgPqEY6A6oQHUJjSByoSPljFVQhtQldAK1CS0AxUJHUA9QhdQjdAJ1CK8d4/pEHqAOoQ+oAqhF2gInzen6doUEfqBOd8633XzEsI/gbGsQuF3uVHCEPDohUHgsQvDwCMXCoDHLZQA2xTezr6Emy2XorEmhccTQoTthxBh+yFE2H4IEbYfQoTthxBh+yFE2H4IEbYfQoTth/DTCLN+/5W3mytR6/BNRERERERERERERERERERERERENOg/dzVckyodV/gAAAAASUVORK5CYII=')}>
                <Avatar src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8AAAD29vahoaGQkJBra2sqKioFBQWqqqrv7+/c3NxcXFzFxcVlZWX6+vpoaGgkJCQ8PDzk5OQ3NzcvLy/W1taDg4MdHR2JiYkWFhZRUVHe3t58fHxZWVlPT0+ampro6OgQEBDKysrhb0krAAADGklEQVR4nO3c21YaQRBA0QGVqKgkRBOiMSb+/0dGQHRm+lZOXynPeWOt6l6zH/SFYrqOiIiIiIiIiIiIiIiIiIjI11zSxXzSsZdzom5yAq9nkr4azyA6NjuXjT1VB34zDy4k5/6uZcKTBoEi4bq7rC2cDpQI1111YQRQIHwB1hbGAMPCLbCyMAoYFO6AdYVxwJBwD6wqjAQGhK/AmsJYoF94AFYURgO9woe3qWrCeKBP+A6sJpQBv3vvcAt7wFrCFEC3sA+sJEwCdAoHwDrCNECXcAisIkwEdAhHwBrCVEC7cAysIEwGtAoNYHlhOqBNeGlOlRYmBFqEFmBpYUqgKbQBCwtlwFvhbWOhFVhWmBY4FtqBRYWJgSOhA1hSmBo4FLqABYXJgQOhE1hOmB7YF965p0oJV+mBPaEHWEqYA/gu9AELCbMA34ReYBlhHuBB6AcWEcqAiw/fu5AASwhl/0U/DtwLQ8ACwmzAnTAIzC/MB9wKw8Dswlx/g9sWEmBuoRA4bRFCBOwesgqzAjsRsLuTCc8nPUJeoKwLGfD3pMsB7jIXgVIGEKAngO0Af0y6HCDA+AAC9CQD/gQYE8BPAtxMuhwgwPgAAvQEcNcvgDEBBOhJCDR+ApoyIfB00uUAAcYHMD/wH8CYAAL0dAbwUwCn7clIywoUvk7j8Sxd11fjhxC9F2N2LxM9jz6fyIRJMzZeZMKlCLgcv9tEm3Bl7EQpE67MrS9dwu3+pGrhbkFUs3C/AatY+Lriq1d42GFWK3xb0tYqfN9CVyrsrdnrFC57YyqFfaBK4QCoUTgEKhSOgPqEY6A6oQHUJjSByoSPljFVQhtQldAK1CS0AxUJHUA9QhdQjdAJ1CK8d4/pEHqAOoQ+oAqhF2gInzen6doUEfqBOd8633XzEsI/gbGsQuF3uVHCEPDohUHgsQvDwCMXCoDHLZQA2xTezr6Emy2XorEmhccTQoTthxBh+yFE2H4IEbYfQoTthxBh+yFE2H4IEbYfQoTth/DTCLN+/5W3mytR6/BNRERERERERERERERERERERERENOg/dzVckyodV/gAAAAASUVORK5CYII=' />
                <Divider variant='middle' />
                <Typography variant='h6'>{(chats[index]?.name)}</Typography>
            </ListItem>
        );
    }

    return (
        <div>
            <Grid container style={{ top: 20 }} component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <Grid item xs={12} style={{ padding: '10px', display: 'flex', justifyContent: 'flex-start' }}>
                        <TextField className="searchBar" inputRef={initials} id="outlined-basic-email" label="Search" variant="outlined" fullWidth onChange={searchUser} />
                        <IconButton aria-label="delete" style={{ marginTop: '10px' }} size="small" onClick={handleClickOpenCreateGroup}><GroupAddSharpIcon fontSize="large" /></IconButton>
                        <IconButton aria-label="delete" style={{ marginTop: '10px' }} size="small" onClick={handleClickOpenJoineGroup}><Diversity3OutlinedIcon fontSize="large" /></IconButton>
                    </Grid>
                    <Divider />
                    <h4>DM</h4>
                    <FixedSizeList
                        height={Object.values(friends).length == 0 ? 90 : Object.values(friends).length > 5 ? 450 : ((Object.values(friends).length) * 90)}
                        width='full'
                        itemSize={90}
                        itemCount={Object.values(friends).length}
                        overscanCount={5}
                    >
                        {renderFriendRow}
                    </FixedSizeList>
                    <Divider />
                    <h4>Channels</h4>
                    <FixedSizeList

                        height={(Object.values(chats).length == 0 ? 90 : Object.values(chats).length > 5 ? 450 : ((Object.values(chats).length) * 90))}
                        width='full'
                        itemSize={90}
                        itemCount={Object.values(chats).length}
                        overscanCount={5}
                    >
                        {renderChannelRow}
                    </FixedSizeList>
                </Grid>
                <Grid item xs={9}>
                    {chatView === 'Blank' ? <Blank /> : chatView === 'DM' ? <DM idIntra={userNameIntra} img={userImg} /> : <Channel permission={permission} partecipants={partecipants} name={userNameIntra} img={userImg} />}
                </Grid>
            </Grid>
            {/*MODAL JOIN GROUP */}
            <JoinGroup status={openJoinGroup} closeStatus={handleCloseJoinGroup} />
            {/*MODAL ADMIN IN GROUP ACTIONS */}
            <AdminGroupActions status={openAdminActions} closeStatus={handleCloseAdminActions} channelName={userNameIntra}/>
            {/*MODAL GROUP INFO */}
            <GroupInfo status={openGroupInfo} closeStatus={handleCloseGroupInfo} />
            {/*MODAL CREATE CHANNEL */}
            <CreateChannel status={openCreateGroup} closeStatus={handleCloseCreateGroup} />
            {/*MODAL USER ACTIONS */}
            <UserActions status={openUserActions} closeStatus={handleCloseUserActions} />
        </div >
    );
}
