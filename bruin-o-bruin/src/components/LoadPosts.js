import React, { useRef, useEffect } from "react";
import "./Posts.css";
import Post from "./Post";
var ReactDOM = require('react-dom');

var username = sessionStorage.getItem("userName");

const Posts = () => {
    const blogPosts = [
        {
          title: "JAVASCRIPT",
          body: `JavaScript is the world most popular 
          lightweight, interpreted compiled programming 
          language. It is also known as scripting 
          language for web pages. It is well-known for 
          the development of web pages, many non-browser 
          environments also use it. JavaScript can be 
          used for Client-side developments as well as 
          Server-side developments`,
          author: "Nishant Singh ",
          imgUrl:
            "https://media.geeksforgeeks.org/img-practice/banner/diving-into-excel-thumbnail.png",
          time: new Date("July 21, 2021 01:15:00"),
        },
        {
          title: "Data Structure ",
          body: `There are many real-life examples of 
          a stack. Consider an example of plates stacked 
          over one another in the canteen. The plate 
          which is at the top is the first one to be 
          removed, i.e. the plate which has been placed 
          at the bottommost position remains in the 
          stack for the longest period of time. So, it 
          can be simply seen to follow LIFO(Last In 
          First Out)/FILO(First In Last Out) order.`,
          author: "Suresh Kr",
          imgUrl:
            "https://media.geeksforgeeks.org/img-practice/banner/coa-gate-2022-thumbnail.png",
            time: new Date("Aug 21, 2021 11:00:00"),
        },
        {
          title: "Algorithm",
          body: `The word Algorithm means “a process 
          or set of rules to be followed in calculations 
          or other problem-solving operations”. Therefore 
          Algorithm refers to a set of rules/instructions 
          that step-by-step define how a work is to be 
          executed upon in order to get the expected 
          results. `,
          author: "Monu Kr",
          imgUrl:
            "https://media.geeksforgeeks.org/img-practice/banner/google-test-series-thumbnail.png",
            time: new Date("Sep 05, 2021 21:28:00"),
        },
        {
          title: "Computer Network",
          body: `An interconnection of multiple devices, 
          also known as hosts, that are connected using 
          multiple paths for the purpose of sending/
          receiving data media. Computer networks can 
          also include multiple devices/mediums which 
          help in the communication between two different 
          devices; these are known as Network devices
          and include things such as routers, switches,
          hubs, and bridges. `, 
          author: "Sonu Kr",
          imgUrl:
            "https://media.geeksforgeeks.org/img-practice/banner/cp-maths-java-thumbnail.png",
            time: new Date("Dec 21, 2021 13:12:10")
        },
      ];
            

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