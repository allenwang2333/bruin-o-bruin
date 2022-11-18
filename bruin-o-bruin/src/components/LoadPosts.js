import React, { useRef, useEffect } from "react";
import "./Posts.css";
import Post from "./Post";
var ReactDOM = require('react-dom');

var username = sessionStorage.getItem("userName");

const Posts = () => {
    const blogPosts = [];
            

    return (
        <div className="posts-container">
            <h1>Posts</h1>
        {blogPosts.map((post, index) => (
                <Post key={index} index={index} post={post} />
            ))}
        </div>
    );
};

export default Posts;