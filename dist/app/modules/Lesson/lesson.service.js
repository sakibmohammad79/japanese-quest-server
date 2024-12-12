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
exports.LessonServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../Shared/prisma"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const paginationHelpers_1 = require("../../../Helper/paginationHelpers");
const lesson_constant_1 = require("./lesson.constant");
const createLessonIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: payload.createdById,
            isDeleted: false,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not exits!");
    }
    const lastLesson = yield prisma_1.default.lesson.findFirst({
        orderBy: { lessonNumber: "desc" },
    });
    const nextLessonNumber = ((lastLesson === null || lastLesson === void 0 ? void 0 : lastLesson.lessonNumber) || 0) + 1;
    const createLessonData = yield prisma_1.default.lesson.create({
        data: Object.assign(Object.assign({}, payload), { lessonNumber: nextLessonNumber }),
    });
    return createLessonData;
});
const getAllLessonFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(options);
    const andCondition = [];
    if (params.searchTerm) {
        andCondition.push({
            OR: lesson_constant_1.lesssonSearchableFields.map((field) => ({
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
    const result = yield prisma_1.default.lesson.findMany({
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
    const total = yield prisma_1.default.lesson.count({
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
const updateLessonIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield prisma_1.default.lesson.findUniqueOrThrow({
        where: {
            id,
        },
    });
    if (!lesson) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Lesson not exits!");
    }
    const updatedLessonData = yield prisma_1.default.lesson.update({
        where: {
            id: lesson.id,
        },
        data: payload,
    });
    return updatedLessonData;
});
const getSingleLessonByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const LessonData = yield prisma_1.default.lesson.findFirstOrThrow({
        where: {
            id,
        },
    });
    return LessonData;
});
const deleteLessonFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //  Find the lesson
    const lesson = yield prisma_1.default.lesson.findUniqueOrThrow({
        where: { id },
    });
    // Check if there are any vocabularies related to this lesson
    const vocabulariesExist = yield prisma_1.default.vocabulary.count({
        where: { lessonId: lesson.id },
    });
    //If vocabularies exist, delete them
    if (vocabulariesExist > 0) {
        yield prisma_1.default.vocabulary.deleteMany({
            where: { lessonId: lesson.id },
        });
    }
    else {
        console.log("No vocabularies found for this lesson.");
    }
    //Delete the lesson itself
    const deletedLesson = yield prisma_1.default.lesson.delete({
        where: { id: lesson.id },
    });
    return deletedLesson;
});
const publishLessonIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //  Find the lesson
    const lesson = yield prisma_1.default.lesson.findUnique({
        where: { id },
    });
    if (!lesson) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Lesson Not Found!");
    }
    // check is already published
    const isPublished = yield prisma_1.default.lesson.findUnique({
        where: {
            id: lesson.id,
            isPublish: true,
        },
    });
    if (isPublished) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Lesson Already Published!");
    }
    //Delete the lesson itself
    const publishLesson = yield prisma_1.default.lesson.update({
        where: {
            id: lesson.id,
        },
        data: {
            isPublish: true,
        },
    });
    return publishLesson;
});
exports.LessonServices = {
    createLessonIntoDB,
    getAllLessonFromDB,
    updateLessonIntoDB,
    getSingleLessonByID,
    deleteLessonFromDB,
    publishLessonIntoDB,
};
