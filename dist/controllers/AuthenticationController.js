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
exports.AuthenticationController = void 0;
var services_1 = require("../services");
var utils_1 = require("../utils");
var enums_1 = require("../enums");
exports.AuthenticationController = {
    signup: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, firstName, lastName, email, password, modelState, _b, statusCode, value, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password;
                    modelState = utils_1.ValidationUtils.getModelState([
                        __assign(__assign({}, utils_1.ValidationUtils.validate(firstName)), { key: "firstName" }),
                        __assign(__assign({}, utils_1.ValidationUtils.validate(lastName)), { key: "lastName" }),
                        __assign(__assign({}, utils_1.ValidationUtils.validate(email, { isEmail: true })), { key: "email" }),
                        __assign(__assign({}, utils_1.ValidationUtils.validate(password, { minLength: 6 })), { key: "password" }),
                    ]);
                    if (!modelState.isValid) {
                        res.status(enums_1.StatusCode.BadRequest).send(modelState);
                        return [2 /*return*/];
                    }
                    _d = (_c = utils_1.ControllerUtils).response;
                    return [4 /*yield*/, services_1.UserService.signup({ firstName: firstName, lastName: lastName, email: email, password: password })];
                case 1:
                    _b = _d.apply(_c, [_e.sent()]), statusCode = _b.statusCode, value = _b.value;
                    res.status(statusCode).send(value);
                    return [2 /*return*/];
            }
        });
    }); },
    authenticate: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, modelState, result, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password;
                    modelState = utils_1.ValidationUtils.getModelState([
                        __assign(__assign({}, utils_1.ValidationUtils.validate(username)), { key: "username" }),
                        __assign(__assign({}, utils_1.ValidationUtils.validate(password, { minLength: 6 })), { key: "password" }),
                    ]);
                    if (!modelState.isValid) {
                        res.status(enums_1.StatusCode.BadRequest).send(modelState);
                    }
                    _c = (_b = utils_1.ControllerUtils).response;
                    return [4 /*yield*/, services_1.AuthenticationService.login(username, password)];
                case 1:
                    result = _c.apply(_b, [_d.sent()]);
                    res.status(result.statusCode).send(result.value);
                    return [2 /*return*/];
            }
        });
    }); },
    token: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var token, modelState, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    token = req.body.token;
                    modelState = utils_1.ValidationUtils.getModelState([
                        __assign(__assign({}, utils_1.ValidationUtils.validate(token)), { key: "token" }),
                    ]);
                    if (!modelState.isValid) {
                        res.status(enums_1.StatusCode.BadRequest).send(modelState);
                        return [2 /*return*/];
                    }
                    _b = (_a = utils_1.ControllerUtils).response;
                    return [4 /*yield*/, services_1.AuthenticationService.refreshToken(token)];
                case 1:
                    result = _b.apply(_a, [_c.sent()]);
                    res.status(result.statusCode).send(result.value);
                    return [2 /*return*/];
            }
        });
    }); },
    logout: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var modelState, user, refreshToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modelState = utils_1.ValidationUtils.getModelState([
                        __assign(__assign({}, utils_1.ValidationUtils.validate(req.body.token)), { key: "token" }),
                    ]);
                    if (!modelState.isValid) {
                        res.status(enums_1.StatusCode.BadRequest).send(modelState);
                        return [2 /*return*/];
                    }
                    user = utils_1.ControllerUtils.getCurrentUser(req);
                    if (!user) return [3 /*break*/, 2];
                    refreshToken = req.body.token;
                    return [4 /*yield*/, services_1.AuthenticationService.logout(refreshToken)];
                case 1:
                    _a.sent();
                    res.sendStatus(enums_1.StatusCode.Sucess);
                    return [2 /*return*/];
                case 2:
                    res.sendStatus(enums_1.StatusCode.ServerError);
                    return [2 /*return*/];
            }
        });
    }); },
};
