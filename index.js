require("dotenv").config();

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const fs = require("fs");
const qrcode = require("qrcode-terminal");
const chalk = require("chalk");

const OWNER_NUMBER = "94742420974";
const OWNER_NAME = "RUKSHAN";
const BOT_NAME = "FLAZY MD";

async function startBot() {

  const { state, saveCreds } = await useMultiFileAuthState("./session");

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    auth: state,
    browser: ["FLAZY MD", "Chrome", "1.0.0"]
  });

  // QR CODE
  sock.ev.on("connection.update", async (update) => {
    const { connection, qr, lastDisconnect } = update;

    if (qr) {
      console.log(chalk.green(`
╔══════════════════════╗
║      FLAZY MD        ║
║   SCAN QR CODE NOW   ║
╚══════════════════════╝
      `));

      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log(chalk.cyan(`
╔══════════════════════╗
║   FLAZY MD ONLINE    ║
╚══════════════════════╝
      `));

      sock.sendMessage(sock.user.id, {
        text: `✅ ${BOT_NAME} is now online!`
      });
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      console.log("Connection closed.");

      if (shouldReconnect) {
        startBot();
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);

  // AUTO STATUS SEEN
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];

    if (!msg.message) return;

    const jid = msg.key.remoteJid;

    // STATUS SEEN
    if (jid === "status@broadcast") {
      await sock.readMessages([msg.key]);
      console.log(chalk.yellow("Status Seen"));
      return;
    }

    const messageText =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    // AUTO REACT
    await sock.sendMessage(jid, {
      react: {
        text: "❤️",
        key: msg.key
      }
    });

    // AUTO VOICE REPLY
    if (
      msg.message.audioMessage &&
      !msg.key.fromMe
    ) {
      await sock.sendMessage(jid, {
        text: "🎤 Voice message received in FLAZY MD"
      });
    }

    // MENU COMMAND
    if (messageText === ".menu") {
      const menuText = `
╔═══〔 ${BOT_NAME} MENU 〕═══╗

👑 Owner : ${OWNER_NAME}

╭─❍ DOWNLOAD
│ • .fb
│ • .tt
│ • .yt
│ • .song
│ • .apk
╰───────────────

╭─❍ TOOLS
│ • .sticker
│ • .alive
│ • .menu
╰───────────────

❤️ Thanks For Using FLAZY MD
`;

      await sock.sendMessage(jid, {
        text: menuText
      });
    }

    // ALIVE COMMAND
    if (messageText === ".alive") {
      await sock.sendMessage(jid, {
        text: `✅ ${BOT_NAME} is alive now!`
      });
    }

    // OWNER COMMAND
    if (messageText === ".owner") {
      await sock.sendMessage(jid, {
        text: `
👑 OWNER DETAILS

Name : ${OWNER_NAME}
Number : ${OWNER_NUMBER}
Bot : ${BOT_NAME}
        `
      });
    }

    // APK DOWNLOAD
    if (messageText.startsWith(".apk")) {
      await sock.sendMessage(jid, {
        text: "📦 APK Download feature added soon."
      });
    }

    // FACEBOOK DOWNLOAD
    if (messageText.startsWith(".fb")) {
      await sock.sendMessage(jid, {
        text: "📥 Facebook Video Downloader working soon."
      });
    }

    // TIKTOK DOWNLOAD
    if (messageText.startsWith(".tt")) {
      await sock.sendMessage(jid, {
        text: "🎵 TikTok Downloader working soon."
      });
    }

    // YOUTUBE DOWNLOAD
    if (messageText.startsWith(".yt")) {
      await sock.sendMessage(jid, {
        text: "▶️ YouTube Downloader working soon."
      });
    }

    // AUDIO DOWNLOAD
    if (messageText.startsWith(".song")) {
      await sock.sendMessage(jid, {
        text: "🎶 Audio Download feature added soon."
      });
    }

    // STICKER CREATE
    if (messageText.startsWith(".sticker")) {
      await sock.sendMessage(jid, {
        text: "🖼️ Sticker Creator added soon."
      });
    }

  });
}

startBot();
