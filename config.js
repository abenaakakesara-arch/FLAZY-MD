require("dotenv").config();

module.exports = {

  // BOT INFO
  BOT_NAME: "FLAZY MD",
  OWNER_NAME: "RUKSHAN",
  OWNER_NUMBER: "94742420974",

  // PREFIX
  PREFIX: ".",

  // AUTO FEATURES
  AUTO_STATUS_SEEN: true,
  AUTO_REACT: true,
  AUTO_VOICE_REPLY: true,

  // AUTO REACT EMOJI
  REACT_EMOJI: "❤️",

  // SESSION
  SESSION_ID: process.env.SESSION_ID || "",

  // BOT SETTINGS
  MODE: "public",

  // FOOTER
  FOOTER: "❤️ Thanks For Using FLAZY MD",

  // OWNER MESSAGE
  OWNER_TEXT: `
👑 OWNER DETAILS

• Name : RUKSHAN
• Number : 94742420974
• Bot : FLAZY MD
`,

  // MENU TEXT
  MENU: `
╔═══〔 FLAZY MD MENU 〕═══╗

👑 Owner : RUKSHAN

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
│ • .owner
╰───────────────

❤️ Thanks For Using FLAZY MD
`
};
