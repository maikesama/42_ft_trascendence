
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import {Navbar} from '../components/Navbar';
let logged = false;

export const Homepage = () => {

	async function logFunction(evt: any) {
		evt.preventDefault();

		window.location.replace('/api/auth')
	}

	return (
        <>
        <Navbar />
        </>
	);
}