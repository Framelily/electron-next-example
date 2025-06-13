/** @type {import('next').NextConfig} */
const nextConfig = {
  // บอก Next.js ว่าเราต้องการผลลัพธ์เป็น static export
  output: 'export',

  // กำหนดโฟลเดอร์สำหรับผลลัพธ์ของ build (เหมือน -o เดิม)
  distDir: 'dist/renderer',
};

module.exports = nextConfig;