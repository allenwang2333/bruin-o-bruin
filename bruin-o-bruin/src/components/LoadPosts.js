import React, { useEffect, useState } from "react";
import "./Posts.css";
import Post from "./Post";
import axios from "axios";
var ReactDOM = require('react-dom');

var username = sessionStorage.getItem("userName");

const Posts = () => {
  let [blogPosts, setPosts] = useState([])
  async function getPosts() {
    const params = new Headers();
    params.append('username', username);
    const response = await axios.get('http://localhost:8080/posts', params);
    console.log(response.data);
    if(response.data[0].valid){
      setPosts(response.data.slice(1));
    } else {
      alert(response.data[1].message);
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {getPosts();}, 10000);//refreshes every 10 second
    return () => clearInterval(interval);
  }, []);

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