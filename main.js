/*
    This is the main host side application, created in Electron
    Started from the Electron quickstart guide
*/

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

//keep global copy of window object so it isn't garbage collected
let win;

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
app.on('ready', createWindow);

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

//Now do whatever this app should do! Or require them here
