import React, { useState, useEffect } from 'react';
import {useTranslation} from "react-i18next";
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
    const { t, i18n } = useTranslation();

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
            {isInWatchlist ? t('banner.remove_from_watchlist') : t('banner.add_to_watchlist')} {/* Переводы */}
        </button>
    );
};

export default Watchlist;
