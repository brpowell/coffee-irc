const electron = require('electron');
const {app, BrowserWindow} = electron;
const url = require('url');
const path = require('path');
require('electron-reload')(__dirname);
const irc = require('irc')

let win;
let props = { width: 1100, height: 700, minWidth: 600, minHeight: 450 };

app.on('ready', () => {
    win = new BrowserWindow(props);
    global.client = new irc.Client('0.0.0.0', 'bryan');

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.on('ready-to-show', () => {
        win.show();
    })
})