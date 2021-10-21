"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var enums_1 = require("../enums");
var AuthenticateToken = function (req, res, next) {
    var authHeader = req.headers["authorization"];
    var accessToken = authHeader && authHeader.split(" ")[1];
    if (accessToken === undefined)
        return res.sendStatus(enums_1.StatusCode.Unauthorized);
    (0, jsonwebtoken_1.verify)(accessToken, "randomstringsalt", function (error, jwtPayload) {
        if (error)
            return res.sendStatus(enums_1.StatusCode.Unauthorized);
        req.jwtPayload = jwtPayload;
        next();
    });
};
exports.AuthenticateToken = AuthenticateToken;
