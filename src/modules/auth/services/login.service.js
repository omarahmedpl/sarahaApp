import User, { roleTypes } from "../../../DB/models/User.model.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../../utils/error/error.handling.js";
import { succuessResponse } from "../../../utils/response/succuess.response.js";
import { generateToken } from "../../../utils/token/token.js";
import { compareHash } from "../../../utils/hash/hash.js";

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOneAndUpdate({
    email,
  } , { deleted : false});

  if (user) {
    if (!user.confirmEmail) {
      return next("Email Not Confirmed", { cause: 403 });
    } else {
      const match = compareHash({ plain: password, hashed: user.password });
      if (match) {
        let TOKEN_SIGNATURE = undefined;
        switch (user.role) {
          case roleTypes.User:
            TOKEN_SIGNATURE = process.env.TOKEN_SIGNATUER;
            break;
          case roleTypes.Admin:
            TOKEN_SIGNATURE = process.env.TOKEN_SIGNATUER_ADMIN;
            break;
        }
        const token = generateToken({
          payload: { id: user._id, username: user.username, isLoggedIn: true },
          signature: TOKEN_SIGNATURE,
          options: {
            expiresIn: 60 * 60,
          },
        });
        return succuessResponse({
          res,
          data: { token },
          message: "Logged In Successfully",
        });
      } else {
        return next(
          Object.assign(new Error("Invalid Password"), { cause: 401 })
        );
      }
    }
  } else {
    return next(Object.assign(new Error("User Not Found"), { cause: 404 }));
  }
});
