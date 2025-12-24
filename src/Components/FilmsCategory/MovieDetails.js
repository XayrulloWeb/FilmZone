import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MovieDetailsBanner from './MovieDetails/MovieDetailsBanner';
import MovieDetailsCastSlider from './MovieDetails/MovieDetailsCastSlider';
import MovieDetailsInfo from './MovieDetails/MovieDetailsInfo';
import SimilarMovieSlider from './MovieDetails/SimilarMovieSlider';
import Loader from '../../Components/Loader/Loader';
import tmdbService from '../../services/tmdbService';
import { getGenreNames } from '../../utils/helpers';

function MovieDetails() {
    const { t, i18n } = useTranslation();
    const [movieDetails, setMovieDetails] = useState(null);
    const [videos, setVideos] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                // Fetch comprehensive movie details with current language
                const details = await tmdbService.getMovieDetails(id, i18n.language);
                setMovieDetails(details);

                // Extract videos (trailers, teasers, clips)
                if (details.videos?.results) {
                    const allVideos = details.videos.results;
                    setVideos(allVideos);

                    // Find the main trailer
                    const mainTrailer = allVideos.find(v => v.type === 'Trailer' && v.site === 'YouTube')
                        || allVideos.find(v => v.site === 'YouTube');
                    setTrailer(mainTrailer ? `https://www.youtube.com/embed/${mainTrailer.key}` : null);
                }

                // Extract cast and crew
                if (details.credits) {
                    setCast(details.credits.cast?.slice(0, 20) || []);
                    setCrew(details.credits.crew?.filter(person =>
                        ['Director', 'Producer', 'Writer', 'Screenplay'].includes(person.job)
                    ) || []);
                }

                // Extract reviews
                if (details.reviews?.results) {
                    setReviews(details.reviews.results.slice(0, 5));
                }

                // Extract similar and recommended
                if (details.similar?.results) {
                    setSimilarMovies(details.similar.results);
                }
                if (details.recommendations?.results) {
                    setRecommendedMovies(details.recommendations.results);
                }

                // Extract keywords
                if (details.keywords?.keywords) {
                    setKeywords(details.keywords.keywords.slice(0, 10));
                }

                // Check if liked
                const isLiked = localStorage.getItem(`${id}-liked`);
                setLiked(!!isLiked);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching movie data:", error);
                setLoading(false);
            }
        };

        fetchAllData();
    }, [id, i18n.language]); // Re-fetch when language changes

    const handleDownload = () => {
        if (trailer) {
            alert('Трейлеры невозможно скачать напрямую. Используйте сторонние сервисы.');
        } else {
            alert('Видео для скачивания недоступно.');
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: movieDetails.title,
                text: `${t('pages.movieDetails.checkOut')}: ${movieDetails.title}`,
                url: window.location.href
            }).then(() => console.log('Успешно поделились!'))
                .catch(err => console.error('Ошибка при попытке поделиться: ', err));
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Ссылка скопирована в буфер обмена!');
        }
    };

    const handleLike = () => {
        setLiked(!liked);
        if (!liked) {
            localStorage.setItem(`${id}-liked`, 'true');
        } else {
            localStorage.removeItem(`${id}-liked`);
        }
    };

    const handleMovieClick = (movieId) => {
        history.push(`/movie/${movieId}`);
        window.scrollTo(0, 0);
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5.4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1600, settings: { slidesToShow: 4.7, slidesToScroll: 3, dots: true } },
            { breakpoint: 1400, settings: { slidesToShow: 4.3, slidesToScroll: 2, dots: true } },
            { breakpoint: 1240, settings: { slidesToShow: 3.4, slidesToScroll: 1, dots: true } },
            { breakpoint: 1000, settings: { slidesToShow: 3, slidesToScroll: 1, dots: true } },
            { breakpoint: 768, settings: { slidesToShow: 2.3, infinite: true, dots: true } },
            { breakpoint: 700, settings: { slidesToShow: 2.1, slidesToScroll: 1, dots: true } },
            { breakpoint: 600, settings: { slidesToShow: 1.8, slidesToScroll: 1, dots: true } },
            { breakpoint: 430, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true } }
        ]
    };

    const settings2 = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 7.7,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 6, slidesToScroll: 3, dots: true } },
            { breakpoint: 700, settings: { slidesToShow: 4, slidesToScroll: 4, initialSlide: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 3, slidesToScroll: 3 } }
        ]
    };

    if (loading) {
        return <Loader />;
    }

    if (!movieDetails) {
        return <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>Фильм не найден</div>;
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
                <MovieDetailsCastSlider cast={cast} crew={crew} settings={settings2} />
                <MovieDetailsInfo
                    movieDetails={movieDetails}
                    video={trailer}
                    videos={videos}
                    cast={cast}
                    crew={crew}
                    reviews={reviews}
                    keywords={keywords}
                />

                {recommendedMovies.length > 0 && (
                    <SimilarMovieSlider
                        title={t('pages.movieDetails.recommended')}
                        movies={recommendedMovies}
                        settings={settings}
                        handleMovieClick={handleMovieClick}
                        getGenres={getGenreNames}
                    />
                )}

                {similarMovies.length > 0 && (
                    <SimilarMovieSlider
                        title={t('pages.movieDetails.similar')}
                        movies={similarMovies}
                        settings={settings}
                        handleMovieClick={handleMovieClick}
                        getGenres={getGenreNames}
                    />
                )}
            </div>
        </div>
    );
}

export default MovieDetails;
