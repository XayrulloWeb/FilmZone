import React, { useState, useEffect } from 'react';

function Banner() {
    const [movie, setMovie] = useState(null);
    const apiKey = 'bc25b198a01dce97d9fbeb1bada0f375';

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
                const result = await response.json();
                const randomIndex = Math.floor(Math.random() * result.results.length);
                setMovie(result.results[randomIndex]); // Устанавливаем случайный фильм
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMovie();
    }, []); // Вызываем один раз при монтировании компонента

    if (!movie) {
        return <p>Loading...</p>; // Показать сообщение о загрузке
    }

    return (
        <div className='banner' style={{
            background: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}') no-repeat center center / cover`,
            height: '100vh', // Задайте желаемую высоту
            border: 'none', // Удалите или измените border-image, если он не нужен
            overflow: 'hidden',
            backgroundAttachment: 'fixed', // Используйте camelCase для свойств стилей
        }}>
            <div className="container">
                <div className="banner_start">
                    <div className="banner_info">
                        <div className="genre">
                            <span>{movie.genre_ids.join(', ')}</span> {/* Здесь можно использовать API для получения названий жанров */}
                        </div>
                        <h1>{movie.title}</h1>
                        <div className="banner_btns">
                            <div className="btn_watch">
                                <button className="btn-main"><i className="fa-solid fa-circle-play"></i>
                                    Continue Watching
                                </button>
                                <button className='btn-watchlist'><i className="fa-regular fa-bookmark"></i> Add
                                    Watchlist
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="banner_links">
                        <div className="banner_links-btns">
                            <button><i className="fa-solid fa-download"></i> Download</button>
                            <button><i className="fa-solid fa-share"></i> Share</button>
                            <button><i className="fa-regular fa-thumbs-up"></i> Like</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
