"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../app/error/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const generateToken = (jwtPayload, secret, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, {
        algorithm: "HS256",
        expiresIn,
    });
});
const verifyToken = (token, secret) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedData = jsonwebtoken_1.default.verify(token, secret);
        return decodedData;
    }
    catch (_a) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized!");
    }
});
exports.jwtHelpers = {
    generateToken,
    verifyToken,
};
