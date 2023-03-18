require("dotenv").config();
const prompt = require("prompt-sync")();
const crypto = require("crypto");

function encryptKeys(str) {
  var iv = Buffer.from(process.env.IV, "hex");
  var key = Buffer.from(process.env.SECRET, "hex");
  let cipher = crypto.createCipheriv(
    process.env.ALGORITHM,
    Buffer.from(key),
    iv
  );
  let encrypted = cipher.update(str);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
}

const str = prompt("Enter String To Encrypt : ");
console.log(encryptKeys(str));
