import { z } from "zod";

// Validation schema for creating a tutorial
const createTutorialSchema = z.object({
  videoUrl: z
    .string()
    .url({ message: "Video URL must be a valid URL." })
    .min(5, { message: "Video URL is required." }),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." }),
  description: z
    .string()
    .max(500, { message: "Description cannot exceed 500 characters." })
    .optional(),
  createdById: z
    .string()
    .uuid({ message: "CreatedById must be a valid UUID." }),
});

// Validation schema for updating a tutorial (partial updates allowed)
const updateTutorialSchema = z.object({
  videoUrl: z
    .string()
    .url({ message: "Video URL must be a valid URL." })
    .optional(),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .optional(),
  description: z
    .string()
    .max(500, { message: "Description cannot exceed 500 characters." })
    .optional(),
});

export const TutorialValidationSchema = {
  createTutorialSchema,
  updateTutorialSchema,
};
