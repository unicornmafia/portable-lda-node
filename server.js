var fs = require("fs");
var host = "127.0.0.1";
var port = 1337;
var express = require("express");
var plugins = require('./test.json');
var app = express();

app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get('/test', function (req, res) {
  res.send(plugins);
});

app.get("/", function(request, response){ //root dir
    response.send("Hello!!");
});

app.listen(port, host);

console.log("Server running on " + port)