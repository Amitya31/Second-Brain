"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LinkSchema = new mongoose_1.default.Schema({
    hash: {
        type: String,
        required: true,
    },
    UserId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const LinkModel = mongoose_1.default.model('Link', LinkSchema);
exports.default = LinkModel;
