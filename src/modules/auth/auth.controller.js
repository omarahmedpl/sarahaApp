import { Router } from "express";
import { confirmEmail, forgetPassword, resetPassword, signUp } from "./services/registeration.service.js";
import { login } from "./services/login.service.js";
import { validation } from "../../middleware/validation.middleware.js";
import { forgetPasswordSchema, loginValidationSchema, resetPasswordSchema, signUpValidationSchema } from "./auth.validation.js";

const router = Router();
router.post("/signup" ,validation(signUpValidationSchema), signUp);
router.post("/login",validation(loginValidationSchema), login);
router.patch("/confirm-email", confirmEmail);
router.patch('/forget-passowrd', validation(forgetPasswordSchema) , forgetPassword)
router.patch('/reset-password', validation(resetPasswordSchema) , resetPassword)
export default router;
