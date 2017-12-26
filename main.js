/*
    This is the main host side application, created in Electron
    Started from the Electron quickstart guide
*/

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const os = require('os');
const express = require('express');
const http = require('http');

let mainWin; //reference kept for garbage collection
let server;
let PORT = 5000;

var host_url;

function createWindow () {
    win = new BrowserWindow({width: 800, height: 600});

    //load the index.html of the app
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    //open DevTools
    win.webContents.openDevTools();

    //Emitted when the window is closed
    win.on('closed', () => {
        win = null;
    });
}

//This is called when Electron has finished initialization
app.on('ready', () => {
    setHostURL();
    createWindow();

    server = express();
    server.use(express.static("static"));
    server.use(express.json());
    server.get("/", function(req, res) {
        res.render('client');
    });
    //start server
    let httpServer = http.createServer(server);
    httpServer.listen(PORT, function() {
                // Print out our actual IP Address so they know what to tell their friends :D
                console.log("Listening on " + host_url);
            });
    });

//Quit when all windows are closed
app.on('window-all-closed', () => {
    //keep macOS around?
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    //macOS, re-create a window in the app when dock is clicked, if no windows open
    if(win === null) {
        createWindow();
    }
});

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
}