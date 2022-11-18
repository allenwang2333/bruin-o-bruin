import React from "react";
import "./Posts.css";
const Post = ({ post: { title, body,
imgUrl, author, time }, index }) => {
  return (  
    <div className="post-container">
      <h1 className="heading">{title}</h1>
      <img className="image" src={imgUrl} alt="post" />
      <p>{body}</p>
      <div className="info">      
        <h4>Written by: {author} at {time.toString()}</h4>
      </div>
    </div>
  );
};
  
export default Post;