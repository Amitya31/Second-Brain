"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const contentTypes = ['image', 'audio', 'video', 'document', 'tweet'];
const ContentSchema = new mongoose_2.Schema({
    url: {
        type: String,
        required: [true, "Please provide a url"]
    },
    user: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: contentTypes,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'Tags'
        }]
});
exports.ContentModel = mongoose_1.default.model('Content', ContentSchema);
