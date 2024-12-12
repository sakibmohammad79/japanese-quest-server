"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialValidationSchema = void 0;
const zod_1 = require("zod");
// Validation schema for creating a tutorial
const createTutorialSchema = zod_1.z.object({
    videoUrl: zod_1.z
        .string()
        .url({ message: "Video URL must be a valid URL." })
        .min(5, { message: "Video URL is required." }),
    title: zod_1.z
        .string()
        .min(5, { message: "Title must be at least 5 characters long." }),
    description: zod_1.z
        .string()
        .max(500, { message: "Description cannot exceed 500 characters." })
        .optional(),
    createdById: zod_1.z
        .string()
        .uuid({ message: "CreatedById must be a valid UUID." }),
});
// Validation schema for updating a tutorial (partial updates allowed)
const updateTutorialSchema = zod_1.z.object({
    videoUrl: zod_1.z
        .string()
        .url({ message: "Video URL must be a valid URL." })
        .optional(),
    title: zod_1.z
        .string()
        .min(5, { message: "Title must be at least 5 characters long." })
        .optional(),
    description: zod_1.z
        .string()
        .max(500, { message: "Description cannot exceed 500 characters." })
        .optional(),
});
exports.TutorialValidationSchema = {
    createTutorialSchema,
    updateTutorialSchema,
};
