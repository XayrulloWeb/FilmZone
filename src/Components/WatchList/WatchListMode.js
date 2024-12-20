import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";


const WatchListMode = () => {
    const [watchlist, setWatchlist] = useState([]);


    const history = useHistory();
    const handleMovieClick = (id) => {
     
        history.push(`/movie/${id}`);  // Используем history.push вместо navigate
    };


    useEffect(() => {
        // Get the movie list from localStorage
        const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        setWatchlist(savedWatchlist);
    }, []);


    return (
        <div className="watchlist-page">
            <div className="container">
                <h1>Your Watchlist</h1>
                {watchlist.length === 0 ? (
                    <p>No movies in your watchlist yet.</p>
                ) : (
                    <ul>
                        {watchlist.map((movie) => (
                            <li
                                key={movie.id}
                                className="card u-clearfix"
                                style={{
                                    background: `url('https://image.tmdb.org/t/p/w500${movie.backdrop_path}') no-repeat center center`,
                                    backgroundSize: 'cover',
                                    height: '400px', // Set a height for the card
                                    position: 'relative', // Needed for absolute positioning of inner elements
                                    color: '#fff', // Text color for visibility
                                    filter: ''
                                }}
                            >
                                <div className="card-media">
                                    <img
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'path_to_default_image'}
                                        alt={movie.title || 'No title available'}
                                        className="card-media-img"
                                    />
                                    <h2 className="card-body-heading">{movie.title}</h2>
                                    <p>{movie.release_date}</p>
                                    <div className="card-media-preview u-flex-center">
                                        <svg fill="#ffffff" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg" onClick={() => handleMovieClick(movie.id)}>
                                            <path d="M8 5v14l11-7z"/>
                                            <path d="M0 0h24v24H0z" fill="none"/>
                                        </svg>
                                    </div>
                                    <span className="card-media-tag card-media-tag-brown">{movie.genre}</span>
                                </div>

                                <div className="card-body">
                                    <div className="card-body-options">


                                    </div>
                                    <ul className="card-body-stars u-clearfix">
                                        {/* Rating stars */}
                                    </ul>
                                    <a href="#/" className="card-button card-button-cta">
                                        Buy $12.99
                                    </a>
                                    <a href={`/movie/${movie.id}`} className="card-button card-button-link">
                                        More info
                                        <span className="card-button-icon">
                                            <svg fill="#9C948A" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0h24v24H0z" fill="none"/>
                                                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                                            </svg>
                                        </span>
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default WatchListMode;
