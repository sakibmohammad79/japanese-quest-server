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
exports.VocabularyServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../Shared/prisma"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const paginationHelpers_1 = require("../../../Helper/paginationHelpers");
const vocabulary_constant_1 = require("./vocabulary.constant");
const createVocabularyIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: payload.adminId,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not exits!");
    }
    const lesson = yield prisma_1.default.lesson.findUnique({
        where: {
            id: payload.lessonId,
        },
    });
    if (!lesson) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Lesson not exits!");
    }
    const createVocabularyData = yield prisma_1.default.vocabulary.create({
        data: payload,
    });
    return createVocabularyData;
});
const getAllVocabularyFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const andCondition = [];
    if (params.searchTerm) {
        andCondition.push({
            OR: vocabulary_constant_1.vocabularySearchableFields.map((field) => ({
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
    const result = yield prisma_1.default.vocabulary.findMany({
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
    });
    const total = yield prisma_1.default.vocabulary.count({
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
const getAllVocabularyByLesson = (lessonId, params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const andCondition = [];
    if (params.searchTerm) {
        andCondition.push({
            OR: vocabulary_constant_1.vocabularySearchableFields.map((field) => ({
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
    // Add lessonId filter if provided
    if (lessonId) {
        andCondition.push({
            lessonId: {
                equals: lessonId,
            },
        });
    }
    const whereCondition = andCondition.length
        ? { AND: andCondition }
        : {};
    const result = yield prisma_1.default.vocabulary.findMany({
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
    });
    const total = yield prisma_1.default.vocabulary.count({
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
const getSingleVocabularyByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vocabulary = yield prisma_1.default.vocabulary.findFirstOrThrow({
        where: {
            id,
        },
    });
    return vocabulary;
});
const updateVocabularyIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const vocabulary = yield prisma_1.default.vocabulary.findUniqueOrThrow({
        where: {
            id,
        },
    });
    if (!vocabulary) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Vocabulary not exits!");
    }
    const updatedVocabularyData = yield prisma_1.default.vocabulary.update({
        where: {
            id: vocabulary.id,
        },
        data: payload,
    });
    return updatedVocabularyData;
});
const deleteVocabularyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //  Find the lesson
    const vocabulary = yield prisma_1.default.vocabulary.findUniqueOrThrow({
        where: { id },
    });
    const deletedVocabulary = yield prisma_1.default.vocabulary.delete({
        where: { id: vocabulary.id },
    });
    return deletedVocabulary;
});
exports.VocabularyServices = {
    createVocabularyIntoDB,
    getAllVocabularyFromDB,
    getAllVocabularyByLesson,
    getSingleVocabularyByID,
    updateVocabularyIntoDB,
    deleteVocabularyFromDB,
};
