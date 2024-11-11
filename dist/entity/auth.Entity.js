"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const node_crypto_1 = require("node:crypto");
// Схема пользователя
const userSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.default.Types.ObjectId(),
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
    referralCode: {
        type: String,
        unique: true,
        default: () => (0, node_crypto_1.randomUUID)() // Генерация реферального кода по умолчанию
    },
    invitedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    balance: {
        type: Number,
        default: 0
    },
    invitedUsers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }]
});
// Индекс для email
userSchema.index({ email: 1 }, {
    unique: true,
    sparse: true,
    background: true
});
exports.UserEntity = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=auth.Entity.js.map