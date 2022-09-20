
import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
import {Navbar} from '../components/Navbar';
import {Header} from '../components/Header';
import { LeaderboardHeader } from "../components/LeaderboardHeader";
import { LeaderboardItem } from "../components/LeaderboardItem";


import '../font/font.css';

let logged = false;

export const Leaderboard = () => {
 
	return (
        <>
        <Header/>
        <LeaderboardHeader id="Profile" image="https://www.w3schools.com/w3images/avatar_g2.jpg" nickname="Nickname" guilds="Guilds" score="Score" status="Status"/>
        <LeaderboardItem id="1" image="https://www.w3schools.com/w3images/avatar_g2.jpg" nickname="liafigli" guilds="42Dragons" score="1123" status="online"/>
        <LeaderboardItem id="1" image="https://www.w3schools.com/w3images/avatar_g2.jpg" nickname="pippo" guilds="42Dragons" score="345" status="offline"/>
        <LeaderboardItem id="1" image="https://www.w3schools.com/w3images/avatar_g2.jpg" nickname="hdede" guilds="42Dragons" score="3475" status="error"/>
        </>
	);
}