import User from "../../../DB/models/User.model.js";
import * as bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { emailEvent } from "../../../utils/email/event/sendEmailEvent.js";
import {
  asyncHandler,
  generateErrorsDetails,
} from "../../../utils/error/error.handling.js";
import { succuessResponse } from "../../../utils/response/succuess.response.js";
import { verifyToken } from "../../../utils/token/token.js";
import { generateHash } from "../../../utils/hash/hash.js";
import { generateCrypto } from "../../../utils/crypto/crypto.js";
import crypto from "crypto";
export const signUp = asyncHandler(async (req, res, next) => {
  const { username, password, email, confirmationPassword, phone } = req.body;
  if (password === confirmationPassword) {
    if (!(await User.findOne({ $or: [{ username }, { email }] }))) {
      const hashPassword = generateHash({
        payload: password,
        salt: process.env.SALT_ROUNDS,
      });
      emailEvent.emit("sendEmail", { email, username });
      const encryptedPhone = generateCrypto({
        plain: phone,
        key: process.env.TOKEN_SIGNATUER,
      });
      const createdUser = await User.create({
        username,
        password: hashPassword,
        phone: encryptedPhone,
        email,
      });
      if (createdUser) {
        return succuessResponse({
          res,
          message: "User Created Successfully",
          data: { user: createdUser },
        });
      }
    } else {
      return next(
        Object.assign(new Error("User Already Exists"), { cause: 409 })
      );
    }
  } else {
    return next(
      Object.assign(
        new Error("Password and Confirmation Password are not the same"),
        { cause: 400 }
      )
    );
  }
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { authorization: token } = req.headers;
  const decoded = verifyToken({ token, signature: process.env.EMAIL_TOKEN });
  const user = await User.findOneAndUpdate(
    { email: decoded.email },
    { confirmEmail: true }
  );
  if (user) {
    return succuessResponse({
      res,
      data: { user },
      message: "Email Confirmed",
    });
  } else {
    return next(Object.assign(new Error("User Not Found"), { cause: 404 }));
  }
});

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const generateOTP = crypto.randomInt(100000, 999999);
  if (user) {
    emailEvent.emit("forgetPassword", {
      email,
      username: user.username,
      otp: generateOTP,
    });
    const hashOTP = generateHash({
      payload: generateOTP.toString(),
      salt: parseInt(process.env.SALT_ROUNDS),
    });
    await User.findOneAndUpdate({ email }, { otp: hashOTP });
    return succuessResponse({
      res,
      message: "Please Check Your Email",
    });
  } else {
    return next(Object.assign(new Error("User Not Found"), { cause: 404 }));
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, password, confirmationPassword, otp } = req.body;
  if (password === confirmationPassword) {
    const user = await User.findOne({ email });
    if (user) {
      const compareOTP = bcrypt.compareSync(otp.toString(), user.otp);
      if (compareOTP) {
        emailEvent.emit("updatePassword", {
          email,
          username: user.username,
        });
        const hashPassword = generateHash({
          payload: password,
          salt: parseInt(process.env.SALT_ROUNDS),
        });
        await User.findOneAndUpdate(
          { email },
          { password: hashPassword, otp: null, changePasswordAt: Date.now() }
        );
        return succuessResponse({
          res,
          message: "Password Updated Successfully",
        });
      } else {
        return next(Object.assign(new Error("Invalid OTP"), { cause: 400 }));
      }
    } else {
      return next(Object.assign(new Error("User Not Found"), { cause: 404 }));
    }
  } else {
    return next(
      Object.assign(
        new Error("Password and Confirmation Password are not the same"),
        { cause: 400 }
      )
    );
  }
});