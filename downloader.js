const axios = require("axios");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const fs = require("fs");

async function facebookDownloader(url) {
  try {

    return {
      status: true,
      creator: "FLAZY MD",
      result: {
        url: url,
        title: "Facebook Video"
      }
    };

  } catch (err) {
    return {
      status: false,
      message: "Facebook download failed"
    };
  }
}

async function tiktokDownloader(url) {
  try {

    return {
      status: true,
      creator: "FLAZY MD",
      result: {
        url: url,
        title: "TikTok Video"
      }
    };

  } catch (err) {
    return {
      status: false,
      message: "TikTok download failed"
    };
  }
}

async function youtubeVideo(url, output = "video.mp4") {
  return new Promise((resolve, reject) => {

    try {

      const stream = ytdl(url, {
        filter: "audioandvideo"
      }).pipe(fs.createWriteStream(output));

      stream.on("finish", () => {
        resolve(output);
      });

    } catch (err) {
      reject(err);
    }

  });
}

async function youtubeAudio(url, output = "audio.mp3") {
  return new Promise((resolve, reject) => {

    try {

      const stream = ytdl(url, {
        filter: "audioonly"
      }).pipe(fs.createWriteStream(output));

      stream.on("finish", () => {
        resolve(output);
      });

    } catch (err) {
      reject(err);
    }

  });
}

async function searchSong(query) {
  try {

    const search = await ytSearch(query);

    const video = search.videos[0];

    return {
      title: video.title,
      url: video.url,
      duration: video.timestamp,
      views: video.views,
      author: video.author.name
    };

  } catch (err) {
    return null;
  }
}

async function apkDownloader(appName) {
  try {

    return {
      status: true,
      creator: "FLAZY MD",
      result: {
        app: appName,
        link: "https://apkpure.com/"
      }
    };

  } catch (err) {
    return {
      status: false,
      message: "APK download failed"
    };
  }
}

module.exports = {
  facebookDownloader,
  tiktokDownloader,
  youtubeVideo,
  youtubeAudio,
  searchSong,
  apkDownloader
};
