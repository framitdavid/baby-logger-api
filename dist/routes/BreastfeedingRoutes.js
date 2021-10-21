"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var BreastfeedingRoutes = express_1.default.Router();
BreastfeedingRoutes.get("/", middlewares_1.AuthenticateToken, controllers_1.BreastFeedingController.get);
BreastfeedingRoutes.post("/", middlewares_1.AuthenticateToken, controllers_1.BreastFeedingController.post);
BreastfeedingRoutes.patch("/", middlewares_1.AuthenticateToken, controllers_1.BreastFeedingController.patch);
BreastfeedingRoutes.delete("/:id", middlewares_1.AuthenticateToken, controllers_1.BreastFeedingController.delete);
exports.default = BreastfeedingRoutes;
