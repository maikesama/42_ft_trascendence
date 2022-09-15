import {LeaderboardItem} from '../components/LeaderboardItem'
import {LeaderboardHeader} from '../components/LeaderboardHeader'
import {Header} from '../components/Header'
import background from '../images/bg_room.jpg'
import axios from "axios";
import React, {useState, useEffect} from "react";


export const Test = () => {

        const [post, setPost] = useState("");

        React.useEffect(() => {
                axios.get('http://localhost:3333/auth/user').then((response) => {
                        //console.log(JSON.stringify(response.data));
                        setPost(response.data);
                });
        }, []);

        //if (!post) console.log("No post!")

	return (
        <>
        <div>
                <h1 style={{color: 'white'}}>{JSON.stringify(post[0])}</h1>
        </div>
        </>
	);
}