import { Router } from "express";

import { validateRequest } from "../../middleware/validationRequest";
import { LessonController } from "./lesson.controller";
import { LessonValidationSchema } from "./lesson.validation";
import Guard from "../../middleware/guard";
import { Role } from "@prisma/client";

const router = Router();

router.get("/", LessonController.getAllLesson);
router.get("/:id", LessonController.singleLesson);
router.post(
  "/",
  Guard(Role.ADMIN),
  validateRequest(LessonValidationSchema.createLessonSchema),
  LessonController.createLesson
);

router.delete("/:id", Guard(Role.ADMIN), LessonController.deleteLesson);

router.patch(
  "/:id",
  Guard(Role.ADMIN),
  validateRequest(LessonValidationSchema.updateLessonSchema),
  LessonController.updateLesson
);
router.patch("/publish/:id", Guard(Role.ADMIN), LessonController.publishLesson);

export const LessonRoutes = router;
