// functions/fetchTrending.js
const axios = require('axios');

exports.handler = async (event) => {
  // Use YouTube's API to fetch trending videos
  const API_KEY = process.env.YOUTUBE_API_KEY; // Add this to Netlify's env vars
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=20&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const videos = response.data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(videos),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch videos" }),
    };
  }
};
