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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // const uri = process.env.MONGODB_URL as string
        try {
            //  if (!uri) {
            //    throw new Error('MONGODB_URL is not defined in .env');
            //  }
            yield mongoose_1.default.connect('mongodb+srv://amit31:nIUft4pXBHRJRbU7@cluster0.tee05.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
            console.log('✅ MongoDB connected');
        }
        catch (e) {
            console.error('❌ MongoDB connection failed:', e);
            process.exit(1);
        }
    });
};
exports.default = connectDB;
