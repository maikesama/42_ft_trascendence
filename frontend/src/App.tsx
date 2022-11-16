import React, { useState, useEffect } from 'react';
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
import 'react-toastify/dist/ReactToastify.css';

export const socket = io(`http://${process.env.REACT_APP_HOST_URI}:8002/`, { transports: ['websocket'] });

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  //const [notify, setNotify] = useState(true);
  const { authed, loading } = useAuth();
  console.log(authed);

  //toast("Wow so easy!");
  toast(<><Button onClick={ciao}>Ciao</Button></>);
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('notify', () => {
      toast("Wow so easy!");
    });

  }, []);

  function ciao()
  {
    console.log("ciao");
  }
  function pippo()
  {
    console.log("poppoo");
  }

  return (
    <div className="App">
      {loading ? (
        <div> Loading... </div>
      ) : (
        <Routes>
          {!authed ? <Route path="/" element={<Landing />} /> : <Route path="/" element={<Homepage />} />}
          {!authed ? <Route path="/twofa" element={<Twofa />} /> : <Route path="/twofa" element={<Homepage />} />}
          <Route path="/test" element={<Test />} />

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
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<Homepage />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      )}
        <ToastContainer onClick={ciao} newestOnTop={true} autoClose={10000} closeButton={true} />
    </div>
  );
}

export default App;
