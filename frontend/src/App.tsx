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
import { useAuth } from './hooks/useAuth';
import PrivateRoutes from './components/utils/PrivateRoutes';
import io from 'socket.io-client';
//<Route path="*" element={<Error404 />} />
// const socket = io(`http://${process.env.REACT_APP_HOST_URI}:8002/`, { transports: ['websocket'] });
function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const { authed, loading } = useAuth();
  console.log(authed);

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     setIsConnected(true);
  //     console.log('connected');
  //   });

  //   socket.on('disconnect', () => {
  //     setIsConnected(false);
  //     console.log('disconnected');
  //   });
  // }, []);

  return (
    <div className="App">
      {loading ? (
            <div> Loading... </div>
         ) : (
    <Routes>
      {!authed ? <Route path="/" element={<Landing />}/> : <Route path="/" element={<Homepage />}/>}
          <Route path="/test" element={<Test />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/Middleware" element={<Middleware />}/>
          <Route path='/home' element={<Homepage />}/>
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/*" element={<OtherUserProfile />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/" element={<Homepage />}/>
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
           )}
    </div>
  );
}

export default App;
