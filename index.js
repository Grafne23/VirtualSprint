const express = require('express');
const http = require('http');
let PORT = 5000;

var app = express();

//app.set("port", PORT);
app.use(express.static("static"));
app.use(express.json());
//app.use(express.urlencoded());

var httpServer = http.createServer(app);
httpServer.listen(PORT, function() {
    // Print out our actual IP Address so they know what to tell their friends :D
    // console.log("Listening on " + host_url);
});

app.get("/", function(req, res) {
    res.sendFile('static/client.html');
});

app.get("/host/", function(req, res) {
    res.sendFile('static/host.html');
});

io = require('socket.io')(httpServer);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
    });
});

/*
function setHostURL () {
    var ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (ifname) {
        if (host_url) {
            return true;
        }
        ifaces[ifname].forEach(function (iface) {
            if (host_url) {
                return true;
            }
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            if (!host_url) {
                host_url = "http://" + iface.address + ":" + PORT + "/";
            }
        });
    });
}*/