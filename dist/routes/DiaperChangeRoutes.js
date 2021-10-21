"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var DiaperChangeRoutes = express_1.default.Router();
DiaperChangeRoutes.get("/", middlewares_1.AuthenticateToken, controllers_1.DiaperChangeController.get);
DiaperChangeRoutes.post("/", middlewares_1.AuthenticateToken, controllers_1.DiaperChangeController.post);
DiaperChangeRoutes.patch("/", middlewares_1.AuthenticateToken, controllers_1.DiaperChangeController.patch);
DiaperChangeRoutes.delete("/:id", middlewares_1.AuthenticateToken, controllers_1.DiaperChangeController.delete);
exports.default = DiaperChangeRoutes;
