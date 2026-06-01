import dotenv from 'dotenv';
import path from 'path';

// Load env variables
dotenv.config({ path: path.join(__dirname, '../.env') });

import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` ☕ CaféStoll API Server Running!`);
  console.log(` 🚀 Port: http://localhost:${PORT}`);
  console.log(` 📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});
