import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const { filteredData } = location.state || []; // Получаем данные из состояния

    return (
        <div className="search-results">
            <h1>Search Results</h1>
            {filteredData && filteredData.length > 0 ? (
                <ul>
                    {filteredData.map((movie) => (
                        <li key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p>{movie.overview}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;
