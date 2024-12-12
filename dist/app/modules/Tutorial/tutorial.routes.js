"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialRoutes = void 0;
const express_1 = require("express");
const validationRequest_1 = require("../../middleware/validationRequest");
const tutorial_validation_1 = require("./tutorial.validation");
const tutorial_controller_1 = require("./tutorial.controller");
const client_1 = require("@prisma/client");
const guard_1 = __importDefault(require("../../middleware/guard"));
const router = (0, express_1.Router)();
router.get("/", tutorial_controller_1.TutorialController.getAllTutorial);
router.post("/", (0, guard_1.default)(client_1.Role.ADMIN), (0, validationRequest_1.validateRequest)(tutorial_validation_1.TutorialValidationSchema.createTutorialSchema), tutorial_controller_1.TutorialController.createTutorial);
exports.TutorialRoutes = router;
