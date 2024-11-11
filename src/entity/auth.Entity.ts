import mongoose, { Document, Schema } from 'mongoose';
import { randomUUID } from 'node:crypto';

// Интерфейс пользователя
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId; // Используем ObjectId вместо UUID для совместимости с MongoDB
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    referralCode?: string;  // Поле для реферального кода
    invitedBy?: mongoose.Types.ObjectId | null;  // ID пригласившего пользователя (ссылка на ObjectId)
    balance?: number;  // Баланс пользователя
    invitedUsers?: mongoose.Types.ObjectId[];  // Список приглашенных пользователей (ссылки на ObjectId)
}

// Схема пользователя
const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    auto: true
  },
  
  email: { 
    type: String, 
    required: true,
    unique: true,
    sparse: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  name: { 
    type: String, 
    required: true 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  },

  referralCode: {  // Уникальный код для реферальной ссылки
    type: String,
    unique: true,
    default: () => randomUUID() // Генерация реферального кода по умолчанию
  },

  invitedBy: {  // ID пользователя, который пригласил текущего пользователя
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  balance: {  // Баланс пользователя
    type: Number,
    default: 0
  },

  invitedUsers: [{  // Список ID приглашенных пользователей
      type: Schema.Types.ObjectId,
      ref: 'User'
  }]
});

// Индекс для email
userSchema.index({ email: 1 }, { 
  unique: true,
  sparse: true,
  background: true
});

export const UserEntity = mongoose.model<IUser>('User', userSchema);