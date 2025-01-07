import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";
import {
  deleteMessageSchema,
  sendMessageSchema,
} from "./message.validation.js";
import { deleteMessage, sendMessage } from "./services/message.service.js";
import {
  authentication,
  authorization,
} from "../../middleware/auth.middleware.js";
import { endpoints } from "./message.endpoint.js";
const router = Router();

router.post("/", validation(sendMessageSchema), sendMessage);
router.delete(
  "/:messageId",
  validation(deleteMessageSchema),
  authentication(),
  authorization(endpoints.deleteMessage),
  deleteMessage
);
export default router;
