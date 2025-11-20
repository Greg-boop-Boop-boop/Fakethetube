// src/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch trending videos from our Netlify Function
    axios.get('/.netlify/functions/fetchTrending')
      .then((res) => setVideos(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="youtube-clone">
      <header className="header">
        <div className="logo">FakeTheTube</div>
        <input type="text" placeholder="Search" className="search-bar" />
      </header>
      <div className="video-grid">
        {videos.map((video) => (
          <a key={video.id} href={`/watch?v=${video.id}`} className="video-card">
            <img src={video.thumbnail} alt={video.title} />
            <h3>{video.title}</h3>
            <p>{video.channelTitle}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Home;
