
import axios from "axios";
import React, {useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import {Header} from '../components/generic/Header';
import { LeaderboardHeader } from "../components/leaderboard/LeaderboardHeader";
import { LeaderboardItem } from "../components/leaderboard/LeaderboardItem";


import '../font/font.css';

let logged = false;

export const Leaderboard = () => {
        
        const [user, setUser] = useState({} as any);

        useEffect(() => {
        const url = "http://10.11.11.3:3333/games/getLeaderboard";

        const fetchData = async () => {
        try {
                const response = await fetch(url, {
                credentials: 'include',
                headers:{
                'Content-Type': 'application/json',
                }
        });
                const json = await response.json();
                console.log(json);
                setUser(json);
        } catch (error) {
                console.log("error", error);
        }
        };

        fetchData();
        }, []);

	return (
        <>
        <Header/>
        <LeaderboardHeader id="Profile" image="https://www.w3schools.com/w3images/avatar_g2.jpg" nickname="Nickname" win="Wins" score="Score" status="Status"/>
        {
                Object.values(user).map((user: any, index: number) => (
                <LeaderboardItem key={user.id} index={index} id={user.id} image={user.img} nickname={user.idIntra} win={user.win} score={user.rank} status="online"/>
                ))
        }
        </>
	);
}