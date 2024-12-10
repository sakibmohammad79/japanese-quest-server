import { Router } from "express";

import { validateRequest } from "../../middleware/validationRequest";
import { LessonController } from "./lesson.controller";
import { LessonValidationSchema } from "./lesson.validation";

const router = Router();

// router.get("/", UserController.getAllUser);
// router.get("/:id", UserController.getSingleUser);
router.post(
  "/",
  // Guard(Role.ADMIN),
  validateRequest(LessonValidationSchema.createLessonSchema),
  LessonController.createLesson
);

// router.delete("/:id", UserController.deleteUser);

// router.delete(
//   "/soft/:id",
//   // Guard(UserRole.ADMIN),
//   UserController.softDeleteUser
// );

// router.patch(
//   "/status/:id",
//   // Guard(UserRole.ADMIN),
//   validateRequest(UserValidationSchema.changeUserStatusSchema),
//   UserController.changeUserStatus
// );
// router.patch(
//   "/:id",
//   // Guard(UserRole.ADMIN),
//   validateRequest(UserValidationSchema.userUpdateSchema),
//   UserController.updateUser
// );

export const LessonRoutes = router;
