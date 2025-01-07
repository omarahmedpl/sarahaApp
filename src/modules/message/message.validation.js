import joi from "joi";
import { generalFields } from "../../middleware/validation.middleware.js";
import { asyncHandler } from "../../utils/error/error.handling.js";

export const sendMessageSchema = joi
  .object()
  .keys({
    message: joi
      .string()
      .pattern(new RegExp(/^[\u0600-\u06FF\u0750-\u077Fa-zA-Z0-9\s]{2,50000}$/)) // Arabic + English + numbers + spaces
      .min(2)
      .max(50000)
      .required(),
    accountId: generalFields.userId.required(),
  })
  .required();

export const deleteMessageSchema = joi
  .object()
  .keys({
    messageId: generalFields.userId.required(),
  })
  .required();
