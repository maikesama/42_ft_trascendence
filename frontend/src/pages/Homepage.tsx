
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import {Navbar} from '../components/Navbar';
import '../font/font.css';

let logged = false;

export const Homepage = () => {

	return (
        <>
        <Navbar />
        <div className="container-fluid" style={{border: 5}}>
            <div className="row" style={{border: '1px red'}}>
                <div className="col-10" ></div>
                <div id="menu" className="col-2 menu" style={{backgroundColor: 'white',marginLeft:15, marginRight:5, width:'15%', height: '10%', display: 'none'}}>
                    <ul>
                        <li>Profile</li>
                        <li>Settings</li>
                        <li>Logout</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <h1 style={{color : 'white', fontFamily: 'MyWebFont'}}>42 PONG</h1>
                </div>
            </div>
        </div>
        <hr style={{color: 'white'}}/>
        <div className="container mt-5">
            <div className="row">
                <div className="col-6">
                    <a href="./home" style={{transform: 'none', color : 'trasparent',textDecoration: 'none'}}>
                    <h3 style={{color : 'white', fontFamily: 'MyWebFont'}}>CLASSICO</h3>
                    </a>
                </div>
                <div className="col-6">
                    <a href="./home" style={{transform: 'none', color : 'trasparent',textDecoration: 'none'}}>
                    <h3 style={{color : 'white', fontFamily: 'MyWebFont'}}>INVERTITO</h3>
                    </a>
                </div>
            </div>
        </div>
        </>
	);
}