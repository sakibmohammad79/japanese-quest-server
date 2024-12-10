import { Router } from "express";
import { validateRequest } from "../../middleware/validationRequest";
import { VocabularyController } from "./vocabulary.controller";
import { VocabularyValidationSchema } from "./vocabulary.validation";

const router = Router();

router.get("/", VocabularyController.getAllVocabulary);

router.get("/lesson/:id", VocabularyController.getAllVocabularyByLesson);

router.get("/:id", VocabularyController.getSingleVocabulary);

router.post(
  "/",
  // Guard(Role.ADMIN),
  validateRequest(VocabularyValidationSchema.createvocabularySchema),
  VocabularyController.createVocabulary
);

router.delete("/:id", VocabularyController.deleteVocabulary);

router.patch(
  "/:id",
  // Guard(UserRole.ADMIN),
  validateRequest(VocabularyValidationSchema.updateVocabularySchema),
  VocabularyController.updateVocabulary
);

export const VocabularyRoutes = router;
