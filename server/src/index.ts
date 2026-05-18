import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/db.js';

async function main(): Promise<void> {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Listening on http://localhost:${env.port}`);
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
}

main().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
