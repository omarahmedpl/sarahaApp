import { query } from "express";
import joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";

export const signUpValidationSchema_old = {
  body: joi
    .object({
      username: joi.string().trim().min(3).max(20).required().messages({
        "string.empty": "Username is not allowed to be empty",
        "string.min": "Username must be at least 3 characters long",
        "string.max": "Username must be at most 20 characters long",
      }),
      email: joi
        .string()
        .trim()
        .email({
          tlds: {
            allow: ["com", "net"],
          },
        })
        .required()
        .messages({
          "string.email": "Email must be a valid email as example@gmail.com",
        }),
      password: joi
        .string()
        .trim()
        .min(6)
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          )
        )
        .required(),
      confirmationPassword: joi.string().valid(joi.ref("password")).required(),
      phone: joi
        .string()
        .pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/))
        .required(),
    })
    .required(),
  query: joi
    .object()
    .keys({
      lang: joi.string().valid("ar", "en").default("en"),
    })
    .required(),
};

export const signUpValidationSchema = joi
  .object({
    username: generalFields.username.required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    confirmationPassword: generalFields.confirmationPassword.required(),
    phone: generalFields.phone.required(),
    "accept-language": joi.string().valid("ar", "en").default("en"),
  })
  .required();

export const loginValidationSchema = joi
  .object({
    email: generalFields.email,
    password: generalFields.password,
  })
  .required();

export const forgetPasswordSchema = joi
  .object({
    email: generalFields.email.required(),
  })
  .required();

export const resetPasswordSchema = joi
  .object({
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    confirmationPassword: generalFields.confirmationPassword.required(),
    otp: joi.number().required(),
  })
  .required();
