import React, { useState, useRef, useEffect } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { Landing } from './pages/Landing';
import { Homepage } from './pages/Homepage';
import { Error404 } from './pages/Error404';
import { Leaderboard } from './pages/Leaderboard';
import { Matches } from './pages/Matches';
import { Friends } from './pages/Friends';
import { Chat } from './pages/Chat';
import { Profile } from './pages/Profile';
import { OtherUserProfile } from './pages/OtherUserProfile';
import { Test } from './pages/Test';
import { Middleware } from './pages/Middleware';
import { Twofa } from './pages/Twofa';
import { Games } from './pages/Games';
import { useAuth } from './hooks/useAuth';
import PrivateRoutes from './components/utils/PrivateRoutes';
import io from 'socket.io-client';
import { Notify } from './components/generic/Alert';
import { Alert, Button } from 'react-bootstrap';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export const socket = io(`http://${process.env.REACT_APP_HOST_URI}:8002/`, { transports: ['websocket'] });

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  //const [notify, setNotify] = useState(true);
  const { authed, loading } = useAuth();
  const isSecondRender = useRef(false);
  let navigate = useNavigate();
  

  //toast("Wow so easy!");
  React.useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    // const handleNewMessage = (data) => {
    
    //   // toast(data);
    // }

    if (isSecondRender.current) {
      socket.off('notify').on('notify', (data: any) => {
        if (data)
        {
          if (data.type === 1)
          {
            toast(<div style={{}}>
              <img src={data.img} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
              <Typography style={{ textAlign: "center" }}>{data.userName} invited you to become friend</Typography>
              <Button variant="outline-success" style={{ marginLeft: "10px" }} onClick={() => {
                socket.emit("acceptFriend", data);
                socket.emit("friendHandler", {idIntra: data.idIntra, type: 1});
                toast.dismiss();
              }}>Accept</Button>
              <Button variant="outline-danger" style={{ marginLeft: "10px" }} onClick={() => {
                socket.emit("declineFriend", data);
                socket.emit("friendHandler", {idIntra: data.idIntra, type: 1});
                toast.dismiss();
              }}>Decline</Button>
            </div>);
          }
          else if (data.type === 2)
          {
            toast(<>
              <img src={data.img} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
              <Typography style={{ textAlign: "center" }}>{data.userName} invited you to a game</Typography>
              <Button style={{ marginLeft: "10px" }} variant="success" onClick={() => {
                // navigate(`/games/2${data.idIntra}`);
                // window.location.assign("/games/2" + data.idIntra);
                window.location.href = "/games/2" + data.idIntra;
              }}>Join</Button>
              <Button style={{ marginLeft: "10px" }} variant="danger" onClick={() => {
                socket.emit("declineGame", {idIntra :data.idIntra});
              }}>Decline</Button>
            </>);
          }
          else if (data.type === 3)
          {
            toast(<>
              <img src={data.img} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
              {/* <Typography style={{ marginLeft: "10px" }}>{data.userName} You have a new Achievement</Typography> */}
              <Typography style={{ textAlign: "center" }}>You have a new Achievement</Typography>
              <Button style={{ marginLeft: "10px" }} variant="success" onClick={() => {
                navigate(`/profile`);
              }}>Go see it!</Button>
            </>);
          }

        }
        });
      }
    isSecondRender.current = true;


  }, []);


  function pippo()
  {
    
  }

  return (
    <div className="App">
      {loading ? (
        <div> Loading... </div>
      ) : (
        <Routes>
          {!authed ? <Route path="/" element={<Landing />} /> : <Route path="/" element={<Homepage />} />}
          {!authed ? <Route path="/twofa" element={<Twofa />} /> : <Route path="/twofa" element={<Homepage />} />}
          

          <Route element={<PrivateRoutes />}>
            <Route path="/Middleware" element={<Middleware />} />
            <Route path='/home' element={<Homepage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/chat/" element={<Chat />} />
            <Route path="/chat/:idIntra" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:idUser" element={<OtherUserProfile />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/games/:idIntra" element={<Games />} />
            
            <Route path="/" element={<Homepage />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      )}
        <ToastContainer newestOnTop={true} autoClose={100000} closeButton={true} />
    </div>
  );
}

export default App;
