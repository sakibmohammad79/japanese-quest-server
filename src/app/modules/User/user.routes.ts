import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import Guard from "../../middleware/guard";
import { Role } from "@prisma/client";
import { validateRequest } from "../../middleware/validationRequest";
import { UserValidationSchema } from "./user.validation";

const router = Router();

router.post(
  "/",
  Guard(Role.ADMIN),
  validateRequest(UserValidationSchema.userRegistrationSchema),
  UserController.createUser
);

export const UserRoutes = router;
