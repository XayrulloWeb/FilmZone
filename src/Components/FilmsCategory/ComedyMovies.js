import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import rating from "../../assets/Logo's/Rating.png";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import tmdbService from "../../services/tmdbService";
import { getGenreNames, getImageUrl } from "../../utils/helpers";

function ComedyMovies(props) {
    const { t, i18n } = useTranslation();
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        autoplay: true,
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
                    initialSlide: 2,
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
                    slidesToShow: 3.,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2.3,
                    slidesToScroll: 1,
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
                    dots: true
                }
            },
            {
                breakpoint: 430,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                }
            }
        ]
    };
    const [comedyMovies, setComedyMovies] = useState([]);

    const history = useHistory();

    useEffect(() => {
        getComedyMovies(i18n.language);
    }, [i18n.language]);

    const handleMovieClick = (id) => {
        history.push(`/movie/${id}`);
    };

    const getComedyMovies = async (language) => {
        try {
            const results = await tmdbService.discoverByGenre(35, language);
            setComedyMovies(results);
        } catch (err) {
            console.error("Error fetching comedy movies: ", err);
        }
    };

    return (
        <div>
            <div className="MovieAction_start">
                <div className="MovieAction_text">
                    <h2 className='MovieText'>{t('movietext.comedy')}</h2>
                </div>
                <div className="MovieAction_row">
                    <Slider  {...settings}>
                        {
                            comedyMovies.map(movie => {
                                return (
                                    <div className="MovieBox" onClick={() => handleMovieClick(movie.id)} key={movie.id}>
                                        <div className="MovieBox-img">
                                            <img src={getImageUrl(movie.poster_path)}
                                                alt={movie.title} />
                                        </div>
                                        <div className="MovieBox-name">
                                            <h3>{movie.title}</h3>
                                            <div className="MovieBox-about">
                                                <div className="MovieBox-rating">
                                                    <img src={rating} alt="rating" />
                                                    <p>{movie.vote_average}</p>
                                                </div>
                                                <div className="MovieBox-category">
                                                    <p>| {getGenreNames(movie.genre_ids)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default ComedyMovies;