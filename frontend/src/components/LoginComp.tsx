
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";


let logged = false;

export const LoginComp = () => {

	async function logFunction(evt: any) {
		evt.preventDefault();

		window.location.replace('/api/auth')
	}

	return (
		<>
			<div className="container">
				<div className="row"><h1 className="logTitle display-4">log to pong <sup>ポンに入る</sup>
				</h1></div>
				<div className="row loginform">
					<div className="col-3"></div>
					<div className="col-6">
						 <Form action="" onSubmit={logFunction}>
							<button type="submit" className="btn btn-secondary" >login</button>
						</Form>
					</div>
					<div className="col-3"></div>
				</div>
			</div>
		</>
	);
}