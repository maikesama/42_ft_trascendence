import {Header} from '../components/generic/Header';
import React, { useState, useEffect } from "react";
import '../font/font.css';
import './css/Homepage.css';
import { TwofaOn } from '../components/profile/TwofaOn';
import {Alert} from '../components/generic/Alert';

let logged = false;

export const Twofa = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

	return (
        <>
        <Header/>
        <button onClick={handleOpen}>ciao</button>
        <Alert status={open} handleClose={handleClose} />
        {/* <TwofaOn status={open} closeStatus={handleClose}/> */}
        </>
	);
}