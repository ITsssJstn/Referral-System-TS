"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.databaseConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.databaseConfig = {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_demo',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(exports.databaseConfig.url);
        console.log('База данных подключена');
    }
    catch (error) {
        console.error('Ошибка подключения к базе данных:', error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=database.config.js.map