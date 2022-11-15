
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import "../css/Games.css";
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
export const socketGames = io(`http://${process.env.REACT_APP_HOST_URI}:8003/games`, { transports: ['websocket'] });
const LoserImage = "https://media.tenor.com/d3zUdl35mIcAAAAC/jeremy-clarkson-loser.gif"
const WinnerImage = "https://media.tenor.com/pb2ufwunHIwAAAAC/mario-kart-ds-mario-kart.gif"
const GameNotFoundImage = "https://media.tenor.com/GuqY6L8lsBoAAAAC/not-found.gif"
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useParams } from 'react-router';
import { socket } from '../../App';

// let ctx:any;
export const GamesContain = (props: any) => {
    // axios.get('api/getinfo').then(data=>data.json() )
    //console.log(props.match.params.username)
    // const [loading, setLoading] = useState(false);
    const params = useParams()
    const [esit, setEsit] = useState<string | null>(null);
    const [start, setStart] = useState(false);
    const [restart, setReStart] = useState(false);
    const [loading, setLoading] = useState(true);
    // console.log("id", )
    // const [userLeft, setUserLeft] = useState(null);
    // const [userRight, setUserRight] = useState(null);

    const [isConnectedGames, setIsConnectedGames] = useState(socketGames.connected);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    console.log("Games", isConnectedGames)


    useEffect(() => {
        socketGames.on('connect', () => {
                setIsConnectedGames(true);
        } );
        socketGames.emit('newPlayer', params.idIntra);
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

      const drawUsername = (text:any,x:any,y:any) => {
        ctx.fillStyle = "#FFF";
        ctx.font = "35px fantasy";
        ctx.fillText(text, x, y);
      }

      const drawImg = (img:any,x:any,y:any, width:any, height:any) => {
        //size of image
        var newImg = new Image(100,100);
        newImg.src = img;
        newImg.onload=function(){
          ctx.drawImage(newImg, x, y, width, height);
        }

// image.onload=function(){
// context.drawImage(image,0,0,canvas.width,canvas.height);
// };
// image.src="http://www.lunapic.com/editor/premade/transparent.gif";
      }

      //draw powerUp



      const render = (user:any, ball:any, net:any, com: any, powerUp: any) => {

        // clear the canvas
        drawRect(0, 0, canvas.width, canvas.height, "#000");

        // draw the user score to the left
        drawUsername(user.username,canvas.width/4.6, (canvas.height/20));
        // sdrawImg(user.img, canvas.width/2, (canvas.height/2));
        drawText(user.score,canvas.width/4,canvas.height/5);

        // draw the COM score to the right
        drawUsername(com.username, 2.95 * canvas.width/4, (canvas.height/20));
        // drawImg(com.img, 2.95 * canvas.width/4, (canvas.height/20)+50);
        drawText(com.score,3*canvas.width/4,canvas.height/5);

        // draw the net
        drawNet(net);

        // draw the user's paddle
        drawRect(user.x, user.y, user.width, user.height, user.color);

        // draw the COM's paddle
        drawRect(com.x, com.y, com.width, com.height, com.color);

        // draw the ball
        drawArc(ball.x, ball.y, ball.radius, ball.color);

        //draw powerUp
        // if active
        if(powerUp.active){
          // drawRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height, powerUp.color);
          drawImg(powerUp.color, powerUp.x, powerUp.y, powerUp.width, powerUp.height);
        }
    }

        socketGames.on('state', (gameState:any ) => {
          setStart(true);
          console.log("gameState", gameState.players)
          render(gameState.user, gameState.ball, gameState.net, gameState.com, gameState.powerUp);
        });

        socketGames.on('lose', (gameState:any ) => {
          setEsit(LoserImage)
          console.log("lose")
        });

        socketGames.on('win', (gameState:any ) => {
          setEsit(WinnerImage)
          console.log("win")
        });

        socketGames.on('GameNotFound', (gameState:any ) => {
          setEsit(GameNotFoundImage)
          console.log("GameNotFound")
        });

        socketGames.on('trigger', (gameState:any ) => {
          socket.emit('trigger');
        });

        socketGames.on('gameOver', (gameState:any ) => {
          if (!esit)
          {
            window.location.href = "/";
          }
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
            else if (e.keyCode === 68) {
              playerMovement.right = true;
            }
            else if (e.keyCode === 65) {
              playerMovement.left = true;
            }
            else if (e.keyCode === 87) {
              playerMovement.up = true;
            }
            else if (e.keyCode === 83) {
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
            else if (e.keyCode === 68) {
              playerMovement.right = false;
            }
            else if (e.keyCode === 65) {
              playerMovement.left = false;
            }
            else if (e.keyCode === 87) {
              playerMovement.up = false;
            }
            else if (e.keyCode === 83) {
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


    }, [restart]);

    const handleRestart = () => {
      setEsit(null);
      setReStart(!restart);
      setStart(false);
  };

  const handleBack = () => {
    setEsit(null);
    setStart(false);
    socketGames.emit('leaveGame');
    // window.location.assign('/')
  }

    console.log("esit", esit)
    console.log("start", start)

    // function back(){
    //   // window.history.back();
    //   //window.location.assign('/')
    // }
    return (
        <>
            <head>
                <title>Gamedev Canvas Workshop</title>

            </head>
            <body>
                <canvas id="myCanvas" width="1000" height="600" ref={canvasRef}></canvas>
                {!start && <div id="textMatchmaking" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "black", color: "white !important" }}>
                <Link key={"home"} component={RouterLink} to={"/"}>
                  <button onClick={handleBack}>
                    <KeyboardBackspaceIcon />
                    </button>
                    </Link>
                    Matchmaking...
                    <CircularProgress />
                    </div>}
                {esit && <div id="esit"><div><img src={esit} alt="lose" width="20%" height="20%"/></div><Link key={"home"} component={RouterLink} to={"/"}><button id="buttonGameHome">Home</button></Link><Link key={"games"} component={RouterLink} to={"/games/0"}><button id="buttonGameHome" onClick={handleRestart}>Play Again Classic</button></Link><Link key={"games"} component={RouterLink} to={"/games/1"}><button id="buttonGameHome" onClick={handleRestart}>Play Again Custom</button></Link></div>}
            </body>
        </>
    );

}
