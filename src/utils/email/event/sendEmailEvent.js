import { EventEmitter } from "events";
import jwt from "jsonwebtoken";
import { generateEmailTemplate, sendEmail } from "../email.js";
import { generateToken } from "../../token/token.js";
export const emailEvent = new EventEmitter();

emailEvent.on("sendEmail", async (data) => {
  const { email, username } = data;
  const emailToken = generateToken({
    payload: { username, email },
    signature: process.env.EMAIL_TOKEN,
  });
  const emailLink = `${process.env.FE_URL}/confirmEmail/${emailToken}`;
  let html = generateEmailTemplate(username, emailLink);
  await sendEmail({ to: email, subject: "Confirm Email", html });
});

emailEvent.on("updateEmail", async (data) => {
  const { id, email, username } = data;
  const emailToken = generateToken({
    payload: { id, username, email },
    signature: process.env.EMAIL_TOKEN,
  });
  const emailLink = `${process.env.FE_URL}/confirmEmail/${emailToken}`;
  let html = generateEmailTemplate(username, emailLink, "Update Email");
  await sendEmail({ to: email, subject: "Confirm Email", html });
});

emailEvent.on("forgetPassword", async (data) => {
  const { email, username, otp } = data;
  const emailToken = generateToken({
    payload: { username, email, otp },
    signature: process.env.EMAIL_TOKEN,
  });
  const emailLink = `${process.env.FE_URL}/resetPassword/${emailToken}`;
  let html = generateEmailTemplate(username, emailLink, "Reset Password", otp);
  await sendEmail({ to: email, subject: "Reset Password", html });
});

emailEvent.on("updatePassword", async (data) => {
  const { email, username } = data;
  let html = generateEmailTemplate(username, "", "Update Password");
  const message = await sendEmail({
    to: email,
    subject: "Update Password",
    html,
  });
});
