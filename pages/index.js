import { useState } from 'react';

export default function HomePage() {
  const [filePath, setFilePath] = useState('');

  const handleOpenFile = async () => {
    // เรียกใช้ฟังก์ชันที่ส่งมาจาก preload.js
    const path = await window.api.openFile();
    setFilePath(path || 'คุณไม่ได้เลือกไฟล์ใดๆ');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Electron + Next.js</h1>
      <p>กดปุ่มเพื่อเปิดหน้าต่างเลือกไฟล์ของเครื่องคุณ</p>
      
      <button onClick={handleOpenFile}>
        เลือกไฟล์
      </button>

      {filePath && (
        <p style={{ marginTop: '20px', wordBreak: 'break-all' }}>
          <b>ไฟล์ที่เลือก:</b> {filePath}
        </p>
      )}
    </div>
  );
}