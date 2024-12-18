import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ videoUrl }) => {
  if (!videoUrl || videoUrl === "Coming soon") {
    return (
      <div className="video-placeholder">
        <p>Video walkthrough coming soon!</p>
      </div>
    );
  }

  // Extract video ID from YouTube URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-container">
      <iframe
        src={embedUrl}
        title="Automation Walkthrough"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
