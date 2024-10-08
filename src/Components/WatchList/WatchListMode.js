// WatchListMode.js
import React, { useState, useEffect } from 'react';

const WatchListMode = () => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        // Получаем список фильмов из localStorage
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
                            <li key={movie.id} className="card u-clearfix">
                                <div className="card-media">
                                    <img
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'path_to_default_image'}
                                        alt={movie.title || 'No title available'}
                                        className="card-media-img"
                                    />

                                    <div className="card-media-preview u-flex-center">
                                        <svg fill="#ffffff" height="18" viewBox="0 0 24 24" width="18"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 5v14l11-7z"/>
                                            <path d="M0 0h24v24H0z" fill="none"/>
                                        </svg>
                                    </div>
                                    <span className="card-media-tag card-media-tag-brown">{movie.genre}</span>
                                </div>

                                <div className="card-body">
                                    <h2 className="card-body-heading">{movie.title}</h2>
                                    <p>{movie.release_date}</p>
                                    <div className="card-body-options">
                                        <div className="card-body-option card-body-option-favorite">
                                            <svg fill="#9C948A" height="26" viewBox="0 0 24 24" width="26"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0h24v24H0z" fill="none"/>
                                                <path
                                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="card-body-option card-body-option-share">
                                            <svg fill="#9C948A" height="24" viewBox="0 0 24 24" width="24"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0h24v24H0z" fill="none"/>
                                                <path
                                                    d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <ul className="card-body-stars u-clearfix">
                                        {/* Rating stars */}
                                    </ul>
                                    <a href="#/" className="card-button card-button-cta">
                                        Buy $12.99
                                    </a>
                                    <a href="#/" className="card-button card-button-link">
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
