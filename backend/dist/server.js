"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('api/v1/auth/signin', (req, res) => {
});
app.post('api/v1/auth/signin', (req, res) => {
});
app.get('api/v1/content', (req, res) => {
});
app.post('api/v1/brain/share', (req, res) => {
});
app.post('api/v1/brain/:sharelink', (req, res) => {
});
(0, db_1.default)();
const user_route_1 = __importDefault(require("./routes/user.route"));
const content_route_1 = __importDefault(require("./routes/content.route"));
const link_route_1 = __importDefault(require("./routes/link.route"));
app.use('/api/v1', user_route_1.default);
app.use('/api/v1', content_route_1.default);
app.use('/api/v1', link_route_1.default);
app.listen(3000, () => {
    console.log('app is listening');
});
