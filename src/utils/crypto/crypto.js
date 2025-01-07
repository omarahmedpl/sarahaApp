import CryptoJS from "crypto-js";

export const generateCrypto = ({
  plain = "",
  key = process.env.TOKEN_SIGNATUER,
  options = {},
}) => {
  const crypto = CryptoJS.AES.encrypt(plain, key, options).toString();
  return crypto;
};

export const decryptCrypto = ({
  cipherText = "",
  signature = process.env.TOKEN_SIGNATUER,
}) => {
  var bytes = CryptoJS.AES.decrypt(cipherText, signature);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  console.log({ originalText });

  return originalText;
};
