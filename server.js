var express = require('express');
var app = express();
var sqlite_db = require('./sqlite.js');
const schema = require('./sqlite.js');

console.log(schema.schema);
const db = new sqlite_db.QueryDatabase('./db/db.sqlite', schema.schema);

app.use(express.urlencoded());

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
      res.send('Hello POST');
      // TODO: redirect to home page
    }
    else {
      res.send('Wrong password');
      // TODO: redirect to login page
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
      res.send('The email is already registered');
    }
    else {
      res.send('Successfully registered');
    }
  });
})

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
