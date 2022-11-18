import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import React from 'react';  
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Home from "./components/Home";
import Social from "./components/Social";
import DashBoard from "./components/DashBoard";
import Auth from "./components/Auth"
import Game from "./gamePlay/game.js"
import Test from "./components/test";

class App extends React.Component{
  render(){
  return (
    <BrowserRouter> 
      <Routes>
        <Route exact path="/" element={<DashBoard/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/game" element={<Game/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/social" element={<Social/>} />
        <Route path="/test" element={<Test/>} />
      </Routes>
    </BrowserRouter>
  );
  }
}

export default App;
