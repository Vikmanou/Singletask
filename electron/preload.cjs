const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronApp', {
	isElectron: true,
	toggleAlwaysOnTop: () => ipcRenderer.invoke('toggle-always-on-top'),
});
