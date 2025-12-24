import React from 'react';
import rating from "../../assets/Logo's/Rating.png";
import { useHistory } from "react-router-dom";
import { getGenreNames, getImageUrl } from "../../utils/helpers";

const MovieCard = ({ movie }) => {
    const history = useHistory();

    const handleMovieClick = () => {
        history.push(`/movie/${movie.id}`);
    };

    return (
        <div className="MovieBox" onClick={handleMovieClick} style={{ width: '100%' }}> {/* Custom width for grid */}
            <div className="MovieBox-img">
                <img
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                />
            </div>
            <div className="MovieBox-name">
                <h3>{movie.title}</h3>
                <div className="MovieBox-about">
                    <div className="MovieBox-rating">
                        <img src={rating} alt="rating" />
                        <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                    <div className="MovieBox-category">
                        <p>| {getGenreNames(movie.genre_ids)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
