// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, shell, dialog } = require("electron");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
const isMac = process.platform === "darwin";

const template = [
    // { role: 'fileMenu' }
    {
        label: "File",
        submenu: [
            isMac ? { role: "close" } : { role: "quit" },
            {
                label: "Open Folder",
                click: async () => {
                    const folder = await dialog.showOpenDialog({
                        properties: ["openDirectory"],
                    });

                    console.log("Folder selected", folder);
                    win.webContents.send("ping", folder);
                },
            },
        ],
    },
    // { role: 'viewMenu' }
    {
        label: "View",
        submenu: [
            { role: "reload" },
            { role: "forceReload" },
            { role: "toggleDevTools" },
            { type: "separator" },
            { role: "resetZoom" },
            { role: "zoomIn" },
            { role: "zoomOut" },
            { type: "separator" },
            { role: "togglefullscreen" },
        ],
    },
    {
        role: "help",
        submenu: [
            {
                label: "Learn More",
                click: async () => {
                    await shell.openExternal("https://electronjs.org");
                },
            },
        ],
    },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "src/preload.js"),
        },
        backgroundColor: "#1b1b1b",
    });

    // and load the index.html of the app.
    win.loadFile("src/index.html");

    // Open the DevTools.
    // win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
