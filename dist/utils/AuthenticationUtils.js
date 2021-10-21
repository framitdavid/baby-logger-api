"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationUtils = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = require("jsonwebtoken");
exports.AuthenticationUtils = {
    hashPassword: function (password) {
        return bcryptjs_1.default.hashSync(password, 10);
    },
    comparePassword: function (password, hashedPassword) {
        return bcryptjs_1.default.compareSync(password, hashedPassword);
    },
    generateToken: function (object, salt, expiresIn) {
        return (0, jsonwebtoken_1.sign)(object, salt, { expiresIn: expiresIn });
    },
};
