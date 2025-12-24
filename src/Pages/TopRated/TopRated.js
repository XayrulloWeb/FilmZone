import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../assets/Style/style.css";
import "../../assets/Style/tmdb-pages.css";
import MovieCard from "../../Components/MovieCard/MovieCard";
import tmdbService from "../../services/tmdbService";

function TopRated() {
    const { t, i18n } = useTranslation();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        fetchTopRated();
    }, [page, i18n.language]);

    const fetchTopRated = async () => {
        if (page === 1) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }

        try {
            const results = await tmdbService.getTopRated(i18n.language, page);
            setMovies(prev => page === 1 ? results : [...prev, ...results]);
            setLoading(false);
            setLoadingMore(false);
        } catch (error) {
            console.error("Error fetching top rated movies:", error);
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <div style={{ background: '#000', minHeight: '100vh', padding: '100px 0' }}>
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">
                        <i className="fa-solid fa-star" style={{ color: '#FFD700', marginRight: '15px' }}></i>
                        {t('pages.topRated.title')}
                    </h1>
                </div>

                {loading ? (
                    <div className="loader">{t('loading')}</div>
                ) : (
                    <>
                        <div className="movies-grid">
                            {movies.map((movie) => (
                                <MovieCard key={`${movie.id}-${page}`} movie={movie} />
                            ))}
                        </div>

                        <div className="load-more-container">
                            <button
                                onClick={loadMore}
                                className="load-more-btn"
                                disabled={loadingMore}
                            >
                                {loadingMore ? t('loading') : t('pages.topRated.loadMore')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default TopRated;
