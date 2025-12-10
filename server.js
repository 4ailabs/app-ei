const { createServer } = require('http');
const { exec } = require('child_process');
const path = require('path');

const PORT = 3003;
const HOST = '127.0.0.1';

// Ejecutar Next.js en modo desarrollo
const nextProcess = exec('npx next dev --hostname 127.0.0.1 --port 3003', {
  cwd: __dirname,
  env: { ...process.env, HOSTNAME: '127.0.0.1', PORT: '3003' }
});

nextProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

nextProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});

nextProcess.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
});

// Manejar cierre limpio
process.on('SIGTERM', () => {
  nextProcess.kill();
  process.exit(0);
});

process.on('SIGINT', () => {
  nextProcess.kill();
  process.exit(0);
});

console.log(`Iniciando servidor Next.js en http://${HOST}:${PORT}`);
