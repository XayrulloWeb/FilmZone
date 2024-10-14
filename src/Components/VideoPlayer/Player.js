import React from 'react';
import VideoPlayer from './VideoPlayer';

const Player = () => {
    return (
        <div>
            <h1>Online Movie Example</h1>
            <VideoPlayer
                src="https://www.w3schools.com/html/mov_bbb.mp4"  // Internet video URL
                poster="https://www.w3schools.com/html/pic_trulli.jpg" // Poster image
                title="Big Buck Bunny"
            />
        </div>
    );
};

export default Player;
