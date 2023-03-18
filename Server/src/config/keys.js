require("dotenv").config();
const crypto = require("crypto");

// function to decrypt the encrypted keys
function decryptKeys(str) {
  let iv = Buffer.from(process.env.IV, "hex");
  let encryptedStr = Buffer.from(str, "hex");
  var key = Buffer.from(process.env.SECRET, "hex");
  let decipher = crypto.createDecipheriv(
    process.env.ALGORITHM,
    Buffer.from(key),
    iv
  );
  let decrypted = decipher.update(encryptedStr);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const EncryptedKeys = {
  dbURI:
    "5ace8123da19320ab9ea71fe786db5e325679fcb8d15d1549ea9d3130119657a2a72132468b2e41a491d7131f2d92453db1957bf945936695d7f1fe014ea9e7fa04504d1f221283f616aec26cd79fba6f3aa726659e858a016f1b3d4d30169e31fda505c1b9c07b7c0fd29100fc40406",
  jwtSecret: "ddba23dcfd2cf9d98bd4fafe9ef9e5d9939b482b2e048ef99b1873bc8f0bb10b",
};

module.exports = {
  mongodb: {
    dbURI: decryptKeys(EncryptedKeys.dbURI),
  },
  jwt: {
    jwtSecret: decryptKeys(EncryptedKeys.jwtSecret),
  },
};
