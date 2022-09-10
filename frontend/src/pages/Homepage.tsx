
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import {Navbar} from '../components/Navbar';
import {Header} from '../components/Header';

import '../font/font.css';

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
        <div className="container box-modality" style={lightText}>
            <div className="container mt-4" style={{justifyContent: 'center', alignItems: 'center'}}>
                <div className="row">
                    <div className="col-12" style={lightText}>
                        <h1 style={modality}>42 PONG</h1>
                    </div>
                </div>
            </div>
            <hr style={{color: 'white'}}/>
            <div className="container mt-5" style={lightText}>
                <div className="row">
                    <div className="col-6">
                        <a href="./home" style={linkModality}>
                        <h3 style={modality}>CLASSICO</h3>
                        </a>
                    </div>
                    <div className="col-6">
                        <a href="./home" style={linkModality}>
                        <h3 style={modality}>INVERTITO</h3>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </>
	);
}