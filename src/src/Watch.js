// src/Watch.js
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Watch() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const [video, setVideo] = useState(null);

  useEffect(() => {
    // Fetch video details from our Netlify Function
    axios.get(`/.netlify/functions/fetchVideo?videoId=${videoId}`)
      .then((res) => setVideo(res.data))
      .catch((err) => console.error(err));
  }, [videoId]);

  if (!video) return <div>Loading...</div>;

  return (
    <div className="watch-page">
      <div className="video-container">
        {/* Embed YouTube's player WITH ads */}
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <h2>{video.title}</h2>
        <p>{video.description}</p>
      </div>
    </div>
  );
}

export default Watch;
