import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {BsFillPersonPlusFill} from "react-icons/bs";

import {RiLoginBoxLine} from "react-icons/ri";

import styles from "./homepage.css";

import psnLogo from "./assets/joe_bruin.png";

function DashBoard() {

  useEffect(() => {
    //redirecting if user is logged in
    if(sessionStorage.getItem("userName")){
      window.location.href = "/home";
    }
  });

  return (
    <Container fluid>
      <Row className={styles.container}>
        <Col className={styles.colContainer}>
          <div className={styles.colWithButtons}>
            <img src={psnLogo} alt="PSN logo" width={120} className="mb-3" />
            <Row>
              <h1 className="text-primary mb-3">See what is happening in the world right now</h1>
            </Row>
            <br />
            <Row>
              <h3 className="text-primary mb-3">Join Bruin O' Bruin today</h3>
            </Row>{" "}
            <br />
            <Row>
              <Link to="/auth" className={styles.linkTextFormat}><Button variant="success" className={`${styles.btnHomePage} mb-3`}>Sign In <RiLoginBoxLine /><BsFillPersonPlusFill /></Button></Link>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
//react social post page
/*const Social = () => {
    return (
        <div>
        <h1>Social Page for {username}</h1>
        </div>
    );
};*/

export default DashBoard;
