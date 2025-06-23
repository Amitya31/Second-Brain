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
exports.loginser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield user_model_1.UserModel.create({
            username,
            password: hashedPassword,
            email,
        });
        const token = yield newUser.accessToken();
        const cookieOptions = {
            httpOnly: true, // Prevent JS access (secure from XSS)
            secure: true, // Only HTTPS in prod
            sameSite: "strict", //typescript accepts strict as a literal
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        };
        res.status(200).cookie("token", token, cookieOptions).json({
            message: "Registration Sucessful",
            token: token,
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
        const token = yield existingUser.accessToken();
        const cookieOptions = {
            httpOnly: true, // Prevent JS access (secure from XSS)
            secure: true, // Only HTTPS in prod
            sameSite: "strict", //typescript accepts strict as a literal
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        };
        return res.status(200).cookie("token", token, cookieOptions).json({
            message: 'Login successful',
            success: true,
            token,
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
