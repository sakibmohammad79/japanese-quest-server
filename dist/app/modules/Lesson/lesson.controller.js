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
exports.LessonController = void 0;
const catchAsync_1 = __importDefault(require("../../../Shared/catchAsync"));
const lesson_service_1 = require("./lesson.service");
const sendResponse_1 = require("../../../Shared/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const pick_1 = require("../../../Shared/pick");
const vocabulary_constant_1 = require("../Vocalbulary/vocabulary.constant");
const createLesson = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lesson_service_1.LessonServices.createLessonIntoDB(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "New Lesson created successfully!",
        data: result,
    });
}));
const getAllLesson = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, vocabulary_constant_1.vocabularyFilterableFields);
    const options = (0, pick_1.pick)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = yield lesson_service_1.LessonServices.getAllLessonFromDB(filters, options);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "All  Lesson fetched!",
        meta: result.meta,
        data: result.data,
    });
}));
const updateLesson = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield lesson_service_1.LessonServices.updateLessonIntoDB(id, data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Lesson data updated successfully!",
        data: result,
    });
}));
const singleLesson = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield lesson_service_1.LessonServices.getSingleLessonByID(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Single lesson get successfully!",
        data: result,
    });
}));
const deleteLesson = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield lesson_service_1.LessonServices.deleteLessonFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Lesson deleted successfully!",
        data: result,
    });
}));
const publishLesson = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield lesson_service_1.LessonServices.publishLessonIntoDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Lesson Published successfully!",
        data: result,
    });
}));
exports.LessonController = {
    createLesson,
    getAllLesson,
    updateLesson,
    singleLesson,
    deleteLesson,
    publishLesson,
};
