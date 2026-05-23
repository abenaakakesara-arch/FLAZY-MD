const fs = require("fs");
const path = require("path");

const SESSION_FOLDER = path.join(__dirname, "session");

// CREATE SESSION FOLDER
if (!fs.existsSync(SESSION_FOLDER)) {
  fs.mkdirSync(SESSION_FOLDER);
  console.log("✅ Session folder created");
}

// SAVE SESSION
function saveSession(fileName, data) {
  const filePath = path.join(SESSION_FOLDER, fileName);

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  );

  console.log(`✅ Session saved : ${fileName}`);
}

// LOAD SESSION
function loadSession(fileName) {
  const filePath = path.join(SESSION_FOLDER, fileName);

  if (!fs.existsSync(filePath)) {
    console.log("❌ Session file not found");
    return null;
  }

  const data = fs.readFileSync(filePath);

  return JSON.parse(data);
}

// DELETE SESSION
function deleteSession(fileName) {
  const filePath = path.join(SESSION_FOLDER, fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`🗑️ Session deleted : ${fileName}`);
  }
}

module.exports = {
  saveSession,
  loadSession,
  deleteSession,
  SESSION_FOLDER
};
