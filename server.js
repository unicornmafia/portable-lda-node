var fs = require("fs");
var host = "0.0.0.0";
var port = 1337;
var express = require("express");
var plugins = require('./test.json');
var app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.all('/test', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/test', function (req, res) {
  res.send(plugins);
});

app.get("/", function(request, response){ //root dir
    response.send("LDA Node server is totally working too!!");
});

app.listen(port, host);

console.log("Server running on " + port)