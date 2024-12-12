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
exports.TutorialController = void 0;
const catchAsync_1 = __importDefault(require("../../../Shared/catchAsync"));
const tutorial_service_1 = require("./tutorial.service");
const sendResponse_1 = require("../../../Shared/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const pick_1 = require("../../../Shared/pick");
const tutorial_constant_1 = require("./tutorial.constant");
const getAllTutorial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, tutorial_constant_1.tutorialFilterableFields);
    const options = (0, pick_1.pick)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = yield tutorial_service_1.TutorailServices.getAllTutorialFromDB(filters, options);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "All  tutorial fetched!",
        meta: result.meta,
        data: result.data,
    });
}));
const createTutorial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tutorial_service_1.TutorailServices.createTutorialIntoDB(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "New tutorial created successfully!",
        data: result,
    });
}));
exports.TutorialController = {
    getAllTutorial,
    createTutorial,
};
