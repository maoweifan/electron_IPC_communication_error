/**
 @name: main.js
 @author: maoweifan
 @date: 2023/12/15
 */
const {app, BrowserWindow} = require("electron");
const path = require("node:path");
const {ipcMain} = require("electron");

// register ipcMain
ipcMain.handle("handle_invoke_promise_resolve_not_has_msg", (event, args) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 100);
    })
})
ipcMain.handle('handle_invoke_promise_resolve_has_msg', (event, args) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("handle_invoke_promise_resolve_has_msg message from main.js");
        }, 100);
    })
});

ipcMain.handle('handle_invoke_promise_reject_not_has_msg', (event, args) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject();
        }, 100);
    })
});

ipcMain.handle('handle_invoke_promise_reject_has_msg', (event, args) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("handle_invoke_promise_reject_has_msg message from main.js");
        }, 100);
    })
});

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800, height: 600, webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    mainWindow.loadFile("index.html");
    mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
