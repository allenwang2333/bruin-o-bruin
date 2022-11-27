import React from "react";
import './Home.css';

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
      <h1 class="home-page-title">Home Page</h1>
      <div class="navbar">
        <div class="navbar-centered"> 
          <a class="game-link" href="/game">Game</a> 
          <a class="social-link" href="/social">Social Posts</a>
          <a class="ranking-link" href="/ranking">Scoreboard</a>
        </div>
      </div>
      <p class="user-name-home-page">Hi {username}</p> 
       
      <button class="logout-btn" onClick={() => logout()}> Log out </button>
    </div>
  );
};
  
export default Home;