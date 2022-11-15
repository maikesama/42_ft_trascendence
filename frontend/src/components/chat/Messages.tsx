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

export const Messages = (props: any) => {
	const { idIntra } = useAuth();
	const messaggi: string[] = [];
	const el = document.getElementById('chat-feed');
	function MessageSent(props: any) {
		return (
			<>
				<div className="container-message lighter">
					{/* <img src={props.img} alt="Avatar" /> */}
					<Typography className="userSending">You</Typography>
					<Typography>{props.message}</Typography>
					<span className="time-right">{props.time}</span>
				</div>
			</>
		);
	}

	function MessageReceived(props: any) {
		return (
			<>
				<div className="container-message darker">
					{/* <img src={props.img} alt="Avatar" className="right" /> */}
					<Typography className="userSending">{props.friend}</Typography>
					<Typography className="message">{props.message}</Typography>
					<span className="time-right">{props.time}</span>
				</div>
			</>
		);
	}

    function ErrorMessage(props: any) {
		return (
			<>
				<div className="container-message-error" >
					{/* <img src={props.users.} alt="Avatar" className="right" /> */}
					<Typography className="message">{props.message}</Typography>
				</div>
			</>
		);
	}

	const classes = useStyles();
	const [openUserActions, setopenUserActions] = React.useState(false);
	// const [message, setMessage] = useState('Haloa');
	const [messages, setMessages] = useState([[{}]]);
	// const [map, setMap] = useState(new Map());
	const [message, setMessage] = useState('');
	const [idChat, setIdChat] = useState(props.idChat);
	// const isSecondRender = useRef(false);

	const handleMessage = (event: any) => {
		if (event.target.value !== '') {
			setMessage(event.target.value);
		}
		else {
			setMessage('Messaggio vuoto');
		}
	}

	console.log("idChat: " + props.idChat + " idChat: " + idChat);
	React.useEffect(() => {

		if ( idChat !== props.idChat || idChat) {
			setIdChat(props.idChat);
			setMessages(props.messages);
		}
	}, [props.idChat, props.messages]);

	const sendMessage = (e:any) => {
        e.preventDefault();
		console.log("message: " + message);
		socket.emit('prova', { idChat: props.idChat, message: message });
        setMessage('');
	}

	// console.log(messages)
	const handleClickOpenUserActions = () => {
		setopenUserActions(true);
	};

	const handleCloseUserActions = () => {
		setopenUserActions(false);
	};

	// console.log("iasjdhsjdihsadihasidhasidhiashdohiasdhiasd")
	// console.log("iasjdhsjdihsadihasidhasidhiashdohiasdhiasd")
	// console.log("iasjdhsjdihsadihasidhasidhiashdohiasdhiasd")
	// console.log("iasjdhsjdihsadihasidhasidhiashdohiasdhiasd")
	//scoll always donw chat
	React.useEffect(() => {
		if (el) {
			el.scrollTop = el.scrollHeight;
		}
	}, [messages]);


	// console.log(messages)
	return (
		<>
		{/* scoll down always */}
			<List className={classes.messageArea} id = "chat-feed">
				<Divider />
				{messages.map((message: any, index: any) => (

					<ListItem key={index} id={index}>
                        { message.errorMessage ? <ErrorMessage message={message.errorMessage} /> :
                            message.idIntra === idIntra ? <MessageSent message={message.message} time={message.time} img={message?.users?.img}/> :
                            <MessageReceived friend={message?.users?.userName} message={message.message} time={message.time} img={message?.users?.img}/> }
					</ListItem>
				))}
			</List>
			<Divider />
            <form onSubmit={sendMessage}>
                <Grid container style={{ padding: '20px' }}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth  onChange={e => setMessage(e.target.value)} value={message} />
                    </Grid>
                    <Grid xs={1} >
                        <Fab color="primary" aria-label="add" onClick={sendMessage}><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </form>

				{/* <input className="form-control" placeholder="Write a message" value={message}
					   onChange={e => setMessage(e.target.value)}
				/> */}

			{/*MODAL USER ACTIONS */}
			<UserActions status={openUserActions} closeStatus={handleCloseUserActions} />
		</>
	);
}


