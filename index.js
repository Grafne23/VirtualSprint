const express = require('express');
const http = require('http');
const path    = require("path");
let PORT = 5000;

var app = express();
var numUsers = 0;

//Like a simple DB
//{user, {choice, score}};
var users = new Object();
var correctAnswers = ['C', 'B', 'A', 'D', 'A', 'C'];

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
    res.sendFile(path.join(__dirname+'/static/client.html'));
});

app.get("/host/", function(req, res) {
    res.sendFile(path.join(__dirname+'/static/host.html'));
});

io = require('socket.io')(httpServer);

io.on('connection', function(socket){
    console.log('a user connected');
    var addedUser = false;
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('choice', function(msg) {
        console.log(socket.username + " chose " + msg);
        users[socket.username].choice = msg;
        console.log(users);
    });
    socket.on('team name', function(name) {
        if (addedUser) return;
        
        // we store the username in the socket session for this client
        socket.username = name;
        users[name] = {choice:'X', score:0};
        ++numUsers;
        addedUser = true;
        console.log('name selected: ' + name);
        io.emit('team name', name);
    });
    socket.on('Q', function(num) {
        console.log('Question selected: ' + num);
        io.emit('Q', num);
    });
    socket.on('QF', function(num) {
        console.log('Question finished: ' + num);
        io.emit('QF', num);

        
        console.log(users);
        for(user in users) {
            console.log(correctAnswers[num - 1]);
            console.log(users[user].choice);
            if(users[user].choice == correctAnswers[num - 1]) {
                console.log(user + " got it correct!");
                users[user].score++;
            }
        }
        
        io.emit('scores', users);

        for(user in users) {
            users[user].choice = 'X';
        }
        console.log(users);
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