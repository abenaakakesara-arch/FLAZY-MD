// autoReact.js

const config = require("./config");

async function autoReact(sock, msg) {

  try {

    await sock.sendMessage(
      msg.key.remoteJid,
      {
        react: {
          text: config.💗,
          key: msg.key
        }
      }
    );

  } catch (err) {

    console.log("❌ Auto react failed");

  }
}

module.exports = autoReact;
