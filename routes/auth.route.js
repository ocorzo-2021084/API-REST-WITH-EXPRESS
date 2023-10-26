import { Router } from "express";
import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const router = Router();

router.post(
  "/login",
  [
    body("email", "No es un email valido.").trim().isEmail().normalizeEmail(),
    body("password", "Password demasiado corta").trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

router.post(
  "/register",
  [
    body("email", "No es un email valido.").trim().isEmail().normalizeEmail(),
    body("password", "Password demasiado corta")
      .trim()
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("No coinciden las passwords");
        }
        return value;
      }),
  ],
  validationResultExpress,
  register
);

export default router;
