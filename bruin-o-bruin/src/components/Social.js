import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import logo from "./assets/joe_bruin.png";
import Posts from "./LoadPosts";
import {AiFillEdit} from "react-icons/ai";

import styles from "./SocialStyle.css";

function Social() {
    let navigate = useNavigate();
    /*useEffect(() => {
      if (localStorage.getItem("psnToken") === null) {
          navigate("/unauthorized");
        }
      });*/

    return (
        <Container fluid>
            <Row>
                <Col md={4}>
                    <Row className="justify-content-center align-items-center">
                        <Col md="auto" className="text-sm-start text-center mb-sm-0 mb-3">
                            <img src={logo} width="125" alt="logo" />
                        </Col>
                        <Col className="text-sm-start text-center text-success mb-sm-0 mb-3">
                            <h1>Bruin O' Bruin Social</h1>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <div className="main-container">
                        <br></br>
                        <h1 className="main-heading">
                            Posts
                        </h1>
                        <Posts />
                    </div>
                </Col>

                <Col md={2}>
                    <Nav className={styles.navContainer}>
                        <ul className="list-group">
                            <Nav.Link>
                                <Link to="compose" className="text-decoration-none">
                                    <li className="list-group-item fs-5 py-3 text-success shadow">
                                        <span>
                                            <AiFillEdit /> Write Post
                                        </span>
                                    </li>
                                </Link>
                            </Nav.Link>
                        </ul>
                    </Nav>
                </Col>
            </Row>
        </Container>
    );
}

export default Social;