const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const Server = require("electron-rpc/server");
const server = new Server();

const { Store } = require("./Store");

const store = new Store({
  name: "main"
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL("http://localhost:3000");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  server.configure(mainWindow.webContents);

  server.on("window-create", (req, next) => {
    const savedData = store.getData();
    next(null, savedData);
  });

  server.on("get-store", (req, next) => next(null, store.getData()));

  server.on("clipboard-update", (req, next) => {
    store.updateData([req.body, ...store.getData()]);
  });

  server.on("delete-item", (req, next) => {
    const { id } = req.body;
    const updatedData = store.deleteData(id);
    next(null, updatedData);
  });

  server.on("empty-clipboard", (req, next) => {
    store.updateData([]);
    next();
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
