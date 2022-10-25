import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Button from '@mui/material/Button';
import { FormatAlignJustify } from '@material-ui/icons';
import { AlignHorizontalLeft } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import ListItemButton from '@mui/material/ListItemButton';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
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
        setChatView(param);
        setUserIntra(name);
        setUserImg(img);
    }

    const [friends, setFriends] = useState({} as any);

    React.useEffect(() => {
        const url = "http://10.11.11.3:3333/friend/getFriends";

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

    const [search, setSearch] = useState({} as any);
    const initials = useRef<any>('');

    async function searchUser() {
        const url = `http://10.11.11.3:3333/chat/searchUser`;
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
    
    function renderSocialRow(props: any) {
        const { index, style} = props;
    
        return (
          <ListItem button style={style} key={index} onClick={event => changeChat('DM', friends[index]?.userName, friends[index]?.img)}>
            <Avatar src={friends[index]?.img} />
            <Divider variant='middle'/>
            <Typography variant='h6'>{(friends[index]?.userName)}</Typography>
          </ListItem>
        );
      }

    return (
        <div>
            <Grid container style={{ top: 20 }} component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <Grid item xs={12} style={{ padding: '10px', display: 'flex', justifyContent: 'flex-start' }}>
                        <TextField className="searchBar" inputRef={initials} id="outlined-basic-email" label="Search" variant="outlined" fullWidth onChange={searchUser}/>
                        <IconButton aria-label="delete" style={{ marginTop: '10px' }} size="small" onClick={handleClickOpenCreateGroup}><GroupAddSharpIcon fontSize="large" /></IconButton>
                        <IconButton aria-label="delete" style={{ marginTop: '10px' }} size="small" onClick={handleClickOpenJoineGroup}><Diversity3OutlinedIcon fontSize="large" /></IconButton>
                    </Grid>
                    <Divider />
                    <FixedSizeList

                        height={460}
                        width='full'
                        itemSize={90}
                        itemCount={Object.values(friends).length}
                        overscanCount={5}
                    >
                        {renderSocialRow}
                    </FixedSizeList>
                </Grid>
                <Grid item xs={9}>
                    {chatView === 'Blank' ? <Blank /> : chatView === 'DM' ? <DM idIntra = {userNameIntra} img = {userImg}/> : <Channel />}
                </Grid>
            </Grid>
            {/*MODAL JOIN GROUP */}
            <JoinGroup status={openJoinGroup} closeStatus={handleCloseJoinGroup} />
            {/*MODAL ADMIN IN GROUP ACTIONS */}
            <AdminGroupActions status={openAdminActions} closeStatus={handleCloseAdminActions} />
            {/*MODAL GROUP INFO */}
            <GroupInfo status={openGroupInfo} closeStatus={handleCloseGroupInfo} />
            {/*MODAL CREATE CHANNEL */}
            <CreateChannel status={openCreateGroup} closeStatus={handleCloseCreateGroup} />
            {/*MODAL USER ACTIONS */}
            <UserActions status={openUserActions} closeStatus={handleCloseUserActions} />
        </div >
    );
}