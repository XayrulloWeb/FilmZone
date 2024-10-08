import React, { useState, useEffect } from 'react';

// Utility function for handling localStorage interactions
const updateWatchlist = (movieDetails, add) => {
    const existingWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const isAlreadyInWatchlist = existingWatchlist.some(movie => movie.id === movieDetails.id);

    if (add && !isAlreadyInWatchlist) {
        existingWatchlist.push(movieDetails);
        localStorage.setItem('watchlist', JSON.stringify(existingWatchlist));
        return 'added';
    } else if (!add && isAlreadyInWatchlist) {
        const updatedWatchlist = existingWatchlist.filter(movie => movie.id !== movieDetails.id);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        return 'removed';
    }
    return null;
};

const Watchlist = ({ movieDetails }) => {
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        const isMovieInList = savedWatchlist.some(movie => movie.id === movieDetails.id);
        setIsInWatchlist(isMovieInList);
    }, [movieDetails]);

    const handleWatchlistToggle = () => {
        updateWatchlist(movieDetails, !isInWatchlist);
        setIsInWatchlist(!isInWatchlist);
    };

    return (
        <button className="btn-watchlist" onClick={handleWatchlistToggle}>
            <i className={isInWatchlist ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
            {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </button>
    );
};

export default Watchlist;
