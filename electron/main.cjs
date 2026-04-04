const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');

const isDev = process.env.ELECTRON_ENV === 'development';

function createWindow() {
	const win = new BrowserWindow({
		width: 560,
		height: 720,
		minWidth: 300,
		minHeight: 400,
		title: 'Singletask',
		icon: path.join(__dirname, isDev ? '../public/logo.png' : '../dist/logo.png'),
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.cjs'),
			nodeIntegration: false,
			contextIsolation: true,
		},
	});

	if (isDev) {
		win.loadURL('http://localhost:8080');
	} else {
		win.loadFile(path.join(__dirname, '../dist/index.html'));
	}

	win.webContents.setWindowOpenHandler(({ url }) => {
		shell.openExternal(url);
		return { action: 'deny' };
	});

	ipcMain.handle('toggle-always-on-top', () => {
		const next = !win.isAlwaysOnTop();
		win.setAlwaysOnTop(next);
		return next;
	});
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
