"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: '../'
});
const JWTSECRET = process.env.ACCESS_TOKEN_SECRET;
const JWTSECRET2 = process.env.REFRESH_TOKEN_SECRET;
const UserSchema = new mongoose_2.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6
    },
    email: {
        type: String,
        required: [true, 'please provide an email'],
        unique: [true, 'Email already exists'],
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
});
// UserSchema.pre('save',async function(next){
//     if(!this.isModified('password')) return next();
//     try{
//         this.password = await bcrypt.hash(this.password,10);
//         next()
//     }catch(err){
//         if(err instanceof Error) next(err)
//     }
// })
UserSchema.methods.accessToken = function () {
    const accessToken = jsonwebtoken_1.default.sign({ userId: this._id }, JWTSECRET, { expiresIn: '15m' });
    return accessToken;
};
UserSchema.methods.refreshToken = function () {
    const refreshToken = jsonwebtoken_1.default.sign({ userId: this._id }, JWTSECRET2, { expiresIn: '7d' });
    return refreshToken;
};
exports.UserModel = mongoose_1.default.model('User', UserSchema);
