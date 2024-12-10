import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import Guard from "../../middleware/guard";
import { Role } from "@prisma/client";
import { validateRequest } from "../../middleware/validationRequest";
import { UserValidationSchema } from "./user.validation";

const router = Router();

router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getSingleUser);
router.post(
  "/",
  // Guard(Role.ADMIN),
  validateRequest(UserValidationSchema.userRegistrationSchema),
  UserController.createUser
);

router.delete("/:id", UserController.deleteUser);

router.delete(
  "/soft/:id",
  // Guard(UserRole.ADMIN),
  UserController.softDeleteUser
);

router.patch(
  "/status/:id",
  // Guard(UserRole.ADMIN),
  validateRequest(UserValidationSchema.changeUserStatusSchema),
  UserController.changeUserStatus
);
router.patch(
  "/:id",
  // Guard(UserRole.ADMIN),
  validateRequest(UserValidationSchema.userUpdateSchema),
  UserController.updateUser
);

export const UserRoutes = router;
