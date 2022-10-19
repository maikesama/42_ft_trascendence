import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom';
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
import { Admin } from './pages/Admin';
import { Test } from './pages/Test';
import { Landing2 } from './pages/Landing2';

//<Route path="*" element={<Error404 />} />

function App() {
  
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/landing2" element={<Landing2 />}/>
      <Route path='/home' element={<Homepage />}/>
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/*" element={<OtherUserProfile />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/test" element={<Test />} />
    </Routes>
    
    </div>
  );
}

export default App;
