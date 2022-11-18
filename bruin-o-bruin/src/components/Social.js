import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import logo from "./assets/joe_bruin.png";
import Posts from "./LoadPosts";
import { AiFillEdit } from "react-icons/ai";

import styles from "./SocialStyle.css";

function Social() {
    let navigate = useNavigate();
    /*useEffect(() => {
      if (localStorage.getItem("psnToken") === null) {
          navigate("/unauthorized");
        }
      });*/
    const ref = useRef();
    const closeTooltip = () => ref.current.close();

    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    async function handleSubmitPost(event) {
        event.preventDefault()
        const params = new URLSearchParams();
        params.append('title', event.currentTarget.elements.title.value);
        params.append('body', event.currentTarget.elements.body.value);
        params.append('img', image.data);
        params.append('author_name', sessionStorage.getItem("userName"));
        params.append('author_id', sessionStorage.getItem("userID"));
        const response = await axios.post('http://localhost:8080/compose', params);
        if (response.data[0].valid) {
            closeTooltip();
        }
        alert(response.data[1].message);
    }

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
                            <li className="list-group-item fs-5 py-3 text-success shadow">
                                <Popup ref={ref} modal repositionOnResize nested trigger={<span> <AiFillEdit /> Write Post </span>}>
                                    <div>
                                        <div className="col-md-15">
                                            <div className="form-area">
                                                <form onSubmit={handleSubmitPost}>
                                                    <br styles="clear:both" />
                                                    <div className>
                                                        <input type="text" className="form-control" id="title" name="title" placeholder="Title" required />
                                                    </div>

                                                    <div className="form-group">
                                                        <textarea className="form-control" type="textarea" id="body" placeholder="Subject" maxlength="140" rows="7"></textarea>
                                                    </div>

                                                    <div className="file-upload">
                                                        <input type="file" id="image" name="image" onChange={handleFileChange} capture="environment" accept="image/png, image/jpeg" />
                                                    </div>

                                                    {image.preview && <img src={image.preview} width='30%' height='30%' />}
                                                    <hr></hr>
                                                    {status && <h4>{status}</h4>}
                                                    <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
                                                    <button type="reset" value="reset" onClick={setImage} className="btn btn-secondary pull-right">Cancel</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Popup>
                            </li>
                        </ul>
                    </Nav>
                </Col>
            </Row>
        </Container>
    );
}

export default Social;