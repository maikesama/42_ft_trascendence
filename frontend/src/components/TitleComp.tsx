import React from "react";
import axios from 'axios'
import { Form } from "react-bootstrap";




export const TitleComp = () => {

	async function logoutFunction(evt: any) {
		evt.preventDefault();

		axios.post('/api/auth/logout')
	}

	return (   <div className="App-header">
	<div className="row">
	  <div className="col-3"></div>
	  <div className="col-6">
		<div>
		  <h1>ft_trascendence</h1>
		</div>
	  </div>
	  <div className="col-3"></div>
	</div>
	<div className="row img">
	<div className="col-3"></div>
	  <div className="col-6"> <img src={"https://c.tenor.com/ayJE4OZN57MAAAAC/aniem.gif"} className="App-logo" alt="logo" /></div>
	  <div className="col-3"></div>
	</div>
	<div className="row">
					<div className="col-3"></div>
					<div className="col-6">
						 <Form action="" onSubmit={logoutFunction}>
							<button type="submit" className="btn btn-secondary" >logout</button>
						</Form>
					</div>
					<div className="col-3"></div>
				</div>
  </div>);
}