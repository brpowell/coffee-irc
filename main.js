const electron = require('electron');
const {app, BrowserWindow} = electron;
const url = require('url');
const path = require('path');
require('electron-reload')(__dirname);
const irc = require('irc')

const Client = require('./src/api/coffee-client.js');

let win;
let props = { width: 900, height: 550, minWidth: 600, minHeight: 450 };
// Client.addServer('My Local', '0.0.0.0', 'sweet');

app.on('ready', () => {
    win = new BrowserWindow(props);
    // global.client = new irc.Client('0.0.0.0', 'bryan');

    

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.on('ready-to-show', () => {
        win.show();
    })
})