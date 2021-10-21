"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerUtils = void 0;
exports.ControllerUtils = {
    response: function (serverResponse) {
        var errorCodes = [400, 401, 403, 404, 500];
        var isError = errorCodes.includes(serverResponse.statusCode);
        return {
            statusCode: serverResponse.statusCode,
            value: isError ? serverResponse.error : serverResponse.entity,
        };
    },
    getCurrentUser: function (req) {
        return req.jwtPayload;
    },
    hasAccessToEntity: function (entity, userId) {
        return entity.userId === userId;
    },
};
