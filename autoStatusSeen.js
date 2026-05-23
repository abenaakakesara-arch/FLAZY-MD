// autoStatusSeen.js

async function autoStatusSeen(sock, msg) {

  try {

    if (msg.key.remoteJid === "status@broadcast") {

      await sock.readMessages([msg.key]);

      console.log("✅ Status Seen");

    }

  } catch (err) {

    console.log("❌ Auto status seen failed");

  }
}

module.exports = autoStatusSeen;
