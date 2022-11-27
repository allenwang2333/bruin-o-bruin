import React, { useState } from "react";
import "./Posts.css";
import axios from "axios";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";

const Post = ({ post: { postID, title, body,
  imgUrl, author, time, like }, index }) => {
  let [icon, setIcon] = useState(<AiOutlineLike />);
  let [liked, setLiked] = useState(false);

  const changeLike = () => {
    if (liked) { //unlike
      setIcon(<AiOutlineLike />);
      setLiked(false);
      handleLike(-1);
    }
    else { //unlike
      setIcon(<AiTwotoneLike />);
      setLiked(true);
      handleLike(1);
    }
  }

  async function handleLike(count) {
    const params = new URLSearchParams();
    params.append('postID', postID);
    params.append('count', count);
    console.log(like);
    const response = await axios.post('http://localhost:8080/server_postLike', params);
    if (!response.data[0].valid) {
      alert(response.data[1].message);
    }
  }
  if (imgUrl === '') {
    return (
      <div className="post-container">
        <h1 className="post-heading">{title}</h1>
        <p className="post-content">{body}</p>
        <div className="post-footer">
          <div className="post-info">
            <p className="post-info-content">Written by: {author} at {time.toString()}</p>
          </div>
          <div className="post-like">
            <button id="like" class="btn btn-light" onClick={changeLike}>{icon}{like}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-container">
      <h1 className="post-heading">{title}</h1>
      <img className="post-image" src={imgUrl} alt="a post image" />
      <p className="post-content">{body}</p>
      <div className="post-footer">
        <div className="post-info">
          <p className="post-info-content">Written by: {author} at {time.toString()}</p>
        </div>
        <div className="post-like">
          <button id="like" class="btn btn-light" onClick={changeLike}>{icon}{like}</button>
        </div>
      </div>
    </div>
  );
};

export default Post;