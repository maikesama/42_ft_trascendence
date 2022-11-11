
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const socketGames = io(`http://${process.env.REACT_APP_HOST_URI}:8003/games`, { transports: ['websocket'] });

export const GamesContain = (props: any) => {
    // axios.get('api/getinfo').then(data=>data.json() )
    //console.log(props.match.params.username)
    const [loading, setLoading] = useState(false);
    const [isConnectedGames, setIsConnectedGames] = useState(socketGames.connected);
    console.log("Games", isConnectedGames)
    useEffect (() => {
         socketGames.on('connect', () => {
                setIsConnectedGames(true);
            }
        );
        socketGames.on('disconnect', () => {
                setIsConnectedGames(false);
            }
        );
    }, [])

    return (
        <>
        <div className="container" style={{background: "white"}}>
        <div className="row">
        <div className="col-12">
        <h1> Games </h1>
        </div>
        </div>
        </div>
        </>
    );
    
}