import { Router } from "express";

import { validateRequest } from "../../middleware/validationRequest";
import { AuthValidationSchema } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
  "/login",
  validateRequest(AuthValidationSchema.loginValidationSchema),
  AuthController.loginUser
);

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
