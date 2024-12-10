import { z } from "zod";

// Validation schema for Vocabulary
const createvocabularySchema = z.object({
  word: z
    .string()
    .nonempty({ message: "Word is required." })
    .min(2, { message: "Word must be at least 2 characters long." }),
  pronunciation: z.string().regex(/^\/.+\/$/, {
    message: "Pronunciation must start and end with '/'.",
  }),
  meaning: z
    .string()
    .nonempty({ message: "Meaning is required." })
    .min(5, { message: "Meaning must be at least 5 characters long." }),
  whenToSay: z
    .string()
    .nonempty({ message: "WhenToSay is required." })
    .min(5, { message: "WhenToSay must be at least 5 characters long." }),
  lessonId: z.string().uuid({ message: "Lesson ID must be a valid UUID." }),
  adminId: z.string().uuid({ message: "Admin ID must be a valid UUID." }),
});

export const VocabularyValidationSchema = {
  createvocabularySchema,
};
