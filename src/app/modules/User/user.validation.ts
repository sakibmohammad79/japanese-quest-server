import { UserStatus } from "@prisma/client";
import { z } from "zod";

// User Registration Schema
export const userRegistrationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  user: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    photoUrl: z.string().optional(),
  }),
});

// User Login Schema
export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// User Update Schema (if needed for profile updates, etc.)
export const userUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").optional(),
  email: z.string().email("Invalid email address").optional(),
  photoUrl: z.string().optional(),
});
const changeUserStatusSchema = z.object({
  status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
});
export const UserValidationSchema = {
  userRegistrationSchema,
  changeUserStatusSchema,
  userUpdateSchema,
};
