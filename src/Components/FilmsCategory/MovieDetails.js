import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import MovieDetailsBanner from "./MovieDetails/MovieDetailsBanner";
import MovieDetailsCastSlider from "./MovieDetails/MovieDetailsCastSlider";
import MovieDetailsInfo from "./MovieDetails/MovieDetailsInfo";
import SimilarMovieSlider from "./MovieDetails/SimilarMovieSlider";
import Loader from "../../Components/Loader/Loader"; // Assuming you have a Loader component
function MovieDetails() {
    const handleDownload = () => {
        if (video) {
            // Скачиваем трейлер, если он доступен
            const link = document.createElement('a');
            link.href = video; // Используем видео URL (например, YouTube)
            link.download = `${movieDetails.title}-trailer.mp4`; // Это предложит скачать как файл
            link.click();
        } else {
            alert('Видео для скачивания недоступно.');
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: movieDetails.title,
                text: `Посмотри этот фильм: ${movieDetails.title}`,
                url: window.location.href // Текущий URL страницы
            }).then(() => console.log('Успешно поделились!'))
                .catch(err => console.error('Ошибка при попытке поделиться: ', err));
        } else {
            alert('Функция поделиться недоступна на этом устройстве.');
        }
    };

    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        if (!liked) {
            // Можно сохранить "лайк" в localStorage или отправить запрос на сервер
            localStorage.setItem(`${movieDetails.id}-liked`, true);
        } else {
            localStorage.removeItem(`${movieDetails.id}-liked`);
        }
    };
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
                    slidesToShow: 6,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a network request
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);


    if (loading) {
        return <Loader />;  // Show loader while the app is loading
    }

    return (
        <div className="MovieDetails">
            <MovieDetailsBanner
                movieDetails={movieDetails}
                handleDownload={handleDownload}
                handleShare={handleShare}
                handleLike={handleLike}
                liked={liked}
            />
            <div className="container">
                <MovieDetailsCastSlider cast={cast} settings={settings2}/>
                <MovieDetailsInfo movieDetails={movieDetails} video={video} cast={cast}/>
                <SimilarMovieSlider
                    similarMovies={similarMovies}
                    settings={settings}
                    handleMovieClick={handleMovieClick}
                    getGenres={getGenres}
                />
            </div>
        </div>
    );
}

export default MovieDetails;
