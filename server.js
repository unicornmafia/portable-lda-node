var app = require('express')(),
    plugins = require('./plugins.json'),
    SERVER_ADDRESS = 8001;

app.get('/plugins', function (req, res) {
  res.send(plugins);
});

app.listen(SERVER_ADDRESS);

console.log('Plugin registry server started on port: ' + SERVER_ADDRESS);
