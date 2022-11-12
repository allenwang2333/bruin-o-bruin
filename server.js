var express = require('express');
var app = express();

// This responds a POST request direct to react page
app.post('/post', function (req, res) {
  console.log("Connected to react page");
  res.send('Hello POST');
})

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
