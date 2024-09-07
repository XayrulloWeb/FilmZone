import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

import rating from "../../../assets/Logo's/Rating.png";

// Маппинг жанров с их идентификаторами
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

function ActionMovie(props) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4.4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [horrorMovies, setHorrorMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [animeMovies, setAnimeMovies] = useState([]);
    const [sciFiMovies, setSciFiMovies] = useState([]);

    const history = useHistory();

    const handleMovieClick = (id) => {
        history.push(`/movie/${id}`);  // Используем history.push вместо navigate
    };
    // Получаем текущую дату для фильтрации по месяцам
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Запрос для фильмов ужасов
    const getHorrorMovies = () => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=bc25b198a01dce97d9fbeb1bada0f375&with_genres=27')
            .then(res => res.json())
            .then(json => setHorrorMovies(json.results))
            .catch(err => console.error("Error fetching horror movies: ", err));
    }

    // Запрос для фильмов комедии
    const getComedyMovies = () => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=bc25b198a01dce97d9fbeb1bada0f375&with_genres=35')
            .then(res => res.json())
            .then(json => setComedyMovies(json.results))
            .catch(err => console.error("Error fetching comedy movies: ", err));
    }

    // Запрос для Топ за месяц
    const getTopMovies = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bc25b198a01dce97d9fbeb1bada0f375&sort_by=popularity.desc&primary_release_year=${currentYear}&primary_release_date.gte=${currentYear}-${currentMonth}-01`)
            .then(res => res.json())
            .then(json => setTopMovies(json.results))
            .catch(err => console.error("Error fetching top movies: ", err));
    }

    // Запрос для фильмов аниме
    const getAnimeMovies = () => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=bc25b198a01dce97d9fbeb1bada0f375&with_genres=16')
            .then(res => res.json())
            .then(json => setAnimeMovies(json.results))
            .catch(err => console.error("Error fetching anime movies: ", err));
    }

    // Запрос для фильмов фантастики
    const getSciFiMovies = () => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=bc25b198a01dce97d9fbeb1bada0f375&with_genres=878')
            .then(res => res.json())
            .then(json => setSciFiMovies(json.results))
            .catch(err => console.error("Error fetching sci-fi movies: ", err));
    }

    useEffect(() => {
        getHorrorMovies();
        getComedyMovies();
        getTopMovies();
        getAnimeMovies();
        getSciFiMovies();
    }, []);

    const getGenres = (genreIds) => {
        return genreIds.map(id => genreMap[id]).slice(0, 3).join(', ');  // Отображаем до 3 жанров
    };

    return (
        <div className="MovieAction">
            <div className="container">

                {/* Блок фильмов ужасов */}


                {/* Блок фильмов комедии */}

                {/* Блок Топ за месяц */}
                <div className="MovieAction_start" style={{ marginTop: '50px' }}>
                    <div className="MovieAction_text">
                        <h2 className='MovieText'>Top Movies this Month</h2>
                    </div>
                    <div className="MovieAction_row">
                        <Slider {...settings}>
                            {
                                topMovies.map(movie => {
                                    return (
                                        <div className="MovieBox" key={movie.id}>
                                            <div className="MovieBox-img">
                                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
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

                {/* Блок аниме */}
                <div className="MovieAction_start" style={{ marginTop: '50px' }}>
                    <div className="MovieAction_text">
                        <h2 className='MovieText'>Anime Movies for you</h2>
                    </div>
                    <div className="MovieAction_row">
                        <Slider {...settings}>
                            {
                                animeMovies.map(movie => {
                                    return (
                                        <div className="MovieBox" key={movie.id}>
                                            <div className="MovieBox-img">
                                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
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

                {/* Блок фантастики */}
                <div className="MovieAction_start" style={{ marginTop: '50px' }}>
                    <div className="MovieAction_text">
                        <h2 className='MovieText'>Sci-Fi Movies for you</h2>
                    </div>
                    <div className="MovieAction_row">
                        <Slider {...settings}>
                            {
                                sciFiMovies.map(movie => {
                                    return (
                                        <div className="MovieBox" key={movie.id}>
                                            <div className="MovieBox-img">
                                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
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

            </div>
        </div>
    );
}

export default ActionMovie;
