"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = exports.userUpdateSchema = exports.userLoginSchema = exports.userRegistrationSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
// User Registration Schema
exports.userRegistrationSchema = zod_1.z.object({
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    user: zod_1.z.object({
        name: zod_1.z.string().min(2, "Name must be at least 2 characters long"),
        email: zod_1.z.string().email("Invalid email address"),
        photoUrl: zod_1.z.string().optional(),
    }),
});
// User Login Schema
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
});
// User Update Schema (if needed for profile updates, etc.)
exports.userUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters long").optional(),
    email: zod_1.z.string().email("Invalid email address").optional(),
    photoUrl: zod_1.z.string().optional(),
});
const changeUserStatusSchema = zod_1.z.object({
    status: zod_1.z.enum([client_1.UserStatus.ACTIVE, client_1.UserStatus.BLOCKED, client_1.UserStatus.DELETED]),
});
exports.UserValidationSchema = {
    userRegistrationSchema: exports.userRegistrationSchema,
    changeUserStatusSchema,
    userUpdateSchema: exports.userUpdateSchema,
};
