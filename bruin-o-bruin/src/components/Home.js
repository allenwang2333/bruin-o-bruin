import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { IoGameControllerOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import {AiOutlineComment} from "react-icons/ai";
import {GiTrophyCup} from "react-icons/gi";
import styles from "./dashboard.css";
import Logo from "./assets/joe_bruin.png";

var username = sessionStorage.getItem("userName");

const Home = () => {

  useEffect(() => {
    //redirecting if user is not logged in
    if(!sessionStorage.getItem("userName")){
      window.location.href = "/";
    }
  });

  function logout(){
    sessionStorage.clear();
    alert("Successully logged out");
    window.setTimeout(function () {
      window.location.href = "/";
    }, 400);
  }

  return (
    <div>
      <div className="container-fluid">
        <div >
          <div className="center-image">
            <img src={Logo} alt="PSN logo" width={250} />
          </div>
          <br />
          <Row>
            <h2 className="display">Hi! {username}, Welcome to the Home Page</h2>
          </Row>
          <div className="center-button1">
            <Link to="/game" className={styles.linkTextFormat}><Button variant="success" className={` btn btn-primary pull-right`}>Game <IoGameControllerOutline /></Button></Link>
          </div>
          <br />
          <div className="center-button2">
            <Link to="/social" className={styles.linkTextFormat}><Button variant="success" className={` btn btn-primary pull-right`}>Social Post <AiOutlineComment /></Button></Link>
          </div>
          <br />
          <div className="center-button3">
            <Link to="/ranking" className={styles.linkTextFormat}><Button variant="success" className={` btn btn-primary pull-right`}>Scoreboard <GiTrophyCup /></Button></Link>
          </div>
          <br />
          <div className="center-button4">
            <Button variant="success" className={` btn btn-primary pull-right`} onClick={() => logout()}> Log out <RiLogoutBoxLine /></Button>
          </div>
        </div>
      </div>
      <div class="footer">
        <a className="dashlink" href="https://github.com/allenwang2333/bruin-o-bruin" title="checkout our github repo">© 2022 FALL CS35L Team 47</a>
      </div>
    </div>
  );
};

export default Home;