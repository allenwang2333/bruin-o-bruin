import React, { useRef, useEffect } from "react";
import "./Posts.css";
import Post from "./Post";
var ReactDOM = require('react-dom');

var username = sessionStorage.getItem("userName");

const Posts = () => {
    myRef = React.createRef()

    useEffect( () => {
        async function getPosts() {
            const params = new Headers();
            params.append('username', username);
            const blogPosts = await (await fetch('http://localhost:8080/posts', { method: 'GET', headers: params })).text();
            const posts = JSON.parse(blogPosts);
            var list = [];
            posts.map((post, index) => (
                list.push(<Post key={index} index={index} post={post} />)
            ));
            const node = myRef.current;
            ReactDOM.render(<div>{list}</div>, node);
        }

        getPosts();
    },[]);

    return (
        <div className="posts-container">
            <h1>Posts</h1>
            <div ref={myRef}> </div>
        </div>
    );
};

export default Posts;