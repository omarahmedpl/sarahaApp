import { roleTypes } from "../../DB/models/User.model.js";

export const endpoints = {
  profile: Object.values(roleTypes),
};
