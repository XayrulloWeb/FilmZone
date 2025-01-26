import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import gsap from 'gsap'; // Import gsap directly
import Watchlist from "../../Components/WatchList/WatchList";
import { useTranslation } from "react-i18next";

function Banner({ handleDownload, handleShare, handleLike, liked }) {
    const [movie, setMovie] = useState(null);
    const apiKey = 'bc25b198a01dce97d9fbeb1bada0f375';
    const history = useHistory();
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

    const handleMovieClick = (id) => {
        history.push(`/movie/${id}`);
    };

    const gsapAnimation = () => {
        gsap.fromTo(
            ".banner",
            { opacity: 0 },
            { opacity: 1, duration: 1.5, ease: "power2.out" }
        );

        gsap.fromTo(
            ".banner_info h1",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );

        gsap.fromTo(
            ".genre span",
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
        );

        gsap.fromTo(
            ".banner_btns .btn_watch button",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "bounce.out", stagger: 0.3 }
        );

        gsap.fromTo(
            ".banner_links-btns button",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
        );
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const language = i18n.language;  // Получаем текущий язык
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}`);
                const result = await response.json();
                const randomIndex = Math.floor(Math.random() * result.results.length);
                setMovie(result.results[randomIndex]);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchMovie();
    }, [i18n.language]);

    useEffect(() => {
        if (movie) {
            gsapAnimation(); // Trigger animation after fetching the movie
        }
    }, [movie]);

    const getGenres = (genreIds) => {
        return genreIds.map(id => genreMap[id]).slice(0, 3).join(', ');  // Display up to 3 genres
    };

    // Fallback image if poster_path is not available
    const getPosterUrl = (path) => {
        const fallbackImage = 'https://via.placeholder.com/500x750?text=No+Image';  // Fallback image
        return path ? `https://image.tmdb.org/t/p/original${path}` : fallbackImage;
    };

    if (!movie) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className='banner' style={{
            background: `url('${getPosterUrl(movie.poster_path)}') no-repeat center center / cover`,
            height: '100vh',
            overflow: 'hidden',
            backgroundAttachment: 'fixed',
            borderImage: 'fill 0 linear-gradient(#0001, #000)'
        }}>
            <div className="container">
                <div className="banner_start">
                    <div className="banner_info">
                        <div className="genre">
                            <span>{getGenres(movie.genre_ids)}</span>
                        </div>
                        <h1>{movie.title}</h1>
                        <div className="banner_btns">
                            <div className="btn_watch">
                                <button onClick={() => handleMovieClick(movie.id)} key={movie.id} className="btn-main">
                                    <i className="fa-solid fa-circle-play"></i>
                                    {t('banner.continue')}
                                </button>
                                <Watchlist movieDetails={movie} />
                            </div>
                        </div>
                    </div>
                    <div className="banner_links">
                        <div className="banner_links-btns">
                            <button onClick={handleDownload}><i className="fa-solid fa-download"></i>  {t('banner.download')}</button>
                            <button onClick={handleShare}><i className="fa-solid fa-share"></i>  {t('banner.share')}</button>
                            <button onClick={handleLike}>
                                <i className={liked ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"}></i>
                                {liked ? t('banner.liked') : t('banner.like')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
