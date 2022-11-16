import React from "react";
import './style.css';

var username = sessionStorage.getItem("userName");

const Home = () => {

  function logout(){
    sessionStorage.clear();
    alert("Successully logged out");
    window.setTimeout(function() {
        window.location.href = "/";
    }, 400);
  }

  if(username === "" || username === null){
    return (
      <div>
        <h1>Home Page</h1>
        <a href="/auth">SignIn/SignUp</a> <br></br>
        <a href="/game">play as guest</a> 
      </div>
    );
  }
  else{
    return (
      <div>
        <h1>Home Page</h1>
        <p>Hi {username}</p> 
        <a href="/game">Game</a> 
        <button class="logout-btn" onClick={() => logout()}> Log out </button>;
      </div>
    );
  };
}
  
export default Home;