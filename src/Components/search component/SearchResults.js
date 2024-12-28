import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import rating from "../../assets/Logo's/Rating.png";

const SearchResults = () => {
    const location = useLocation();
    const { results,searchQuery  } = location.state || [];
    const history = useHistory();

    const handleMovieClick = (id) => {
        history.push(`/movie/${id}`);  // Используем history.push вместо navigate
    };

    console.log(results);


    return (
        <div className='MovieAction_start pt-32   ' >
            <div className="container">
                <div className="MovieAction_text">
                    <h2 className='MovieText'>Результаты поиска по запросу <span>"{searchQuery}"</span> </h2>
                </div>
                <div className="MovieAction_row movieAction-search">
                        {results && results.length > 0 ? (
                            results.map((movie) => (
                                <div className='MovieBox MovieBox-search'  onClick={() => handleMovieClick(movie.id)} key={movie.id}>
                                    <div className="MovieBox-img mevieBox-img-search">
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                             alt={movie.title}/>
                                    </div>
                                    <div className="MovieBox-name">
                                        <h3>{movie.title}</h3>
                                        <div className="MovieBox-about">
                                            <div className="MovieBox-rating">
                                                <img src={rating} alt="rating"/>
                                                <p>{movie.vote_average}</p>
                                            </div>
                                            <div className="MovieBox-category">
                                                {/* Add any categories or genres here */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
