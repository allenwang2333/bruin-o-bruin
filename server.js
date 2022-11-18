var express = require('express');
var app = express();
var path = require('path');
const { nextTick } = require('process');
var sqlite_db = require('./sqlite.js');
const schema = require('./sqlite.js');
const { v4: uuidv4 } = require('uuid');
const { userInfo } = require('os');

console.log(schema.schema);
const db = new sqlite_db.QueryDatabase('./db/db.sqlite', schema.schema);
app.use(express.urlencoded( {extended: false}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../bruin-o-bruin/bruin-o-bruin/build')));

app.post('/server_auth_signin', function (req, res) {
  var table = "users";
  var user_email = req.body.email;
  var user_password = req.body.password;
  console.log("Connected to react page");
  db.connectDatabase();
  db.readTableByEmail("users", user_email, function (userInfo) {
    console.log(userInfo);
    if (userInfo.email == user_email && userInfo.passwd == user_password) {
      res.send([{"valid": true}, {"username": userInfo.username}, {"userID": userInfo.userid}]);
    }
    else {
      res.send([{"valid": false}, {"message": "Invalid email or password"}]);
    }
  });
})

app.post('/server_auth_signup', function (req, res) {
  var user_name = req.body.fullname;
  var user_email = req.body.email;
  var user_password = req.body.password;
  var user_id = uuidv4();
  console.log("Connected to react page");
  console.log(user_name, user_id, user_email, user_password);
  db.connectDatabase();
  db.addUser("users", user_email, user_name, user_id, user_password, function (userInfo) {
    console.log(userInfo);
    if (Object.keys(userInfo).length == 0) {
      res.send([{"valid": false}, {"message": "The email is already registered"}]);
    }
    else {
      res.send([{"valid": true}, {"username": userInfo.username}, {"userID": userInfo.userid}]);
    }
  });
})

app.post('/reset_passwd', function (req, res) {
  var user_email = req.body.email;
  var user_name = req.body.fullname;
  var user_password = req.body.password;
  var user_password_confirm = req.body.password_confirm;
  if (user_password != user_password_confirm) {
    res.send([{"valid": false}, {"message": "Password should be consistent"}]);
  }
  else {
    db.connectDatabase();
    db.updatePassword("users", user_email, user_name, user_password, function (userInfo) {
      console.log(userInfo)
      if (Object.keys(userInfo).length === 0 || userInfo.username != user_name) {
        res.send([{"valid": false}, {"message": "User does not exist or wrong user name"}]);
      }
      else {
        res.send([{"valid": true}, {"username": userInfo.username}, {"userID": userInfo.userid}]);
      }
    });
  }
});

app.post('/compose', function (req, res) {
  var user_email = req.body.email;
  var user_name = req.body.fullname;
  var user_password = req.body.password;
  var user_password_confirm = req.body.password_confirm;
  if (user_password != user_password_confirm) {
    res.send("<>Password should be consistent<>");
  }
  else {
    db.connectDatabase();
    db.updatePassword("users", user_email, user_name, user_password, function (userInfo) {
      console.log(userInfo)
      if (Object.keys(userInfo).length === 0 || userInfo.username != user_name) {
        res.send('<>User does not exist or wrong user name<>');
      }
      else {
        res.send(userInfo.username);
      }
    });
  }
});

app.get('/posts', function (req, res) {
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
  res.send(blogPosts);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../bruin-o-bruin/bruin-o-bruin/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
