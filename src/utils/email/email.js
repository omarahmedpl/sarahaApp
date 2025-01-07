import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const generateEmailTemplate = (
  name,
  emailLink,
  type = "Sign Up",
  otp
) => {
  return type !== "Reset Password"
    ? `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #4caf50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
            color: #333333;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #4caf50;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            margin-top: 20px;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #777777;
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Confirm Your Email Address
        </div>
        <div class="content">
            <p>Hello ${name},</p>
            ${
              type !== "Update Password"
                ? `<p>Thank you for ${type}! Please confirm your email address by clicking the button below:</p>`
                : `Your Password has been updated successfully`
            }
            ${
              emailLink
                ? `<a href="${emailLink}" class="button">Confirm Email</a>`
                : ""
            }
            ${
              type !== "Update Password"
                ? `<p>If you did not ${type}, please ignore this email.</p>`
                : "If you didn't update your password, please contact us immediately"
            }
        </div>
        <div class="footer">
            &copy; 2024 Your Company. All rights reserved.
        </div>
    </div>
</body>
</html>
`
    : `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #4caf50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
            color: #333333;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #4caf50;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            margin-top: 20px;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #777777;
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Confirm Your Email Address
        </div>
        <div class="content">
            <p>Hello ${name},</p>
            <p>You've Asked For Updating Your password Because you've forgot it</p>
            <p>Your OTP is</p>
            <p>${otp}</p>
            <p>Please Don't Share it with anybody</p>
            <p>If you did not forget it, please ignore this email.</p>
        </div>
        <div class="footer">
            &copy; 2024 Your Company. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
};

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({
  to = [],
  cc = [],
  bcc = [],
  subject = "",
  text = "",
  html = "",
  attachments = [],
}) => {
  const info = await transport.sendMail({
    from: `"Saraha App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
    attachments,
  });
};
