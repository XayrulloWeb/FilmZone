import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import rating from "../../assets/Logo's/Rating.png";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

function AnimeMovies(props) {
    const { t, i18n } = useTranslation();

    const genreMap = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    };
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        autoplay:true,
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
    const [animeMovies, setAnimeMovies] = useState([]);

    const history = useHistory();

    const handleMovieClick = (id) => {
        history.push(`/movie/${id}`);  // Используем history.push вместо navigate
    };
    useEffect(() => {
        getAnimeMovies(i18n.language);
    }, [i18n.language]);

    const getAnimeMovies = (language) => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bc25b198a01dce97d9fbeb1bada0f375&with_genres=16&language=${language}`)
            .then(res => res.json())
            .then(json => setAnimeMovies(json.results))
            .catch(err => console.error("Error fetching anime movies: ", err));
    };


    useEffect(() => {
        getAnimeMovies(i18n.language);
    }, [i18n.language]);

    const getGenres = (genreIds) => {
        return genreIds.map(id => genreMap[id]).slice(0, 3).join(', ');  // Отображаем до 3 жанров
    };
    return (
            <div className="MovieAction_start">
                <div className="MovieAction_text">
                    <h2 className='MovieText'>{t('movietext.anime')}</h2>
                </div>
                <div className="MovieAction_row">
                    <Slider {...settings}>
                        {
                            animeMovies.map(movie => {
                                return (
                                    <div className="MovieBox" onClick={() => handleMovieClick(movie.id)} key={movie.id}>
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
                                                    <p>| {getGenres(movie.genre_ids)}</p>
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
    );
}

export default AnimeMovies;