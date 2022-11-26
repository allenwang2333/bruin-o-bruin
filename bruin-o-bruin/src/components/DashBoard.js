import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { IoGameControllerOutline } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import styles from "./homepage.css";
import Logo from "./assets/joe_bruin.png";

function DashBoard() {
  return (
    <div>
      <div className="container-fluid">
        <div >
          <div class="center-image">
            <img src={Logo} alt="PSN logo" width={250} />
          </div>
          <br />
          <Row>
            <h2 className="display">Join Bruin O' Bruin today</h2>
          </Row>
          <br />
          <div class="center-button1">
            <Link to="/auth" className={styles.linkTextFormat}><Button variant="success" className={` btn btn-primary pull-right`}>Sign In <RiLoginBoxLine /></Button></Link>
          </div>
          <br />
          <div class="center-button2">
          <Link to="/game" className={styles.linkTextFormat}><Button variant="success" className={` btn btn-primary pull-right`}>play as guest <IoGameControllerOutline /></Button></Link>
          </div>
        </div>
      </div>
      <div class="footer">
        <p>© 2022 FALL CS35L Team 47</p>
      </div>
    </div>
  );
}

export default DashBoard;
