import React from 'react';
import Slider from "react-slick";
import rating from "../../../assets/Logo's/Rating.png";
import { getImageUrl } from "../../../utils/helpers";

const SimilarMoviesSlider = ({ title = "Похожие фильмы", movies, settings, handleMovieClick, getGenres }) => {
    if (!movies || movies.length === 0) return null;

    return (
        <div className="SimilarMovies">
            <h4 className="MovieText">{title}</h4>
            <Slider {...settings}>
                {movies.map(movie => (
                    <div className="MovieBox" onClick={() => handleMovieClick(movie.id)} key={movie.id}>
                        <div className="MovieBox-img">
                            <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                        </div>
                        <div className="MovieBox-name">
                            <h3>{movie.title}</h3>
                            <div className="MovieBox-about">
                                <div className="MovieBox-rating">
                                    <img src={rating} alt="rating" />
                                    <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
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
