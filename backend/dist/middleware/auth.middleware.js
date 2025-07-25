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
    var _a;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || req.cookies.token;
        const decoded = jsonwebtoken_1.default.verify(token, "S3CR3TK3Y");
        if (!decoded) {
            res.status(404).json({
                message: "Unauthorized access",
                success: false,
            });
        }
        const { userId } = decoded;
        const userdetail = yield user_model_1.UserModel.findById(userId);
        req.userdetail = userdetail;
        next();
    }
    catch (e) {
        if (e instanceof Error) {
            console.log('Error occured', e.message);
        }
        return res.status(500).json({
            message: "Invalid or expired token",
            success: false,
        });
    }
});
exports.default = VerifyJwt;
