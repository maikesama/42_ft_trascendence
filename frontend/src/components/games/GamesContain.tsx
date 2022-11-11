
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import "../css/Games.css";
export const socketGames = io(`http://${process.env.REACT_APP_HOST_URI}:8003/games`, { transports: ['websocket'] });


export const GamesContain = (props: any) => {
    // axios.get('api/getinfo').then(data=>data.json() )
    //console.log(props.match.params.username)
    const [loading, setLoading] = useState(false);
    const [isConnectedGames, setIsConnectedGames] = useState(socketGames.connected);
    console.log("Games", isConnectedGames)
    useEffect(() => {
        socketGames.on('connect', () => {
                setIsConnectedGames(true);
        } );
        socketGames.emit('newPlayer');
        socketGames.on('disconnect', () => {
                setIsConnectedGames(false);
        });

        // const drawPlayer = (player: any) => {
        //     ctx.beginPath();
        //     ctx.rect(player.x, player.y, player.width, player.height);
        //     ctx.fillStyle = '#0095DD';
        //     ctx.fill();
        //     ctx.closePath();
        //   };

        // socketGames.on('state', (gameState) => {
        //     for (let player in gameState.players) {
        //       drawPlayer(gameState.players[player])
        //     }
        //   }

        const playerMovement = {
            up: false,
            down: false,
            left: false,
            right: false
          };
          const keyDownHandler = (e:any) => {
            if (e.keyCode == 39) {
             playerMovement.right = true;
            } else if (e.keyCode == 37) {
              playerMovement.left = true;
            } else if (e.keyCode == 38) {
              playerMovement.up = true;
            } else if (e.keyCode == 40) {
              playerMovement.down = true;
            }
          };
          const keyUpHandler = (e:any) => {
            if (e.keyCode == 39) {
              playerMovement.right = false;
            } else if (e.keyCode == 37) {
              playerMovement.left = false;
            } else if (e.keyCode == 38) {
              playerMovement.up = false;
            } else if (e.keyCode == 40) {
              playerMovement.down = false;
            }
          };

          setInterval(() => {
            socketGames.emit('playerMovement', playerMovement);
          }, 1000 / 60);
          document.addEventListener('keydown', keyDownHandler, false);
          document.addEventListener('keyup', keyUpHandler, false);

        
    }, []);
    
    return (
        <>
            <head>
                <title>Gamedev Canvas Workshop</title>
                
            </head>
            <body>
                <canvas id="myCanvas" width="480" height="320"></canvas>
            </body>
        </>
    );

}