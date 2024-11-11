// src/index.ts
import mongoose from 'mongoose';
import { createApp } from './app';

const startServer = async () => {
  try {
    // Подключение к MongoDB
    await mongoose.connect('mongodb://localhost:27017/auth_demo');
    console.log('Connected to MongoDB');

    const app = createApp();
    const PORT = process.env.PORT || 3000;
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
