import { Header } from '../components/generic/Header';
import React, { useState, useEffect, useRef } from "react";
import '../font/font.css';
import './css/Homepage.css';
import { TwofaOn } from '../components/profile/TwofaOn';
import { Alert } from '../components/generic/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Typography from '@mui/material/Typography';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { TextField } from '@mui/material';

let logged = false;

export const Twofa = () => {
    const [open, setOpen] = useState(false);
    const [message, setMesage] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    let code = useRef<any>('');

    async function verifyCode() {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/auth/2fa/verify`;

        const fetchData = async () => {
            try {
                console.log("ciao");
                const response = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        totp: code.current.value,
                    })
                });
                const json = await response.json();
                if (json.status === 200) {
                    // window.location.replace('/middleware');
                    console.log("ciao");
                }
                else {
                    setMesage(json.message);
                }
            } catch (error) {
                window.location.replace('/middleware');
                console.log("error", error);
            }
        };
            fetchData();
    }


        return (
            // <>
            //     <Header />
            //     <DialogTitle>Insert Google Authenticator 42Pong Code</DialogTitle>
            //     <DialogContent>
            //         <TextField placeholder='insert code' variant='standard' inputRef={code} />
            //     </DialogContent>
            //     <DialogContent>
            //         <Button variant="contained" onClick={verifyCode}>Submit</Button>
            //     </DialogContent>
            //     {/* <Alert status={open} handleClose={handleClose} /> */}
                <>
			<section className="vh-100" id="back" style={{backgroundColor: '#282c34'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card" style={{borderRadius: '1rem'}}>
                    <div className="row g-0" >
                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png"
                            alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem', objectFit: 'cover', maxHeight: '80%', maxWidth: '80%', marginTop: '42px'}} />
                        </div>
                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">
                            <div className="align-items-center mb-3 pb-1">
                                <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                                <span className="h1 fw-bold mb-0 center">2FA Code</span>
                            </div>
                            {/* <h5 className="align-items-center fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5> */}
                            <TextField className="align-items-center fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}} placeholder='insert code' variant='standard' inputRef={code} />
                            {message && <h5 className="align-items-center fw-normal mb-3 pb-3" style={{letterSpacing: '1px', color: 'red'}}>{message}</h5>}
                            <div className="pt-1 mb-4">
                                <button className="btn btn-dark btn-lg btn-block" onClick={verifyCode}>Submit</button>
                            </div>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
		</>
        );
    }
