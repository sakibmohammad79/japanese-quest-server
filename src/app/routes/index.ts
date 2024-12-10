import { Router } from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { LessonRoutes } from "../modules/Lesson/lesson.routes";
import { VocabularyRoutes } from "../modules/Vocalbulary/vocabulary.routes";
import { TutorialRoutes } from "../modules/Tutorial/tutorial.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/lesson",
    route: LessonRoutes,
  },
  {
    path: "/vocabulary",
    route: VocabularyRoutes,
  },
  {
    path: "/tutorial",
    route: TutorialRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
