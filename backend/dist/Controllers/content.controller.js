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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContent = void 0;
const content_model_1 = require("../models/content.model");
const tags_model_1 = require("../models/tags.model");
const CreateContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, contentType, tags, title } = req.body;
        const userdetail = req.userdetail;
        const userId = userdetail._id;
        let processedTags = [];
        if (tags) {
            if (typeof tags === "string") {
                processedTags = tags.split(',').map(tag => tag.trim().toLowerCase);
            }
            else if (Array.isArray(tags)) {
                processedTags = tags.map(tag => tag.trim().toLowerCase());
            }
        }
        processedTags = [...new Set(processedTags.filter(Boolean))];
        const existingTags = yield tags_model_1.TagModel.find({ title: { $in: processedTags } });
        const existingTagNames = existingTags.map(t => t.title);
        const existingTagIds = existingTags.map(t => t._id.toString());
        const missingTags = processedTags.filter((tagName) => !existingTagNames.includes(tagName));
        let newTagIds = [];
        if (missingTags.length > 0) {
            const createdTags = yield tags_model_1.TagModel.insertMany(missingTags.map((tag) => ({ title: tag })));
            newTagIds = createdTags.map(t => t._id.toString());
        }
        const tagIds = [...existingTagIds, ...newTagIds];
        const Contentdata = yield content_model_1.ContentModel.create({
            url,
            user: userId,
            type: contentType,
            title,
            tags: tagIds
        });
        return res.status(200).json({
            message: "Content added successfully",
            success: true,
        });
    }
    catch (e) {
        if (e instanceof Error) {
            console.log("error message: ", e.message);
        }
    }
});
exports.CreateContent = CreateContent;
