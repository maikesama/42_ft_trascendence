
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import {Navbar} from '../components/Navbar';
import {Header} from '../components/Header';
import {Modality} from '../components/Modality';
import ModalGame from '../components/ModalGame';
import headerImage from '../images/2.jpg';
import '../font/font.css';
import './css/Homepage.css';
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
        backgroundImage: `url(https://i.pinimg.com/originals/32/48/ce/3248cee8c0f7cb165130337f560e9043.gif)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: '100%',
        height: '100%',
        border: '3px solid black',
        opacity: 0.8
    }
    const modalityBox2 = {
        backgroundImage: `url(https://i.pinimg.com/originals/32/48/ce/3248cee8c0f7cb165130337f560e9043.gif)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: '100%',
        rotate: '180deg',
         height: '100%',
         border: '3px solid black',
         opacity: 0.8
    }

    const thebody = {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    }

    const home = {
        backgroundImage: `url(${headerImage})`,
        height: '100%',
        fontFamily: 'MyWebFont',
        backgroundRepeat: "no-repeat",
        backgroundSize: '100% 100%',
    }
    //https://img.freepik.com/free-vector/vector-cartoon-background-quest-room-with-closed-doors_33099-1202.jpg
    //d-flex justify-content-evenly align-items-center mw-100
    //w-50 h-50 d-inline-block
    //backgroundImage: `url(${background})`
    //d-flex justify-content-center align-items-center
	return (
        <>
        <Header/>
        <div className="container-fluid " id="bodybox">
                <div className="row" style={thebody}>
                    <div className="col-md-6 d-flex justify-content-center align-items-center" id="classic">
                        <h1 className="modalityName">Classico</h1> 
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center" id="custom">
                        <h1 className="modalityName">Invertito</h1> 
                    </div>
                </div>
        </div>
        </>
	);
}