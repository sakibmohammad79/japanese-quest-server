import { z } from "zod";

// Validation schema for creating a lesson
export const createLessonSchema = z.object({
  name: z
    .string()
    .min(1, "Lesson name must be at least 3 characters long")
    .max(100, "Lesson name cannot exceed 100 characters"),
  content: z.string().max(800, "content cannot exceed 500 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

// Validation schema for updating a lesson
export const updateLessonSchema = z.object({
  name: z
    .string()
    .min(1, "Lesson name must be at least 3 characters long")
    .max(100, "Lesson name cannot exceed 100 characters")
    .optional(),
  content: z
    .string()
    .max(800, "content cannot exceed 500 characters")
    .optional(),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

export const LessonValidationSchema = {
  createLessonSchema,
  updateLessonSchema,
};
