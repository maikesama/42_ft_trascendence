import React, { useState, useEffect } from "react";
import { Header } from '../components/generic/Header';
import { LeaderboardHeader } from "../components/leaderboard/LeaderboardHeader";
import { LeaderboardItem } from "../components/leaderboard/LeaderboardItem";
import { socket } from "../App";

import '../font/font.css';



export const Leaderboard = () => {

	const [user, setUser] = useState({} as any);

    const leaderboardItem = {
        width: '80%',
        backgroundColor: '#f5f4f2',
        borderRadius: 8,
        height: 50,
        margin: 'auto',
        marginTop: 15,
        alignItems: 'space-between',
        padding: 5,
    }

	useEffect(() => {
		const url = `http://${process.env.REACT_APP_HOST_URI}/api/games/getLeaderboard`;

		const fetchData = async () => {
			try {
				const response = await fetch(url, {
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					}
				});
				const json = await response.json();
				
				setUser(json);
			} catch (error) {
				
			}
		};

		fetchData();
		socket.off('trigger').on('trigger', () => {
			fetchData();
		})

	}, []);

	return (
		<>
			<Header />
			{/* <div className='d-flex justify-content-evenly align-items-end'>
			<table> */}
			<LeaderboardHeader id="Profile" image="https://www.w3schools.com/w3images/avatar_g2.jpg" nickname="Nickname" win="Wins" score="Score" status="Status" />
			{
				Object.values(user).map((user: any, index: number) => (

						<LeaderboardItem intra={user.idIntra} key={user.id} index={index} id={user.id} image={user.img} nickname={user.userName} win={user.win} score={user.rank} status={user.status === 0 ? "offline" : user.status === 1 ? "online" : "in game"} />

				))
			}
			{/* </table>
			</div> */}
		</>
	);
}
