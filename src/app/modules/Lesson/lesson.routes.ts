import { Router } from "express";

import { validateRequest } from "../../middleware/validationRequest";
import { LessonController } from "./lesson.controller";
import { LessonValidationSchema } from "./lesson.validation";

const router = Router();

router.get("/", LessonController.getAllLesson);
router.get("/:id", LessonController.singleLesson);
router.post(
  "/",
  // Guard(Role.ADMIN),
  validateRequest(LessonValidationSchema.createLessonSchema),
  LessonController.createLesson
);

router.delete("/:id", LessonController.deleteLesson);

router.patch(
  "/:id",
  // Guard(UserRole.ADMIN),
  validateRequest(LessonValidationSchema.updateLessonSchema),
  LessonController.updateLesson
);

export const LessonRoutes = router;
