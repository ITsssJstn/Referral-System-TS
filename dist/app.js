"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const auth_controller_1 = require("./controllers/auth.controller");
const auth_middleware_1 = require("./middleware/auth.middleware");
const createApp = () => {
    const app = (0, express_1.default)();
    // Middleware
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Статические файлы
    app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
    const authController = new auth_controller_1.AuthController();
    // Routes
    app.post('/api/auth/register', (req, res) => authController.register(req, res));
    app.post('/api/auth/login', (req, res) => authController.login(req, res));
    app.get('/api/auth/profile', auth_middleware_1.authMiddleware, (req, res) => authController.getProfile(req, res));
    // Корневой маршрут
    app.get('/', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
    });
    // Добавляем обработку GET-запроса для страницы регистрации
    app.get('/register', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../public/register.html')); // Отправляем HTML-страницу регистрации
    });
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map