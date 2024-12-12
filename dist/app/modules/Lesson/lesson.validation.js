"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonValidationSchema = exports.updateLessonSchema = exports.createLessonSchema = void 0;
const zod_1 = require("zod");
// Validation schema for creating a lesson
exports.createLessonSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Lesson name must be at least 3 characters long")
        .max(100, "Lesson name cannot exceed 100 characters"),
    content: zod_1.z.string().max(800, "content cannot exceed 500 characters"),
    description: zod_1.z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
    imageUrl: zod_1.z.string().url("Invalid image URL").optional(),
});
// Validation schema for updating a lesson
exports.updateLessonSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Lesson name must be at least 3 characters long")
        .max(100, "Lesson name cannot exceed 100 characters")
        .optional(),
    content: zod_1.z
        .string()
        .max(800, "content cannot exceed 500 characters")
        .optional(),
    description: zod_1.z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
    imageUrl: zod_1.z.string().url("Invalid image URL").optional(),
});
exports.LessonValidationSchema = {
    createLessonSchema: exports.createLessonSchema,
    updateLessonSchema: exports.updateLessonSchema,
};
