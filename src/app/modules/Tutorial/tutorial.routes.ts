import { Router } from "express";
import { validateRequest } from "../../middleware/validationRequest";
import { TutorialValidationSchema } from "./tutorial.validation";
import { TutorialController } from "./tutorial.controller";

const router = Router();

// router.get("/", VocabularyController.getAllVocabulary);

router.post(
  "/",
  // Guard(Role.ADMIN),
  validateRequest(TutorialValidationSchema.createTutorialSchema),
  TutorialController.createTutorial
);

export const TutorialRoutes = router;
