import joi from "joi";
import {
  generalFields,
  validateObjectId,
} from "../../middleware/validation.middleware.js";

export const updateProfileSchema = joi
  .object()
  .keys({
    username: generalFields.username,
    phone: generalFields.phone,
    image: generalFields.image,
    dob: generalFields.dob,
    gender: generalFields.gender,
  })
  .required();

export const updateEmailSchema = joi
  .object()
  .keys({
    email: generalFields.email.required(),
  })
  .required();

export const updatePasswordSchema = joi
  .object()
  .keys({
    oldPassword: generalFields.password.required(),
    password: generalFields.password.not(joi.ref("oldPassword")).required(),
    confirmationPassword: generalFields.confirmationPassword.required(),
  })
  .required();

export const shareProfileSchema = joi
  .object()
  .keys({
    userId: generalFields.userId.required(),
  })
  .required();
