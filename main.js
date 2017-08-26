const electron = require('electron');
const url = require('url');
const path = require('path');
require('electron-reload')(__dirname);

const { app, BrowserWindow } = electron;
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

// const Client = require('./src/api/coffee-client.js');

let win;
const props = { width: 900, height: 550, minWidth: 600, minHeight: 450 };
// Client.addServer('My Local', '0.0.0.0', 'bryan');

app.on('ready', () => {
  win = new BrowserWindow(props);

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  win.on('ready-to-show', () => {
    win.show();
  });

  installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
    console.log(`Added Extension:  ${name}`);
  })
    .catch((err) => {
      console.log('An error occurred: ', err);
    });
});
