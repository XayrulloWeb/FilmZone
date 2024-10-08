import React from 'react';
import Slider from "react-slick";

const SimilarMoviesSlider = ({ similarMovies, settings, handleMovieClick, getGenres }) => {
    return (
        <div className="SimilarMovies">
            <h4 className="MovieText">Похожие фильмы</h4>
            <Slider {...settings}>
                {similarMovies.map(movie => (
                    <div className="MovieBox" onClick={() => handleMovieClick(movie.id)} key={movie.id}>
                        <div className="MovieBox-img">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        </div>
                        <div className="MovieBox-name">
                            <h3>{movie.title}</h3>
                            <div className="MovieBox-about">
                                <div className="MovieBox-rating">
                                    <img src="/path/to/rating.png" alt="rating" />
                                    <p>{movie.vote_average}</p>
                                </div>
                                <div className="MovieBox-category">
                                    <p>| {getGenres(movie.genre_ids)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SimilarMoviesSlider;
