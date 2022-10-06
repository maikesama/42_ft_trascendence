import React from 'react';
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
import { FixedSizeList, ListChildComponentProps } from 'react-window';

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
    const [openGroupInfo, setopenGroupInfo] = React.useState(false);
    const [openAdminActions, setopenAdminActions] = React.useState(false);
    const [openUserActions, setopenUserActions] = React.useState(false);

    const handleClickOpenCreateGroup = () => {
        setopenCreateGroup(true);
    };

    const handleCloseCreateGroup = () => {
        setopenCreateGroup(false);
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

    function renderRow(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} >
                <ListItemButton>
                    <ListItemText primary={`Item ${index + 1}`} />
                </ListItemButton>
            </ListItem>
        );
    }

    /*function renderGroupRow(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} >
                <ListItemButton onClick={handleClickOpenAdminActions}>
                    <ListItemText primary={`Item ${index + 1}`} />
                </ListItemButton>
            </ListItem>
        );
    }*/

    function renderGroupRowAdmin(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} >
                <ListItemButton onClick={handleClickOpenUserActions}>
                    <ListItemText primary={`Item ${index + 1}`} />
                </ListItemButton>
            </ListItem>
        );
    }

    function renderGroupRow(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} >
                <ListItemButton href={`/user/${index + 1}`}>
                    <ListItemText primary={`Item ${index + 1}`} />
                </ListItemButton>
            </ListItem>
        );
    }

    return (
        <div>
            <Grid container style={{ top: 20 }} component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <Grid item xs={12} style={{ padding: '10px', display: 'flex', justifyContent: 'flex-start' }}>
                        <TextField className="searchBar" id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                        <IconButton aria-label="delete" style={{ marginTop: '10px' }} size="small" onClick={handleClickOpenCreateGroup}><GroupAddSharpIcon fontSize="large" /></IconButton>
                    </Grid>
                    <Divider />
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                            <ListItemText secondary="online" ></ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button key="Alice">
                            <ListItemIcon>
                                <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Alice">Alice</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button key="CindyBaker">
                            <ListItemIcon>
                                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                        </ListItem>
                        <Divider />
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        <ListItem button key="" onClick={handleClickOpenGroupInfo}>
                            <ListItemIcon>
                                <Avatar alt="Lorenzo" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText className="userNameChat" primary="Lorenzo"></ListItemText>
                            <ListItem>{status}</ListItem>
                        </ListItem>
                        <Divider />
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText primary="Hey man, What's up ?"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText secondary="09:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText primary="Hey, Iam Good! What about you ?" ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText secondary="09:31"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText primary="Cool. i am good, let's catch up!"></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText secondary="10:30"></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                        </Grid>
                        <Grid xs={1} >
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/*MODAL ADMIN IN GROUP ACTIONS */}
            <Dialog open={openAdminActions} onClose={handleCloseAdminActions}>
                <DialogTitle>Admin Actions</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Admin: taureli
                    </DialogContentText>
                    <DialogActions>
                    <Button variant="outlined" onClick={handleCloseAdminActions}>Mute</Button>
                    <Button variant="outlined" onClick={handleCloseAdminActions}>Kick</Button>
                    <Button variant="outlined" onClick={handleCloseAdminActions}>Ban</Button>
                    <Button variant="outlined" onClick={handleCloseAdminActions}>Promote</Button>
                    <Button variant="outlined" onClick={handleCloseAdminActions}>Demote</Button>
                    <Button variant="contained" onClick={handleCloseAdminActions}>Close</Button>
                </DialogActions>
                </DialogContent>
            </Dialog>
            {/*MODAL USER IN GROUP ACTIONS */}
            <Dialog open={openUserActions} onClose={handleCloseUserActions}>
                <DialogTitle>User Actions</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to block the user?
                    </DialogContentText>
                    <DialogActions>
                    <Button variant="outlined" onClick={handleCloseUserActions}>Block</Button>
                    <Button variant="contained" onClick={handleCloseUserActions}>Close</Button>
                </DialogActions>
                </DialogContent>
            </Dialog>
            {/*MODAL GROUP INFO */}
            <Dialog open={openGroupInfo} onClose={handleCloseGroupInfo}>
                <DialogTitle>Info</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Admin: taureli
                    </DialogContentText>
                    <Divider />
                    <DialogContentText>
                        Users
                    </DialogContentText>
                    <FixedSizeList

                        height={230}
                        width={500}
                        itemSize={46}
                        itemCount={10}
                        overscanCount={5}
                    >
                        {renderGroupRowAdmin}
                    </FixedSizeList>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseGroupInfo}>Lascia</Button>
                    <Button onClick={handleCloseGroupInfo}>Close</Button>
                </DialogActions>
            </Dialog>
            {/*MODAL BLOCK USER */}
            {/*<Dialog open={openGroupInfo} onClose={handleCloseGroupInfo}>
                <DialogTitle>Blocca</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sei sicuro di voler bloccare questo utente?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseGroupInfo}>Cancel</Button>
                    <Button onClick={handleCloseGroupInfo}>Blocca</Button>
                </DialogActions>
            </Dialog>*/}
            {/*MODAL CREARTE CHANNEL */}
            <Dialog open={openCreateGroup} onClose={handleCloseCreateGroup}>
                <DialogTitle>Create Group</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new group chat, please enter the name of the channel here:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Group Name"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <DialogContentText paddingTop={"10px"}>
                        Choose the channel's visibility:
                    </DialogContentText>
                    <NativeSelect
                        defaultValue={"Public"}
                        inputProps={{
                            name: 'visibility',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={"Public"}>Public</option>
                        <option value={"Private"}>Private</option>
                        <option value={"Protected"}>Protected</option>
                    </NativeSelect>
                    <DialogContentText paddingTop={"10px"} paddingBottom={"5px"}>
                        Add members to your channel group:
                    </DialogContentText>
                    <TextField className="friendBar" id="outlined-basic-email" label="Add a member" variant="outlined" fullWidth />
                    <FixedSizeList

                        height={230}
                        width={500}
                        itemSize={46}
                        itemCount={10}
                        overscanCount={5}
                    >
                        {renderRow}
                    </FixedSizeList>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateGroup}>Cancel</Button>
                    <Button onClick={handleCloseCreateGroup}>Create</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}