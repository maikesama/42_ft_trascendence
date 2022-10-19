
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import Background from "../images/backLanding.jpg"
import './css/Homepage.css';

let logged = false;

export const Landing = () => {

	async function logFunction(evt: any) {
		evt.preventDefault();

		window.location.replace(`http://10.11.10.4:3333/auth`)
	}

	return (
		<>
			<section className="vh-100" id="back" style={{backgroundColor: '#282c34'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card" style={{borderRadius: '1rem'}}>
                    <div className="row g-0">
                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/2048px-42_Logo.svg.png"
                            alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem', objectFit: 'cover', maxHeight: '80%', maxWidth: '80%', marginTop: '42px'}} />
                        </div>
                        <div className="col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">
                            <form>
                            <div className="align-items-center mb-3 pb-1">
                                <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                                <span className="h1 fw-bold mb-0 center">Sign-in</span>
                            </div>
                            <h5 className="align-items-center fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
                            <div className="pt-1 mb-4">
                                <button className="btn btn-dark btn-lg btn-block" onClick={logFunction}>Login</button>
                            </div>
                            </form>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
		</>
	);
}