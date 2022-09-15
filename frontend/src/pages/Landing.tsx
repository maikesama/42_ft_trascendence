
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";


let logged = false;

export const Landing = () => {

	async function logFunction(evt: any) {
		evt.preventDefault();

        //home
		window.location.replace(`http://localhost:3333/auth`)
	}

	return (
		<>
			<section className="vh-100" style={{backgroundColor: '#9A616D'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    <div className="card" style={{borderRadius: '1rem'}}>
                    <div className="row g-0">
                        <div className="col-md-6 col-lg-5 d-none d-md-block">
                        <img src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=1380&t=st=1662554718~exp=1662555318~hmac=d1f6a6ae7626fabc810c71eb771dc9742d6b721985d99dc2704bb8de8de3c97f"
                            alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem', objectFit: 'cover'}} />
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