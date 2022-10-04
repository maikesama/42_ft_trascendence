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

    const [openA, setOpenA] = React.useState(false);
    const [openB, setOpenB] = React.useState(false);

    const handleClickOpenA = () => {
        setOpenA(true);
    };

    const handleCloseA = () => {
        setOpenA(false);
    };

    const handleClickOpenB = () => {
        setOpenB(true);
    };

    const handleCloseB = () => {
        setOpenB(false);
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

    return (
        <div>
            <Grid container style={{ top: 20 }} component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <Grid item xs={12} style={{ padding: '10px', display: 'flex', justifyContent: 'flex-start' }}>
                        <TextField className="searchBar" id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                        <IconButton aria-label="delete" style={{ marginTop: '10px' }} size="small" onClick={handleClickOpenA}><GroupAddSharpIcon fontSize="large" /></IconButton>
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
                        <ListItem button key="" onClick={handleClickOpenB}>
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
            {/*MODAL BLOCK USER */}
            <Dialog open={openB} onClose={handleCloseB}>
                <DialogTitle>Blocca</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sei sicuro di voler bloccare questo utente?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseB}>Cancel</Button>
                    <Button onClick={handleCloseB}>Blocca</Button>
                </DialogActions>
            </Dialog>
            {/*MODAL CREARTE CHANNEL */}
            <Dialog open={openA} onClose={handleCloseA}>
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
                    <Button onClick={handleCloseA}>Cancel</Button>
                    <Button onClick={handleCloseA}>Create</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}