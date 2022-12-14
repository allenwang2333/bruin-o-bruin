import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { IoGameControllerOutline } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import styles from "./dashboard.css";
import Logo from "./assets/joe_bruin.png";

function DashBoard() {

  useEffect(() => {
    //redirecting if user is logged in
    if(sessionStorage.getItem("userName")){
      window.location.href = "/home";
    }
  });

  return (

    <div>
      <div className="container-fluid">
        <div >
          <div className="center-image">
            <img src={Logo} alt="PSN logo" width={250} />
          </div>
          <br />
          <Row>
            <h2 className="display">Join Bruin O' Bruin today</h2>
          </Row>
          <br />
          <div className="center-button1">
            <Link to="/auth" className={styles.linkTextFormat}><Button variant="success" className={` btn btn-primary pull-right`}>Sign In <RiLoginBoxLine /></Button></Link>
          </div>
          <br />
          <div className="center-button2">
            <Link to="/game" className={styles.linkTextFormat}><Button variant="success" className={` btn btn-primary pull-right`}>play as guest <IoGameControllerOutline /></Button></Link>
          </div>
        </div>
      </div>
      <div class="footer">
        <a className="dashlink" href="https://github.com/allenwang2333/bruin-o-bruin" title="checkout our github repo">© 2022 FALL CS35L Team 47</a>
      </div>
    </div>
  );
}

export default DashBoard;
