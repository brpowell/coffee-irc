const electron = require('electron');
const {app, BrowserWindow} = electron;
const url = require('url');
const path = require('path');
require('electron-reload')(__dirname);

let win;
let props = { width: 1100, height: 700 };

app.on('ready', () => {
    win = new BrowserWindow(props);

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.on('ready-to-show', () => {
        win.show();
    })
})