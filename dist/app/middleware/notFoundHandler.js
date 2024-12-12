"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const notFoundHandler = (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req === null || req === void 0 ? void 0 : req.originalUrl,
            message: "Your requested url is not found!",
        },
    });
};
exports.default = notFoundHandler;
