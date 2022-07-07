import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import { TitleComp } from './components/TitleComp';
import { LoginComp } from './components/LoginComp';



function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<LoginComp />}/>
      <Route path='/home' element={<TitleComp />}/>
    </Routes>
    
    </div>
  );
}

export default App;
