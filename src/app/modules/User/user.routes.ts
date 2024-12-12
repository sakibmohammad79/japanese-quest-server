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
  // validateRequest(UserValidationSchema.userRegistrationSchema),
  UserController.createUser
);

router.delete("/:id", Guard(Role.ADMIN), UserController.deleteUser);

router.delete("/soft/:id", Guard(Role.ADMIN), UserController.softDeleteUser);

router.patch(
  "/status/:id",
  Guard(Role.ADMIN),
  validateRequest(UserValidationSchema.changeUserStatusSchema),
  UserController.changeUserStatus
);

router.patch(
  "/:id",
  Guard(Role.ADMIN),
  validateRequest(UserValidationSchema.userUpdateSchema),
  UserController.updateUser
);
router.patch("/admin/:id", Guard(Role.ADMIN), UserController.makeAdmin);

router.patch("/user/:id", Guard(Role.ADMIN), UserController.makeUser);

export const UserRoutes = router;
