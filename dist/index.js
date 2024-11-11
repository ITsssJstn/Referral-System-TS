"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const startServer = async () => {
    try {
        // Подключение к MongoDB
        await mongoose_1.default.connect('mongodb://localhost:27017/auth_demo');
        console.log('Connected to MongoDB');
        const app = (0, app_1.createApp)();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map