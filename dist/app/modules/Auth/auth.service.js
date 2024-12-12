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
exports.AuthServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../Shared/prisma"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const jwtHelper_1 = require("../../../Helper/jwtHelper");
const config_1 = __importDefault(require("../../../config"));
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
            status: client_1.UserStatus.ACTIVE,
            isDeleted: false,
        },
    });
    console.log(user);
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User does not exists!");
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Your password is incorrect!");
    }
    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
    console.log(jwtPayload);
    //generate accessToken
    const accessToken = yield jwtHelper_1.jwtHelpers.generateToken(jwtPayload, config_1.default.jwt.access_token_secret, config_1.default.jwt.access_token_expires_in);
    //generate refreshToken
    const refreshToken = yield jwtHelper_1.jwtHelpers.generateToken(jwtPayload, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedData = yield jwtHelper_1.jwtHelpers.verifyToken(refreshToken, config_1.default.jwt.refresh_token_secret);
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedData === null || decodedData === void 0 ? void 0 : decodedData.email,
            status: client_1.UserStatus.ACTIVE,
            isDeleted: false,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User does not exists!");
    }
    const jwtPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
    };
    //generate access token
    const accessToken = yield jwtHelper_1.jwtHelpers.generateToken(jwtPayload, config_1.default.jwt.access_token_secret, config_1.default.jwt.access_token_expires_in);
    return { accessToken };
});
exports.AuthServices = {
    loginUserIntoDB,
    refreshToken,
};
