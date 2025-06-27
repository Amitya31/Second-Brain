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
exports.ShareIdd = exports.ShareLink = void 0;
const links_model_1 = __importDefault(require("../models/links.model"));
const hash_1 = require("../utils/hash");
const content_model_1 = require("../models/content.model");
const ShareLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userdetail = req.userdetail;
        const userId = userdetail._id;
        const share = req.body.share;
        const exisitingUser = yield links_model_1.default.findOne({
            UserId: userId
        });
        let Share;
        const hash = (0, hash_1.random)(10);
        if (share) {
            if (exisitingUser) {
                return res.status(411).json({
                    message: "Link already exists"
                });
            }
            Share = yield links_model_1.default.create({
                hash: hash,
                UserId: userId,
            });
            res.status(200).json({
                message: "/share/" + hash,
                success: true,
            });
        }
        else {
            yield links_model_1.default.deleteOne({
                UserId: userId,
            });
            res.status(200).json({
                message: "Updated Sharable Link",
                success: true
            });
        }
    }
    catch (e) {
        if (e instanceof Error) {
            console.log('error occured', e.message);
        }
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
});
exports.ShareLink = ShareLink;
const ShareIdd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ShareId } = req.params;
        const UserContent = yield links_model_1.default.findOne({
            hash: ShareId
        });
        if (!UserContent) {
            return res.status(404).json({
                message: "Link is expired",
                success: false
            });
        }
        const Contentdata = yield content_model_1.ContentModel.find({
            user: UserContent.UserId
        });
        return res.status(200).json({
            content: Contentdata,
            success: true
        });
    }
    catch (e) {
        if (e instanceof Error) {
            console.log('error occured', e.message);
        }
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        });
    }
});
exports.ShareIdd = ShareIdd;
