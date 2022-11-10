import {Header} from '../components/generic/Header';
import React, { useState, useEffect } from "react";
import '../font/font.css';
import './css/Homepage.css';
import { TwofaOn } from '../components/profile/TwofaOn';

let logged = false;

export const Twofa = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

	return (
        <>
        <Header/>
        <button onClick={handleOpen}>ciao</button>
        <TwofaOn status={open} closeStatus={handleClose}/>
        </>
	);
}