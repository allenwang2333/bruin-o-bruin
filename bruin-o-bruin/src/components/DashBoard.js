import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {BsFillPersonPlusFill} from "react-icons/bs";
import {IoGameControllerOutline} from "react-icons/io5";
import {RiLoginBoxLine} from "react-icons/ri";

import styles from "./homepage.css";

import Logo from "./assets/joe_bruin.png";

function DashBoard() {
  return (
    <Container fluid>
        <Col className={styles.colContainer}>
          <div className={styles.colWithButtons}>
            <img src={Logo} alt="PSN logo" width={120} className="mb-3" />
            <br />
            <Row>
              <h3 className="text-primary mb-3">Join Bruin O' Bruin today</h3>
            </Row>{" "}
            <br />
            <Col>
              <Link to="/auth" className={styles.linkTextFormat}><Button variant="success" className={`${styles.btnHomePage} mb-3`}>Sign In <RiLoginBoxLine /><BsFillPersonPlusFill /></Button></Link>
            </Col>
            <Col>
              <Link to="/game" className={styles.linkTextFormat}><Button variant="success" className={`${styles.btnHomePage} mb-3`}>play as guest <IoGameControllerOutline /></Button></Link>
            </Col>
          </div>
        </Col>
    </Container>
  );
}

export default DashBoard;
