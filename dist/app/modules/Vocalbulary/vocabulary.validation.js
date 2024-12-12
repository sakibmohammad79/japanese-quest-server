"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VocabularyValidationSchema = void 0;
const zod_1 = require("zod");
const createvocabularySchema = zod_1.z.object({
    word: zod_1.z.string({ message: "Word is required." }),
    pronunciation: zod_1.z.string({
        message: "pronunciation is required.",
    }),
    // .regex(/^\/.+\/$/, {
    //   message: "Pronunciation must start and end with '/'.",
    // }),
    meaning: zod_1.z.string({ message: "Meaning is required." }),
    whenToSay: zod_1.z.string({ message: "WhenToSay is required." }),
    lessonId: zod_1.z.string().uuid({ message: "Lesson ID must be a valid UUID." }),
    adminId: zod_1.z.string().uuid({ message: "Admin ID must be a valid UUID." }),
});
const updateVocabularySchema = zod_1.z.object({
    word: zod_1.z.string({ message: "Word is required." }).optional(),
    pronunciation: zod_1.z
        .string({ message: "pronunciation is required" })
        // .regex(/^\/.+\/$/, {
        //   message: "Pronunciation must start and end with '/'.",
        // })
        .optional(),
    meaning: zod_1.z.string({ message: "Meaning is required" }).optional(),
    whenToSay: zod_1.z.string({ message: "WhenToSay is required" }).optional(),
});
exports.VocabularyValidationSchema = {
    createvocabularySchema,
    updateVocabularySchema,
};
