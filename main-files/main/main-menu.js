import { app, Menu } from 'electron';

export function createMenu() {
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