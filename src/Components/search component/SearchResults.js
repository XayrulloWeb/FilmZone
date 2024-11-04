import React from 'react';
import Slider from "react-slick";
import {useHistory, useLocation} from 'react-router-dom';
import rating from "../../assets/Logo's/Rating.png";

const SearchResults = () => {
    const location = useLocation();
    const { results } = location.state || [];
    const history = useHistory();

    const handleMovieClick = (id) => {
        history.push(`/movie/${id}`);  // Используем history.push вместо navigate
    };

    console.log(results);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5.4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4.7,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4.3,
                    slidesToScroll: 2,
                    dots: true
                }
            },
            {
                breakpoint: 1240,
                settings: {
                    slidesToShow: 3.4,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2.3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2.1,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1.8,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 430,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    };

    return (
        <div className='MovieAction_start'>
            <div className="container">
                <div className="MovieAction_text">
                    <h2 className='MovieText'>Search Movies for you</h2>
                </div>
                <div className="MovieAction_row">
                    <Slider {...settings}>
                        {results && results.length > 0 ? (
                            results.map((movie) => (
                                <div className='MovieBox' key={movie.id} onClick={() => handleMovieClick(movie.id)} key={movie.id}>
                                    <div className="MovieBox-img">
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                             alt={movie.title}/>
                                    </div>
                                    <div className="MovieBox-name">
                                        <h3>{movie.title}</h3>
                                        <div className="MovieBox-about">
                                            <div className="MovieBox-rating">
                                                <img src={rating} alt="rating"/>
                                                <p>{movie.vote_average}</p>
                                            </div>
                                            <div className="MovieBox-category">
                                                {/* Add any categories or genres here */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
