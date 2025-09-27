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
exports.logoutUser = exports.refreshAccessToken = exports.loginser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secret = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const exisitingUser = yield user_model_1.UserModel.findOne({ email: email });
        if (exisitingUser) {
            return res.status(402).json({
                success: false,
                message: "User Already Exist"
            });
        }
        const newUser = yield user_model_1.UserModel.create({
            username,
            password: hashedPassword,
            email,
        });
        const accesstoken = yield newUser.accessToken();
        const refreshtoken = yield newUser.refreshToken();
        const cookieOptions = {
            httpOnly: true, // Prevent JS access (secure from XSS)
            secure: process.env.NODE_ENV === 'production', //typescript accepts strict as a literal
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Only HTTPS in prod
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/'
        };
        return res.status(200).cookie("token", refreshtoken, cookieOptions).json({
            message: "Registration Sucessful",
            token: accesstoken,
            success: true,
        });
    }
    catch (e) {
        if (e instanceof Error) {
            console.log('Error occured', e.message);
        }
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
});
exports.registerUser = registerUser;
const loginser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("Request password:", password);
    try {
        const existingUser = yield user_model_1.UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                message: 'User not found',
                success: false,
            });
        }
        const hashedPassword = existingUser.password;
        const isPasswordValid = yield bcrypt_1.default.compare(password, hashedPassword);
        console.log("DB hashed password:", hashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid credentials',
                success: false,
            });
        }
        const accesstoken = yield existingUser.accessToken();
        const refreshToken = yield existingUser.refreshToken();
        const cookieOptions = {
            httpOnly: true, // Prevent JS access (secure from XSS)
            secure: process.env.NODE_ENV === 'production', //typescript accepts strict as a literal
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Only HTTPS in prod
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/'
        };
        return res.status(200).cookie("token", refreshToken, cookieOptions).json({
            message: 'Login successful',
            success: true,
            token: accesstoken,
        });
    }
    catch (e) {
        if (e instanceof Error) {
            console.log('Error occured', e.message);
        }
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
});
exports.loginser = loginser;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "No refresh token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
        const user = yield user_model_1.UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid refresh token" });
        }
        const newAccessToken = user.accessToken();
        return res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });
    }
    catch (err) {
        console.error("Refresh token error:", err.message);
        return res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
    }
});
exports.refreshAccessToken = refreshAccessToken;
const logoutUser = (_req, res) => {
    const cookieOptions = {
        httpOnly: true, // Prevent JS access (secure from XSS)
        secure: process.env.NODE_ENV === 'production', //typescript accepts strict as a literal
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Only HTTPS in prod
        path: '/'
    };
    res.clearCookie("token", cookieOptions).status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};
exports.logoutUser = logoutUser;
