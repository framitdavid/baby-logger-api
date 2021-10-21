"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreastFeedingController = void 0;
var enums_1 = require("../enums");
var services_1 = require("../services");
var utils_1 = require("../utils");
exports.BreastFeedingController = {
    get: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    user = utils_1.ControllerUtils.getCurrentUser(req);
                    _b = (_a = res).send;
                    return [4 /*yield*/, services_1.BreastFeedingService.get(user.id)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); },
    post: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var requestPayload, user, payload, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    requestPayload = req.body;
                    user = utils_1.ControllerUtils.getCurrentUser(req);
                    payload = __assign(__assign({}, requestPayload), { user: user });
                    _b = (_a = res).send;
                    return [4 /*yield*/, services_1.BreastFeedingService.updateOrCreate(payload)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    }); },
    patch: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var requestPayload, user, breastfeeding, payload, updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestPayload = req.body;
                    user = utils_1.ControllerUtils.getCurrentUser(req);
                    return [4 /*yield*/, services_1.BreastFeedingService.getById(requestPayload.id)];
                case 1:
                    breastfeeding = _a.sent();
                    if (!breastfeeding) {
                        return [2 /*return*/, res.sendStatus(enums_1.StatusCode.NotFound)];
                    }
                    if (!utils_1.ControllerUtils.hasAccessToEntity(breastfeeding, user.id)) {
                        return [2 /*return*/, res.sendStatus(enums_1.StatusCode.Forbidden)];
                    }
                    payload = __assign(__assign({}, requestPayload), { user: user });
                    return [4 /*yield*/, services_1.BreastFeedingService.updateOrCreate(payload)];
                case 2:
                    updated = _a.sent();
                    res.send(updated);
                    return [2 /*return*/];
            }
        });
    }); },
    delete: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, breastfeeding, user, deleted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id, 10);
                    return [4 /*yield*/, services_1.BreastFeedingService.getById(id)];
                case 1:
                    breastfeeding = _a.sent();
                    user = utils_1.ControllerUtils.getCurrentUser(req);
                    if (!breastfeeding) {
                        return [2 /*return*/, res.sendStatus(404)];
                    }
                    if (!utils_1.ControllerUtils.hasAccessToEntity(breastfeeding, user.id)) {
                        return [2 /*return*/, res.sendStatus(403)];
                    }
                    return [4 /*yield*/, services_1.BreastFeedingService.delete(id)];
                case 2:
                    deleted = _a.sent();
                    if (deleted.affected === 1) {
                        return [2 /*return*/, res.sendStatus(204)];
                    }
                    return [2 /*return*/, res.sendStatus(500)];
            }
        });
    }); },
};
