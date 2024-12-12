import { z } from "zod";

const createvocabularySchema = z.object({
  word: z.string({ message: "Word is required." }),
  pronunciation: z.string({
    message: "pronunciation is required.",
  }),
  // .regex(/^\/.+\/$/, {
  //   message: "Pronunciation must start and end with '/'.",
  // }),
  meaning: z.string({ message: "Meaning is required." }),
  whenToSay: z.string({ message: "WhenToSay is required." }),
  lessonId: z.string().uuid({ message: "Lesson ID must be a valid UUID." }),
  adminId: z.string().uuid({ message: "Admin ID must be a valid UUID." }),
});

const updateVocabularySchema = z.object({
  word: z.string({ message: "Word is required." }).optional(),
  pronunciation: z
    .string({ message: "pronunciation is required" })
    // .regex(/^\/.+\/$/, {
    //   message: "Pronunciation must start and end with '/'.",
    // })
    .optional(),
  meaning: z.string({ message: "Meaning is required" }).optional(),
  whenToSay: z.string({ message: "WhenToSay is required" }).optional(),
});

export const VocabularyValidationSchema = {
  createvocabularySchema,
  updateVocabularySchema,
};
