"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/User/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const lesson_routes_1 = require("../modules/Lesson/lesson.routes");
const vocabulary_routes_1 = require("../modules/Vocalbulary/vocabulary.routes");
const tutorial_routes_1 = require("../modules/Tutorial/tutorial.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/lesson",
        route: lesson_routes_1.LessonRoutes,
    },
    {
        path: "/vocabulary",
        route: vocabulary_routes_1.VocabularyRoutes,
    },
    {
        path: "/tutorial",
        route: tutorial_routes_1.TutorialRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
