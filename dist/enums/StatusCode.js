"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["BadRequest"] = 400] = "BadRequest";
    StatusCode[StatusCode["Unauthorized"] = 401] = "Unauthorized";
    StatusCode[StatusCode["Forbidden"] = 403] = "Forbidden";
    StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
    StatusCode[StatusCode["Conflict"] = 409] = "Conflict";
    StatusCode[StatusCode["Sucess"] = 200] = "Sucess";
    StatusCode[StatusCode["Created"] = 201] = "Created";
    StatusCode[StatusCode["NoContent"] = 204] = "NoContent";
    StatusCode[StatusCode["ServerError"] = 500] = "ServerError";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
