var express = require('express');
var app = express();
var path = require('path');
const { nextTick } = require('process');
var sqlite_db = require('./sqlite.js');
const schema = require('./sqlite.js');

console.log(schema.schema);
const db = new sqlite_db.QueryDatabase('./db/db.sqlite', schema.schema);
app.use(express.urlencoded());

app.use(express.static(path.resolve(__dirname, '../bruin-o-bruin/bruin-o-bruin/build')));

// This responds a POST request direct to react page
app.post('/post', function (req, res) {
  console.log("Connected to react page");
  res.send('Hello POST');
})

app.post('/server_auth_signin', function (req, res) {
  var table = "users";
  var user_email = req.body.email;
  var user_password = req.body.password;
  console.log("Connected to react page");
  db.connectDatabase();
  console.log(schema);
  db.readTableByEmail("users", user_email, function (userInfo) {
    console.log(userInfo);
    if (userInfo.email == user_email && userInfo.passwd == user_password) {
      res.send(userInfo.username);
    }
    else {
      res.send("<>Invalid email or password<>");
    }
  });
})

app.post('/server_auth_signup', function (req, res) {
  var user_name = req.body.fullname;
  var user_email = req.body.email;
  var user_password = req.body.password;
  console.log("Connected to react page");
  console.log(user_name, user_email, user_password);
  db.connectDatabase();
  db.addUser("users", user_email, user_name, user_password, function (userInfo) {
    console.log(userInfo);
    if (Object.keys(userInfo).length === 0) {
      res.send('<>The email is already registered<>');
    }
    else {
      res.send(userInfo.username);
    }
  });
})

app.post('/reset_passwd', function(req, res){
  var user_email = req.body.email;
  var user_name = req.body.fullname;
  var user_password = req.body.password;
  var user_password_confirm = req.body.password_confirm;
  if (user_password != user_password_confirm){
    res.send("<>Password should be consistent<>");
  }
  else {
    db.connectDatabase();
    db.updatePassword("users", user_email, user_name ,user_password, function (userInfo) {
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../bruin-o-bruin/bruin-o-bruin/build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
