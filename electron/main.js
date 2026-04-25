const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800
  });

  //const isDev = !app.isPackaged;
  const isDev = false; // Force production mode for testing

  if (isDev) {
    // 🔥 Development: React dev server
    win.loadURL("http://localhost:3000");
  } else {
    // 🚀 Production: built React files
    win.loadFile(
      path.join(__dirname, "../client/build/index.html")
    );
  }
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);