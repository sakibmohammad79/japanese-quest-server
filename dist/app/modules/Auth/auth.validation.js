"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const loginValidationSchema = zod_1.default.object({
    password: zod_1.default.string().min(1, "Password must be at least 6 characters long."),
    email: zod_1.default.string().email({ message: "Invalid email formate!" }),
});
exports.AuthValidationSchema = {
    loginValidationSchema,
};
