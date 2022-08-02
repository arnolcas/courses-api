import { Router } from "express";
import { body, param } from "express-validator";
import { validateAuth } from "../auth/auth.middlewares";
import { checkFields } from "../../services/express/middlewares";
import * as UserController from "./user.controller";

const router = Router();

router.post(
    "/",
    [
        validateAuth,
        body("userId").isUUID(),
        body("courses").isArray(),
        checkFields,
    ],
    UserController.setCourses
);
router.get(
    "/:userId",
    [validateAuth, param("userId").isUUID(), checkFields],
    UserController.getCourses
);

export default router;
