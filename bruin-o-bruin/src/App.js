import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import React from 'react';  
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Home from "./components/Home";
import Auth from "./Auth"

class App extends React.Component{
  render(){
  return (
    <BrowserRouter>
      <ul className="App-header">  
        <li> <Link to="/">Home</Link></li>  
        <li> <Link to="/auth">SignIn/SignUp</Link> </li>  
      </ul>  
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    </BrowserRouter>
  );
  }
}

export default App;
