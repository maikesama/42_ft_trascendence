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
import { socket } from "../../App";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh',
        backgroundColor: 'white',
    },
    headBG: {
        backgroundColor: ' #e0e0e0'
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
    const [idChat, setidChat] = useState(-1);
    const [userImg, setUserImg] = useState('');
    const [userIdIntra, setUserIdIntra] = useState('');
    const [chanType, setChanType] = useState('');


    const handleClickOpenCreateGroup = () => {
        setopenCreateGroup(true);
    };

    const handleCloseCreateGroup = (event:any, reason:any) => {
        if (reason && reason == "backdropClick") 
            return;
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


    const changeChat = (param: React.SetStateAction<string>, name: React.SetStateAction<string>, id: React.SetStateAction<number>, img: React.SetStateAction<string>, idIntra: React.SetStateAction<string>, type: React.SetStateAction<string>) => {
        if (param != 'Blank' && param != 'DM') {
            clickChannelInfo(Number(id));
        }
        setChatView(param);
        setUserIntra(name);
        setidChat(id)
        setUserImg(img);
        setUserIdIntra(idIntra);
        setChanType(type);
    }

    // const [friends, setFriends] = useState({} as any);

    // React.useEffect(() => {
    //     const url = `http://${process.env.REACT_APP_HOST_URI}/api/friend/getFriends`;

    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(url, {
    //                 method: 'POST',
    //                 credentials: 'include',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 }
    //             });
    //             const json = await response.json();
    //             console.log(json);
    //             setFriends(json);
    //         } catch (error) {
    //             console.log("error", error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    const [chats, setChats] = useState({} as any);
    const [dms, setDms] = useState({} as any);

    React.useEffect(() => {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getDms`;

        const fetchDataDms = async () => {
            try {
                const response = await fetch(url, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const json = await response.json();
                setDms(json);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchDataDms();
    }, []);

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

    async function clickChannelInfo(id: number) {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getChanUsers`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
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
    
    const [map, setMap] = useState(new Map());
    // const [mapped, setMapped] = useState(false);
    const isSecondRender = useRef(false);

    React.useEffect(() => {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getMessages`;
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ count: 50 }),
                });
                const json = await response.json();
                let ret = new Map(json.map((json : any) => [json.chat.id, json.chat.messages]))
                console.log(ret);
                for (let entry of Array.from(ret.entries())) {

                    socket.emit('provaJoin', { idChat: entry[0] });
                    console.log(JSON.stringify(entry[1]));
                }
                setMap(ret);
                return ret;
            } catch (error) {
                console.log("error", error);
            }
        };
        if (isSecondRender.current) {
            fetchData();
        }

        const updateMap = (key: any, value:any) => {
            // const currentValues = map.get(key) || []; // get current values for the key, or use empty array
            console.log(map)
            const currentValues = map.get(key);
            console.log("currentValues", currentValues);
            console.log("key", key);
            // setMap(map2 => new Map(map.set(key, [...currentValues, value])));

        }

		if (isSecondRender.current){
			socket.on('provaMessaggi', (data: any) => {
				console.log("data: ", data);
				updateMap(data.idChat, data);
			});
        }
        isSecondRender.current = true;

    }, []);

    React.useEffect(() => {
        const updateMap = (key: any, value:any) => {
            const currentValues = map.get(key) || []; // get current values for the key, or use empty array
            console.log("currentValues", currentValues);
            console.log("key", key);
            setMap(map2 => new Map(map.set(key, [...currentValues, value])));

        }

		if (isSecondRender.current){
			socket.on('provaMessaggi', (data: any) => {
				console.log("data: ", data);
				updateMap(data.idChat, data);
			});
        }
        isSecondRender.current = true;

    });

    console.log(map);
    // console.log (map);


    // React.useEffect(() => {
    // const getMessages = async () => {

    //     const url = `http://${process.env.REACT_APP_HOST_URI}/api/chat/getMessages`;
    //     try {
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ count: 50 }),
    //         });
    //         const json = await response.json();
    //         console.log("aoooooo1" + json);
    //         setMap(json.map((chat: any) => {
    //             map.set(chat.idChat, chat.messages);
    //         }));
    //         console.log("aooooooo2" + map);
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    //     getMessages();
    // }}, []);

    // function renderFriendRow(props: any) {
    //     const { index, style } = props;

    //     /*to fix to real id of the chat*/
    //     return (
    //         <ListItem button style={style} key={index} onClick={event => changeChat('DM', friends[index]?.userName, chats[index]?.id , friends[index]?.img, friends[index]?.idIntra, '')}>
    //             <Avatar src={friends[index]?.img} />
    //             <Divider variant='middle' />
    //             <Typography variant='h6'>{(friends[index]?.userName)}</Typography>
    //         </ListItem>
    //     );
    // }
    function renderDmsRow(props: any) {
        const { index, style } = props;
        /*to fix to real id of the chat*/
        // console.log("DMSSS INDEX", JSON.stringify(dms[index]));
        // console.log("DMSSS userName", dms[index]["partecipant"][0]["user"]);
        return (
            <ListItem button style={style} key={index} onClick={event => changeChat('DM', dms[index]["partecipant"][0]["user"]?.userName, dms[index]?.id , dms[index]["partecipant"][0]["user"]?.img, dms[index]["partecipant"][0]["user"]?.idIntra, '')}>
                <Avatar src={dms[index]["partecipant"][0]["user"]?.img} />
                <Divider variant='middle' />
                <Typography variant='h6'>{(dms[index]["partecipant"][0]["user"]?.userName)}</Typography>
            </ListItem>
        );
    }

    function renderChannelRow(props: any) {
        const { index, style } = props;

        return (
            <ListItem button style={style} key={index} onClick={event => changeChat('Channel', chats[index]?.name, chats[index]?.id, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8AAAD29vahoaGQkJBra2sqKioFBQWqqqrv7+/c3NxcXFzFxcVlZWX6+vpoaGgkJCQ8PDzk5OQ3NzcvLy/W1taDg4MdHR2JiYkWFhZRUVHe3t58fHxZWVlPT0+ampro6OgQEBDKysrhb0krAAADGklEQVR4nO3c21YaQRBA0QGVqKgkRBOiMSb+/0dGQHRm+lZOXynPeWOt6l6zH/SFYrqOiIiIiIiIiIiIiIiIiIjI11zSxXzSsZdzom5yAq9nkr4azyA6NjuXjT1VB34zDy4k5/6uZcKTBoEi4bq7rC2cDpQI1111YQRQIHwB1hbGAMPCLbCyMAoYFO6AdYVxwJBwD6wqjAQGhK/AmsJYoF94AFYURgO9woe3qWrCeKBP+A6sJpQBv3vvcAt7wFrCFEC3sA+sJEwCdAoHwDrCNECXcAisIkwEdAhHwBrCVEC7cAysIEwGtAoNYHlhOqBNeGlOlRYmBFqEFmBpYUqgKbQBCwtlwFvhbWOhFVhWmBY4FtqBRYWJgSOhA1hSmBo4FLqABYXJgQOhE1hOmB7YF965p0oJV+mBPaEHWEqYA/gu9AELCbMA34ReYBlhHuBB6AcWEcqAiw/fu5AASwhl/0U/DtwLQ8ACwmzAnTAIzC/MB9wKw8Dswlx/g9sWEmBuoRA4bRFCBOwesgqzAjsRsLuTCc8nPUJeoKwLGfD3pMsB7jIXgVIGEKAngO0Af0y6HCDA+AAC9CQD/gQYE8BPAtxMuhwgwPgAAvQEcNcvgDEBBOhJCDR+ApoyIfB00uUAAcYHMD/wH8CYAAL0dAbwUwCn7clIywoUvk7j8Sxd11fjhxC9F2N2LxM9jz6fyIRJMzZeZMKlCLgcv9tEm3Bl7EQpE67MrS9dwu3+pGrhbkFUs3C/AatY+Lriq1d42GFWK3xb0tYqfN9CVyrsrdnrFC57YyqFfaBK4QCoUTgEKhSOgPqEY6A6oQHUJjSByoSPljFVQhtQldAK1CS0AxUJHUA9QhdQjdAJ1CK8d4/pEHqAOoQ+oAqhF2gInzen6doUEfqBOd8633XzEsI/gbGsQuF3uVHCEPDohUHgsQvDwCMXCoDHLZQA2xTezr6Emy2XorEmhccTQoTthxBh+yFE2H4IEbYfQoTthxBh+yFE2H4IEbYfQoTth/DTCLN+/5W3mytR6/BNRERERERERERERERERERERERENOg/dzVckyodV/gAAAAASUVORK5CYII=', '', chats[index]?.type)}>
                <Avatar src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8AAAD29vahoaGQkJBra2sqKioFBQWqqqrv7+/c3NxcXFzFxcVlZWX6+vpoaGgkJCQ8PDzk5OQ3NzcvLy/W1taDg4MdHR2JiYkWFhZRUVHe3t58fHxZWVlPT0+ampro6OgQEBDKysrhb0krAAADGklEQVR4nO3c21YaQRBA0QGVqKgkRBOiMSb+/0dGQHRm+lZOXynPeWOt6l6zH/SFYrqOiIiIiIiIiIiIiIiIiIjI11zSxXzSsZdzom5yAq9nkr4azyA6NjuXjT1VB34zDy4k5/6uZcKTBoEi4bq7rC2cDpQI1111YQRQIHwB1hbGAMPCLbCyMAoYFO6AdYVxwJBwD6wqjAQGhK/AmsJYoF94AFYURgO9woe3qWrCeKBP+A6sJpQBv3vvcAt7wFrCFEC3sA+sJEwCdAoHwDrCNECXcAisIkwEdAhHwBrCVEC7cAysIEwGtAoNYHlhOqBNeGlOlRYmBFqEFmBpYUqgKbQBCwtlwFvhbWOhFVhWmBY4FtqBRYWJgSOhA1hSmBo4FLqABYXJgQOhE1hOmB7YF965p0oJV+mBPaEHWEqYA/gu9AELCbMA34ReYBlhHuBB6AcWEcqAiw/fu5AASwhl/0U/DtwLQ8ACwmzAnTAIzC/MB9wKw8Dswlx/g9sWEmBuoRA4bRFCBOwesgqzAjsRsLuTCc8nPUJeoKwLGfD3pMsB7jIXgVIGEKAngO0Af0y6HCDA+AAC9CQD/gQYE8BPAtxMuhwgwPgAAvQEcNcvgDEBBOhJCDR+ApoyIfB00uUAAcYHMD/wH8CYAAL0dAbwUwCn7clIywoUvk7j8Sxd11fjhxC9F2N2LxM9jz6fyIRJMzZeZMKlCLgcv9tEm3Bl7EQpE67MrS9dwu3+pGrhbkFUs3C/AatY+Lriq1d42GFWK3xb0tYqfN9CVyrsrdnrFC57YyqFfaBK4QCoUTgEKhSOgPqEY6A6oQHUJjSByoSPljFVQhtQldAK1CS0AxUJHUA9QhdQjdAJ1CK8d4/pEHqAOoQ+oAqhF2gInzen6doUEfqBOd8633XzEsI/gbGsQuF3uVHCEPDohUHgsQvDwCMXCoDHLZQA2xTezr6Emy2XorEmhccTQoTthxBh+yFE2H4IEbYfQoTthxBh+yFE2H4IEbYfQoTth/DTCLN+/5W3mytR6/BNRERERERERERERERERERERERENOg/dzVckyodV/gAAAAASUVORK5CYII=' />
                <Divider variant='middle' />
                <Typography variant='h6'>{(chats[index]?.name)}</Typography>
            </ListItem>
        );
    }

    return (
        // component Paper bugs the header
        <div>
            <Grid container style={{ top: 20 }} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <Grid item xs={12} style={{ padding: '10px', display: 'flex', justifyContent: 'flex-start' }}>
                        <TextField className="searchBar" inputRef={initials} id="outlined-basic-email" label="Search" variant="outlined" fullWidth onChange={searchUser} />
                        <IconButton aria-label="delete" style={{ marginTop: '10px' }} size="small" onClick={handleClickOpenCreateGroup}><GroupAddSharpIcon fontSize="large" /></IconButton>
                        <IconButton aria-label="delete" style={{ marginTop: '10px' }} size="small" onClick={handleClickOpenJoineGroup}><Diversity3OutlinedIcon fontSize="large" /></IconButton>
                    </Grid>
                    <Divider />
                    <h4>DM</h4>
                    <FixedSizeList
                        height={Object.values(dms).length == 0 ? 90 : Object.values(dms).length > 5 ? 450 : ((Object.values(dms).length) * 90)}
                        width='full'
                        itemSize={90}
                        itemCount={Object.values(dms).length}
                        overscanCount={5}
                    >
                        {renderDmsRow}
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
                    {chatView === 'Blank' ? <Blank /> : chatView === 'DM' ? <DM nickname={userNameIntra} img={userImg} idIntra={userIdIntra} idChat={idChat} messages={map.get(idChat)}/> : <Channel permission={permission} partecipants={partecipants} name={userNameIntra} img={userImg} idChat={idChat} type={chanType}/>}
                </Grid>
            </Grid>
            {/*MODAL JOIN GROUP */}
            <JoinGroup status={openJoinGroup} closeStatus={handleCloseJoinGroup} />
            {/*MODAL CREATE CHANNEL */}
            <CreateChannel status={openCreateGroup} closeStatus={handleCloseCreateGroup} />
            {/*MODAL USER ACTIONS */}
            <UserActions status={openUserActions} closeStatus={handleCloseUserActions} />
        </div >
    );
}
