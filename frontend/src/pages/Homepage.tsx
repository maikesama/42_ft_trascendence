
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
import background from '../images/2.jpg'

let logged = false;

export const Homepage = () => {

    
    //https://img.freepik.com/free-vector/vector-cartoon-background-quest-room-with-closed-doors_33099-1202.jpg
    //d-flex justify-content-evenly align-items-center mw-100
    //w-50 h-50 d-inline-block
    //backgroundImage: `url(${background})`
    //d-flex justify-content-center align-items-center
	return (
        <>
        <Header/>
        <div className="container-fluid " id="bodybox">
                <div className="row" id="row">
                    <div className="col-md-6 d-flex justify-content-center align-items-center" id="classic">
                        <h1 className="modalityName">Classico</h1> 
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center" id="custom">
                        <h1 className="modalityName">Custom</h1> 
                    </div>
                </div>
        </div>
        </>
	);
}