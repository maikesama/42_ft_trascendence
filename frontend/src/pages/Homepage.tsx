
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

	return (
        <>
        <Header/>
        <div style={{backgroundColor: '#764ABC', padding: 15, color: 'white'}} >
            <div style={{ padding: 15}}>
                <img src={background} alt="" style={{width: '100%'}}/>
                <div style={{position: 'absolute', top: '60%', left:'20%', display: 'flex' }}>
                    <Modality  page="/classico" name="Classico"/>
                    <Modality page="/invertito" name="Invertito"/>
                </div>
            </div>
        </div>
        
        </>
	);
}