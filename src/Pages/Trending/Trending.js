import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../assets/Style/style.css";
import "../../assets/Style/tmdb-pages.css";
import MovieCard from "../../Components/MovieCard/MovieCard";
import tmdbService from "../../services/tmdbService";

function Trending() {
    const { t, i18n } = useTranslation();
    const [movies, setMovies] = useState([]);
    const [timeWindow, setTimeWindow] = useState('week');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrending(timeWindow);
    }, [timeWindow, i18n.language]);

    const fetchTrending = async (window) => {
        setLoading(true);
        try {
            const results = await tmdbService.getTrending(window, i18n.language);
            setMovies(results);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching trending movies:", error);
            setLoading(false);
        }
    };

    return (
        <div style={{ background: '#000', minHeight: '100vh', padding: '100px 0' }}>
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">
                        <i className="fa-solid fa-fire" style={{ color: 'var(--back-main)', marginRight: '15px' }}></i>
                        {t('pages.trending.title')}
                    </h1>
                    <div className="toggle-buttons">
                        <button
                            onClick={() => setTimeWindow('day')}
                            className={`toggle-btn ${timeWindow === 'day' ? 'active' : ''}`}
                        >
                            <span>{t('pages.trending.today')}</span>
                        </button>
                        <button
                            onClick={() => setTimeWindow('week')}
                            className={`toggle-btn ${timeWindow === 'week' ? 'active' : ''}`}
                        >
                            <span>{t('pages.trending.thisWeek')}</span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="loader">{t('loading')}</div>
                ) : (
                    <div className="movies-grid">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Trending;
