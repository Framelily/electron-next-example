const { contextBridge, ipcRenderer } = require('electron');

// เปิดเผย API ที่ปลอดภัยให้กับ Renderer Process (หน้าเว็บ Next.js)
contextBridge.exposeInMainWorld('api', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
});