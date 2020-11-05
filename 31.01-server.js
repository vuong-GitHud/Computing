const hostname = '127.0.0.1';
const port = process.env.PORT || 8080;


/// ------------------ Khai bao LIB de su dung
var express = require('express');
var session = require('express-session');
var app = express();

/// ..................................................
app.get('/', homePage);
function homePage(req, res) {
    res.send("HOME !");   
    console.log("\n\t ... connect from ", req.connection.remoteAddress, req.headers.host);
}

/// ------------------ gọi SERVER thực thi


var server = app.listen( port , function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("SERVER http://%s:%s", host, port)
});
