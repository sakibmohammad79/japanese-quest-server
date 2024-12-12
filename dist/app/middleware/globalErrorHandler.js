"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const globalErrorHandler = (err, req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong!",
        error: err,
    });
};
exports.default = globalErrorHandler;
