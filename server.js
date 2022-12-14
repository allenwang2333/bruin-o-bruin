var express = require('express');
var app = express();
var path = require('path');
var sqlite_db = require('./sqlite.js');
const schema = require('./sqlite.js');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')

console.log(schema.schema);
const db = new sqlite_db.QueryDatabase('./db/db.sqlite', schema.schema);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../bruin-o-bruin/bruin-o-bruin/build')));
app.use('/images', express.static('images'));

app.post('/server_auth_signin', (req, res) => {
  var table = "users";
  var user_email = req.body.email;
  var user_password = req.body.password;
  console.log("Connected to react page");
  db.connectDatabase(() => {
    db.readTableByEmail("users", user_email, (userInfo) => {
      console.log(userInfo);
      if (userInfo.email == user_email && userInfo.passwd == user_password) {
        res.send([{ "valid": true }, { "username": userInfo.username }, { "userID": userInfo.userid }]);
      }
      else {
        res.send([{ "valid": false }, { "message": "Invalid email or password" }]);
      }
      db.closeDatabase();
    });
  });
})

app.post('/server_auth_signup', (req, res) => {
  var user_name = req.body.fullname;
  var user_email = req.body.email;
  var user_password = req.body.password;
  var user_id = uuidv4();
  console.log("Connected to react page");
  console.log(user_name, user_id, user_email, user_password);
  db.connectDatabase(() => {
    db.addUser("users", user_email, user_name, user_id, user_password, (userInfo) => {
      console.log(userInfo);
      if (Object.keys(userInfo).length == 0) {
        res.send([{ "valid": false }, { "message": "The email is already registered" }]);
      }
      else {
        res.send([{ "valid": true }, { "username": userInfo.username }, { "userID": userInfo.userid }]);
      }
      db.closeDatabase();
    });
  });
})

app.post('/reset_passwd', (req, res) => {
  var user_email = req.body.email;
  var user_name = req.body.fullname;
  var user_password = req.body.password;
  var user_password_confirm = req.body.password_confirm;
  if (user_password != user_password_confirm) {
    res.send([{ "valid": false }, { "message": "Password should be consistent" }]);
  }
  else {
    db.connectDatabase(() => {
      db.updatePassword("users", user_email, user_name, user_password, (userInfo) => {
        console.log(userInfo)
        if (Object.keys(userInfo).length === 0 || userInfo.username != user_name) {
          res.send([{ "valid": false }, { "message": "User does not exist or wrong user name" }]);
        }
        else {
          res.send([{ "valid": true }, { "username": userInfo.username }, { "userID": userInfo.userid }]);
        }
        db.closeDatabase();
      });
    });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + file.originalname)
  }
});

const upload = multer({ storage: storage });
app.post('/compose_pic', upload.single('file'), (req, res) => {
  var table = "posts";
  var post_title = req.body.title;
  var author_name = req.body.author_name;
  var author_id = req.body.author_id;
  var post_body = req.body.body;
  var post_id = req.body.post_id;
  var post_likes = 0;
  const url = req.protocol + '://' + req.get('host')
  var post_img = url + '/images/' + req.file.filename;
  var post_time = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  db.connectDatabase(() => {
    db.addNewPost(table, post_title, author_name, author_id, post_body, post_likes, post_id, post_img, post_time, (postInfo) => {
      res.send("successfully posted");
      db.closeDatabase();
    });
  });
});

app.post('/compose_text', (req, res) => {
  var table = "posts";
  var post_title = req.body.title;
  var author_name = req.body.author_name;
  var author_id = req.body.author_id;
  var post_body = req.body.body;
  var post_id = req.body.post_id;
  var post_likes = 0;
  var post_img = '';
  var post_time = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  db.connectDatabase(() => {
    db.addNewPost(table, post_title, author_name, author_id, post_body, post_likes, post_id, post_img, post_time, (postInfo) => {
      res.send("successfully posted");
      db.closeDatabase();
    });
  });
});

app.post('/server_postLike', (req, res) => {
  var table = "posts";
  var count = Number(req.body.count); // count is 1 for like, -1 for unlike
  var id = req.body.postID;
  db.connectDatabase(() => {
    db.likeOrUnlikePost(table, id, count, (postInfo) => {
      if (Object.keys(postInfo).length !== 0) {
        res.send([{ "valid": true }, { "message": "successfully posted" }]);
      }
      else {
        res.send([{ "valid": false }, { "message": "failed to post" }]);
      }
      db.closeDatabase();
    });
  });
});

app.post('/success', (req, res) => {
  let table = "scoreboard";
  var username = req.body.username;
  var userid = req.body.userid;
  var score = req.body.score;
  var time = req.body.time;
  let winGame = [{ "valid": false }];
  db.connectDatabase(() => {
    db.addUserOrUpdateScoreboard(table, username, userid, score, time, (scoreInfo) => {
      winGame = [{ "valid": true }];
      console.log(scoreInfo)
      res.send(winGame)
      db.closeDatabase();
    });
  });
});

app.post('/posts', (req, res) => {
  var key = req.body.search;
  if (key === "") { // if search is empty, return all posts
    db.connectDatabase(() => {
      db.readTableAll("posts", (posts) => {
        let blogPosts = [
          { "valid": true },
        ];

        for (var i = posts.length - 1; i >= 0; i--) {
          var data = {};
          data["postID"] = posts[i].postid;
          data["title"] = posts[i].title;
          data["body"] = posts[i].content;
          data["author"] = posts[i].author;
          data["imgUrl"] = posts[i].image;
          data["time"] = posts[i].time;
          data["like"] = posts[i].likes;
          blogPosts.push(data);
        }
        res.send(blogPosts);
        db.closeDatabase();
      });
    });
  }
  else { // if search is not empty, return posts that contain the search string
    console.log("searching for " + key);
    db.connectDatabase(() => {
      db.searchPosts("posts", key, (posts) => {
        let blogPosts = [
          { "valid": true },
        ];

        for (var i = posts.length - 1; i >= 0; i--) {
          var data = {};
          data["postID"] = posts[i].postid;
          data["title"] = posts[i].title;
          data["body"] = posts[i].content;
          data["author"] = posts[i].author;
          data["imgUrl"] = posts[i].image;
          data["time"] = posts[i].time;
          data["like"] = posts[i].likes;
          blogPosts.push(data);
        }
        res.send(blogPosts);
        db.closeDatabase();
      });
    });
  }
});

app.get('/scoreboard', (req, res) => {
  let scores = [{ "valid": true }];
  db.connectDatabase(() => {
    db.readTableAll("scoreboard", (scoreInfo) => {
      for (var i = 0; i < scoreInfo.length; i++) {
        let userStatus = {};
        userStatus["username"] = scoreInfo[i].username;
        userStatus["userid"] = scoreInfo[i].userid;
        userStatus["score"] = scoreInfo[i].score;
        userStatus["time"] = scoreInfo[i].time;
        var time = Number(scoreInfo[i].time);
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        userStatus["timeString"] = `${minutes} m ${seconds} s`;
        scores.push(userStatus);
      }
      res.send(scores);
      db.closeDatabase();
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../bruin-o-bruin/bruin-o-bruin/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
