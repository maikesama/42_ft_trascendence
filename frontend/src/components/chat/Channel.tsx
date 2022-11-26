import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { GroupInfo } from './GroupInfo';
import { AdminGroupActions } from './AdminGroupActions';
import { socket } from '../../App';

const useStyles = makeStyles({
    messageArea: {
        height: '70vh',
        overflowY: 'auto',
    },
});

//Array di testing
// const messaggi: string[] = [];

export const Channel = (props: any) => {

    const classes = useStyles();

    const [openGroupInfo, setopenGroupInfo] = React.useState(false);
    const partecipants = props.partecipants;
    const permission = props.permission;
    const setPermission = props.setPermission;
    const setPartecipants = props.setPartecipants;
    const [openAdminActions, setopenAdminActions] = React.useState(false);

    React.useEffect(() => {
            socket.off('refreshPartecipants').on('refreshPartecipants', (data: any) => {
                if (props.id === data.idChat) {
                    setPartecipants(data.partecipants);
                }
            });
    });

    React.useEffect(() => {
            socket.off('demoteUser').on('demoteUser', (data: any) => {
                if (props.id === data.idChat) {
                    setPermission({owner: false, admin: false});
                    setopenAdminActions(false);
                    // setopenGroupInfo(false);
                }
            });
    });

    React.useEffect(() => {
            socket.off('promoteUser').on('promoteUser', (data: any) => {
                if (props.id === data.idChat) {
                    setPermission({owner: false, admin: true});
                    // setopenAdminActions(false);
                    setopenGroupInfo(false);
                }
            });
    });


    // const [message, setMessage] = useState('Haloa');

    // function MessageSent(props: any) {
    //     return (
    //         <>
    //             <div className="container-message lighter">
    //                 {/* <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" /> */}
    //                 <Typography className="userSending">You</Typography>
    //                 <Typography>{props.message}</Typography>
    //                 <span className="time-right">{props.time}</span>
    //             </div>
    //         </>
    //     );
    // }

    // function MessageReceived(props: any) {
    //     return (
    //         <>
    //             <div className="container-message darker">
    //                 {/* <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar" className="right" /> */}
    //                 <Typography className="userSending">{props.friend}</Typography>
    //                 <Typography className="message">{props.message}</Typography>
    //                 <span className="time-right">{props.time}</span>
    //             </div>
    //         </>
    //     );
    // }

    // const handleMessage = (event: any) => {
    //     if (event.target.value !== '') {
    //         setMessage(event.target.value);
    //     }
    //     else {
    //         setMessage('Messaggio vuoto');
    //     }
    // }

    // const sendMessage = () => {
    //     messaggi.push(message);
    //     for (var i in messaggi) {
    
    //     }
    // }



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


    async function chanInfo() {
        if (permission?.owner || permission?.admin)
            handleClickOpenAdminActions();
        else
            handleClickOpenGroupInfo();
    }

    return (
        <>
            {/* <List className={classes.messageArea}> */}
                <ListItem button key="" onClick={chanInfo}>
                    <img src={props.img} style={{ width: '51px', height: '51px', borderRadius: '100%' }}/>
                    <h5 className="groupNameChat" style={{ width: '150px', marginLeft: '50px' }}>{props.name}</h5>
                </ListItem>
            {/* </List>
            <Divider />
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={11}>
                    <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={handleMessage} />
                </Grid>
                <Grid xs={1} >
                    <Fab color="primary" aria-label="add" onClick={sendMessage}><SendIcon /></Fab>
                </Grid>
            </Grid> */}
            {/*MODAL GROUP INFO */}
            <GroupInfo status={openGroupInfo} user={permission?.owner ? 'Owner' : permission?.admin ? 'Admin' : 'User'} partecipants={partecipants} closeStatus={handleCloseGroupInfo} idChat={props.idChat} channelName={props.name} />
            {/*MODAL ADMIN INFO */}
            <AdminGroupActions status={openAdminActions} user={permission?.owner ? 'Owner' : permission?.admin ? 'Admin' : 'User'} setPartecipants={setPartecipants} partecipants={partecipants} closeStatus={handleCloseAdminActions} idChat={props.idChat} channelName={props.name} type={props.type}/>
        </>
    );
}
