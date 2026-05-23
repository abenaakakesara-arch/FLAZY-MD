// sticker.js

const fs = require("fs");

async function createSticker(sock, jid, media, quoted) {

  try {

    await sock.sendMessage(
      jid,
      {
        sticker: media
      },
      {
        quoted
      }
    );

    console.log("✅ Sticker created");

  } catch (err) {

    console.log("❌ Sticker create failed");

  }
}

module.exports = {
  createSticker
};
