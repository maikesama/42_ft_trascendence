
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import {Navbar} from '../components/Navbar';
import {Header} from '../components/Header';

import '../font/font.css';

let logged = false;

export const Leaderboard = () => {
    const modality = {
        color : 'white',
        fontFamily: 'MyWebFont'
    }
    const linkModality = {
        transform: 'none',
        color : 'trasparent',
        textDecoration: 'none'
    }
    

	return (
        <>
        <Header />
        
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <h1 style={modality}>42 PONG</h1>
                </div>
            </div>
        </div>
        <hr style={{color: 'white'}}/>
        <div className="container mt-5">
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
        </>
	);
}