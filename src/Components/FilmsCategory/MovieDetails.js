import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import rating from "../../assets/Logo's/Rating.png";
import {useHistory} from "react-router-dom";
function MovieDetails() {
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
    const settings2 = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 7.7,
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
    const [similarMovies, setSimilarMovies] = useState([]);

    const { id } = useParams();
    const history = useHistory();

    const [movieDetails, setMovieDetails] = useState(null);
    const [video, setVideo] = useState(null);
    const [providers, setProviders] = useState(null);
    const [cast, setCast] = useState([]);
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
    useEffect(() => {
        // Fetch movie details
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=bc25b198a01dce97d9fbeb1bada0f375`)
            .then(res => res.json())
            .then(data => setMovieDetails(data))
            .catch(err => console.error("Error fetching movie details: ", err));



        // Fetch video (e.g., trailer)
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=bc25b198a01dce97d9fbeb1bada0f375`)
            .then(res => res.json())
            .then(data => {
                const trailer = data.results.find(video => video.type === 'Trailer');
                setVideo(trailer ? `https://www.youtube.com/embed/${trailer.key}` : null);
            })
            .catch(err => console.error("Error fetching movie video: ", err));

        // Fetch streaming providers
        fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=bc25b198a01dce97d9fbeb1bada0f375`)
            .then(res => res.json())
            .then(data => setProviders(data.results))
            .catch(err => console.error("Error fetching movie providers: ", err));

        // Fetch cast information
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=bc25b198a01dce97d9fbeb1bada0f375`)
            .then(res => res.json())
            .then(data => {
                const topCast = data.cast.slice(0, 15);
                setCast(topCast);
            })
            .catch(err => console.error("Error fetching movie cast: ", err));

        // Fetch similar movies
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=bc25b198a01dce97d9fbeb1bada0f375`)
            .then(res => res.json())
            .then(data => setSimilarMovies(data.results))
            .catch(err => console.error("Error fetching similar movies: ", err));

    }, [id]);
    const handleMovieClick = (id) => {
        history.push(`/movie/${id}`);  // Используем history.push вместо navigate
    };
    const getGenres = (genreIds) => {
        return genreIds.map(id => genreMap[id]).slice(0, 3).join(', ');  // Отображаем до 3 жанров
    };

    if (!movieDetails) return <div>Загрузка...</div>;

    return (
        <div className="MovieDetails">
            <div className="container">
                <div className="MovieDetails_start">

                    <div className="MovieActyors">
                        <h4 className='MovieText'>Главные актёры</h4>
                        <ul>
                            <Slider {...settings2}>
                                {cast.map(actor => (
                                    <li key={actor.cast_id}>
                                        <div className="MovieActyors-content">
                                            {actor.profile_path ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                                    alt={actor.name}
                                                />
                                            ) : (
                                                <div style={{}}></div>
                                            )}
                                            <div className="MovieActyors-name">
                                                <p>{actor.name}</p>
                                                <span>{actor.character}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </Slider>
                        </ul>
                    </div>
                    <div className="MovieContent">
                        {video ? (
                            <iframe  height="315" src={video} title="Трейлер фильма" frameBorder="0"
                                     allowFullScreen></iframe>
                        ) : (
                            <p>Трейлер отсутствует</p>
                        )}
                        <div className="details">
                            <h1 className='MovieText'>{movieDetails.title}</h1>
                            <div className="ratings">
                                <span className="rating">{movieDetails.vote_average}
                                    <i className="fa-brands fa-imdb"></i></span>
                                <span className="age">{movieDetails.adult ? "18+" : "PG-13"}</span>
                            </div>
                            <p><strong>Год:</strong> {movieDetails.release_date.split('-')[0]}</p>
                            <p><strong>Страна:</strong> {movieDetails.production_countries.map(country => country.name).join(', ')}</p>
                            <p><strong>Жанр:</strong> {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                            <p><strong>Описание:</strong> {movieDetails.overview}</p>
                            <p><strong>Актёры:</strong> {cast.map(actor => actor.name).join(', ')}</p>
                        </div>
                    </div>

                    {/* Similar Movies Section */}
                    <div className="SimilarMovies">
                        <h4 className='MovieText'>Похожие фильмы</h4>
                        <Slider {...settings}>
                            {similarMovies.map(movie => (
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
                            ))}
                        </Slider>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
