import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Watchlist from "../../Components/WatchList/WatchList";

function Banner({  handleDownload, handleShare, handleLike, liked }) {
    const [movie, setMovie] = useState(null);
    const apiKey = 'bc25b198a01dce97d9fbeb1bada0f375';
    const history = useHistory();

    const handleMovieClick = (id) => {
        history.push(`/movie/${id}`);
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
                const result = await response.json();
                const randomIndex = Math.floor(Math.random() * result.results.length);
                setMovie(result.results[randomIndex]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMovie();
    }, []);

    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <div className='banner' style={{
            background: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}') no-repeat center center / cover`,
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
