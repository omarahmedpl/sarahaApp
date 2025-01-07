import jwt from "jsonwebtoken";

export const generateToken = ({
  payload = {},
  signature = process.env.TOKEN_SIGNATUER,
  options = {},
}) => {
  const token = jwt.sign(payload, signature, options);
  return token;
};

export const verifyToken = ({
  token,
  signature = process.env.TOKEN_SIGNATUER,
}) => {
  const decoded = jwt.verify(token, signature);
  return decoded;
};
