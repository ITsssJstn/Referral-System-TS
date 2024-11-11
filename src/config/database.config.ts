
import mongoose from 'mongoose';

export const databaseConfig = {
  url: process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_demo',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};

export const connectDatabase = async () => {
  try {
    await mongoose.connect(databaseConfig.url);
    console.log('База данных подключена');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
    process.exit(1);
  }
};