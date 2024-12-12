import { Router } from "express";
import { validateRequest } from "../../middleware/validationRequest";
import { VocabularyController } from "./vocabulary.controller";
import { VocabularyValidationSchema } from "./vocabulary.validation";
import Guard from "../../middleware/guard";
import { Role } from "@prisma/client";

const router = Router();

router.get("/", VocabularyController.getAllVocabulary);

router.get("/lesson/:id", VocabularyController.getAllVocabularyByLesson);

router.get("/:id", VocabularyController.getSingleVocabulary);

router.post(
  "/",
  Guard(Role.ADMIN),
  // validateRequest(VocabularyValidationSchema.createvocabularySchema),
  VocabularyController.createVocabulary
);

router.delete("/:id", Guard(Role.ADMIN), VocabularyController.deleteVocabulary);

router.patch(
  "/:id",
  Guard(Role.ADMIN),
  validateRequest(VocabularyValidationSchema.updateVocabularySchema),
  VocabularyController.updateVocabulary
);

export const VocabularyRoutes = router;
