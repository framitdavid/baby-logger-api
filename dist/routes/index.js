"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AuthenticateRoutes_1 = __importDefault(require("./AuthenticateRoutes"));
var BreastfeedingRoutes_1 = __importDefault(require("./BreastfeedingRoutes"));
var DiaperChangeRoutes_1 = __importDefault(require("./DiaperChangeRoutes"));
var routes = express_1.default.Router();
routes.use("/authenticate", AuthenticateRoutes_1.default);
routes.use("/breastfeeding", BreastfeedingRoutes_1.default);
routes.use("/diaperChange", DiaperChangeRoutes_1.default);
exports.default = routes;
