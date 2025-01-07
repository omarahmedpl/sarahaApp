import Message from "../../../DB/models/Message.model.js";
import User from "../../../DB/models/User.model.js";
import { decryptCrypto, generateCrypto } from "../../../utils/crypto/crypto.js";
import { emailEvent } from "../../../utils/email/event/sendEmailEvent.js";
import { asyncHandler } from "../../../utils/error/error.handling.js";
import { compareHash, generateHash } from "../../../utils/hash/hash.js";
import { succuessResponse } from "../../../utils/response/succuess.response.js";
import { verifyToken } from "../../../utils/token/token.js";
import bcrypt from "bcrypt";
export const userProfile = async (req, res, next) => {
  try {
    const user = req.user;
    console.log({ phone: user.phone });
    if (user) {
      user.phone = decryptCrypto({
        cipherText: user.phone,
        signature: process.env.TOKEN_SIGNATUER,
      });
      const messages = await Message.find({ accountId: user._id });
      return succuessResponse({
        res,
        message: "User Profile",
        data: { user, messages },
      });
    } else {
      return next(Object.assign(new Error("User not found", { cause: 404 })));
    }
  } catch (error) {
    console.log(error);
    return next(
      Object.assign(new Error("Internal Server Error", { cause: 500 }))
    );
  }
};

export const updateUserProfile = asyncHandler(async (req, res, next) => {
  if (req.body.phone) {
    req.body.phone = generateCrypto({
      plain: req.body.phone,
      key: process.env.TOKEN_SIGNATUER,
    });
  }
  const { username, gender, phone, dob, image } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { username, gender, phone, dob, image },
    { new: true }
  );
  return succuessResponse({
    res,
    message: "User Profile Updated",
    data: { user },
    status: 200,
  });
});

export const updateEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const duplicatedEmail = await User.findOne({ email });
  if (duplicatedEmail) {
    return next(
      Object.assign(new Error("Email already exists", { cause: 409 }))
    );
  } else {
    const user = await User.findById(req.user._id);
    emailEvent.emit("updateEmail", {
      id: req.user._id,
      email: email,
      username: user.username,
    });
    return succuessResponse({
      res,
      message: "Please Confirm Your Email Update",
      status: 200,
    });
  }
});

export const confirmUpdateEmail = asyncHandler(async (req, res, next) => {
  const { authorization: token } = req.headers;
  const decoded = verifyToken({ token, signature: process.env.EMAIL_TOKEN });
  if (decoded) {
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { email: decoded.email },
      { new: true }
    );
    if (user) {
      return succuessResponse({
        res,
        message: "Email Updated Successfully",
        data: { user },
        status: 200,
      });
    } else {
      return next(Object.assign(new Error("User Not Found", { cause: 404 })));
    }
  } else {
    return next(Object.assign(new Error("Invalid Token", { cause: 400 })));
  }
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, password, confirmationPassword } = req.body;
  const oldPasswordOriginal = bcrypt.compareSync(
    oldPassword,
    req.user.password
  );
  if (oldPasswordOriginal) {
    if (password === confirmationPassword) {
      const hashPassword = generateHash({ payload: password });
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { password: hashPassword, changePasswordAt: Date.now() },
        { new: true }
      );
      emailEvent.emit("updatePassowrd", {
        email,
        username: user.username,
      });
      return succuessResponse({
        res,
        message: "Password Updated Successfully",
        data: { user },
        status: 200,
      });
    } else {
      return next(
        Object.assign(
          new Error("Password and Confirmation Password are not the same", {
            cause: 400,
          })
        )
      );
    }
  } else {
    return next(
      Object.assign(new Error("Old Password is incorrect", { cause: 400 }))
    );
  }
});

export const freezeUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { deleted: true, changePasswordAt: Date.now() },
    { new: true }
  );
  return succuessResponse({
    res,
    message: "Profile Deleted Successfully",
    status: 200,
  });
});

export const shareProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId).select(
    "username image _id gender dob"
  );
  if (user) {
    return succuessResponse({
      res,
      message: "User Profile",
      data: { user },
    });
  } else {
    return next(Object.assign(new Error("User not found", { cause: 404 })));
  }
});
