"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const db_1 = __importDefault(require("./config/db"));
const cookieParser = require('cookie-parser');
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
const allowedOrigins = ["http://localhost:5173"]; // your frontend's URL
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
app.use(cookieParser());
(0, db_1.default)();
const user_route_1 = __importDefault(require("./routes/user.route"));
const content_route_1 = __importDefault(require("./routes/content.route"));
const link_route_1 = __importDefault(require("./routes/link.route"));
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV
    });
});
app.use('/api/v1', user_route_1.default);
app.use('/api/v1', content_route_1.default);
app.use('/api/v1', link_route_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
