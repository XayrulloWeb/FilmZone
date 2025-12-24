import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../assets/Style/style.css";
import "../../assets/Style/tmdb-pages.css";
import MovieCard from "../../Components/MovieCard/MovieCard";
import tmdbService from "../../services/tmdbService";

function NowPlaying() {
    const { t, i18n } = useTranslation();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const results = await tmdbService.getNowPlaying(i18n.language);
                setMovies(results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching now playing movies:", error);
                setLoading(false);
            }
        };

        fetchNowPlaying();
    }, [i18n.language]);

    return (
        <div style={{ background: '#000', minHeight: '100vh', padding: '100px 0' }}>
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">
                        <i className="fa-solid fa-film" style={{ color: 'var(--back-main)', marginRight: '15px' }}></i>
                        {t('pages.nowPlaying.title')}
                    </h1>
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

export default NowPlaying;
