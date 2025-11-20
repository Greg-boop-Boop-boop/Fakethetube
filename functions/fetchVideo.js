// functions/fetchVideo.js
const axios = require('axios');

exports.handler = async (event) => {
  const { videoId } = event.queryStringParameters;
  const API_KEY = process.env.YOUTUBE_API_KEY;

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const video = response.data.items[0];

    return {
      statusCode: 200,
      body: JSON.stringify({
        title: video.snippet.title,
        description: video.snippet.description,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch video details" }),
    };
  }
};
