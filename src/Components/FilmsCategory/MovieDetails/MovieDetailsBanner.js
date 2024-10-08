import React from 'react';
import Watchlist from '../../WatchList/WatchList';

const Banner = ({ movieDetails, handleDownload, handleShare, handleLike, liked }) => {
    return (
        <div
            className="MovieDetails_banner"
            style={{
                backgroundImage: movieDetails.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
                    : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <div className="banner">
                <div className="container">
                    <div className="banner_start">
                        <div className="banner_info">
                            <div className="genre">
                                <span>{movieDetails.genres?.[0]?.name || 'Unknown Genre'}</span>
                            </div>
                            <h1>{movieDetails.title}</h1>
                            <p>{movieDetails.release_date?.split('-')[0]} • {movieDetails.genres?.map(genre => genre.name).join(', ')}</p>
                            <div className="banner_btns">
                                <div className="btn_watch">
                                    <button className="btn-main"><i className="fa-solid fa-circle-play"></i> Continue Watching</button>
                                    <Watchlist movieDetails={movieDetails} />
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
        </div>
    );
};

export default Banner;
