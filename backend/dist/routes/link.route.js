"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const link_controller_1 = require("../Controllers/link.controller");
const router = (0, express_1.Router)();
//@ts-ignore
router.post('/share', auth_middleware_1.default, link_controller_1.ShareLink);
//@ts-ignore
router.get('/share/:ShareId', auth_middleware_1.default, link_controller_1.ShareIdd);
exports.default = router;
