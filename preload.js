/**
 @name: preload.js
 @author: maoweifan
 @date: 2023/12/15
 */
const {contextBridge, ipcRenderer} = require('electron');

const electronHandler = {
    handle_invoke_promise_resolve_not_has_msg: () => {
        return ipcRenderer.invoke('handle_invoke_promise_resolve_not_has_msg');
    },
    btn_invoke_promise_resolve_has_msg: () => {
        return ipcRenderer.invoke('handle_invoke_promise_resolve_has_msg');
    },

    handle_invoke_promise_reject_not_has_msg: () => {
        return ipcRenderer.invoke('handle_invoke_promise_reject_not_has_msg');
    },
    btn_invoke_promise_reject_has_msg: () => {
        return ipcRenderer.invoke('handle_invoke_promise_reject_has_msg');
    }
}

contextBridge.exposeInMainWorld('electron', electronHandler);
