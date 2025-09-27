"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../Controllers/auth.controller");
const router = (0, express_1.Router)();
//@ts-ignore
router.post('/user/register', auth_controller_1.registerUser);
//@ts-ignore
router.post('/user/login', auth_controller_1.loginser);
//@ts-ignore
router.post("/user/refresh", auth_controller_1.refreshAccessToken);
router.post("/user/logout", auth_controller_1.logoutUser);
exports.default = router;
