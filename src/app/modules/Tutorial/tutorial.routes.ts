import { Router } from "express";
import { validateRequest } from "../../middleware/validationRequest";
import { TutorialValidationSchema } from "./tutorial.validation";
import { TutorialController } from "./tutorial.controller";
import { Role } from "@prisma/client";
import Guard from "../../middleware/guard";

const router = Router();

router.get("/", TutorialController.getAllTutorial);

router.post(
  "/",
  Guard(Role.ADMIN),
  validateRequest(TutorialValidationSchema.createTutorialSchema),
  TutorialController.createTutorial
);

export const TutorialRoutes = router;
