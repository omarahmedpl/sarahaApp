import connectDB from "./DB/dbConnections.js";
import authController from "./modules/auth/auth.controller.js";
import userController from "./modules/user/users.controller.js";
import messageController from "./modules/message/message.controller.js";
import { globalErrorHandler } from "./utils/error/error.handling.js";
import cors from "cors";
const bootstrap = (app, express) => {
  app.use(cors());
  app.use(express.json());
  connectDB();
  app.use("/auth", authController);
  app.use("/user", userController);
  app.use("/message", messageController);
  app.use(globalErrorHandler);

  app.all("*", (req, res, next) => {
    return res.status(404).json({ message: "Endpoint Not Found!" });
  });
};

export default bootstrap;
