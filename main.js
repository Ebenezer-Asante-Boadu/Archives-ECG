import { app, BrowserWindow, Menu } from 'electron';
import { fileURLToPath } from 'url';
import { join, dirname } from 'node:path';

const createWindow = () => {
  // Convert the import.meta.url to a file path
  const __filename = fileURLToPath(import.meta.url);

  // Get the directory name
  const __dirname = dirname(__filename);

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: join(__dirname, 'preload.cjs'),
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadFile('dist/index.html');

  mainWindow.loadURL('http://localhost:5173');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

function createMenu() {
  const template = [
    {
      label: 'YourApp',
      submenu: [
        {
          label: 'About YourApp',
          role: 'about',
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit(),
        },
      ],
    },
    {
      label: 'File',
      submenu: [
        // Add your file-related menu items here
      ],
    },
    {
      label: 'Edit',
      submenu: [
        // Add your edit-related menu items here
      ],
    },
    {
      label: 'View',
      submenu: [
        // Add your view-related menu items here
      ],
    },
    // Add more menu items as needed
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createMenu();
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createMenu();
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
