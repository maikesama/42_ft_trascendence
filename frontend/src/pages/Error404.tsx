
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import '../font/font.css';

let logged = false;

export const Error404 = () => {
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

	return (
        <>
        <div className="container-fluid" style={{border: 5}}>
            <div className="row" style={{border: '1px red'}}>
                <div className="col-10"></div>
                <div id="menu" className="col-2 menu" style={menu}>
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
                <div className="col-12" >
                    <h1 style={modality}>ERRORE 404</h1>
                </div>
            </div>
        </div>
        </>
	);
}