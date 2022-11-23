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
  db.closeDatabase();
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
  db.closeDatabase();
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
    db.closeDatabase();
  }
});

app.post('/compose', function (req, res) {
  var table = "posts";
  var post_title = req.body.title;
  var author_name = req.body.author_name;
  var author_id = req.body.author_id;
  var post_body = req.body.body;
  var post_id = uuidv4();
  var post_likes = 0;
  var post_img = req.body.img;
  var post_time = new Date().toLocaleString('en-US', {timeZone: 'America/Los_Angeles'});
  db.connectDatabase();
  db.addNewPost(table, post_title, author_name, author_id, post_body, post_likes, post_id, post_img, post_time, function (postInfo) {
    console.log(postInfo);
  });
  res.send([{"valid": true}, {"message": "successfully posted"}]);
  db.closeDatabase();
});

app.post('/server_post_like', function (req, res) {
  var table = "posts";
  var count = req.body.count; // count is 1 for like, -1 for unlike
  var id = req.body.postID;
  db.connectDatabase();
  db.updateLikes(table, id, count, function (postInfo) {
    if (Object.keys(postInfo).length !== 0) {
      res.send([{"valid": true}, {"message": "successfully posted"}]);
    }
  });
  db.closeDatabase();
});

app.get('/posts', function (req, res) {
  db.connectDatabase();
  db.readTableAll("posts", function (posts) {
    let blogPosts = [
      {"valid": true},
    ];

    for (var i = posts.length - 1; i >= 0; i--) {
      var data = {};
      data["postID"] = posts[i].postid;
      data["title"] = posts[i].title;
      data["author"] = posts[i].author;      
      data["imageURL"] = posts[i].image;
      data["time"] = posts[i].time;
      data["like"] = posts[i].likes; 
      blogPosts.push(data);
    }
    console.log(blogPosts);
    res.send(blogPosts);
  });
  db.closeDatabase();
});

app.get('/scoreboard', function (req, res) {
  res.send([{"valid": true}, {
    name: 'Joe Bruin',
    location: 'Los Angeles, CA',
    score: 100,
    img: 'https://i.imgur.com/8Km9tLL.png',
    post_time: '2022-11-20'
},

{
    name: 'Joe 2',
    location: 'Los Angeles, CA',
    score: 101,
    img: 'https://i.imgur.com/8Km9tLL.png',
    post_time: '2022-11-20'
}]);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../bruin-o-bruin/bruin-o-bruin/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
