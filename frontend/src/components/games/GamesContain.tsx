
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
const DelcineImage = "https://media.tenor.com/7oJfe_AbYbkAAAAd/offer-declined-declined.gif"
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useParams } from 'react-router';
import { socket } from '../../App';
import  stella  from "../../images/stella.png";
import  fungo  from "../../images/fungo.png";
import  fiore  from "../../images/fiore.png";
import  fantasma  from "../../images/fantasma.png";
// let ctx:any;

var cw = window.innerWidth;
var ch = window.innerHeight;

//Images array
var images = new Array();
images.push("../../images/tie.png")
images.push("../../images/diablo.png")
images.push("../../images/minecraft.png")
images.push("../../images/lenovo.png")
images.push("../../images/doodle.png")

// set canvas dimensions
export const canvasDim = {
  width: 1920,
  height: 1080,
}


export const GamesContain = (props: any) => {
  const isSecondRender = useRef(false);
  // axios.get('api/getinfo').then(data=>data.json() )
  
  // const [loading, setLoading] = useState(false);
  const params = useParams()
  const [esit, setEsit] = useState<string | null>(null);
  const [start, setStart] = useState(false);
  const [textMatchmaking, setTextMatchmaking] = useState("Matchmaking...");
  const [restart, setReStart] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // const [userLeft, setUserLeft] = useState(null);
  // const [userRight, setUserRight] = useState(null);

  const [isConnectedGames, setIsConnectedGames] = useState(socketGames.connected);
  const start2 = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  


  // useEffect(() => {
  //   setEsit(null);
  // })

  var start3 = false;
  useEffect(() => {

    socketGames.on('connect', () => {
      setIsConnectedGames(true);
    });

    if (isSecondRender.current) {
      socketGames.emit('newPlayer', params.idIntra);
    }
    isSecondRender.current = true;


    socketGames.on('disconnect', () => {
      setIsConnectedGames(false);
    });

    socket.off('declineGame').on('declineGame', (data: { idIntra: string | any[]; }) => {
      socketGames.emit('declineGame', data.idIntra);
      let idIntranew = data.idIntra.slice(1);
      if (data.idIntra === idIntranew) {
        setEsit(DelcineImage);
      }
    });

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }


    const drawRect = (x: any, y: any, w: any, h: any, color: any) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }

    const drawArc = (x: any, y: any, r: any, color: any) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    }

    const drawNet = (net: any) => {
      for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
      }
    }

    const drawText = (text: any, x: any, y: any) => {
      ctx.fillStyle = "#FFF";
      ctx.font = "75px fantasy";
      ctx.fillText(text, x, y);
    }

    const drawUsername = (text: any, x: any, y: any) => {
      ctx.fillStyle = "#FFF";
      ctx.font = "35px fantasy";
      ctx.fillText(text, x, y);
    }

    const drawImg = (img: any, x: any, y: any, width: any, height: any) => {
      //size of image
      var newImg = new Image(100, 100);
      if (img === 1) {
        newImg.src = stella;
      }
      else if (img === 2) {
        newImg.src = fungo;
      }
      else if (img === 3) {
        newImg.src = fiore;
      }
      else if (img === 4) {
        newImg.src = fantasma;
      }
      newImg.onload = function () {
        ctx.drawImage(newImg, x, y, width, height);
      }

      // image.onload=function(){
      // context.drawImage(image,0,0,canvas.width,canvas.height);
      // };
      // image.src="http://www.lunapic.com/editor/premade/transparent.gif";
    }

    //draw powerUp



    const render = (user: any, ball: any, net: any, com: any, powerUp: any) => {


      // clear the canvas
      drawRect(0, 0, canvas.width, canvas.height, 'black');
      // drawImg("../../images/tie.png", 0, 0, canvas.width, canvas.height);

      // draw the user score to the left
      drawUsername(user.username, canvas.width / 4.6, (canvas.height / 20));
      // sdrawImg(user.img, canvas.width/2, (canvas.height/2));
      drawText(user.score, canvas.width / 4, canvas.height / 5);

      // draw the COM score to the right
      drawUsername(com.username, 2.95 * canvas.width / 4, (canvas.height / 20));
      // drawImg(com.img, 2.95 * canvas.width/4, (canvas.height/20)+50);
      drawText(com.score, 3 * canvas.width / 4, canvas.height / 5);

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
      if (powerUp.active) {
        // drawRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height, powerUp.color);
        drawImg(powerUp.type, powerUp.x, powerUp.y, powerUp.width, powerUp.height);
      }
    }

    const fireworks = () => {
      
      let particles: any;
      let loop = setInterval(() => {
        ctx.globalAlpha -= 0.01;
        particles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 1000; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            vx: Math.random() * 10 - 5,
            vy: Math.random() * 10 - 5,
          });
        }
        

        particles.forEach((p: any) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.closePath();
          p.x += p.vx;
          p.y += p.vy;
        }
        );

        if (ctx.globalAlpha < 0.5) {
          ctx.globalAlpha = 1;
        }
      }, 1000 / 60);
    }

    socketGames.off('state').on('state', (gameState: any) => {
      start2.current = true;
      setStart(true);
      setTextMatchmaking("Matchmaking....");
      render(gameState.user, gameState.ball, gameState.net, gameState.com, gameState.powerUp);
    });

    socketGames.off('lose').on('lose', (gameState: any) => {
      setStart(false);
      start2.current = false;
      setEsit(LoserImage)
      
    });

    socketGames.off('win').on('win', (gameState: any) => {
      setStart(false);
      start2.current = false;
      setEsit(WinnerImage)
      
      // fireworks();
    });

    socketGames.off('GameNotFound').on('GameNotFound', (gameState: any) => {
      setStart(false);
      start2.current = false;
      setEsit(GameNotFoundImage)
      
    });

    socketGames.off('trigger').on('trigger', (data: any) => {
      socket.emit('trigger');
      socket.emit('inGame', data);
    });



    socketGames.off('invited').on('invited', () => {
      setStart(false);
      start2.current = false;
      setTextMatchmaking("Waiting for a player to accept the invitation");
      // setEsit(WinnerImage)
      
    });

    socketGames.off('newAchievement').on('newAchievement', (data: any) => {
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      socket.emit('notification', { type: 3, message: "You have unlocked a new achievement!", idIntra: data.idIntra });
      // setEsit(WinnerImage)
      
    });

    const playerMovement = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    const keyDownHandler = (e: any) => {
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
    const keyUpHandler = (e: any) => {
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

    // while (start2.current) {
    //   socket.emit('movement', playerMovement);
    // }
    // setInterval(() => {
    
    //   if (start2.current)
    //     socketGames.emit('playerMovement', playerMovement);
    // }, 1000 / 60);
    socketGames.on('start', () => {
      start2.current = true;
      
      
      const interval = setInterval(() => {
        if (playerMovement.up || playerMovement.down || playerMovement.left || playerMovement.right) {
          socketGames.emit('playerMovement', playerMovement);
        }
        if (!start2.current) {
          
          clearInterval(interval);
        }
      }, 1000 / 60);
    });
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);


  }, [restart]);

  useEffect(() => {
    socketGames.off('gameOver').on('gameOver', () => {
      
      if (esit === null || esit === undefined) {
        window.location.href = "/";
      }
    });
  });

  const handleRestart = () => {
    // setEsit(null);
    setReStart(!restart);
    setStart(false);
  };

  const handleRestart0 = () => {
    // handleRestart();
    window.location.href = "/games/0";

  };

  const handleRestart1 = () => {
    // handleRestart();
    window.location.href = "/games/1";
  };

  const handleBack = () => {
    // setEsit(null);
    // setStart(false);
    socketGames.emit('leaveGame');
    // window.location.assign('/')
  }

  
  

  // function back(){
  //   // window.history.back();
  //   //window.location.assign('/')
  // }
  return (
    <>
      <div id="gameBG">
        {/* danger */}
        {start && <Link key={"home"} component={RouterLink} to={"/"}>
          <button style={{ position: "absolute", top: "0", right: "0", zIndex: 1000, backgroundColor: "red", color: "white", fontSize: "20px" }} onClick={handleBack}>Quit</button>
        </Link>}
        <canvas id="myCanvas" width={canvasDim.width} height={canvasDim.height} ref={canvasRef} />
        {esit ? <div id="esit"><div><img src={esit} alt="lose" width="20%" height="20%" /></div><Link key={"home"} component={RouterLink} to={"/"}><button id="buttonGameHome">Home</button></Link><button id="buttonGameHome" onClick={handleRestart0}>Play Again Classic</button><button id="buttonGameHome" onClick={handleRestart1}>Play Again Custom</button></div> :
          null}
        {!start && !esit && <div id="textMatchmaking" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "black", color: "white !important" }}>
          <Link key={"home"} component={RouterLink} to={"/"}>
            <button onClick={handleBack}>
              <KeyboardBackspaceIcon />
            </button>
          </Link>
          {textMatchmaking}
          <CircularProgress />
        </div>}
      </div>
    </>
  );

}
