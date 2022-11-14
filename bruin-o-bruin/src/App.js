import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import React from 'react';  
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Home from "./components/Home";
import Auth from "./Auth"
import Game from "./gamePlay/game.js"

class App extends React.Component{
  render(){
  return (
    <BrowserRouter>
      <ul className="App-header">  
        <li> <Link to="/">Home</Link></li>  
        <li> <Link to="/auth">SignIn/SignUp</Link> </li>  
        <li> <Link to="/game">Game</Link> </li>
      </ul>  
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/game" element={<Game/>} />
      </Routes>
    </BrowserRouter>
  );
  }
}

export default App;
