
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import "../css/Games.css";
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
export const socketGames = io(`http://${process.env.REACT_APP_HOST_URI}:8003/games`, { transports: ['websocket'] });
const LoserImage = "https://media.tenor.com/d3zUdl35mIcAAAAC/jeremy-clarkson-loser.gif"
const WinnerImage = "https://media.tenor.com/pb2ufwunHIwAAAAC/mario-kart-ds-mario-kart.gif"
// let ctx:any;
export const GamesContain = (props: any) => {
    // axios.get('api/getinfo').then(data=>data.json() )
    //console.log(props.match.params.username)
    // const [loading, setLoading] = useState(false);
    const [esit, setEsit] = useState<string | null>(null);
    const [isConnectedGames, setIsConnectedGames] = useState(socketGames.connected);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    console.log("Games", isConnectedGames)


    useEffect(() => {
        socketGames.on('connect', () => {
                setIsConnectedGames(true);
        } );
        socketGames.emit('newPlayer');
        socketGames.emit('pong');
        socketGames.on('disconnect', () => {
                setIsConnectedGames(false);
        });
        const canvas = canvasRef.current;
        if (!canvas) {
          return ;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return ;
        }

        const drawRect = (x:any, y:any, w:any, h:any, color:any) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        }

        const drawArc = (x:any, y:any, r:any, color:any) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x,y,r,0,Math.PI*2,true);
          ctx.closePath();
          ctx.fill();
        }

        const drawNet = (net:any) => {
          for(let i = 0; i <= canvas.height; i+=15){
              drawRect(net.x, net.y + i, net.width, net.height, net.color);
          }
        }

        const drawText = (text:any,x:any,y:any) => {
          ctx.fillStyle = "#FFF";
          ctx.font = "75px fantasy";
          ctx.fillText(text, x, y);
      }

      const render = (user:any, ball:any, net:any, com: any) => {

        // clear the canvas
        drawRect(0, 0, canvas.width, canvas.height, "#000");

        // draw the user score to the left
        drawText(user.score,canvas.width/4,canvas.height/5);

        // draw the COM score to the right
        drawText(com.score,3*canvas.width/4,canvas.height/5);

        // draw the net
        drawNet(net);

        // draw the user's paddle
        drawRect(user.x, user.y, user.width, user.height, user.color);

        // draw the COM's paddle
        drawRect(com.x, com.y, com.width, com.height, com.color);

        // draw the ball
        drawArc(ball.x, ball.y, ball.radius, ball.color);
    }

        socketGames.on('state', (gameState:any ) => {
          console.log("gameState", gameState.players)
          render(gameState.user, gameState.ball, gameState.net, gameState.com)
        });

        socketGames.on('lose', (gameState:any ) => {
          setEsit(LoserImage)
          console.log("lose")
        });

        socketGames.on('win', (gameState:any ) => {
          setEsit(WinnerImage)
          console.log("win")
        });

        const playerMovement = {
            up: false,
            down: false,
            left: false,
            right: false
          };
          const keyDownHandler = (e:any) => {
            if (e.keyCode === 39) {
             playerMovement.right = true;
            } else if (e.keyCode === 37) {
              playerMovement.left = true;
            } else if (e.keyCode === 38) {
              playerMovement.up = true;
            } else if (e.keyCode === 40) {
              playerMovement.down = true;
            }
          };
          const keyUpHandler = (e:any) => {
            if (e.keyCode === 39) {
              playerMovement.right = false;
            } else if (e.keyCode === 37) {
              playerMovement.left = false;
            } else if (e.keyCode === 38) {
              playerMovement.up = false;
            } else if (e.keyCode === 40) {
              playerMovement.down = false;
            }
            //sapce
            // if (e.keyCode === 32) {
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
                <canvas id="myCanvas" width="1000" height="600" ref={canvasRef}></canvas>
                {esit && <div id="esit"><div><img src={esit} alt="lose" width="20%" height="20%"/></div><Link key={"home"} component={RouterLink} to={"/"}><button id="buttonGameHome">Home</button></Link></div>}
            </body>
        </>
    );

}
