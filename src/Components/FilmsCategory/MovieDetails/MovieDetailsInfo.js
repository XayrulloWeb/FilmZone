import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../assets/Style/tmdb-pages.css';

const MovieDetailsInfo = ({ movieDetails, video, videos, cast, crew, reviews, keywords }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('overview');

    const director = crew?.find(person => person.job === 'Director');
    const writers = crew?.filter(person => person.job === 'Screenplay' || person.job === 'Writer');
    const producers = crew?.filter(person => person.job === 'Producer').slice(0, 3);

    const formatMoney = (amount) => {
        if (!amount) return 'N/A';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
    };

    const formatRuntime = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}${t('pages.movieDetails.hours')} ${mins}${t('pages.movieDetails.minutes')}`;
    };

    return (
        <div className="MovieContent" style={{ marginTop: '50px' }}>
            {/* Trailer/Video Section */}
            {video && (
                <div style={{ marginBottom: '40px' }}>
                    <h3 className="MovieText" style={{ marginBottom: '20px' }}>
                        <i className="fa-brands fa-youtube" style={{ color: '#FF0000', marginRight: '10px' }}></i>
                        {t('pages.movieDetails.trailer')}
                    </h3>
                    <iframe
                        width="100%"
                        height="500"
                        src={video}
                        title={t('pages.movieDetails.trailer')}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    ></iframe>

                    {/* Additional Videos */}
                    {videos && videos.length > 1 && (
                        <div style={{ marginTop: '25px' }}>
                            <h4 style={{ color: '#9CA4AB', marginBottom: '15px', fontSize: '14px' }}>
                                {t('pages.movieDetails.otherVideos')}:
                            </h4>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                {videos.slice(0, 5).map((vid, index) => (
                                    <a
                                        key={index}
                                        href={`https://www.youtube.com/watch?v=${vid.key}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="keyword-tag"
                                        style={{
                                            backgroundColor: '#1e1e1e',
                                            color: 'white',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <i className="fa-solid fa-play" style={{ marginRight: '5px', fontSize: '10px' }}></i>
                                        {vid.type} {vid.name ? `- ${vid.name.substring(0, 20)}...` : ''}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Tabs */}
            <div className="movie-tabs">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                >
                    <i className="fa-solid fa-info-circle" style={{ marginRight: '8px' }}></i>
                    {t('pages.movieDetails.overview')}
                </button>
                <button
                    onClick={() => setActiveTab('cast')}
                    className={`tab-btn ${activeTab === 'cast' ? 'active' : ''}`}
                >
                    <i className="fa-solid fa-users" style={{ marginRight: '8px' }}></i>
                    {t('pages.movieDetails.cast')} ({cast?.length || 0})
                </button>
                {reviews && reviews.length > 0 && (
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                    >
                        <i className="fa-solid fa-comment-dots" style={{ marginRight: '8px' }}></i>
                        {t('pages.movieDetails.reviews')} ({reviews.length})
                    </button>
                )}
            </div>

            {/* Tab Content */}
            <div className="details">
                {activeTab === 'overview' && (
                    <div>
                        <h1 className="MovieText" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                            {movieDetails.title}
                        </h1>
                        {movieDetails.tagline && (
                            <p style={{ fontStyle: 'italic', color: 'var(--back-main)', marginBottom: '25px', fontSize: '18px' }}>
                                "{movieDetails.tagline}"
                            </p>
                        )}

                        <div className="ratings" style={{ marginBottom: '30px' }}>
                            <span className="rating" style={{ fontSize: '20px' }}>
                                <i className="fa-solid fa-star" style={{ color: '#FFD700', marginRight: '8px' }}></i>
                                <strong>{movieDetails.vote_average?.toFixed(1)}</strong> / 10
                            </span>
                            <span className="age" style={{ marginLeft: '15px', padding: '8px 16px', fontSize: '14px' }}>
                                {movieDetails.adult ? "18+" : "PG-13"}
                            </span>
                        </div>

                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">
                                    <i className="fa-solid fa-calendar" style={{ marginRight: '8px', color: 'var(--back-main)' }}></i>
                                    {t('pages.movieDetails.year')}
                                </span>
                                <span className="info-value">{movieDetails.release_date?.split('-')[0]}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">
                                    <i className="fa-solid fa-clock" style={{ marginRight: '8px', color: 'var(--back-main)' }}></i>
                                    {t('pages.movieDetails.runtime')}
                                </span>
                                <span className="info-value">{formatRuntime(movieDetails.runtime)}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">
                                    <i className="fa-solid fa-earth-americas" style={{ marginRight: '8px', color: 'var(--back-main)' }}></i>
                                    {t('pages.movieDetails.country')}
                                </span>
                                <span className="info-value">{movieDetails.production_countries?.map(c => c.name).join(', ') || 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">
                                    <i className="fa-solid fa-language" style={{ marginRight: '8px', color: 'var(--back-main)' }}></i>
                                    {t('pages.movieDetails.language')}
                                </span>
                                <span className="info-value">{movieDetails.original_language?.toUpperCase()}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">
                                    <i className="fa-solid fa-dollar-sign" style={{ marginRight: '8px', color: 'var(--back-main)' }}></i>
                                    {t('pages.movieDetails.budget')}
                                </span>
                                <span className="info-value">{formatMoney(movieDetails.budget)}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">
                                    <i className="fa-solid fa-chart-line" style={{ marginRight: '8px', color: 'var(--back-main)' }}></i>
                                    {t('pages.movieDetails.revenue')}
                                </span>
                                <span className="info-value">{formatMoney(movieDetails.revenue)}</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <p className="info-label" style={{ marginBottom: '10px' }}>
                                <i className="fa-solid fa-masks-theater" style={{ marginRight: '8px', color: 'var(--back-main)' }}></i>
                                {t('pages.movieDetails.genres')}
                            </p>
                            <div className="keywords-container">
                                {movieDetails.genres?.map(g => (
                                    <span key={g.id} className="keyword-tag" style={{ backgroundColor: 'var(--back-main)', color: 'white', borderColor: 'var(--back-main)' }}>
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {director && (
                            <p style={{ marginTop: '20px' }}>
                                <strong style={{ color: 'white' }}>
                                    <i className="fa-solid fa-video" style={{ marginRight: '8px', color: 'var(--back-main)' }}></i>
                                    {t('pages.movieDetails.director')}:
                                </strong>{' '}
                                <span style={{ color: '#9CA4AB' }}>{director.name}</span>
                            </p>
                        )}
                        {writers && writers.length > 0 && (
                            <p style={{ marginTop: '10px' }}>
                                <strong style={{ color: 'white' }}>
                                    <i className="fa-solid fa-pen" style={{ marginRight: '8px', color: 'var(--back-main)' }}></i>
                                    {t('pages.movieDetails.screenplay')}:
                                </strong>{' '}
                                <span style={{ color: '#9CA4AB' }}>{writers.map(w => w.name).join(', ')}</span>
                            </p>
                        )}

                        <div style={{ marginTop: '30px' }}>
                            <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '20px' }}>
                                <i className="fa-solid fa-align-left" style={{ marginRight: '10px', color: 'var(--back-main)' }}></i>
                                {t('pages.movieDetails.description')}
                            </h3>
                            <p style={{ color: '#9CA4AB', lineHeight: '1.8', fontSize: '16px' }}>
                                {movieDetails.overview || t('pages.movieDetails.noDescription')}
                            </p>
                        </div>

                        {movieDetails.production_companies && movieDetails.production_companies.length > 0 && (
                            <div style={{ marginTop: '40px' }}>
                                <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '18px' }}>
                                    <i className="fa-solid fa-building" style={{ marginRight: '10px', color: 'var(--back-main)' }}></i>
                                    {t('pages.movieDetails.production')}
                                </h3>
                                <div className="production-companies">
                                    {movieDetails.production_companies.map(company => (
                                        <div key={company.id} className="company-item">
                                            {company.logo_path && (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                    alt={company.name}
                                                    className="company-logo"
                                                />
                                            )}
                                            <p className="company-name">{company.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {keywords && keywords.length > 0 && (
                            <div style={{ marginTop: '40px' }}>
                                <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '18px' }}>
                                    <i className="fa-solid fa-tags" style={{ marginRight: '10px', color: 'var(--back-main)' }}></i>
                                    {t('pages.movieDetails.keywords')}
                                </h3>
                                <div className="keywords-container">
                                    {keywords.map(keyword => (
                                        <span key={keyword.id} className="keyword-tag">
                                            {keyword.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'cast' && (
                    <div>
                        <h2 className="MovieText" style={{ marginBottom: '25px' }}>
                            <i className="fa-solid fa-users" style={{ marginRight: '12px', color: 'var(--back-main)' }}></i>
                            {t('pages.movieDetails.castTitle')}
                        </h2>
                        <div className="cast-grid">
                            {cast?.slice(0, 12).map(actor => (
                                <div key={actor.id} className="cast-member">
                                    <img
                                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Photo'}
                                        alt={actor.name}
                                        className="cast-photo"
                                    />
                                    <p className="cast-name">{actor.name}</p>
                                    <p className="cast-character">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div>
                        <h2 className="MovieText" style={{ marginBottom: '25px' }}>
                            <i className="fa-solid fa-comment-dots" style={{ marginRight: '12px', color: 'var(--back-main)' }}></i>
                            {t('pages.movieDetails.reviewsTitle')}
                        </h2>
                        {reviews?.map((review, index) => (
                            <div key={index} className="review-card">
                                <div className="review-author">
                                    <strong>
                                        <i className="fa-solid fa-user-circle" style={{ marginRight: '8px', color: 'var(--back-main)' }}></i>
                                        {review.author}
                                    </strong>
                                    {review.author_details?.rating && (
                                        <span className="review-rating">
                                            ⭐ {review.author_details.rating}/10
                                        </span>
                                    )}
                                </div>
                                <p className="review-content">
                                    {review.content.length > 500
                                        ? review.content.substring(0, 500) + '...'
                                        : review.content}
                                </p>
                                <p className="review-date">
                                    <i className="fa-solid fa-calendar-days" style={{ marginRight: '5px' }}></i>
                                    {new Date(review.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetailsInfo;
