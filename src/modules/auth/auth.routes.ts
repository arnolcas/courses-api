import { Router } from "express";
import { body } from "express-validator";
import * as AuthController from "./autn.controller";
import { checkFields } from "../../services/express/middlewares";

const router: Router = Router();

router.post(
    "/register",
    [
        body("name").not().isEmpty(),
        body("email").isEmail(),
        body("password").not().isEmpty(),
        checkFields,
    ],
    AuthController.register
);

router.post(
    "/login",
    [body("email").isEmail(), body("password").not().isEmpty(), checkFields],
    AuthController.login
);

export default router;
