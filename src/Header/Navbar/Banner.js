import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import gsap from 'gsap'; // Импортируйте gsap напрямую
import Watchlist from "../../Components/WatchList/WatchList";

function Banner({ handleDownload, handleShare, handleLike, liked }) {
    const [movie, setMovie] = useState(null);
    const apiKey = 'bc25b198a01dce97d9fbeb1bada0f375';
    const history = useHistory();

    const handleMovieClick = (id) => {
        history.push(`/movie/${id}`);
    };

    const gsapAnimation = () => {
        gsap.fromTo(
            ".banner",
            { opacity: 0 },
            { opacity: 1, duration: 1.5, ease: "power2.out" } // Плавное появление фона
        );

        gsap.fromTo(
            ".banner_info h1",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" } // Плавное появление заголовка
        );

        gsap.fromTo(
            ".genre span",
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" } // Появление жанра
        );

        gsap.fromTo(
            ".banner_btns .btn_watch button",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "bounce.out", stagger: 0.3 } // Появление кнопок с эффектом увеличения
        );

        gsap.fromTo(
            ".banner_links-btns button",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" } // Анимация кнопок
        );
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
                const result = await response.json();
                const randomIndex = Math.floor(Math.random() * result.results.length);
                setMovie(result.results[randomIndex]);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchMovie();
    }, []);

    useEffect(() => {
        if (movie) {
            gsapAnimation(); // Запуск анимации после получения данных о фильме
        }
    }, [movie]); // Запуск анимации, когда состояние movie обновляется

    if (!movie) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className='banner' style={{
            background: `url('https://image.tmdb.org/t/p/original${movie.poster_path}') no-repeat center center / cover`,
            height: '100vh',
            overflow: 'hidden',
            backgroundAttachment: 'fixed',
            borderImage: 'fill 0 linear-gradient(#0001, #000)'
        }}>
            <div className="container">
                <div className="banner_start">
                    <div className="banner_info">
                        <div className="genre">
                            <span>{movie.genre_ids.join(', ')}</span>
                        </div>
                        <h1>{movie.title}</h1>
                        <div className="banner_btns">
                            <div className="btn_watch">
                                <button onClick={() => handleMovieClick(movie.id)} key={movie.id} className="btn-main">
                                    <i className="fa-solid fa-circle-play"></i>
                                    Continue Watching
                                </button>
                                <Watchlist movieDetails={movie} />
                            </div>
                        </div>
                    </div>
                    <div className="banner_links">
                        <div className="banner_links-btns">
                            <button onClick={handleDownload}><i className="fa-solid fa-download"></i> Download</button>
                            <button onClick={handleShare}><i className="fa-solid fa-share"></i> Share</button>
                            <button onClick={handleLike}>
                                <i className={liked ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"}></i> {liked ? 'Liked' : 'Like'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
