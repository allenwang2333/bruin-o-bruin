import React, { useRef, useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import logo from "./assets/joe_bruin.png";
import Posts from "./LoadPosts";
import { AiFillEdit } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import styles from "./SocialStyle.css";

function Social() {

    useEffect(() => {
        //stop redirecting if user is not logged in
        if(!sessionStorage.getItem("userName")){
          window.location.href = "/";
        }
      });
      
    const ref = useRef();
    const closeTooltip = () => ref.current.close();

    const [image, setImage] = useState({ preview: '', data: '' })
    const status = useState('')[0]

    function importAll(r) {
        return r.keys().map(r);
    }
    const homeIcon = importAll(require.context('../../../images/icon', false, /home-icon\.(png|jpe?g|svg)$/))[0];

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    async function handleSubmitPost(event) {
        event.preventDefault()
        if (image.data !== '') {
            let formData = new FormData()
            formData.append('title', event.currentTarget.elements.title.value);
            formData.append('body', event.currentTarget.elements.body.value);
            formData.append('author_name', sessionStorage.getItem("userName"));
            formData.append('author_id', sessionStorage.getItem("userID"));
            var post_id = uuidv4();
            formData.append('post_id', post_id);
            formData.append('file', image.data);
            const response = await fetch('/compose_pic', {
                method: 'POST',
                body: formData,
            });
            const msgFromResponse = await response.text();
            console.log(msgFromResponse);
            if (msgFromResponse === "successfully posted") {
                closeTooltip();
                setImage({ preview: '', data: '' });
            }
            alert(msgFromResponse);
        }
        else {
            const params = new URLSearchParams();
            params.append('title', event.currentTarget.elements.title.value);
            params.append('body', event.currentTarget.elements.body.value);
            params.append('author_name', sessionStorage.getItem("userName"));
            params.append('author_id', sessionStorage.getItem("userID"));
            post_id = uuidv4();
            params.append('post_id', post_id);
            const response = await fetch('/compose_text', {
                method: 'POST',
                body: params,
            });
            const msgFromResponse = await response.text();
            console.log(msgFromResponse);
            if (msgFromResponse === "successfully posted") {
                closeTooltip();
            }
            alert(msgFromResponse);
        }
    }

    return (
        <div className="social">
            <div className="social-header">
                <div className="logo">
                    <img className="logo-img" src={logo} alt="logo" />
                </div>
                <div className="title">
                    <h1 className="title-content">Bruin O' Bruin Social</h1>
                </div>
                <div className="home-button">
                    <button className="button">
                        <img className="home-img" src={homeIcon} alt="home icon" onClick={() => window.location.href = "/home"} />
                    </button>
                </div>
            </div>
            <div className="social-body">
                <div className="main-container">
                    <Posts />
                </div>

                <div className="sidebar">
                    <Nav className={styles.navContainer}>
                        <ul className="list-group">
                            <li className="list-group-item fs-5 py-3 text-success shadow">
                                <Popup ref={ref} modal repositionOnResize nested trigger={<span> <AiFillEdit /> Write Post </span>}>
                                    <div>
                                        <div className="col-md-15">
                                            <div className="form-area">
                                                <form onSubmit={handleSubmitPost}>
                                                    <br styles="clear:both" />
                                                    <div>
                                                        <input type="text" className="form-control" id="title" name="title" placeholder="Title" required />
                                                    </div>

                                                    <div className="form-group">
                                                        <textarea className="form-control" type="textarea" id="body" placeholder="Subject" maxlength="140" rows="7"></textarea>
                                                    </div>

                                                    <div className="file-upload">
                                                        <input type="file" id="image" name="file" onChange={handleFileChange} capture="environment" accept="image/png, image/jpeg" />
                                                    </div>

                                                    {image.preview && <img src={image.preview} alt="" width='30%' height='30%' />}
                                                    <hr></hr>
                                                    {status && <h4>{status}</h4>}
                                                    <button type="submit" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
                                                    <button type="reset" value="reset" onClick={setImage} className="btn btn-secondary pull-right">Clear</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </Popup>
                            </li>
                        </ul>
                    </Nav>
                </div>
            </div>
        </div>
    );
}

export default Social;