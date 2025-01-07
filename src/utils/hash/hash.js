import bcrypt from "bcrypt";
export const generateHash = ({
  payload = {},
  salt = process.env.SALT_ROUNDS,
  options = {},
}) => {
  const hash = bcrypt.hashSync(payload, parseInt(salt), options);
  return hash;
};

export const compareHash = ({ plain = "", hashed = "" }) => {
  const match = bcrypt.compareSync(plain, hashed);
  return match;
};
