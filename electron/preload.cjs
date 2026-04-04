const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronApp', {
	versions: {
		node: process.versions.node,
		chrome: process.versions.chrome,
		electron: process.versions.electron,
	},
	toggleAlwaysOnTop: () => ipcRenderer.invoke('toggle-always-on-top'),
});
