import React, { useState, useRef } from 'react';

const VideoPlayer = ({ src, poster, title }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVideoEnded = () => {
        setIsPlaying(false); // Reset play state when video ends
    };

    return (
        <div className="video-player">
            <h2>{title}</h2>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                width="100%"
                controls={false}
                onEnded={handleVideoEnded}
            />
            <div className="controls">
                <button onClick={handlePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
            <style jsx>{`
        .video-player {
          max-width: 800px;
          margin: 0 auto;
        }
        .controls {
          text-align: center;
          margin-top: 10px;
        }
        button {
          padding: 10px 20px;
          background-color: #f00;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
        </div>
    );
};

export default VideoPlayer;
