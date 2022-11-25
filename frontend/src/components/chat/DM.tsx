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
import { Link as RouterLink } from 'react-router-dom';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import Link from '@mui/material/Link';
import { socket } from "../../App";
import "../css/Message.css";
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	chatSection: {
		width: '100%',
		height: '85vh'
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
	friend: {
		border: "2px solid lightgray",
		borderRadius: "10px",
		marginTop: "10px",
		width: "35%",
	},
	myMessage: {
		border: "2px solid lightgreen",
		borderRadius: "10px",
		marginTop: "10px",
		width: "35%",
	},
});


//Array di testing
// const messaggi: string[] = [];

export const DM = (props: any) => {
	let navigate = useNavigate();
	// const { idIntra } = useAuth();
	// function MessageSent(props: any) {
	// 	return (
	// 		<>
	// 			<div className="container-message lighter">
	// 				{/* <img src="https://www.w3schools.com/w3images/avatar_g2.jpg" alt="Avatar" /> */}
	// 				<Typography className="userSending">You</Typography>
	// 				<Typography>{props.message}</Typography>
	// 				<span className="time-right">{props.time}</span>
	// 			</div>
	// 		</>
	// 	);
	// }

	// function MessageReceived(props: any) {
	// 	return (
	// 		<>
	// 			<div className="container-message darker">
	// 				{/* <img src="https://www.w3schools.com/w3images/bandmember.jpg" alt="Avatar" className="right" /> */}
	// 				<Typography className="userSending">{props.friend}</Typography>
	// 				<Typography className="message">{props.message}</Typography>
	// 				<span className="time-right">{props.time}</span>
	// 			</div>
	// 		</>
	// 	);
	// }

	const classes = useStyles();
	const [openUserActions, setopenUserActions] = React.useState(false);
	// const [message, setMessage] = useState('Haloa');
	// const [messages, setMessages] = useState([[{}]]);
	// const [map, setMap] = useState(new Map());
	// const [message, setMessage] = useState('');
	// const [idChat, setIdChat] = useState(props.idChat);
	// const isSecondRender = useRef(false);

	// const handleMessage = (event: any) => {
	// 	if (event.target.value !== '') {
	// 		setMessage(event.target.value);
	// 	}
	// 	else {
	// 		setMessage('Messaggio vuoto');
	// 	}
	// }

	
	// React.useEffect(() => {

	// 	if ( idChat !== props.idChat || idChat) {
	// 		setIdChat(props.idChat);
	// 		setMessages(props.messages);
	// 	}
	// }, [props.idChat, props.messages]);

	// const sendMessage = () => {
	
	// 	socket.emit('prova', { idChat: props.idChat, message: message });

	// }
	
	const handleClickOpenUserActions = () => {
		setopenUserActions(true);
	};

	const handleCloseUserActions = () => {
		setopenUserActions(false);
	};

	const handleInvite = () => {
		
		socket.emit('notification', { type: 2, idIntra: props.idIntra});
		// navigate('/games/1' + props.idIntra);
		// window.location.assign("/games/1" + props.idIntra);
		window.location.href = "/games/1" + props.idIntra;
	};

	return (
		<>
			{/* <List className={classes.messageArea}> */}
				<ListItem key="">
					<Link key={`/Profile/other`} component={RouterLink} to={`/Profile/${props.idIntra}`} underline="none" color="inherit" sx={{display: "contents"}}>
						<img src={props.img} style={{ width: '50px', height: '50px', borderRadius: '100%' }} />
						<h5 className="userNameChat" style={{ width: '150px', marginLeft: '50px'}}>{props.nickname}</h5>
					</Link>
					<IconButton aria-label="inviteGame" onClick={handleInvite} style={{ color: 'green', width: '50px', height: '50px' }} size="large" ><SportsEsportsOutlinedIcon fontSize="large" /></IconButton>
				</ListItem>
				{/* <Divider />
				{messages.map((message: any, index: any) => (
					<ListItem key={index}>
						{ message.idIntra === idIntra && <MessageSent message={message.message} time={message.sendedAt} />}
						{ message.idIntra !== idIntra && <MessageReceived message={message.message} time={message.sendedAt} friend={message?.users?.userName} />}
					</ListItem>
				))} */}
			{/* </List> */}
			{/* <Divider /> */}
			{/* <Grid container style={{ padding: '20px' }}>
				<Grid item xs={11}>
					<TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={handleMessage} />
				</Grid>
				<Grid xs={1} >
					<Fab color="primary" aria-label="add" onClick={sendMessage}><SendIcon /></Fab>
				</Grid>
			</Grid>
			{/*MODAL USER ACTIONS */}
			{/* <UserActions status={openUserActions} closeStatus={handleCloseUserActions} />  */}
		</>
	);
}


