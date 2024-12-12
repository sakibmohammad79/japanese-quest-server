"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyRoutes = void 0;
const express_1 = require("express");
const validationRequest_1 = require("../../middleware/validationRequest");
const vocabulary_controller_1 = require("./vocabulary.controller");
const vocabulary_validation_1 = require("./vocabulary.validation");
const guard_1 = __importDefault(require("../../middleware/guard"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get("/", vocabulary_controller_1.VocabularyController.getAllVocabulary);
router.get("/lesson/:id", vocabulary_controller_1.VocabularyController.getAllVocabularyByLesson);
router.get("/:id", vocabulary_controller_1.VocabularyController.getSingleVocabulary);
router.post("/", (0, guard_1.default)(client_1.Role.ADMIN), 
// validateRequest(VocabularyValidationSchema.createvocabularySchema),
vocabulary_controller_1.VocabularyController.createVocabulary);
router.delete("/:id", (0, guard_1.default)(client_1.Role.ADMIN), vocabulary_controller_1.VocabularyController.deleteVocabulary);
router.patch("/:id", (0, guard_1.default)(client_1.Role.ADMIN), (0, validationRequest_1.validateRequest)(vocabulary_validation_1.VocabularyValidationSchema.updateVocabularySchema), vocabulary_controller_1.VocabularyController.updateVocabulary);
exports.VocabularyRoutes = router;
