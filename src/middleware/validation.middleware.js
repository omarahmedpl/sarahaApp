import { Types } from "mongoose";
import { genders } from "../DB/models/User.model.js";
import { generateErrorsDetails } from "../utils/error/error.handling.js";
import joi from "joi";

export const validateObjectId = (value, helper) => {
  if (Types.ObjectId.isValid(value)) {
    return true;
  } else {
    return helper.message("Invalid ObjectId");
  }
};
export const generalFields = {
  username: joi.string().trim().min(3).max(20).messages({
    "string.empty": "Username is not allowed to be empty",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must be at most 20 characters long",
  }),
  email: joi.string().trim().email().messages({
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
    ),
  phone: joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
  gender: joi.string().valid(...Object.values(genders)),
  dob: joi.date().max("now"),
  image: joi.string().uri(),
  confirmationPassword: joi.string().valid(joi.ref("password")),
  userId: joi.string().custom(validateObjectId),
};

export const validation_old = (schema) => {
  return (req, res, next) => {
    const validationErrorResults = [];
    for (const key of Object.keys(schema)) {
      const { error } = schema[key].validate(req[key], { abortEarly: false });
      if (error) {
        validationErrorResults.push(generateErrorsDetails(error));
      }
    }
    if (validationErrorResults.length) {
      return res.status(400).json({
        message: "Validation Error",
        errors: validationErrorResults,
      });
    }
    return next();
  };
};

export const validation = (schema) => {
  return (req, res, next) => {
    const inputData = { ...req.body, ...req.params, ...req.query };
    if (req.headers["accept-language"]) {
      inputData["accept-language"] = req.headers["accept-language"];
    }
    const { error } = schema.validate(inputData, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation Error",
        errors: generateErrorsDetails(error),
      });
    }

    return next();
  };
};
