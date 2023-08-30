const crypto = require("crypto");
const userData = require("../data.json");
const DataStore = require("../models/dataStore");
require("dotenv").config();
// socket
module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: `${process.env.HOST_URL}:${process.env.PORT||8000}`,
      methods: ["GET", "POST"],
      //   allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.sockets.on("connection", function (socket) {
    console.log("new connection received", socket.id);

    socket.on("disconnect", function () {
      console.log("socket disconnected...!");
    });

    // user.secret_key = secret_key;
    // ALGORITHM AND PASS KEY
    const algorithm = process.env.algorithm;
    const passkey = crypto.randomBytes(16);

    setInterval(() => {
      // Derive the encryption key from the passkey using a KDF
      const keyLength = 32; // 32 bytes for AES-256
      const salt = crypto.randomBytes(16);
      // used because crypto shows error initialize vector and length error
      crypto.pbkdf2(
        passkey,
        salt,
        100000,
        keyLength,
        "sha512",
        async (err, derivedKey) => {
          if (err) throw err;

          // defining an empty object
          let item = {};
          // putting valuse to it
          item.name =
            userData["names"][
              Math.floor([Math.random() * userData["names"].length])
            ];

          item.origin =
            userData["cities"][
              Math.floor([Math.random() * userData["cities"].length])
            ];

          item.destination =
            userData["cities"][
              Math.floor([Math.random() * userData["cities"].length])
            ];

          // DEFINING THE SECRET KEY
          const secretKey = crypto
            .createHash(process.env.hash_algorithm)
            .update(JSON.stringify(item))
            .digest("hex");
          // console.log("secret key:", secretKey);

          const payload = { ...item, secret_key: secretKey };
          // console.log(payload);

          // FUNCTION FOR encryption
          function encrypt(text) {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(algorithm, derivedKey, iv);
            const encrypted = Buffer.concat([
              cipher.update(text),
              cipher.final(),
            ]);
            return iv.toString("hex") + "|" + encrypted.toString("hex");
          }

          // METHOD FOR decryption
          function decrypt(text) {
            const parts = text.split("|");
            const iv = Buffer.from(parts[0], "hex");
            const encryptedText = Buffer.from(parts[1], "hex");
            const decipher = crypto.createDecipheriv(algorithm, derivedKey, iv);
            const decrypted = Buffer.concat([
              decipher.update(encryptedText),
              decipher.final(),
            ]);
            // converting to string from hexa code
            const res = decrypted.toString();
            // parsing to its original form
            return JSON.parse(res);
          }

          // STORING the encrypted message or data
          const encryptedMessage = encrypt(JSON.stringify(payload)); // Implement encryptAES function

          //STORING the decrypted message or data
          let decryptedMessage = decrypt(encryptedMessage);

          // console.log("verifying the stream", sample.secret_key === secretKey);

          // IF THE SECRET_KEY MATCHES decrepted data secret key
          if (decryptedMessage.secret_key === secretKey) {
            // storing the data in database
            const valueToStore = { ...decryptedMessage, date: new Date() };
            await DataStore.create(valueToStore);

            // emitting the data
            socket.emit("got_data", valueToStore);
          }
        }
      );
      // Every 10 seconds this will emit or run
    }, 10000);

    // socket.emit("got_data", {
    //   name: "sayyad",
    //   origin: "udupi",
    //   destination: "mumbai",
    // });
  });
};
