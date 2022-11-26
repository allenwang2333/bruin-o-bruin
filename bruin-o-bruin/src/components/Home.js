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

  return (
    <div>
      <h1>Home Page</h1>
      <p>Hi {username}</p> 
      <a href="/game">Game</a> 
      <br></br>
      <a href="/social">Social Posts</a>
      <br></br>
      <a href="/ranking">scoreboard</a> 
      <button class="logout-btn" onClick={() => logout()}> Log out </button>
    </div>
  );
};
  
export default Home;