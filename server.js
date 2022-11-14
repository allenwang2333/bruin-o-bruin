var express = require('express');
var app = express();

app.use(express.urlencoded());

// This responds a POST request direct to react page
app.post('/post', function (req, res) {
  console.log("Connected to react page");
  res.send('Hello POST');
})

app.post('/server_auth_signin', function (req, res) {
  var user_email = req.body.email;
  var user_password = req.body.password;
  console.log("Connected to react page");
})

app.post('/server_auth_signup', function (req, res) {
  var user_name = req.body.fullname;
  var user_email = req.body.email;
  var user_password = req.body.password;
  console.log("Connected to react page");
  console.log(user_name, user_email, user_password);
})

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
