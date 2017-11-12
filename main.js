const { app, BrowserWindow, shell } = require('electron');
const url = require('url');
const path = require('path');

// const Client = require('./src/api/coffee-client.js');

let win;
const props = { width: 1000, height: 650, minWidth: 600, minHeight: 450 };
// Client.addServer('My Local', '0.0.0.0', 'bryan');

app.on('ready', () => {
  win = new BrowserWindow(props);
  const webContents = win.webContents;

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // New windows should only be web, email, phone links
  webContents.on('new-window', (e, link) => {
    if (link !== webContents.getURL()) {
      e.preventDefault();
      shell.openExternal(link);
    }
  });

  win.on('ready-to-show', () => {
    win.show();
  });
});
