
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";


let logged = false;

export const LoginComp = () => {

	const logFunction = (evt: any) => {
		evt.preventDefault();

		window.location.replace('http://localhost:3333/auth');
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
							{/* <div className="form-group mb-4">
								<label htmlFor="inputUsername" className="form-label">username</label>
								<input type="text" placeholder="e.g. FruitLover69" className="form-control" id="inputUsername" name="username" required />
							</div>
							<div className="form-group mb-5">
								<label htmlFor="inputPassword" className="form-label">password</label>
								<input type="password" placeholder="e.g. AppleNanas" className="form-control" id="inputPassword" name="password" required />
							</div>  */}
							<button type="submit" className="btn btn-secondary" >login</button>
						</Form>
					</div>
					<div className="col-3"></div>
				</div>
			</div>
		</>
	);
}