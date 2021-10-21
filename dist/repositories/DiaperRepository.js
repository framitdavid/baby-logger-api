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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaperRepository = void 0;
var entities_1 = require("../entities");
var GenericRepository_1 = require("./GenericRepository");
exports.DiaperRepository = __assign({}, (0, GenericRepository_1.GenericRepository)(entities_1.DiaperChange));
