import jwt from "jsonwebtoken";
import User from "../DB/models/User.model.js";
import { asyncHandler } from "../utils/error/error.handling.js";
import { verifyToken } from "../utils/token/token.js";

export const authentication = () =>
  asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(
        Object.assign(new Error("Authorization is required", { cause: 401 }))
      );
    }

    const [bearer, token] = authorization.split(" ");
    if (!bearer || !token) {
      return next(
        Object.assign(new Error("Invalid Authorization header", { cause: 401 }))
      );
    }

    let TOKEN_SIGNATURE = null;
    switch (bearer) {
      case "Bearer":
        TOKEN_SIGNATURE = process.env.TOKEN_SIGNATUER;
        break;
      case "Admin":
        TOKEN_SIGNATURE = process.env.TOKEN_SIGNATUER_ADMIN;
        break;
      default:
        return next(
          Object.assign(
            new Error("Invalid Authorization header", { cause: 401 })
          )
        );
    }

    try {
      const decoded = verifyToken({ token, signature: TOKEN_SIGNATURE });
      const user = await User.findById(decoded.id);
      if (!user || user.deleted) {
        return next(Object.assign(new Error("User not found", { cause: 404 })));
      } else if (
        parseInt((user.changePasswordAt?.getTime() || 0) / 1000) >= decoded.iat
      ) {
        return next(
          Object.assign(
            new Error("Password has been changed, Token Expired", {
              cause: 400,
            })
          )
        );
      } else if (user) req.user = user;
      return next();
    } catch (error) {
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
      }
      return next(Object.assign(new Error("Invalid Token", { cause: 401 })));
    }
  });

export const authorization = (accessRoles = []) =>
  asyncHandler(async (req, res, next) => {
    if (accessRoles.includes(req.user.role)) {
      return next();
    }
    return next(
      Object.assign(new Error("Unauthorized Access", { cause: 403 }))
    );
  });
