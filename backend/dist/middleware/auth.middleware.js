"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../models/user.model");
dotenv_1.default.config();
const VerifyJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const secret = process.env.ACCESS_TOKEN_SECRET;
    try {
        let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            token = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.accessToken;
        }
        if (!token) {
            return res.status(401).json({
                message: "Access token is required",
                success: false,
            });
        }
        if (!secret) {
            console.error('ACCESS_TOKEN_SECRET is not defined');
            return res.status(500).json({
                message: "Server configuration error",
                success: false,
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!decoded) {
            res.status(404).json({
                message: "Unauthorized access",
                success: false,
            });
        }
        const { userId } = decoded;
        const userdetail = yield user_model_1.UserModel.findById(userId);
        if (!userdetail) {
            return res.status(401).json({
                message: "User not found",
                success: false,
            });
        }
        req.userdetail = userdetail;
        next();
    }
    catch (e) {
        console.log('JWT Verification Error:', e instanceof Error ? e.message : 'Unknown error');
        if (e instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({
                message: "Token has expired",
                success: false,
                code: "TOKEN_EXPIRED"
            });
        }
        if (e instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
                code: "INVALID_TOKEN"
            });
        }
        return res.status(401).json({
            message: "Authentication failed",
            success: false,
        });
    }
});
exports.default = VerifyJwt;
