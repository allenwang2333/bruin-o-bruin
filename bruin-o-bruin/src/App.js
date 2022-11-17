import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import React from 'react';  
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Home from "./components/Home";
import DashBoard from "./components/DashBoard";
import Auth from "./components/Auth"
import Game from "./gamePlay/game.js"

class App extends React.Component{
  render(){
  return (
    <BrowserRouter> 
      <Routes>
        <Route exact path="/" element={<DashBoard/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/game" element={<Game/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
  }
}

export default App;
