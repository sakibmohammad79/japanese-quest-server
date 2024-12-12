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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../Shared/prisma"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const paginationHelpers_1 = require("../../../Helper/paginationHelpers");
const user_constant_1 = require("./user.constant");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.user.email,
        },
    });
    if (admin) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "This email already registered!");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 12);
    const adminData = {
        name: payload.user.name,
        email: payload.user.email,
        photoUrl: payload.user.photoUrl,
        password: hashedPassword,
    };
    const createdUserData = yield prisma_1.default.user.create({
        data: adminData,
    });
    return createdUserData;
});
const getAllUserFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const andCondition = [];
    if (params.searchTerm) {
        andCondition.push({
            OR: user_constant_1.userSearchableFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    //search field exact same
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereCondition = andCondition.length
        ? { AND: andCondition }
        : {};
    const result = yield prisma_1.default.user.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : {
                createdAt: "desc",
            },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    const total = yield prisma_1.default.user.count({
        where: whereCondition,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const UserData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            id,
        },
    });
    return UserData;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const DeleteUserData = yield prisma_1.default.user.delete({
        where: {
            id: User.id,
        },
    });
    return DeleteUserData;
});
const softDeleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const userSoftDeleteData = yield prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            isDeleted: true,
        },
    });
    return userSoftDeleteData;
});
const updateUserIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
        },
    });
    const isActiveUser = yield prisma_1.default.user.findUnique({
        where: {
            email: user.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    if (!isActiveUser) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "This user blocked or deleted by admin!");
    }
    const updatedAdminData = yield prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: payload,
    });
    return updatedAdminData;
});
const changeUserStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            id,
        },
    });
    const updateUserStatus = yield prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: status,
    });
    return updateUserStatus;
});
const makeAdminIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id,
            role: client_1.Role.USER,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found!");
    }
    const makeAdminData = yield prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            role: client_1.Role.ADMIN,
        },
    });
    return makeAdminData;
});
const makeUserDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield prisma_1.default.user.findUnique({
        where: {
            id,
            role: client_1.Role.ADMIN,
        },
    });
    if (!admin) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Admin not found!");
    }
    const makeUserData = yield prisma_1.default.user.update({
        where: {
            id: admin.id,
        },
        data: {
            role: client_1.Role.USER,
        },
    });
    return makeUserData;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserByID,
    deleteUserFromDB,
    softDeleteUserFromDB,
    updateUserIntoDB,
    changeUserStatus,
    makeAdminIntoDB,
    makeUserDB,
};
