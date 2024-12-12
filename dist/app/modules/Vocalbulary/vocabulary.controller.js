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
exports.VocabularyController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../Shared/catchAsync"));
const sendResponse_1 = require("../../../Shared/sendResponse");
const vocabulary_service_1 = require("./vocabulary.service");
const user_constant_1 = require("../User/user.constant");
const pick_1 = require("../../../Shared/pick");
const vocabulary_constant_1 = require("./vocabulary.constant");
const createVocabulary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vocabulary_service_1.VocabularyServices.createVocabularyIntoDB(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "New vocabulary created successfully!",
        data: result,
    });
}));
const getAllVocabulary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, vocabulary_constant_1.vocabularyFilterableFields);
    const options = (0, pick_1.pick)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = yield vocabulary_service_1.VocabularyServices.getAllVocabularyFromDB(filters, options);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "All  Vacabulary fetched!",
        meta: result.meta,
        data: result.data,
    });
}));
const getAllVocabularyByLesson = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, user_constant_1.userFilterableFields);
    const options = (0, pick_1.pick)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const { id } = req.params;
    const result = yield vocabulary_service_1.VocabularyServices.getAllVocabularyByLesson(id, filters, options);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "All  Vacabulary fetched by lesson!",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleVocabulary = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield vocabulary_service_1.VocabularyServices.getSingleVocabularyByID(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Single vocabulary get successfully!",
        data: result,
    });
}));
const updateVocabulary = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield vocabulary_service_1.VocabularyServices.updateVocabularyIntoDB(id, data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Vocabulary data updated successfully!",
        data: result,
    });
}));
const deleteVocabulary = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield vocabulary_service_1.VocabularyServices.deleteVocabularyFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Vocabulary deleted successfully!",
        data: result,
    });
}));
exports.VocabularyController = {
    createVocabulary,
    getAllVocabulary,
    getAllVocabularyByLesson,
    getSingleVocabulary,
    updateVocabulary,
    deleteVocabulary,
};
