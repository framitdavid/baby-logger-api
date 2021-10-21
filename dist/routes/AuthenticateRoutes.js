"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var AuthenticationRoutes = express_1.default.Router();
AuthenticationRoutes.post("/signup", controllers_1.AuthenticationController.signup);
AuthenticationRoutes.post("/", controllers_1.AuthenticationController.authenticate);
AuthenticationRoutes.post("/token", controllers_1.AuthenticationController.token);
AuthenticationRoutes.post("/logout", middlewares_1.AuthenticateToken, controllers_1.AuthenticationController.logout);
exports.default = AuthenticationRoutes;
