import { Router } from "express";
import {
  confirmUpdateEmail,
  freezeUserProfile,
  shareProfile,
  updateEmail,
  updatePassword,
  updateUserProfile,
  userProfile,
} from "./services/users.service.js";
import {
  authentication,
  authorization,
} from "../../middleware/auth.middleware.js";
import { endpoints } from "./user.endpoint.js";
import { validation } from "../../middleware/validation.middleware.js";
import {
  shareProfileSchema,
  updateEmailSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from "./user.validation.js";

const router = Router();
router.get(
  "/:userId/shareProfile",
  validation(shareProfileSchema),
  shareProfile
);
router.get(
  "/profile",
  authentication(),
  authorization(endpoints.profile),
  userProfile
);
router.patch(
  "/profile",
  validation(updateProfileSchema),
  authentication(),
  authorization(endpoints.profile),
  updateUserProfile
);
router.put(
  "/profile/updateEmail",
  validation(updateEmailSchema),
  authentication(),
  authorization(endpoints.profile),
  updateEmail
);
router.put("/profile/confirmEmailUpdate", confirmUpdateEmail);
router.patch(
  "/profile/updatePassword",
  validation(updatePasswordSchema),
  authentication(),
  authorization(endpoints.profile),
  updatePassword
);
router.delete(
  "/profile/freeze",
  authentication(),
  authorization(endpoints.profile),
  freezeUserProfile
);

export default router;
