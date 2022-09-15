
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import {Navbar} from '../components/Navbar';
import {Header} from '../components/Header';
import {Modality} from '../components/Modality';

import '../font/font.css';
import { url } from "inspector";
import background from '../images/bg_room.jpg'

let logged = false;

export const Homepage = () => {

    const headerHeight = '150px';

    const modality = {
        color : 'white',
        fontFamily: 'MyWebFont'
    }
    const linkModality = {
        transform: 'none',
        color : 'trasparent',
        textDecoration: 'none'
    }
    const menu = {
        backgroundColor: 'white',
        marginLeft:15,
        marginRight:5,
        width:'15%',
        height: '10%',
        display: 'none'
    }
    const lightText = {
        color: 'white',
        backgroundColor : '#510ac2',
        borderRadius: 4,
        padding: 15,
        marginTop: '2%'
    }

    const submitButton = {
        width: '25%',
        marginTop: 15
    }

    const pongMod = "https://i.gifer.com/QgxJ.gif";

    const modalityBox = {
         height: '100%', border: '3px solid black', opacity: 0.8
    }
    //d-flex justify-content-evenly align-items-center mw-100
    //w-50 h-50 d-inline-block
    //backgroundImage: `url(${background})`
    //d-flex justify-content-center align-items-center
	return (
        <>
        <Header/>
        <div className="container-fluid " style={{height: `calc(100vh - ${headerHeight})`, backgroundColor: 'grey', backgroundSize: '100%', }}>
            <div className="row " style={{height: '20vh'}}>
                <div className="col-md-12 d-flex justify-content-center align-items-center" style={{backgroundColor: 'lightgrey',height: '100%', fontFamily: 'MyWebFont'}}>
                    <h1>TRANSCENDENCE PONG GAME</h1>
                </div>
            </div>
            <div className="row" style={{height: `calc(80vh - ${headerHeight}) `}}>
                <div className="col-md-6" style={modalityBox}>
                    FT_TRANSCENDENCE PONG GAME
                </div>
                <div className="col-md-6" style={modalityBox}>
                    FT_TRANSCENDENCE PONG GAME
                </div>
            </div>
        </div>
        </>
	);
}