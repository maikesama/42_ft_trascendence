import React, {useState, useEffect} from "react";
import {Header} from '../components/generic/Header';
import { LeaderboardHeader } from "../components/leaderboard/LeaderboardHeader";
import { LeaderboardItem } from "../components/leaderboard/LeaderboardItem";
import { socket } from "../App";

import '../font/font.css';

let logged = false;

export const Leaderboard = () => {

        const [user, setUser] = useState({} as any);

        useEffect(() => {
        const url = `http://${process.env.REACT_APP_HOST_URI}/api/games/getLeaderboard`;

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
        socket.on('trigger',() => {
                // let newUser = user;
                // console.log(JSON.stringify(newUser));
                // Object.values(newUser).map((user: any) => {
                // if (user.idIntra === data.idIntra) {
                //         // user.status = data.status;
                // }
                //         return user;
                // });
                // console.log(user)
                // console.log(JSON.stringify(newUser));
                // setUser(newUser);
                fetchData();
        })

        }, []);

	return (
        <>
        <Header/>
        <LeaderboardHeader id="Profile" image="https://www.w3schools.com/w3images/avatar_g2.jpg" nickname="Nickname" win="Wins" score="Score" status="Status"/>
        {
                Object.values(user).map((user: any, index: number) => (
                <LeaderboardItem key={user.id} index={index} id={user.id} image={user.img} nickname={user.userName} win={user.win} score={user.rank} status={user.status === 0 ? "offline" : user.status === 1? "online" : "in game"}/>
                ))
        }
        </>
	);
}
