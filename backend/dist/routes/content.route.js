"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_controller_1 = require("../Controllers/content.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
// @ts-ignore
router.post('/content', auth_middleware_1.default, content_controller_1.CreateContent);
//@ts-ignore
router.get('/content', auth_middleware_1.default, content_controller_1.getContent);
//@ts-ignore
router.delete('/content/:id', auth_middleware_1.default, content_controller_1.deleteContent);
exports.default = router;
