"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const guard_1 = __importDefault(require("../../middleware/guard"));
const client_1 = require("@prisma/client");
const validationRequest_1 = require("../../middleware/validationRequest");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.UserController.getAllUser);
router.get("/:id", user_controller_1.UserController.getSingleUser);
router.post("/", 
// validateRequest(UserValidationSchema.userRegistrationSchema),
user_controller_1.UserController.createUser);
router.delete("/:id", (0, guard_1.default)(client_1.Role.ADMIN), user_controller_1.UserController.deleteUser);
router.delete("/soft/:id", (0, guard_1.default)(client_1.Role.ADMIN), user_controller_1.UserController.softDeleteUser);
router.patch("/status/:id", (0, guard_1.default)(client_1.Role.ADMIN), (0, validationRequest_1.validateRequest)(user_validation_1.UserValidationSchema.changeUserStatusSchema), user_controller_1.UserController.changeUserStatus);
router.patch("/:id", (0, guard_1.default)(client_1.Role.ADMIN), (0, validationRequest_1.validateRequest)(user_validation_1.UserValidationSchema.userUpdateSchema), user_controller_1.UserController.updateUser);
router.patch("/admin/:id", (0, guard_1.default)(client_1.Role.ADMIN), user_controller_1.UserController.makeAdmin);
router.patch("/user/:id", (0, guard_1.default)(client_1.Role.ADMIN), user_controller_1.UserController.makeUser);
exports.UserRoutes = router;
