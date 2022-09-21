import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import { Header } from '../components/Header';
import headerImage from '../images/2.jpg';
import '../font/font.css';
import '../components/css/Utils.css';
import { url } from "inspector";
import { FriendsHeader } from "../components/FriendsHeader";
import { FriendsItem } from "../components/FriendsItem";
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { TextField } from "@mui/material";


export const Friends = () => {

	return (
		<>
			<Header />
			<div className="searchBar">
			<TextField className="searchText" id="searchText" label="Search..." variant="outlined"></TextField>
			</div>
			<FriendsHeader id="Profile" image="https://www.w3schools.com/w3images/avatar_g2.jpg" nickname="Nickname" username="Username" score="Score" status="Status" />
			<FriendsItem id="1" image="https://www.w3schools.com/w3images/avatar_g2.jpg" nickname="liafigli" username="DaBaby" score="1123" status="online" />
			<FriendsItem id="1" image="https://www.w3schools.com/w3images/avatar_g2.jpg" nickname="pippo" username="BossPoppin" score="345" status="offline" />
			<FriendsItem id="1" image="https://www.w3schools.com/w3images/avatar_g2.jpg" nickname="hdede" username="JoeMama" score="3475" status="error" />
		</>
	);
}