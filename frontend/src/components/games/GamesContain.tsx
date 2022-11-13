
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import "../css/Games.css";
export const socketGames = io(`http://${process.env.REACT_APP_HOST_URI}:8003/games`, { transports: ['websocket'] });

// let ctx:any;
export const GamesContain = (props: any) => {
    // axios.get('api/getinfo').then(data=>data.json() )
    //console.log(props.match.params.username)
    const [loading, setLoading] = useState(false);
    const [isConnectedGames, setIsConnectedGames] = useState(socketGames.connected);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    console.log("Games", isConnectedGames)


    useEffect(() => {
        socketGames.on('connect', () => {
                setIsConnectedGames(true);
        } );
        socketGames.emit('newPlayer');
        socketGames.on('disconnect', () => {
                setIsConnectedGames(false);
        });
        // var canvas = document.querySelector('canvas');
        // var c = document.getElementById("myCanvas");
        // const ctx = canvas.getContext('2d');
        const canvas = canvasRef.current;
        if (!canvas) {
          return ;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return ;
        }
        const drawPlayer = (player: any) => {
            ctx.beginPath();
            ctx.rect(player.x, player.y, player.width, player.height);
            ctx.fillStyle = '#0095DD';
            ctx.fill();
            ctx.closePath();
          };

          const drawBall = (ball: any) => {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.closePath();
          }

        socketGames.on('state', (gameState:any ) => {
          // console.log("sono qui")
          // console.log(gameState)
          console.log("gameState", gameState.players)
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          for (let player in gameState.players) {
            drawPlayer(gameState.players[player])
          }
          drawBall(gameState.ball);
          });

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
            //sapce
            // if (e.keyCode == 32) {
            //   socketGames.emit('shoot');
            // }
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
                <canvas id="myCanvas" width="600" height="400" ref={canvasRef}></canvas>
            </body>
        </>
    );

}
