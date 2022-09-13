import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import { TitleComp } from './components/TitleComp';
import { LoginComp } from './components/LoginComp';
import { Landing } from './pages/Landing';
import { Homepage } from './pages/Homepage';
import { Error404 } from './pages/Error404';
import { Leaderboard } from './pages/Leaderboard';
import { Settings } from './pages/Settings';
import { Chat } from './pages/Chat';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { Test } from './pages/Test';

//<Route path="*" element={<Error404 />} />

function App() {
  
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path='/home' element={<Homepage />}/>
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/user" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/test" element={<Test />} />
    </Routes>
    
    </div>
  );
}

export default App;
