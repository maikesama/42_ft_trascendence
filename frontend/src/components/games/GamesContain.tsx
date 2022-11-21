
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

// let ctx:any;
export const GamesContain = (props: any) => {
  const isSecondRender = useRef(false);
  // axios.get('api/getinfo').then(data=>data.json() )
  //console.log(props.match.params.username)
  // const [loading, setLoading] = useState(false);
  const params = useParams()
  const [esit, setEsit] = useState<string | null>(null);
  const [start, setStart] = useState(false);
  const [textMatchmaking, setTextMatchmaking] = useState("Matchmaking...");
  const [restart, setReStart] = useState(false);
  const [loading, setLoading] = useState(true);
  // console.log("id", )
  // const [userLeft, setUserLeft] = useState(null);
  // const [userRight, setUserRight] = useState(null);

  const [isConnectedGames, setIsConnectedGames] = useState(socketGames.connected);
  const start2 = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  console.log("Games", isConnectedGames)


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

    socket.on('declineGame', (data: { idIntra: string | any[]; }) => {
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

    /*Effettooo*/
    
    // window.requestAnimationFrame = (function () {
    //   return window.requestAnimationFrame ||
    //     window.requestAnimationFrame ||
    //     window.requestAnimationFrame ||
    //     function (callback) {
    //       window.setTimeout(callback, 1000 / 60);
    //     };
    // })();

    // now we will setup our basic variables for the demo
    const winFireworks = () => {

      var canvas2 = window.document.getElementById('fireworks'),
      // if (!canvas2 || canvas2 === null || canvas2 === undefined) {
      //   return;
      // }       
      // full screen dimensions
      cw = 1920,
      ch = 1080,
      // firework collection
      fireworks: any[] = [],
      // particle collection
      particles: any[] = [],
      // starting hue
      hue = 120,
      // when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
      limiterTotal = 5,
      limiterTick = 0,
      // this will time the auto launches of fireworks, one launch per 80 loop ticks
      timerTotal = 80,
      timerTick = 0,
      mousedown = false,
      // mouse x coordinate,
      mx: number,
      // mouse y coordinate
      my: number;

    // set canvas2 dimensions
    // if (canvas2){
    // canvas2.width = cw ;
    // canvas2.height = ch;
    // }

    // now we are going to setup our function placeholders for the entire demo

    // get a random number within a range
    function random(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    // calculate the distance between two points
    function calculateDistance(p1x: number, p1y: number, p2x: number, p2y: number) {
      var xDistance = p1x - p2x,
        yDistance = p1y - p2y;
      return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    // create firework
    function Firework(this: any, sx: number, sy: number, tx: number, ty: number) {
      // actual coordinates
      this.x = sx;
      this.y = sy;
      // starting coordinates
      this.sx = sx;
      this.sy = sy;
      // target coordinates
      this.tx = tx;
      this.ty = ty;
      // distance from starting point to target
      this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
      this.distanceTraveled = 0;
      // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
      this.coordinates = [];
      this.coordinateCount = 3;
      // populate initial coordinate collection with the current coordinates
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      this.angle = Math.atan2(ty - sy, tx - sx);
      this.speed = 2;
      this.acceleration = 1.05;
      this.brightness = random(50, 70);
      // circle target indicator radius
      this.targetRadius = 1;
    }

    // update firework
    Firework.prototype.update = function (index: number) {
      // remove last item in coordinates array
      this.coordinates.pop();
      // add current coordinates to the start of the array
      this.coordinates.unshift([this.x, this.y]);

      // cycle the circle target indicator radius
      if (this.targetRadius < 8) {
        this.targetRadius += 0.3;
      } else {
        this.targetRadius = 1;
      }

      // speed up the firework
      this.speed *= this.acceleration;

      // get the current velocities based on angle and speed
      var vx = Math.cos(this.angle) * this.speed,
        vy = Math.sin(this.angle) * this.speed;
      // how far will the firework have traveled with velocities applied?
      this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

      // if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
      if (this.distanceTraveled >= this.distanceToTarget) {
        createParticles(this.tx, this.ty);
        // remove the firework, use the index passed into the update function to determine which to remove
        fireworks.splice(index, 1);
      } else {
        // target not reached, keep traveling
        this.x += vx;
        this.y += vy;
      }
    }

    // draw firework
    Firework.prototype.draw = function () {
      ctx.beginPath();
      // move to the last tracked coordinate in the set, then draw a line to the current x and y
      ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
      ctx.stroke();

      ctx.beginPath();
      // draw the target for this firework with a pulsing circle
      ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // create particle
    function Particle(this: any, x: any, y: any) {
      this.x = x;
      this.y = y;
      // track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
      this.coordinates = [];
      this.coordinateCount = 5;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      // set a random angle in all possible directions, in radians
      this.angle = random(0, Math.PI * 2);
      this.speed = random(1, 10);
      // friction will slow the particle down
      this.friction = 0.95;
      // gravity will be applied and pull the particle down
      this.gravity = 1;
      // set the hue to a random number +-50 of the overall hue variable
      this.hue = random(hue - 50, hue + 50);
      this.brightness = random(50, 80);
      this.alpha = 1;
      // set how fast the particle fades out
      this.decay = random(0.015, 0.03);
    }

    // update particle
    Particle.prototype.update = function (index: number) {
      // remove last item in coordinates array
      this.coordinates.pop();
      // add current coordinates to the start of the array
      this.coordinates.unshift([this.x, this.y]);
      // slow down the particle
      this.speed *= this.friction;
      // apply velocity
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      // fade out the particle
      this.alpha -= this.decay;

      // remove the particle once the alpha is low enough, based on the passed in index
      if (this.alpha <= this.decay) {
        particles.splice(index, 1);
      }
    }

    // draw particle
    Particle.prototype.draw = function () {
      ctx.beginPath();
      // move to the last tracked coordinates in the set, then draw a line to the current x and y
      ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
      ctx.stroke();
    }

    // create particle group/explosion
    function createParticles(x: any, y: any) {
      // increase the particle count for a bigger explosion, beware of the canvas2 performance hit with the increased particles though
      var particleCount = 30;
      while (particleCount--) {
        particles.push(Particle(x, y));
      }
    }

    // main demo loop
    function loop() {
      // this function will run endlessly with requestAnimationFrame
      requestAnimationFrame(loop);

      // increase the hue to get different colored fireworks over time
      //hue += 0.5;

      // create random color
      hue = random(0, 360);

      // normally, clearRect() would be used to clear the canvas2
      // we want to create a trailing effect though
      // setting the composite operation to destination-out will allow us to clear the canvas2 at a specific opacity, rather than wiping it entirely
      if (ctx) { 
        ctx.globalCompositeOperation = 'destination-out';
        // decrease the alpha property to create more prominent trails
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, cw, ch);
        // change the composite operation back to our main mode
        // lighter creates bright highlight points as the fireworks and particles overlap each other
        ctx.globalCompositeOperation = 'lighter';

        // loop over each firework, draw it, update it
        var i = fireworks.length;
        while (i--) {
          fireworks[i].draw();
          fireworks[i].update(i);
        }
       }

      // loop over each particle, draw it, update it
      var i = particles.length;
      while (i--) {
        particles[i].draw();
        particles[i].update(i);
      }

      // launch fireworks automatically to random coordinates, when the mouse isn't down
      if (timerTick >= timerTotal) {
        if (!mousedown) {
          // start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
          fireworks.push(Firework(cw / 2, ch, random(0, cw), random(0, ch / 2)));
          timerTick = 0;
        }
      } else {
        timerTick++;
      }

      // limit the rate at which fireworks get launched when mouse is down
      if (limiterTick >= limiterTotal) {
        if (mousedown) {
          // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target]
          fireworks.push(Firework(cw / 2, ch, mx, my));
          limiterTick = 0;
        }
      } else {
        limiterTick++;
      }
    }

    // mouse event bindings
    // update the mouse coordinates on mousemove
    canvas2?.addEventListener('mousemove', function (e: { pageX: number; pageY: number; }) {
      if (canvas2)
      {
        mx = e.pageX - canvas2.offsetLeft;
        my = e.pageY - canvas2.offsetTop;
      }
    });

    // toggle mousedown state and prevent canvas2 from being selected
    canvas2?.addEventListener('mousedown', function (e: { preventDefault: () => void; }) {
      e.preventDefault();
      mousedown = true;
    });

    canvas2?.addEventListener('mouseup', function (e: { preventDefault: () => void; }) {
      e.preventDefault();
      mousedown = false;
    });

    // once the window loads, we are ready for some fireworks!
    window.onload = loop;
  }



    /*EFFETTOOOOO*/


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
      newImg.src = img;
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
        drawImg(powerUp.color, powerUp.x, powerUp.y, powerUp.width, powerUp.height);
      }
    }
    // setEsit(null);

    socketGames.on('state', (gameState: any) => {
      start2.current = true;
      setStart(true);
      setTextMatchmaking("Matchmaking....");
      render(gameState.user, gameState.ball, gameState.net, gameState.com, gameState.powerUp);
    });

    socketGames.on('lose', (gameState: any) => {
      setStart(false);
      start2.current = false;
      setEsit(LoserImage)
      console.log("lose")
    });

    socketGames.on('win', (gameState: any) => {
      setStart(false);
      start2.current = false;
      winFireworks()
      setEsit(WinnerImage)
      console.log("win")
      
    });

    socketGames.on('GameNotFound', (gameState: any) => {
      setStart(false);
      start2.current = false;
      setEsit(GameNotFoundImage)
      console.log("GameNotFound")
    });

    socketGames.on('trigger', (data: any) => {
      socket.emit('trigger');
      socket.emit('inGame', data);
    });



    socketGames.on('invited', () => {
      setStart(false);
      start2.current = false;
      setTextMatchmaking("Waiting for a player to accept the invitation");
      // setEsit(WinnerImage)
      // console.log("win")
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
    //   console.log("start2.current", start2.current)
    //   if (start2.current)
    //     socketGames.emit('playerMovement', playerMovement);
    // }, 1000 / 60);
    socketGames.on('start', () => {
      start2.current = true;
      console.log("start2.current", start2.current)
      console.log("start2.current", start2.current)
      const interval = setInterval(() => {
        if (playerMovement.up || playerMovement.down || playerMovement.left || playerMovement.right) {
          socketGames.emit('playerMovement', playerMovement);
        }
        if (!start2.current) {
          console.log("mi sono fermato")
          clearInterval(interval);
        }
      }, 1000 / 60);
    });
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);


  }, [restart]);

  useEffect(() => {
    socketGames.on('gameOver', () => {
      console.log("gameOver")
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

  console.log("esit", esit)
  console.log("start", start)

  // function back(){
  //   // window.history.back();
  //   //window.location.assign('/')
  // }
  return (
    <>

      {/* danger */}
      {start && <Link key={"home"} component={RouterLink} to={"/"}>
        <button style={{ position: "absolute", top: "0", right: "0", zIndex: 1000, backgroundColor: "red", color: "white", fontSize: "20px" }} onClick={handleBack}>Quit</button>
      </Link>}
      <canvas id="myCanvas" width="1920" height="1080" ref={canvasRef} />
      {esit ? <div id="esit"><div><div id="fireworks"></div><img src={esit} alt="lose" width="20%" height="20%" /></div><Link key={"home"} component={RouterLink} to={"/"}><button id="buttonGameHome">Home</button></Link><button id="buttonGameHome" onClick={handleRestart0}>Play Again Classic</button><button id="buttonGameHome" onClick={handleRestart1}>Play Again Custom</button></div> :
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

    </>
  );

}
