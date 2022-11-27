import React, { useEffect, useState } from "react";
import "./Posts.css";
import Post from "./Post";
import axios from "axios";

var username = sessionStorage.getItem("userName");

const Posts = () => {
  let [blogPosts, setPosts] = useState([])
  async function getPosts() {
    const params = new Headers();
    params.append('username', username);
    const response = await axios.get('/posts', params);
    if(response.data[0].valid){
      setPosts(response.data.slice(1));
    } else {
      alert(response.data[1].message);
    }
  }

  useEffect(() => {
    getPosts();
    const interval = setInterval(() => {getPosts();}, 1000);//refreshes every 10 second
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="posts-container">
      <h1 className="posts-heading">Posts</h1>
      {blogPosts.map((post, index) => (
        <Post key={index} index={index} post={post} />
      ))}
    </div>
  );
};

export default Posts;