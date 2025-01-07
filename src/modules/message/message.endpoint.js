import { roleTypes } from "../../DB/models/User.model.js";

export const endpoints = {
  deleteMessage: Object.values(roleTypes),
};
