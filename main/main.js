const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // ชี้ไปที่ preload script
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // โหลดหน้าเว็บ
  if (isDev) {
    // ตอนพัฒนา: โหลดจากเซิร์ฟเวอร์ของ Next.js
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // ตอนใช้งานจริง: โหลดจากไฟล์ที่ build แล้ว
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'renderer', 'index.html'));
  }
}

// จัดการการเรียกใช้ 'dialog:openFile' จาก Renderer
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0];
  }
}

app.whenReady().then(() => {
  // ตั้งค่า Listener สำหรับ IPC
  ipcMain.handle('dialog:openFile', handleFileOpen);
  
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});