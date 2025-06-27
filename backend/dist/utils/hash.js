"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = (len) => {
    let input = "abcdefghijklmnopqrstuvwxyz1234567890";
    let length = input.length;
    let output = "";
    for (let i = 1; i <= len; i++) {
        output += input[Math.floor(Math.random() * length)];
    }
    return output;
};
exports.random = random;
