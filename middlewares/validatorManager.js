import axios from "axios";
import { validationResult, body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

// export const paramLinkValidator = [
//   param("id", "Formato no válido (expressValidator)")
//       .trim()
//       .notEmpty()
//       .escape(),
//   validationResultExpress,
// ];

export const bodyLinkValidator = [
  body("longLink", "Formato link incorrecto")
    .trim()
    .notEmpty()
    .custom(async (value, { req }) => {
      try {
        if (!value.startsWith("https://")) {
          value = "https://" + value;
        }

        console.log(value);

        await axios.get(value);
        return value;
      } catch (error) {
        console.log(error);
        throw new Error("Not found loglink 404");
      }
    }),

  validationResultExpress,
];

export const bodyRegisterValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
  body("password", "Formato de password incorrecta").custom(
    (value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("No coinciden las contraseñas");
      }
      return value;
    }
  ),
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
  validationResultExpress,
];
